import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const maxDuration = 30

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

const typeLabels: Record<string, string> = {
  svatba: 'Svatba',
  boudoir: 'Boudoir & Akt',
  portret: 'Portrét',
  jine: 'Jiné',
}

const requestSchema = z.object({
  jmeno: z.string().min(2).max(120),
  email: z.string().email().max(254),
  telefon: z.string().max(40).optional(),
  typPoptavky: z.enum(['svatba', 'boudoir', 'portret', 'jine']),
  datum: z.string().max(40).optional(),
  zprava: z.string().min(10).max(5000),
  gdpr: z.literal(true),
  honeypot: z.string().max(0).optional(),
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = requestLog.get(ip) || []
  const valid = current.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (valid.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, valid)
    return true
  }

  valid.push(now)
  requestLog.set(ip, valid)
  return false
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Neplatná data formuláře' }, { status: 400 })
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const forwardedFor = req.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Příliš mnoho požadavků. Zkuste to prosím později.' }, { status: 429 })
  }

  const { jmeno, email, telefon, typPoptavky, datum, zprava } = parsed.data

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission (no Resend key):', { jmeno, email, typPoptavky })
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'web@josefpavlovic.cz',
      to: 'mail@josefpavlovic.cz',
      replyTo: email,
      subject: `Nová poptávka: ${typeLabels[typPoptavky] || typPoptavky} — ${jmeno}`,
      html: `
        <h2>Nová poptávka z webu</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(jmeno)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${telefon ? `<p><strong>Telefon:</strong> ${escapeHtml(telefon)}</p>` : ''}
        <p><strong>Typ focení:</strong> ${typeLabels[typPoptavky] || typPoptavky}</p>
        ${datum ? `<p><strong>Datum:</strong> ${escapeHtml(datum)}</p>` : ''}
        <hr />
        <p><strong>Zpráva:</strong></p>
        <p>${escapeHtml(zprava).replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 500 })
  }
}

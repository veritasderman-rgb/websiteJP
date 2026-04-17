import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60
import { Resend } from 'resend'

const typeLabels: Record<string, string> = {
  svatba: 'Svatba',
  boudoir: 'Boudoir & Akt',
  portret: 'Portrét',
  jine: 'Jiné',
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { jmeno, email, telefon, typPoptavky, datum, zprava } = body

  if (!jmeno || !email || !zprava) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
  }

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
        <p><strong>Jméno:</strong> ${jmeno}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}
        <p><strong>Typ focení:</strong> ${typeLabels[typPoptavky] || typPoptavky}</p>
        ${datum ? `<p><strong>Datum:</strong> ${datum}</p>` : ''}
        <hr />
        <p><strong>Zpráva:</strong></p>
        <p>${zprava.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 500 })
  }
}

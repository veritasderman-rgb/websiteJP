import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS = 3;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipTimestamps.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);
  return false;
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Příliš mnoho požadavků. Zkuste to za chvíli.' });
  }

  const { name, email, service, weddingDate, message } = req.body || {};

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Vyplňte prosím jméno.' });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Zadejte platný email.' });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Zpráva musí mít alespoň 10 znaků.' });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeService = escapeHtml((service || '').trim());
  const safeDate = escapeHtml((weddingDate || '').trim());
  const safeMessage = escapeHtml(message.trim());

  // Send via Resend if API key is configured
  const resendKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_EMAIL || 'mail@josefpavlovic.cz';

  if (resendKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Web <noreply@josefpavlovic.com>',
          to: [recipientEmail],
          reply_to: safeEmail,
          subject: `Nová poptávka: ${safeService || 'obecný dotaz'} — ${safeName}`,
          html: `
            <h2>Nová zpráva z webu</h2>
            <p><strong>Jméno:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Typ zakázky:</strong> ${safeService || '—'}</p>
            ${safeDate ? `<p><strong>Termín svatby:</strong> ${safeDate}</p>` : ''}
            <p><strong>Zpráva:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      if (!response.ok) {
        console.error('Resend error:', await response.text());
        return res.status(500).json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' });
      }
    } catch (err) {
      console.error('Email send failed:', err);
      return res.status(500).json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' });
    }
  } else {
    // No email service configured — log submission for now
    console.log('--- CONTACT FORM SUBMISSION ---');
    console.log(JSON.stringify({ name: safeName, email: safeEmail, service: safeService, weddingDate: safeDate, message: safeMessage }, null, 2));
    console.log('--- END ---');
    console.warn('RESEND_API_KEY not set. Email was not sent. Set it in Vercel Environment Variables.');
  }

  return res.status(200).json({ ok: true });
}

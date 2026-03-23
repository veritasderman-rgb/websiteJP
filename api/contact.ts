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

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_KEY not set in environment variables.');
    return res.status(500).json({ error: 'Kontaktní formulář není nakonfigurovaný. Napište přímo na mail@josefpavlovic.cz.' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nová poptávka: ${(service || 'obecný dotaz')} — ${name.trim()}`,
        from_name: name.trim(),
        replyto: email.trim(),
        name: name.trim(),
        email: email.trim(),
        service: service || '—',
        ...(weddingDate ? { wedding_date: weddingDate } : {}),
        message: message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('Web3Forms error:', data);
      return res.status(500).json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' });
    }
  } catch (err) {
    console.error('Email send failed:', err);
    return res.status(500).json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' });
  }

  return res.status(200).json({ ok: true });
}

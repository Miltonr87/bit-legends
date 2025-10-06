import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url parameter' });
  }

  try {
    const response = await fetch(url);
    let html = await response.text();

    // 🧹 Remove known ad elements (iframe, scripts)
    html = html
      .replace(/<iframe[^>]*ad\.html[^>]*><\/iframe>/gi, '')
      .replace(/<script[^>]*ad[^>]*><\/script>/gi, '');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(html);
  } catch (err: any) {
    return res.status(500).json({
      error: 'Proxy fetch failed',
      details: err.message || 'Unknown error',
    });
  }
}

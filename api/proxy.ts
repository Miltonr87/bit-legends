import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * Simple proxy endpoint to fetch iframe HTML
 * and strip ads / external tracking scripts.
 */
export default async function handler(
    req: VercelRequest,
    res: VercelResponse
): Promise<void> {
    const targetUrl = req.query.url as string;

    if (!targetUrl || !targetUrl.startsWith('https://')) {
        res.status(400).json({ error: 'Invalid or missing URL' });
        return;
    }

    try {
        const response = await axios.get<string>(targetUrl, {
            responseType: 'text',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'text/html',
            },
            timeout: 8000,
        });

        // Basic sanitization to remove ad & tracking scripts
        let cleanHtml = response.data
            .replace(/adsbygoogle|doubleclick\.net|googlesyndication|popads/gi, ''); // strip ad domains

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(cleanHtml);
    } catch (error: any) {
        console.error('Proxy error:', error.message);
        res.status(500).json({ error: 'Failed to fetch target URL' });
    }
}

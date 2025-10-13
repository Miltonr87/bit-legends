import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * Proxy endpoint to fetch iframe HTML,
 * keep emulator scripts intact,
 * but remove ads, tracking, and unwanted elements.
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
            timeout: 10000,
        });

        let cleanHtml = response.data;

        // 🚫 Remove ad iframes and emulatorjs ad HTML blocks
        cleanHtml = cleanHtml.replace(
            /<iframe[^>]+(ad\.html|adsbygoogle|doubleclick|popads|googlesyndication|adservice\.google|emulatorjs\.com\/ad)[\s\S]*?<\/iframe>/gi,
            ''
        );

        // 🚫 Remove known ad containers or sponsor divs
        cleanHtml = cleanHtml.replace(
            /<(div|ins|section)[^>]+(ad-|adsbygoogle|banner|sponsor|promo|advertisement)[^>]*>[\s\S]*?<\/\1>/gi,
            ''
        );

        // 🚫 Remove ad network tracking domains from inline scripts or links
        cleanHtml = cleanHtml.replace(
            /(adsbygoogle|doubleclick\.net|googlesyndication|googletagmanager|adservice\.google|taboola|outbrain|zedo|exoclick|propellerads|adnxs\.com|moatads|quantserve|scorecardresearch)/gi,
            ''
        );

        // 🔧 Fix relative script and asset links (src="/..." → absolute)
        const baseMatch = targetUrl.match(/^https?:\/\/[^/]+/);
        const baseUrl = baseMatch ? baseMatch[0] : '';
        cleanHtml = cleanHtml.replace(/src="\/(?!\/)/g, `src="${baseUrl}/`);
        cleanHtml = cleanHtml.replace(/href="\/(?!\/)/g, `href="${baseUrl}/`);

        // 🧹 Clean extra comments and whitespace
        cleanHtml = cleanHtml
            .replace(/<!--.*?-->/gs, '')
            .replace(/\n\s*\n/g, '\n')
            .trim();

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(cleanHtml);
    } catch (error: any) {
        console.error('Proxy error:', error.message);
        res.status(500).json({ error: 'Failed to fetch target URL' });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const target = req.query.url as string

    if (!target) {
        res.status(400).send('Missing ?url= parameter')
        return
    }

    try {
        const upstream = await fetch(target, {
            headers: { 'user-agent': req.headers['user-agent'] || '' },
        })

        let html = await upstream.text()

        // === Remove common ad/tracker scripts ===
        const adPatterns = [
            /<script[^>]+googlesyndication[^<]*<\/script>/gi,
            /<script[^>]+doubleclick[^<]*<\/script>/gi,
            /<script[^>]+adsbygoogle[^<]*<\/script>/gi,
            /<script[^>]+taboola[^<]*<\/script>/gi,
            /<script[^>]+outbrain[^<]*<\/script>/gi,
            /<script[\s\S]*?<\/script>/gi, // catch any inline scripts that inject ads
            /<iframe[^>]+(googlesyndication|doubleclick|taboola|outbrain|adservice)[\s\S]*?<\/iframe>/gi,
            /<ins[^>]+adsbygoogle[^>]*>[\s\S]*?<\/ins>/gi,
            /<div[^>]*(id|class)=["']?(ad-|adsbygoogle|ad-container|ad-slot)[^>]*>[\s\S]*?<\/div>/gi,
        ]

        for (const regex of adPatterns) {
            html = html.replace(regex, '')
        }

        // === Optional: block remote ad URLs inside inline JS ===
        html = html.replace(
            /(googlesyndication|doubleclick|adsbygoogle|taboola|outbrain|adservice)\.com/gi,
            ''
        )

        // === Add minimal CSP for safety ===
        res.setHeader('content-security-policy', [
            "default-src 'self' data: blob:;",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;",
            "style-src 'self' 'unsafe-inline';",
            "img-src * data: blob:;",
            "frame-src 'self';",
            "connect-src *;",
            "media-src *;",
        ].join(' '))

        res.setHeader('content-type', 'text/html; charset=utf-8')
        res.status(200).send(html)
    } catch (err) {
        res.status(500).send('Error fetching target: ' + (err as Error).message)
    }
}

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

        // Remove ad scripts and iframes (Google Ads, Taboola, etc)
        const filters = [
            /<script[^>]+googlesyndication[^<]*<\/script>/gi,
            /<script[^>]+doubleclick[^<]*<\/script>/gi,
            /<script[^>]+adsbygoogle[^<]*<\/script>/gi,
            /<iframe[^>]+(googlesyndication|doubleclick|taboola|outbrain|adservice)[\s\S]*?<\/iframe>/gi,
        ]
        filters.forEach(rx => {
            html = html.replace(rx, '')
        })

        res.setHeader('content-type', 'text/html; charset=utf-8')
        res.setHeader(
            'content-security-policy',
            [
                "default-src 'self' data: blob:;",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;",
                "style-src 'self' 'unsafe-inline';",
                "img-src * data: blob:;",
                "frame-src 'self';",
                "connect-src *;",
                "media-src *;",
            ].join(' ')
        )

        res.status(200).send(html)
    } catch (err) {
        res.status(500).send('Error fetching target: ' + (err as Error).message)
    }
}

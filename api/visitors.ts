import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const mockData = {
        pageviews: { value: 4821 },
        countries: {
            Brazil: 1950,
            "United States": 1320,
            Germany: 640,
            Japan: 410,
            France: 290,
            "United Kingdom": 211,
        },
        mock: true,
    };

    try {
        const { data } = await axios.get(
            "https://simpleanalytics.com/bitlegends.vercel.app.json?version=5",
            { headers: { "User-Agent": "BitLegendsServer" }, timeout: 8000 }
        );

        // fallback if data missing or invalid
        if (!data.pageviews?.value || !Object.keys(data.countries || {}).length) {
            return res.status(200).json(mockData);
        }

        return res.status(200).json(data);
    } catch (error: any) {
        console.error("SimpleAnalytics API error:", error.message);
        return res.status(200).json(mockData);
    }
}

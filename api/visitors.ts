import axios from "axios";

export default async function handler(req, res) {
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
            "https://simpleanalytics.com/bitlegends.vercel.app.json?version=5&fields=pageviews,countries",
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    Accept: "application/json",
                },
                timeout: 8000,
            }
        );

        if (!data?.pageviews?.value || !Object.keys(data.countries || {}).length) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(mockData));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    } catch (error) {
        console.error("SimpleAnalytics API error:", error.message);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(mockData));
    }
}

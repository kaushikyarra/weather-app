import axios from 'axios';

export default async function handler(req, res) {
    try {
        // 1. CORS Headers (Optional but good practice)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // 2. Environment Variable Check
        const apiKey = process.env.WEATHERSTACK_API_KEY || process.env.VITE_WEATHERSTACK_API_KEY;
        if (!apiKey) {
            console.error('Server Configuration Error: Missing WEATHERSTACK_API_KEY');
            return res.status(500).json({
                error: {
                    info: 'Server Missing API Key. Please add WEATHERSTACK_API_KEY to Vercel Settings.'
                }
            });
        }

        // 3. Request Parameters
        const { query, type = 'current', historical_date } = req.query || {};

        if (!query) {
            return res.status(400).json({ error: { info: 'Missing query parameter' } });
        }

        const baseUrl = 'http://api.weatherstack.com';
        let url = `${baseUrl}/${type}`;

        const params = {
            access_key: apiKey,
            query: query
        };

        if (type === 'historical') {
            params.historical_date = historical_date;
            params.hourly = 1;
        }

        // 4. API Call with Timeout
        const response = await axios.get(url, {
            params,
            timeout: 5000 // 5 seconds timeout to prevent Vercel 10s limit crash
        });

        // 5. Success Response
        return res.status(200).json(response.data);

    } catch (error) {
        // 6. Global Error Handler
        console.error('Proxy Function Error:', error.message);

        // Handle Axios Errors (Response from Weatherstack)
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        // Handle Internal Errors
        return res.status(500).json({
            error: {
                info: `Proxy Error: ${error.message}`
            }
        });
    }
}

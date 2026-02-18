import axios from 'axios';

export default async function handler(req, res) {
    const { query, type = 'current', historical_date } = req.query;
    const apiKey = process.env.WEATHERSTACK_API_KEY || process.env.VITE_WEATHERSTACK_API_KEY;

    if (!apiKey) {
        console.error('Server Error: Missing API Key. Env Vars:', JSON.stringify(process.env, null, 2)); // Log env vars (careful with secrets, but here we are debugging missing secrets)
        return res.status(500).json({ error: 'Server configuration error: Missing API Key. Please add WEATHERSTACK_API_KEY to Vercel Environment Variables.' });
    }

    const baseUrl = 'http://api.weatherstack.com';
    let url = `${baseUrl}/${type}`;
    // note: type is 'current', 'historical', 'marine'

    const params = {
        access_key: apiKey,
        query: query
    };

    if (type === 'historical') {
        params.historical_date = historical_date;
        params.hourly = 1;
    }

    try {
        const response = await axios.get(url, { params });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}

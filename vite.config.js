import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

// Custom plugin to handle /api/weather locally
const weatherProxyPlugin = () => {
  return {
    name: 'weather-proxy',
    configureServer(server) {
      server.middlewares.use('/api/weather', async (req, res, next) => {
        const env = loadEnv('development', process.cwd(), '');
        const apiKey = env.VITE_WEATHERSTACK_API_KEY;

        if (!apiKey) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Missing API Key in .env' }));
          return;
        }

        // Parse query params
        const url = new URL(req.url, `http://${req.headers.host}`);
        const type = url.searchParams.get('type') || 'current';
        const query = url.searchParams.get('query');
        const historical_date = url.searchParams.get('historical_date');

        const baseUrl = 'http://api.weatherstack.com';
        const targetUrl = `${baseUrl}/${type}`;

        const params = {
          access_key: apiKey,
          query: query
        };
        if (type === 'historical') {
          params.historical_date = historical_date;
          params.hourly = 1;
        }

        try {
          const response = await axios.get(targetUrl, { params });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response.data));
        } catch (error) {
          console.error('Local Proxy Error:', error.message);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch weather data locally' }));
        }
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), weatherProxyPlugin()],
})

import axios from 'axios';

// Use relative path for local proxy (dev) or vercel serverless (prod)
const BASE_URL = '/api/weather';

export const weatherApi = {
    getCurrentWeather: async (query) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    type: 'current',
                    query: query
                }
            });
            if (response.data.error) {
                throw new Error(response.data.error.info);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching current weather:", error);
            throw error;
        }
    },

    getHistoricalWeather: async (query, date) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    type: 'historical',
                    query: query,
                    historical_date: date
                }
            });
            if (response.data.error) {
                console.warn("Historical API Error:", response.data.error.info);
                return null;
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching historical weather:", error);
            return null;
        }
    },

    getMarineWeather: async (query) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    type: 'marine',
                    query: query
                }
            });
            if (response.data.error) {
                console.warn("Marine API Error:", response.data.error.info);
                return null;
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching marine weather:", error);
            return null;
        }
    }
};

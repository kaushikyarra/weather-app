import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com'; // Note: HTTPS is not supported on the free plan

export const weatherApi = {
    getCurrentWeather: async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/current`, {
                params: {
                    access_key: API_KEY,
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
            const response = await axios.get(`${BASE_URL}/historical`, {
                params: {
                    access_key: API_KEY,
                    query: query,
                    historical_date: date,
                    hourly: 1
                }
            });
            if (response.data.error) {
                // Log but don't crash entirely if historical is restricted
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
            const response = await axios.get(`${BASE_URL}/marine`, {
                params: {
                    access_key: API_KEY,
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

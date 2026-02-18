import React, { useState } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import { weatherApi } from './services/weatherApi';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            // 1. Fetch Current Weather
            const currentRes = await weatherApi.getCurrentWeather(query);
            if (currentRes.error) {
                throw new Error(currentRes.error.info || "Failed to fetch current weather");
            }

            // 2. Fetch Historical Weather (Yesterday)
            // Calculate yesterday's date formatted as YYYY-MM-DD
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateStr = yesterday.toISOString().split('T')[0];

            let historicalRes = null;
            try {
                historicalRes = await weatherApi.getHistoricalWeather(query, dateStr);
            } catch (err) {
                console.warn("Historical weather fetch failed or restricted", err);
            }

            // 3. Marine Data (Optional/Plan dependent)
            // limiting calls to avoid rate limits on free plans usually
            // const marineRes = await weatherApi.getMarineWeather(query); 

            setWeatherData({
                current: currentRes.current,
                location: currentRes.location,
                historical: historicalRes ? historicalRes.historical : null,
                // marine: marineRes // Add this if we uncomment above
            });

        } catch (err) {
            let userMsg = err.message;
            if (err.response && err.response.status === 429) {
                userMsg = "Usage limit exceeded. Please try again later.";
            } else if (err.message.includes("429")) {
                userMsg = "Usage limit exceeded. Please upgrade plan or wait.";
            }
            setError(userMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                    Weather<span className="text-blue-400">Stack</span> App
                </h1>
                <p className="text-white/80">Glassmorphic Design • React • Vite</p>
            </header>

            <Search onSearch={handleSearch} />

            <main className="w-full max-w-4xl space-y-6">
                {loading && (
                    <div className="text-center text-white text-xl animate-pulse">
                        Loading weather data...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 backdrop-blur border border-red-500/50 text-white p-4 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {!loading && weatherData && (
                    <>
                        <CurrentWeather data={weatherData} />

                        <div className="grid md:grid-cols-2 gap-6">
                            {weatherData.historical && <HistoricalWeather data={weatherData} />}
                            {/* Placeholder for Marine if we had data, currently mocked/hidden if null */}
                            <MarineWeather data={weatherData} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;

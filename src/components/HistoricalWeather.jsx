import React from 'react';
import { Calendar } from 'lucide-react';

const HistoricalWeather = ({ data }) => {
    if (!data || !data.historical) return null;

    // Weatherstack returns historical data keyed by date
    // e.g. "2023-10-25": { ... }
    const dates = Object.keys(data.historical);

    return (
        <div className="glass-panel text-white mt-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-purple-400" />
                Historical Data
            </h3>
            <div className="space-y-4">
                {dates.map((date) => {
                    const dayData = data.historical[date];
                    return (
                        <div key={date} className="bg-white/5 p-4 rounded-lg flex justify-between items-center transition hover:bg-white/10">
                            <div>
                                <p className="font-semibold text-lg">{date}</p>
                                <p className="text-sm text-white/60">Avg Temp: {dayData.avgtemp}°</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm">Max: {dayData.maxtemp}°</p>
                                <p className="text-sm">Min: {dayData.mintemp}°</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoricalWeather;

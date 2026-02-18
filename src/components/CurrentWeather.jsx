import React from 'react';
import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const { current, location } = data;

    return (
        <div className="glass-panel text-white">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <MapPin size={24} className="text-blue-400" />
                        {location.name}
                    </h2>
                    <p className="text-white/70">{location.country}</p>
                    <p className="text-sm text-white/50">{location.localtime}</p>
                </div>
                <div className="flex flex-col items-end">
                    <img
                        src={current.weather_icons[0]}
                        alt={current.weather_descriptions[0]}
                        className="w-16 h-16 rounded-lg shadow-lg mb-2"
                    />
                    <p className="font-medium">{current.weather_descriptions[0]}</p>
                </div>
            </div>

            <div className="text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                {current.temperature}°C
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white/5 rounded-lg">
                    <Wind className="mx-auto mb-2 text-blue-300" size={20} />
                    <p className="text-sm text-white/60">Wind</p>
                    <p className="font-semibold">{current.wind_speed} km/h</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                    <Droplets className="mx-auto mb-2 text-blue-300" size={20} />
                    <p className="text-sm text-white/60">Humidity</p>
                    <p className="font-semibold">{current.humidity}%</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                    <Cloud className="mx-auto mb-2 text-blue-300" size={20} />
                    <p className="text-sm text-white/60">Cover</p>
                    <p className="font-semibold">{current.cloudcover}%</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;

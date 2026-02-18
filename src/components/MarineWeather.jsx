import React from 'react';
import { Waves, Anchor } from 'lucide-react';

const MarineWeather = ({ data }) => {
    // If we have specific marine data from the /marine endpoint
    const marineData = data?.marine;

    // If no data, show a placeholder explaining potential plan limits
    if (!marineData) {
        return (
            <div className="glass-panel text-white mt-6 bg-blue-900/20 border-blue-500/30 opacity-70">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Waves size={20} className="text-teal-400" />
                    Marine Weather
                </h3>
                <p className="text-sm text-white/60 text-center italic">
                    Marine data is not available for this location or requires a Premium API plan.
                </p>
            </div>
        );
    }

    return (
        <div className="glass-panel text-white mt-6 bg-blue-900/20 border-blue-500/30">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Waves size={20} className="text-teal-400" />
                Marine Weather
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {/*  Render actual data points if available in the future structure */}
                <div className="bg-white/5 p-3 rounded text-center">
                    <Anchor size={16} className="mx-auto mb-1 text-teal-200" />
                    <p className="text-xs text-white/50">Details</p>
                    <p className="font-semibold">Available</p>
                </div>
            </div>
        </div>
    );
};

export default MarineWeather;

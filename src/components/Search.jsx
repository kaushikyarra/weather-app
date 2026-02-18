import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Fix for "Delhi" defaulting to Canada
            let searchQuery = query.trim();
            if (searchQuery.toLowerCase() === 'delhi') {
                searchQuery = 'New Delhi, India';
            }
            onSearch(searchQuery);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter city name..."
                    className="glass-input pr-12"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
                >
                    <SearchIcon size={20} />
                </button>
            </div>
        </form>
    );
};

export default Search;

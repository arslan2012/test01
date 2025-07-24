import React, { useState } from 'react';

function MemeSearch({ onSearch, onFilterChange, filters }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const platforms = ['All', 'Twitter/X', 'Reddit', 'TikTok', 'Instagram', '9GAG', 'Memebase'];
  const timeRanges = ['All Time', 'Last 24h', 'Last Week', 'Last Month'];
  const categories = ['All', 'Political', 'Pop Culture', 'Gaming', 'Sports', 'Tech', 'Crypto'];

  return (
    <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 mb-8">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
        🔍 Search & Filter Memes
      </h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for memes, keywords, or trends..."
          className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1.5 rounded-md hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
          <select
            value={filters.platform}
            onChange={(e) => onFilterChange({ ...filters, platform: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFilterChange({ ...filters, timeRange: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          >
            {timeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Search Tags */}
      <div className="mt-4">
        <p className="text-sm text-gray-400 mb-2">Quick searches:</p>
        <div className="flex flex-wrap gap-2">
          {['viral', 'trending', 'funny', 'relatable', 'political', 'crypto'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                onSearch(tag);
              }}
              className="px-3 py-1 bg-purple-600/30 text-purple-200 text-sm rounded-full border border-purple-500/30 hover:bg-purple-600/50 transition-all duration-300"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MemeSearch = MemeSearch;
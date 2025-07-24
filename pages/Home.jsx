import React, { useState } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    platform: 'All',
    timeRange: 'All Time',
    category: 'All'
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Meme Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] text-4xl animate-float" style={{ animationDelay: '0s' }}>😂</div>
        <div className="absolute top-40 right-[15%] text-3xl animate-float" style={{ animationDelay: '1s' }}>🔥</div>
        <div className="absolute bottom-40 left-[20%] text-3xl animate-float" style={{ animationDelay: '2s' }}>💯</div>
        <div className="absolute bottom-60 right-[25%] text-4xl animate-float" style={{ animationDelay: '3s' }}>🚀</div>
        <div className="absolute top-60 left-[70%] text-3xl animate-float" style={{ animationDelay: '4s' }}>⚡</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-4 animate-pulse-glow">
            MemeHunter
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            🇺🇸 Top 10 Hottest Memes in the US Market
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time meme discovery from X (Twitter), Reddit, TikTok, Instagram, and more. 
            Stay ahead of the viral trends!
          </p>
          
          {/* Live Status Indicator */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live Data Feed</span>
          </div>
        </header>

        {/* Search Component */}
        <window.MemeSearch 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        {/* Trending Memes Component */}
        <window.TrendingMemes 
          searchQuery={searchQuery}
          filters={filters}
        />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400">
          <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4">🌐 Data Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🐦</span>
                <span>Twitter/X</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🤖</span>
                <span>Reddit</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🎵</span>
                <span>TikTok</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">📸</span>
                <span>Instagram</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">😂</span>
                <span>9GAG</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🎭</span>
                <span>Memebase</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Data refreshed every hour • Built with ❤️ for meme enthusiasts
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

window.Home = Home;
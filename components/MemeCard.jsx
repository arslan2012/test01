import React, { useState } from 'react';

function MemeCard({ meme, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getTrendingIcon = (trend) => {
    if (trend >= 90) return '🔥';
    if (trend >= 70) return '📈';
    if (trend >= 50) return '⭐';
    return '💫';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Twitter/X': '🐦',
      'Reddit': '🤖',
      'TikTok': '🎵',
      'Instagram': '📸',
      '9GAG': '😂',
      'Memebase': '🎭'
    };
    return icons[platform] || '🌐';
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
        {index + 1}
      </div>

      {/* Trending Badge */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
        {getTrendingIcon(meme.trending)} {meme.trending}%
      </div>

      {/* Meme Image */}
      <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-700/50 aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {!imageError ? (
          <img
            src={meme.image}
            alt={meme.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-600/20">
            <div className="text-center">
              <div className="text-4xl mb-2">🎭</div>
              <p className="text-gray-400 text-sm">Meme Image</p>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            View Full Size
          </button>
        </div>
      </div>

      {/* Meme Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
          {meme.title}
        </h3>
        
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {meme.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {meme.tags.slice(0, 3).map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full border border-purple-500/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{meme.engagement}</div>
            <div className="text-xs text-gray-400">Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{meme.shares}</div>
            <div className="text-xs text-gray-400">Shares</div>
          </div>
        </div>

        {/* Platform and Source */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getPlatformIcon(meme.platform)}</span>
            <span className="text-sm text-gray-400">{meme.platform}</span>
          </div>
          <div className="text-xs text-gray-500">
            {meme.timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}

window.MemeCard = MemeCard;
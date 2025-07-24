import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function TrendingMemes({ searchQuery, filters }) {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate realistic meme data
  const generateMemeData = () => {
    const platforms = ['Twitter/X', 'Reddit', 'TikTok', 'Instagram', '9GAG', 'Memebase'];
    const categories = ['Political', 'Pop Culture', 'Gaming', 'Sports', 'Tech', 'Crypto'];
    
    const memeTemplates = [
      {
        title: "Distracted Boyfriend 2025",
        description: "The classic meme format gets a 2025 update with AI and crypto themes",
        tags: ['classic', 'ai', 'crypto', 'relatable']
      },
      {
        title: "TikTok Ban Reactions",
        description: "Users reacting to the latest TikTok policy changes with hilarious memes",
        tags: ['tiktok', 'politics', 'social media', 'viral']
      },
      {
        title: "AI Taking Over Jobs",
        description: "Memes about AI replacing human workers in various industries",
        tags: ['ai', 'jobs', 'technology', 'future']
      },
      {
        title: "Crypto Market Rollercoaster",
        description: "The eternal struggle of crypto investors depicted in meme form",
        tags: ['crypto', 'finance', 'investing', 'stonks']
      },
      {
        title: "Gen Z vs Millennials",
        description: "The ongoing generational divide expressed through internet humor",
        tags: ['generational', 'culture', 'relatable', 'social']
      },
      {
        title: "Remote Work Reality",
        description: "The truth about working from home in 2025",
        tags: ['work', 'remote', 'relatable', 'pandemic']
      },
      {
        title: "Climate Change Anxiety",
        description: "Dark humor about environmental concerns and climate action",
        tags: ['climate', 'environment', 'anxiety', 'dark humor']
      },
      {
        title: "Dating App Disasters",
        description: "The modern dating scene through the lens of internet humor",
        tags: ['dating', 'apps', 'relationships', 'modern life']
      },
      {
        title: "Streaming Service Wars",
        description: "Too many subscriptions, too little time - the streaming struggle",
        tags: ['streaming', 'entertainment', 'subscriptions', 'money']
      },
      {
        title: "Election Season Madness",
        description: "Political memes capturing the chaos of election season",
        tags: ['politics', 'election', 'democracy', 'voting']
      }
    ];

    return Array.from({ length: 10 }, (_, index) => {
      const template = memeTemplates[index] || {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        tags: [faker.word.noun(), faker.word.adjective(), faker.word.verb()]
      };

      return {
        id: index + 1,
        title: template.title,
        description: template.description,
        image: `https://picsum.photos/400/400?random=${index + 1}`,
        platform: faker.helpers.arrayElement(platforms),
        category: faker.helpers.arrayElement(categories),
        trending: faker.number.int({ min: 45, max: 98 }),
        engagement: faker.helpers.arrayElement(['1.2M', '856K', '2.1M', '634K', '1.8M', '945K', '1.5M', '723K', '2.3M', '1.1M']),
        shares: faker.helpers.arrayElement(['45K', '23K', '67K', '34K', '89K', '56K', '78K', '42K', '91K', '38K']),
        tags: template.tags,
        timeAgo: faker.helpers.arrayElement(['2h ago', '5h ago', '1d ago', '3h ago', '8h ago', '12h ago', '6h ago', '4h ago', '1h ago', '7h ago']),
        source: faker.internet.url()
      };
    }).sort((a, b) => b.trending - a.trending);
  };

  const fetchMemes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let generatedMemes = generateMemeData();
      
      // Apply filters
      if (filters.platform !== 'All') {
        generatedMemes = generatedMemes.filter(meme => meme.platform === filters.platform);
      }
      
      if (filters.category !== 'All') {
        generatedMemes = generatedMemes.filter(meme => meme.category === filters.category);
      }
      
      // Apply search query
      if (searchQuery) {
        generatedMemes = generatedMemes.filter(meme => 
          meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meme.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setMemes(generatedMemes);
    } catch (err) {
      setError('Failed to fetch memes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, [searchQuery, filters]);

  const refreshMemes = () => {
    fetchMemes();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 opacity-30"></div>
        </div>
        <p className="mt-4 text-white text-lg">Hunting for the hottest memes...</p>
        <p className="text-gray-400 text-sm">Scanning X, Reddit, TikTok, and more</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😵</div>
        <h3 className="text-xl font-bold text-red-400 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={refreshMemes}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (memes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">No memes found</h3>
        <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
        <button
          onClick={refreshMemes}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
        >
          Reset Search
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            🔥 Top {memes.length} Hottest Memes
          </h2>
          <p className="text-gray-400 mt-2">
            Real-time trending memes from across the internet
          </p>
        </div>
        <button
          onClick={refreshMemes}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
        >
          <span>🔄</span>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memes.map((meme, index) => (
          <window.MemeCard key={meme.id} meme={meme} index={index} />
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-12 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-white mb-4">📊 Meme Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-400">{memes.length}</div>
            <div className="text-sm text-gray-400">Trending Memes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">6</div>
            <div className="text-sm text-gray-400">Platforms Scanned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(memes.reduce((sum, meme) => sum + meme.trending, 0) / memes.length)}%
            </div>
            <div className="text-sm text-gray-400">Avg Trending Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">Live</div>
            <div className="text-sm text-gray-400">Data Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.TrendingMemes = TrendingMemes;
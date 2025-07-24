import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [currentPage, setCurrentPage] = useState('page1');

  return (
    <>
      {currentPage === 'page1' && <TellOffPage onNavigate={setCurrentPage} />}
      {currentPage === 'page2' && <CreativeBurnsPage onNavigate={setCurrentPage} />}
    </>
  );
}

function TellOffPage({ onNavigate }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const tellingOffMessages = [
    {
      title: "Really?",
      message: "Did you seriously just do that? I'm not mad, just... disappointed.",
      emoji: "🤦‍♀️",
      severity: "mild"
    },
    {
      title: "OH NO YOU DIDN'T",
      message: "The audacity! The nerve! The absolute unmitigated GALL!",
      emoji: "😤", 
      severity: "medium"
    },
    {
      title: "LISTEN HERE",
      message: "I don't know who needs to hear this, but apparently it's YOU.",
      emoji: "☝️",
      severity: "spicy"
    },
    {
      title: "ABSOLUTELY NOT",
      message: "That behavior is NOT it, chief. Time for some self-reflection.",
      emoji: "🚫",
      severity: "savage"
    },
    {
      title: "THE LION, THE WITCH",
      message: "...and the AUDACITY of this person right here!",
      emoji: "🦁",
      severity: "legendary"
    },
    {
      title: "SIT DOWN",
      message: "Be humble. Seriously. Take several seats and think about what you've done.",
      emoji: "💺",
      severity: "nuclear"
    }
  ];

  const currentMessage = tellingOffMessages[currentMessageIndex];

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'mild':
        return 'from-yellow-400 to-orange-500';
      case 'medium':
        return 'from-orange-500 to-red-500';
      case 'spicy':
        return 'from-red-500 to-pink-500';
      case 'savage':
        return 'from-pink-500 to-purple-600';
      case 'legendary':
        return 'from-purple-600 to-indigo-600';
      case 'nuclear':
        return 'from-red-600 via-red-800 to-black animate-pulse';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getShakeIntensity = (severity) => {
    switch(severity) {
      case 'mild':
        return 'animate-bounce';
      case 'medium':
        return 'animate-pulse';
      case 'spicy':
        return 'animate-shake';
      case 'savage':
        return 'animate-shake-intense';
      case 'legendary':
        return 'animate-wiggle';
      case 'nuclear':
        return 'animate-earthquake';
      default:
        return '';
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };

  const nextMessage = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % tellingOffMessages.length);
    triggerShake();
    
    if (currentMessage.severity === 'legendary' || currentMessage.severity === 'nuclear') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const particles = document.querySelectorAll('.floating-particle');
      particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full opacity-20 animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-white/90">Classic Burns</h2>
          <button
            onClick={() => onNavigate('page2')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
          >
            Creative Burns →
          </button>
        </div>
      </nav>

      {/* Confetti explosion */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8 pt-20 md:pt-24">
        <div className={`max-w-4xl mx-auto text-center ${isShaking ? getShakeIntensity(currentMessage.severity) : ''}`}>
          
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="text-8xl md:text-9xl mb-6 animate-bounce-slow">
              {currentMessage.emoji}
            </div>
            <h1 className={`text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r ${getSeverityStyles(currentMessage.severity)} bg-clip-text text-transparent drop-shadow-2xl tracking-tight`}>
              {currentMessage.title}
            </h1>
            <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
          </div>

          {/* Message box */}
          <div className="glass-morphism-fancy rounded-3xl p-8 md:p-12 mb-8 md:mb-12 backdrop-blur-xl border border-white/20 shadow-2xl">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-wide">
              "{currentMessage.message}"
            </blockquote>
            
            {/* Severity indicator */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-lg text-white/70 font-medium">Severity Level:</span>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      i < tellingOffMessages.indexOf(currentMessage) + 1
                        ? `bg-gradient-to-r ${getSeverityStyles(currentMessage.severity)}`
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getSeverityStyles(currentMessage.severity)} text-white uppercase tracking-wider`}>
                {currentMessage.severity}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <button
              onClick={nextMessage}
              className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl font-bold text-xl md:text-2xl text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">GET TOLD OFF AGAIN</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="group px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg md:text-xl text-white/90 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="group-hover:animate-spin-slow inline-block mr-2">🔄</span>
              Start Over
            </button>
          </div>

          {/* Footer message */}
          <div className="mt-12 md:mt-16">
            <p className="text-lg md:text-xl text-white/70 font-medium italic">
              Remember: this is all in good fun... or is it? 👀
            </p>
            <div className="mt-4 text-sm text-white/50">
              Message {currentMessageIndex + 1} of {tellingOffMessages.length}
            </div>
          </div>

        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/30 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-pink-500/30 to-transparent blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-red-500/10 to-transparent blur-3xl"></div>
    </div>
  );
}

function CreativeBurnsPage({ onNavigate }) {
  const [currentBurnIndex, setCurrentBurnIndex] = useState(0);
  const [isFlaming, setIsFlaming] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const creativeBurns = [
    {
      title: "CHIEF CALLED",
      message: "He said this ain't it. Neither is your entire existence, but here we are.",
      emoji: "📞",
      category: "roast",
      intensity: "sizzling"
    },
    {
      title: "GOOGLE MAPS",
      message: "Even Google Maps couldn't help you find your way to making sense.",
      emoji: "🗺️",
      category: "clever",
      intensity: "smart"
    },
    {
      title: "WIFI PASSWORD",
      message: "Your attitude is like a weak WiFi signal - nobody wants to connect.",
      emoji: "📶",
      category: "modern",
      intensity: "viral"
    },
    {
      title: "NETFLIX & CHILL",
      message: "More like Netflix & Get Some Self-Awareness, because this behavior needs canceling.",
      emoji: "📺",
      category: "pop-culture",
      intensity: "trending"
    },
    {
      title: "BATTERY AT 1%",
      message: "Your common sense is running lower than your phone battery right now.",
      emoji: "🔋",
      category: "relatable",
      intensity: "dead"
    },
    {
      title: "404 ERROR",
      message: "Logic not found. Please try again when your brain is connected.",
      emoji: "💻",
      category: "tech",
      intensity: "critical"
    },
    {
      title: "SPOTIFY WRAPPED",
      message: "Your top genre this year: Complete and Utter Nonsense.",
      emoji: "🎵",
      category: "musical",
      intensity: "remix"
    },
    {
      title: "TIKTOK FAMOUS",
      message: "You'd go viral for all the wrong reasons, and that's saying something.",
      emoji: "📱",
      category: "social",
      intensity: "viral-fail"
    },
    {
      title: "AUTOCORRECT",
      message: "Even autocorrect couldn't fix whatever this mess is supposed to be.",
      emoji: "✏️",
      category: "tech",
      intensity: "glitched"
    },
    {
      title: "UBER CANCELLED",
      message: "Even your ride would cancel on this energy you're bringing.",
      emoji: "🚗",
      category: "lifestyle",
      intensity: "rejected"
    }
  ];

  const currentBurn = creativeBurns[currentBurnIndex];

  const getIntensityStyles = (intensity) => {
    switch(intensity) {
      case 'sizzling':
        return 'from-orange-400 via-red-500 to-orange-600';
      case 'smart':
        return 'from-blue-400 via-cyan-500 to-teal-500';
      case 'viral':
        return 'from-green-400 via-emerald-500 to-green-600';
      case 'trending':
        return 'from-pink-400 via-rose-500 to-pink-600';
      case 'dead':
        return 'from-gray-500 via-slate-600 to-gray-700';
      case 'critical':
        return 'from-red-500 via-red-600 to-red-800 animate-pulse';
      case 'remix':
        return 'from-purple-400 via-violet-500 to-purple-600';
      case 'viral-fail':
        return 'from-yellow-400 via-amber-500 to-orange-600';
      case 'glitched':
        return 'from-indigo-400 via-blue-500 to-indigo-600';
      case 'rejected':
        return 'from-red-400 via-pink-500 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getFlameAnimation = (intensity) => {
    switch(intensity) {
      case 'sizzling':
        return 'animate-flame-dance';
      case 'smart':
        return 'animate-glow-pulse';
      case 'viral':
        return 'animate-viral-spread';
      case 'trending':
        return 'animate-trend-wave';
      case 'dead':
        return 'animate-fade-slow';
      case 'critical':
        return 'animate-critical-alert';
      case 'remix':
        return 'animate-remix-spin';
      case 'viral-fail':
        return 'animate-fail-wobble';
      case 'glitched':
        return 'animate-glitch-shake';
      case 'rejected':
        return 'animate-reject-slide';
      default:
        return '';
    }
  };

  const triggerFlame = () => {
    setIsFlaming(true);
    setTimeout(() => setIsFlaming(false), 1200);
  };

  const nextBurn = () => {
    setCurrentBurnIndex((prev) => (prev + 1) % creativeBurns.length);
    triggerFlame();
    
    if (currentBurn.intensity === 'critical' || currentBurn.intensity === 'viral') {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-25 animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('page1')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
          >
            ← Classic Burns
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-white/90">Creative Burns 🔥</h2>
        </div>
      </nav>

      {/* Fireworks explosion */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 animate-fireworks"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#00f5ff', '#ff1493', '#00ff00', '#ffd700', '#ff4500'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 1.5}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8 pt-20 md:pt-24">
        <div className={`max-w-5xl mx-auto text-center ${isFlaming ? getFlameAnimation(currentBurn.intensity) : ''}`}>
          
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="text-8xl md:text-9xl mb-6 animate-float-random">
              {currentBurn.emoji}
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r ${getIntensityStyles(currentBurn.intensity)} bg-clip-text text-transparent drop-shadow-2xl tracking-tight`}>
              {currentBurn.title}
            </h1>
            
            {/* Category badge */}
            <div className="flex justify-center mb-6">
              <span className={`px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getIntensityStyles(currentBurn.intensity)} text-white uppercase tracking-widest shadow-lg`}>
                {currentBurn.category} BURN
              </span>
            </div>
            
            <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
          </div>

          {/* Message box */}
          <div className="glass-morphism-fancy rounded-3xl p-8 md:p-12 mb-8 md:mb-12 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Background glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${getIntensityStyles(currentBurn.intensity)} opacity-5 rounded-3xl`}></div>
            
            <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed tracking-wide">
              "{currentBurn.message}"
            </blockquote>
            
            {/* Intensity meter */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-lg text-white/70 font-medium">Burn Intensity:</span>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-6 rounded-full transition-all duration-300 ${
                      i < creativeBurns.indexOf(currentBurn) + 1
                        ? `bg-gradient-to-t ${getIntensityStyles(currentBurn.intensity)}`
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getIntensityStyles(currentBurn.intensity)} text-white uppercase tracking-wider shadow-lg`}>
                {currentBurn.intensity}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8">
            <button
              onClick={nextBurn}
              className="group relative px-10 md:px-14 py-4 md:py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl font-bold text-xl md:text-2xl text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">🔥 ROAST ME MORE 🔥</span>
            </button>
            
            <button
              onClick={() => setCurrentBurnIndex(Math.floor(Math.random() * creativeBurns.length))}
              className="group px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg md:text-xl text-white/90 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="group-hover:animate-spin-slow inline-block mr-2">🎲</span>
              Random Burn
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-morphism-fancy rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{currentBurnIndex + 1}</div>
              <div className="text-sm text-white/60">Current</div>
            </div>
            <div className="glass-morphism-fancy rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{creativeBurns.length}</div>
              <div className="text-sm text-white/60">Total Burns</div>
            </div>
            <div className="glass-morphism-fancy rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-white/60">Sass Level</div>
            </div>
            <div className="glass-morphism-fancy rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">💯</div>
              <div className="text-sm text-white/60">Accuracy</div>
            </div>
          </div>

          {/* Footer message */}
          <div className="mt-8">
            <p className="text-lg md:text-xl text-white/70 font-medium italic">
              Modern problems require modern solutions... and modern roasts 🔥
            </p>
            <div className="mt-4 text-sm text-white/50">
              Burn {currentBurnIndex + 1} of {creativeBurns.length} • Category: {currentBurn.category}
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced ambient effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-500/30 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/30 to-transparent blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/15 to-transparent blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-purple-500/15 to-transparent blur-3xl"></div>
    </div>
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);
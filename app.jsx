import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function TellOffPage() {
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
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

createRoot(document.getElementById('renderDiv')).render(<TellOffPage />);
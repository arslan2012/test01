import React, { useState, useRef, useEffect } from 'react';

function TalkingTom() {
  const [catState, setCatState] = useState('idle'); // idle, talking, happy, eating, sleeping
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const recordedAudioRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    // Decay stats over time
    const timer = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;
      if (timeSinceInteraction > 5000) { // After 5 seconds of no interaction
        setHunger(prev => Math.max(0, prev - 0.1));
        setHappiness(prev => Math.max(0, prev - 0.1));
        setEnergy(prev => Math.max(0, prev - 0.1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastInteraction]);

  // Auto change cat state based on stats
  useEffect(() => {
    if (energy < 20) {
      setCatState('sleeping');
    } else if (catState === 'sleeping' && energy > 30) {
      setCatState('idle');
    }
  }, [energy]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        recordedAudioRef.current = audioBlob;
        setHasRecording(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setCatState('talking');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to record your voice!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setCatState('idle');
    }
  };

  const playRecording = async () => {
    if (!recordedAudioRef.current) return;

    setCatState('talking');
    setLastInteraction(Date.now());
    
    try {
      // Create audio element and play with pitch shift
      const audioUrl = URL.createObjectURL(recordedAudioRef.current);
      const audio = new Audio(audioUrl);
      
      // Simple pitch shift by changing playback rate
      audio.playbackRate = 1.5; // Higher pitch like Tom
      audio.preservesPitch = false;
      
      audio.onended = () => {
        setCatState('happy');
        setHappiness(prev => Math.min(100, prev + 20));
        setTimeout(() => setCatState('idle'), 2000);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setCatState('idle');
    }
  };

  const petCat = () => {
    setCatState('happy');
    setHappiness(prev => Math.min(100, prev + 15));
    setEnergy(prev => Math.min(100, prev + 5));
    setLastInteraction(Date.now());
    
    setTimeout(() => setCatState('idle'), 1500);
  };

  const feedCat = () => {
    if (hunger < 90) {
      setCatState('eating');
      setHunger(prev => Math.min(100, prev + 30));
      setHappiness(prev => Math.min(100, prev + 10));
      setLastInteraction(Date.now());
      
      setTimeout(() => setCatState('idle'), 2000);
    }
  };

  const putToSleep = () => {
    setCatState('sleeping');
    setEnergy(prev => Math.min(100, prev + 40));
    setLastInteraction(Date.now());
  };

  const wakeUp = () => {
    if (catState === 'sleeping') {
      setCatState('idle');
      setLastInteraction(Date.now());
    }
  };

  const getCatExpression = () => {
    switch (catState) {
      case 'talking':
        return 'animate-bounce';
      case 'happy':
        return 'animate-pulse';
      case 'eating':
        return 'animate-bounce';
      case 'sleeping':
        return 'opacity-70 grayscale';
      default:
        return '';
    }
  };

  const getStatColor = (value) => {
    if (value > 60) return 'bg-green-500';
    if (value > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 flex flex-col items-center justify-center p-4">
      {/* Background floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-pink-300/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-300/25 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Talking Tom
        </h1>

        {/* Stats */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-white font-semibold">Hunger</div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatColor(hunger)} transition-all duration-500`}
                  style={{width: `${hunger}%`}}
                ></div>
              </div>
              <div className="text-white/80 text-sm">{Math.round(hunger)}%</div>
            </div>
            <div className="space-y-2">
              <div className="text-white font-semibold">Happiness</div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatColor(happiness)} transition-all duration-500`}
                  style={{width: `${happiness}%`}}
                ></div>
              </div>
              <div className="text-white/80 text-sm">{Math.round(happiness)}%</div>
            </div>
            <div className="space-y-2">
              <div className="text-white font-semibold">Energy</div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatColor(energy)} transition-all duration-500`}
                  style={{width: `${energy}%`}}
                ></div>
              </div>
              <div className="text-white/80 text-sm">{Math.round(energy)}%</div>
            </div>
          </div>
        </div>

        {/* Cat Character */}
        <div className="relative mb-8">
          <div 
            className={`mx-auto w-64 h-64 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${getCatExpression()} border border-white/30`}
            onClick={catState === 'sleeping' ? wakeUp : petCat}
          >
            <img 
              src="/assets/tom-cat.webp" 
              alt="Tom Cat" 
              className="w-48 h-48 object-contain drop-shadow-lg"
            />
          </div>
          
          {/* State indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold text-purple-600 border border-white/50">
              {catState === 'idle' && '😺 Ready to play!'}
              {catState === 'talking' && '🗣️ Talking...'}
              {catState === 'happy' && '😸 Happy!'}
              {catState === 'eating' && '🍽️ Eating...'}
              {catState === 'sleeping' && '😴 Sleeping...'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Record Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={catState === 'sleeping'}
            className={`bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isRecording ? 'animate-pulse bg-red-500/30' : ''}`}
          >
            <img src="/assets/microphone.webp" alt="Microphone" className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm">
              {isRecording ? 'Stop' : 'Record'}
            </div>
          </button>

          {/* Play Button */}
          <button
            onClick={playRecording}
            disabled={!hasRecording || catState === 'sleeping' || catState === 'talking'}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent"></div>
            </div>
            <div className="text-sm">Play</div>
          </button>

          {/* Feed Button */}
          <button
            onClick={feedCat}
            disabled={catState === 'sleeping' || hunger > 90}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/assets/food-bowl.webp" alt="Food Bowl" className="w-8 h-8 mx-auto mb-2" />
            <div className="text-sm">Feed</div>
          </button>

          {/* Sleep/Wake Button */}
          <button
            onClick={catState === 'sleeping' ? wakeUp : putToSleep}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/30 hover:scale-105"
          >
            <div className="text-2xl mb-2">{catState === 'sleeping' ? '☀️' : '🌙'}</div>
            <div className="text-sm">
              {catState === 'sleeping' ? 'Wake' : 'Sleep'}
            </div>
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
          <h3 className="text-white font-semibold mb-2">How to play:</h3>
          <div className="text-white/90 text-sm space-y-1">
            <div>• Click Tom to pet him and make him happy</div>
            <div>• Record your voice and Tom will repeat it in his cute voice</div>
            <div>• Feed Tom when he's hungry</div>
            <div>• Put Tom to sleep when his energy is low</div>
            <div>• Keep Tom happy and healthy by interacting regularly!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.TalkingTom = TalkingTom;
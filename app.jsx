import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [basename, setBasename] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const basePath = path.substring(0, path.lastIndexOf('/'));
    setBasename(basePath);

    const checkDependencies = () => {
      if (
        window.Home &&
        window.MemeCard &&
        window.MemeSearch &&
        window.TrendingMemes
      ) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
        <p className="mt-4 text-white text-lg">Loading MemeHunter...</p>
      </div>
    );
  }

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<window.Home />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);
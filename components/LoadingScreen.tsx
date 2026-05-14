'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 1 second or when page is ready
    const timer = setTimeout(() => setIsVisible(false), 1000);
    window.addEventListener('load', () => setIsVisible(false));
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-[#A63B5C] to-[#6B1528]">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Logo/Text */}
        <div className="space-y-2">
          <h1 className="animate-pulse text-5xl font-bold text-white">Anjali Boutique</h1>
          <p className="text-lg text-white/80">Elegant Fashion Loading...</p>
        </div>

        {/* Loading Animation */}
        <div className="relative h-2 w-48 rounded-full bg-white/20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

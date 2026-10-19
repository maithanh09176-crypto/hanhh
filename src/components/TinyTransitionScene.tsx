import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { TINY_TRANSITION_MESSAGES } from '../data/romanticGifts';

interface TinyTransitionSceneProps {
  onTransitionComplete: () => void;
}

export const TinyTransitionScene: React.FC<TinyTransitionSceneProps> = ({
  onTransitionComplete,
}) => {
  const [step, setStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const messages = TINY_TRANSITION_MESSAGES;

  const handleNext = () => {
    if (isFadingOut) return;
    if (step < messages.length - 1) {
      setStep(step + 1);
    } else {
      // Tiny farewell animation: gentle wave, sparkling rose light and seamless twilight fade out
      setIsFadingOut(true);
      setTimeout(() => {
        onTransitionComplete();
      }, 1800);
    }
  };

  return (
    <div
      data-testid="tiny-farewell-container"
      onClick={handleNext}
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center p-4 cursor-pointer select-none transition-all duration-1000 ${
        isFadingOut
          ? 'bg-gradient-to-b from-[#0a0508] via-[#120710] to-[#1a0815] pointer-events-none'
          : 'bg-black/90'
      }`}
    >
      {/* Rose petals and sparkles appearing as Tiny bids farewell (Section 3.1) */}
      {isFadingOut && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden animate-fade-in">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-rose-600/15 rounded-full blur-[100px] animate-pulse" />
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-300 text-lg opacity-80 animate-bounce"
              style={{
                top: `${(i * 19) % 85}%`,
                left: `${(i * 29) % 90}%`,
                animationDuration: `${2 + (i % 3)}s`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      {/* Tiny's glowing character avatar for farewell */}
      <div
        className={`flex flex-col items-center transition-all duration-1000 ${
          isFadingOut ? 'scale-75 opacity-0 blur-lg' : 'scale-100 opacity-100'
        }`}
      >
        {/* Tiny Eyes Container & Expression */}
        <div className="relative w-48 h-28 flex items-center justify-center gap-7 mb-8">
          {/* Left Eye */}
          <div className="w-16 h-16 rounded-2xl bg-cyan-400 shadow-[0_0_35px_#00e5ff] relative flex items-center justify-center animate-pulse">
            {step === 0 && (
              <span className="text-2xl font-bold text-zinc-950 font-mono">O</span>
            )}
            {step === 1 && (
              <span className="text-xl font-bold text-zinc-950 font-mono">*</span>
            )}
            {step === 2 && (
              <span className="text-2xl font-bold text-zinc-950 font-mono">^</span>
            )}
          </div>

          {/* Right Eye */}
          <div className="w-16 h-16 rounded-2xl bg-cyan-400 shadow-[0_0_35px_#00e5ff] relative flex items-center justify-center animate-pulse">
            {step === 0 && (
              <span className="text-2xl font-bold text-zinc-950 font-mono">O</span>
            )}
            {step === 1 && (
              <span className="text-xl font-bold text-zinc-950 font-mono">*</span>
            )}
            {step === 2 && (
              <span className="text-2xl font-bold text-zinc-950 font-mono">~</span>
            )}
          </div>

          {/* Tiny Blushing Cheeks */}
          <div className="absolute -bottom-3 left-6 text-rose-400 text-xs font-mono select-none drop-shadow">
            ////
          </div>
          <div className="absolute -bottom-3 right-6 text-rose-400 text-xs font-mono select-none drop-shadow">
            ////
          </div>

          {/* Tiny's waving hand in final farewell step */}
          {step === 2 && (
            <div className="absolute -right-8 top-2 text-2xl animate-bounce">
              👋
            </div>
          )}
        </div>

        {/* Message bubble */}
        <div className="max-w-xl text-center px-6 py-4 rounded-3xl bg-zinc-950/85 border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 backdrop-blur-md">
          <p
            data-testid="tiny-farewell-text"
            className="text-lg sm:text-2xl text-cyan-100 font-mono font-medium leading-relaxed drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
          >
            {messages[step]}
          </p>
        </div>

        {/* Subtle step hint */}
        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400 font-sans bg-zinc-900/60 px-4 py-1.5 rounded-full border border-zinc-800">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>
            {step < messages.length - 1 ? 'Chạm để nghe Tiny nói tiếp' : 'Chạm để tạm biệt Tiny...'}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlHUDProps {
  currentScene: number;
  onPrev: () => void;
  onNext: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  showNavigation: boolean;
}

export const ControlHUD: React.FC<ControlHUDProps> = ({
  currentScene,
  onPrev,
  onNext,
  isAudioPlaying,
  onToggleAudio,
  showNavigation,
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 sm:p-5 select-none font-sans">
      
      {/* Top Floating Bar: Minimalist Sound Toggle */}
      <div className="flex items-center justify-end w-full pointer-events-auto">
        {/* Audio control button */}
        <button
          type="button"
          onClick={onToggleAudio}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg active:scale-90 ${
            isAudioPlaying
              ? 'bg-rose-500/20 border-rose-400/50 text-rose-300 hover:bg-rose-500/30 shadow-rose-950/40'
              : 'bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:text-white'
          }`}
          title={isAudioPlaying ? 'Tắt / Dừng nhạc nền' : 'Bật nhạc nền'}
          aria-label="Điều khiển âm thanh"
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Floating Navigation (Only active during Tiny's story scenes) */}
      {showNavigation && (
        <div className="flex flex-col items-center gap-1.5 pointer-events-auto max-w-xs mx-auto w-full">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-lg shadow-2xl text-xs text-zinc-300">
            <button
              type="button"
              onClick={onPrev}
              disabled={currentScene <= 0}
              className="p-1 rounded-full hover:bg-zinc-800 disabled:opacity-20 text-zinc-300 hover:text-white transition active:scale-90"
              title="Cảnh trước"
              aria-label="Cảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-[11px] text-zinc-400">
              {currentScene + 1} / 12
            </span>

            <button
              type="button"
              onClick={onNext}
              className="p-1 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white transition active:scale-90"
              title="Cảnh tiếp theo"
              aria-label="Cảnh tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-zinc-400/70 bg-zinc-950/50 px-3 py-0.5 rounded-full backdrop-blur-sm pointer-events-none">
            Chạm vào màn hình để tiếp tục
          </div>
        </div>
      )}
    </div>
  );
};

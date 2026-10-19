import React, { useState } from 'react';
import {
  EM_PHOTOS,
  ALBUM_WISHES,
  FINAL_CLIMAX_MESSAGES,
} from '../data/romanticGifts';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Image as ImageIcon } from 'lucide-react';

interface FinalAlbumSceneProps {
  onReplayBouquet?: () => void;
  onReplayAll?: () => void;
}

export const FinalAlbumScene: React.FC<FinalAlbumSceneProps> = ({
  onReplayBouquet,
  onReplayAll,
}) => {
  // Current paragraph index (0 to 5, where 5 is the final climax)
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);

  const isFinalClimax = currentSection === 5;
  const isFocusedReading = currentSection === 3; // Section 4 dims effects to focus on emotional reading

  const handleNextSection = () => {
    if (currentSection < 5) {
      setCurrentSection((prev) => prev + 1);
      // Auto select matching photo if defined
      if (currentSection + 1 < ALBUM_WISHES.length) {
        const photo = ALBUM_WISHES[currentSection + 1].featuredPhoto;
        const pIndex = EM_PHOTOS.indexOf(photo);
        if (pIndex !== -1) setSelectedPhotoIndex(pIndex);
      } else {
        const pIndex = EM_PHOTOS.indexOf(FINAL_CLIMAX_MESSAGES.featuredPhoto);
        if (pIndex !== -1) setSelectedPhotoIndex(pIndex);
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 bg-gradient-to-b from-stone-950 via-zinc-950 to-rose-950/90 text-stone-100 select-none overflow-y-auto">
      
      {/* Background Ambience (Dimmed in Section 4 for emotional focus) */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
          isFocusedReading ? 'opacity-20' : 'opacity-70'
        }`}
      >
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-[1px] animate-pulse"
            style={{
              width: `${(i % 3) * 4 + 4}px`,
              height: `${(i % 3) * 4 + 4}px`,
              top: `${(i * 23) % 90}%`,
              left: `${(i * 31) % 90}%`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Top Header Badge */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between pb-2 border-b border-rose-500/20 pt-12 sm:pt-0">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="text-xs sm:text-sm font-serif italic text-rose-200">
            Món quà gửi riêng Em • Ngày Phụ Nữ Việt Nam 20/10
          </span>
        </div>
        <div className="text-[11px] font-mono text-rose-400/80">
          Đoạn {Math.min(currentSection + 1, 6)} / 6
        </div>
      </div>

      {/* Main Content Area: Featured Photo + Heartfelt Letter */}
      <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 py-4 my-auto">
        
        {/* Left / Center: Elegant Photo Frame */}
        <div className="w-full md:w-5/12 flex flex-col items-center">
          <div
            onClick={() => setShowPhotoModal(true)}
            className="relative group cursor-pointer rounded-2xl p-2 bg-gradient-to-b from-stone-200/90 to-stone-100 border border-white shadow-2xl shadow-rose-950/70 transform transition duration-500 hover:scale-102"
          >
            <div className="w-56 sm:w-64 h-72 sm:h-80 overflow-hidden rounded-xl bg-zinc-900">
              <img
                src={EM_PHOTOS[selectedPhotoIndex] || EM_PHOTOS[0]}
                alt="Ảnh Em"
                className="w-full h-full object-cover select-none transition duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="pt-2 pb-1 text-center flex items-center justify-center gap-1 text-[11px] font-serif text-stone-700 italic">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Dành cho Em — 20/10</span>
            </div>
          </div>

          {/* Mini Photo Strip */}
          <div className="flex gap-1.5 mt-3 overflow-x-auto max-w-[280px] sm:max-w-xs pb-1 scrollbar-none">
            {EM_PHOTOS.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md overflow-hidden border transition shrink-0 ${
                  selectedPhotoIndex === idx
                    ? 'border-rose-400 ring-2 ring-rose-400/50 scale-105'
                    : 'border-stone-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Right / Center: Love Letter Content */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">
          <div className="p-5 sm:p-7 rounded-3xl bg-zinc-950/75 border border-rose-500/30 backdrop-blur-md shadow-2xl shadow-rose-950/40 space-y-4">
            
            {/* Section 1 to 5 */}
            {currentSection < 5 && (
              <div className="space-y-3.5 animate-fade-in">
                <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{ALBUM_WISHES[currentSection].title}</span>
                </div>
                {ALBUM_WISHES[currentSection].lines.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-base sm:text-lg text-rose-100/95 font-serif italic leading-relaxed"
                  >
                    "{line}"
                  </p>
                ))}
              </div>
            )}

            {/* Final Climax (Section 5) */}
            {isFinalClimax && (
              <div className="space-y-4 animate-fade-in">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" /> Lời chúc sau cùng gửi Em
                </div>
                
                <p className="text-base sm:text-xl text-rose-100 font-serif italic leading-relaxed">
                  "{FINAL_CLIMAX_MESSAGES.part1}"
                </p>

                <div className="pt-2 border-t border-rose-500/20">
                  <p className="text-lg sm:text-2xl text-rose-200 font-serif italic font-medium leading-relaxed drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    "{FINAL_CLIMAX_MESSAGES.part2}"
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-rose-300/80 font-sans">
                  <span>Gửi người...</span>
                  <span className="font-serif italic text-sm text-rose-200 font-bold">
                    Thương mến, Thành ❤️
                  </span>
                </div>
              </div>
            )}

            {/* Step navigation controls */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                data-testid="album-prev-button"
                type="button"
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Đoạn trước
              </button>

              {currentSection < 5 ? (
                <button
                  data-testid="album-next-button"
                  type="button"
                  onClick={handleNextSection}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-1.5 transition active:scale-95"
                >
                  <span>Đọc tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {onReplayBouquet && (
                    <button
                      data-testid="album-replay-bouquet"
                      type="button"
                      onClick={onReplayBouquet}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-200 shadow transition active:scale-95 flex items-center gap-1"
                    >
                      Trở về bó💐 
                    </button>
                  )}
                  {onReplayAll && (
                    <button
                      data-testid="album-replay-all"
                      type="button"
                      onClick={onReplayAll}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 shadow transition active:scale-95 flex items-center gap-1"
                    >
                      ✨ Xem từ đầu
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Modal Viewer */}
      {showPhotoModal && (
        <div
          onClick={() => setShowPhotoModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-lg max-h-[85vh] p-2 bg-white rounded-2xl shadow-2xl">
            <img
              src={EM_PHOTOS[selectedPhotoIndex]}
              alt="Ảnh Em phóng to"
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center py-2 text-stone-800 text-xs font-serif italic">
              Chạm bất kỳ đâu để đóng lại
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div className="relative z-10 w-full text-center pt-2">
        <p className="text-[11px] text-stone-500 font-sans">
          Chúc Em một ngày 20/10 ngập tràn niềm vui và bình yên ✨
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GreetingSettings } from '../utils/greetingConfig';
import { Heart, Sparkles, X, Copy, Check, Share2 } from 'lucide-react';

interface PersonalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GreetingSettings;
  onOpenCustomizer: () => void;
}

export const PersonalCardModal: React.FC<PersonalCardModalProps> = ({
  isOpen,
  onClose,
  settings,
  onOpenCustomizer,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const fullText = `💐 Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10!\n\nGửi tặng: ${settings.recipient}\n\n${settings.customLetter}\n\nThương mến,\n${settings.sender}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-stone-900 via-zinc-900 to-stone-950 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/40 text-stone-100 overflow-hidden">
        
        {/* Glow & decorative lights */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-wide">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Ngày Phụ Nữ Việt Nam 20/10
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-rose-200 pt-2">
            Gửi {settings.recipient} Thân Thương
          </h2>
          <p className="text-xs text-stone-400">
            Món quà gửi gắm từ trái tim của {settings.sender}
          </p>
        </div>

        {/* Card letter body */}
        <div className="relative p-5 sm:p-6 bg-stone-900/60 border border-stone-800/80 rounded-2xl shadow-inner backdrop-blur-sm space-y-4">
          <div className="text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif italic">
            "{settings.customLetter}"
          </div>

          <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400 font-sans">
            <div>
              <span className="text-stone-500">Người gửi: </span>
              <span className="text-rose-300 font-semibold">{settings.sender}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400/90">
              <Sparkles className="w-3.5 h-3.5" /> 20 Tháng 10
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenCustomizer}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
          >
            Chỉnh sửa lời chúc ⚙️
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Đã sao chép!' : 'Sao chép lời chúc'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

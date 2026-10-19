import React, { useState } from 'react';
import {
  GreetingSettings,
  GREETING_PRESETS,
  DEFAULT_GREETING_SETTINGS,
  SCENES,
  encodeGreetingParams,
} from '../utils/greetingConfig';
import {
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Volume2,
  Heart,
  Music,
  Eye,
  X,
  Share2,
  Clock,
  Send,
  HelpCircle,
} from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GreetingSettings;
  onSave: (newSettings: GreetingSettings) => void;
  onReset: () => void;
  currentScene: number;
  onJumpToScene: (index: number) => void;
  onOpenCard: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onReset,
  currentScene,
  onJumpToScene,
  onOpenCard,
}) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'wishes' | 'scenes' | 'audio'>('basics');
  const [copied, setCopied] = useState(false);
  const [showAdvancedHelp, setShowAdvancedHelp] = useState(false);

  if (!isOpen) return null;

  const handleApplyPreset = (presetId: string) => {
    const preset = GREETING_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    onSave({
      ...settings,
      ...preset.settings,
    });
  };

  const handleCopyShareLink = async () => {
    const query = encodeGreetingParams(settings);
    const origin = window.location.origin;
    const path = window.location.pathname;
    const shareUrl = `${origin}${path}${query ? '?' + query : ''}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-zinc-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Tùy Chỉnh Lời Chúc 20/10 <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-zinc-400">
                Điều chỉnh tên, xưng hô, từng câu chúc và tạo link gửi tặng riêng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Đóng bảng tùy chỉnh"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset quick pills */}
        <div className="px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/30">
          <div className="text-xs font-medium text-zinc-400 mb-2 flex items-center justify-between">
            <span>Mẫu lời chúc nhanh:</span>
            <span className="text-[11px] text-cyan-400">Chọn 1 mẫu để điền tự động</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GREETING_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-700/80 bg-zinc-800/60 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition-all shrink-0 active:scale-95"
              >
                <span>{preset.emoji}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 px-5 gap-4">
          <button
            onClick={() => setActiveTab('basics')}
            className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'basics'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            1. Tên & Người nhận
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'wishes'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            2. Chi tiết Lời chúc
          </button>
          <button
            onClick={() => setActiveTab('scenes')}
            className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'scenes'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            3. Xem trước Cảnh
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'audio'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            4. Nhạc & Tự động
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                    Người gửi (Tên của bạn)
                  </label>
                  <input
                    type="text"
                    value={settings.sender}
                    onChange={(e) => onSave({ ...settings, sender: e.target.value })}
                    placeholder="VD: Anh, Tuấn, Dr D, Tớ..."
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    Xuất hiện ở câu: "Hôm nay tớ nhận lệnh từ {settings.sender || '...'} là để..."
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                    Người nhận (Tên người được tặng)
                  </label>
                  <input
                    type="text"
                    value={settings.recipient}
                    onChange={(e) =>
                      onSave({
                        ...settings,
                        recipient: e.target.value,
                        pronoun: e.target.value,
                      })
                    }
                    placeholder="VD: Em, Linh, Vy, Mẹ yêu, Cô giáo..."
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    Thay thế cho từ "cậu" trong toàn bộ câu chuyện và lời chúc
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Thư ngỏ / Lời chúc riêng (Hiển thị ở trang thiệp cuối)</span>
                  <button
                    type="button"
                    onClick={onOpenCard}
                    className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <Heart className="w-3 h-3" /> Xem thiệp mẫu
                  </button>
                </label>
                <textarea
                  rows={4}
                  value={settings.customLetter}
                  onChange={(e) => onSave({ ...settings, customLetter: e.target.value })}
                  placeholder="Viết một đoạn thư tình cảm, lời tâm sự hoặc chúc mừng dành riêng cho người nhận..."
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
                />
              </div>

              {/* Share link quick box */}
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-cyan-400" /> Chia sẻ bản đã tùy chỉnh
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Link này tự động lưu tên người gửi, người nhận và lời chúc của bạn!
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md shrink-0 active:scale-95 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Đã sao chép link!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Sao chép link gửi tặng
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wishes' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Tùy chỉnh nội dung từng câu nói của Robot Tiny:
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdvancedHelp(!showAdvancedHelp)}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Hướng dẫn
                </button>
              </div>

              {showAdvancedHelp && (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300">
                  Mẹo: Bạn có thể nhập <code className="text-cyan-300">{"{recipient}"}</code> hoặc{' '}
                  <code className="text-cyan-300">{"{sender}"}</code> để hệ thống tự động điền tên người nhận/gửi tương ứng.
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 0: Lời gọi ban đầu
                  </label>
                  <input
                    type="text"
                    value={settings.openingText}
                    onChange={(e) => onSave({ ...settings, openingText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 3: Khen ngợi người nhận
                  </label>
                  <input
                    type="text"
                    value={settings.complimentText}
                    onChange={(e) => onSave({ ...settings, complimentText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 6: Lời chúc sức khỏe
                  </label>
                  <input
                    type="text"
                    value={settings.wishHealthText}
                    onChange={(e) => onSave({ ...settings, wishHealthText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 7: Lời chúc xinh đẹp
                  </label>
                  <input
                    type="text"
                    value={settings.wishBeautyText}
                    onChange={(e) => onSave({ ...settings, wishBeautyText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 8: Lời chúc nụ cười
                  </label>
                  <input
                    type="text"
                    value={settings.wishSmileText}
                    onChange={(e) => onSave({ ...settings, wishSmileText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 9: Trao tặng ngọn cỏ 4 lá
                  </label>
                  <input
                    type="text"
                    value={settings.cloverText}
                    onChange={(e) => onSave({ ...settings, cloverText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">
                    Cảnh 11: Lời chúc may mắn
                  </label>
                  <input
                    type="text"
                    value={settings.wishLuckText}
                    onChange={(e) => onSave({ ...settings, wishLuckText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scenes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">
                  Nhấn vào bất kỳ cảnh nào để nhảy trực tiếp đến cảnh đó (không cần chờ):
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  Đang ở Cảnh: {currentScene} / 13
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
                {SCENES.map((scene) => (
                  <button
                    key={scene.index}
                    onClick={() => {
                      onJumpToScene(scene.index);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all text-xs ${
                      currentScene === scene.index
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{scene.emoji}</span>
                      <div>
                        <div className="font-semibold text-white">
                          {scene.index}. {scene.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate max-w-[170px]">
                          {scene.subText}
                        </div>
                      </div>
                    </div>
                    <Eye className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <Music className="w-4 h-4 text-cyan-400" /> Âm lượng nhạc nền
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {Math.round(settings.musicVolume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.musicVolume}
                  onChange={(e) => onSave({ ...settings, musicVolume: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> Tự động chuyển cảnh (Auto-Play)
                  </span>
                  <span className="text-xs font-mono text-amber-400">
                    {settings.autoPlayInterval === 0
                      ? 'Thủ công (Click)'
                      : `${settings.autoPlayInterval} giây / cảnh`}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { label: 'Tắt (Click)', val: 0 },
                    { label: 'Nhanh (3s)', val: 3 },
                    { label: 'Vừa (5s)', val: 5 },
                    { label: 'Thong thả (8s)', val: 8 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => onSave({ ...settings, autoPlayInterval: opt.val })}
                      className={`py-2 px-2 rounded-lg font-medium border text-center transition ${
                        settings.autoPlayInterval === opt.val
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400">
                Nhạc nền mặc định là giai điệu piano ngọt ngào hòa âm cùng hiệu ứng lyric xuất hiện đúng nhịp câu chúc.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Khôi phục mặc định
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              Sao chép link
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-zinc-950 transition font-bold shadow-lg shadow-cyan-500/20"
            >
              Hoàn tất & Thưởng thức
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

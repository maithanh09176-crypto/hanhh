import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BOUQUET_IMAGE,
  EM_PHOTOS,
  BOUQUET_INTRO_MESSAGES,
  DLOVE_SHORT_WISHES,
  DLOVE_LETTER_CONTENT,
} from '../data/romanticGifts';
import { Sparkles, Heart, Mail, RotateCcw, X, Flower2, Play, Pause, RefreshCw } from 'lucide-react';

interface BouquetSceneProps {
  onReplayAll?: () => void;
  onViewAlbum?: () => void;
}

type BouquetPhase =
  | 'intro-0'
  | 'intro-1'
  | 'single-bouquet'
  | 'bouquet-revealed'
  | 'untying'
  | 'floating-3d';

// Controlled positions on top of the bouquet (nestled inside the flower blossom center)
interface OverlayPhoto {
  id: number;
  src: string;
  topPercent: number;
  leftPercent: number;
  rotation: number;
  scale: number;
  width: number | string;
  delayMs: number;
}

// 3D Carousel Item (Photo or Wish alternating around 360°)
type OrbitItemType = 'photo' | 'wish';

interface OrbitItem {
  id: number;
  type: OrbitItemType;
  angle: number; // Angle in degrees (0 to 360)
  yOffset: number; // Vertical offset in px
  src?: string; // For photo items
  wishText?: string; // For wish items
}

export const BouquetScene: React.FC<BouquetSceneProps> = ({ onReplayAll, onViewAlbum }) => {
  const [phase, setPhase] = useState<BouquetPhase>('intro-0');
  const [isBowHovered, setIsBowHovered] = useState<boolean>(false);
  const [showLetter, setShowLetter] = useState<boolean>(false);
  const [selectedZoomPhoto, setSelectedZoomPhoto] = useState<string | null>(null);

  // 3D 360-degree Orbit State
  const [rotY, setRotY] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(-4);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [orbitRadius, setOrbitRadius] = useState<number>(360);

  // Drag interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startRotY: number; startRotX: number; distance: number }>({
    x: 0,
    y: 0,
    startRotY: 0,
    startRotX: 0,
    distance: 0,
  });
  const autoRotateReqRef = useRef<number | null>(null);

  // Adjust 3D orbit radius based on viewport size
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setOrbitRadius(315);
      } else if (w < 768) {
        setOrbitRadius(385);
      } else {
        setOrbitRadius(495);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

// 1. 6 Polaroid photos: Đã căn chỉnh đối xứng 100% trục dọc, tỷ lệ linh hoạt cho Mobile (Mobile-first)
  const bouquetOverlayPhotos: OverlayPhoto[] = useMemo(() => {
    return [
      // 1. Top-Center (anh6): Ở giữa đỉnh
      {
        id: 0,
        src: '/images/create/anh6.jpg',
        topPercent: 16,
        leftPercent: 50, 
        rotation: 0,
        scale: 1.0,
        width: '32%', // Thay vì dùng px, dùng % để tự co giãn trên đt
        delayMs: 150,
      },
      // 2. Top-Left (anh9): Đối xứng bên trái
      {
        id: 1,
        src: '/images/create/anh9.jpg',
        topPercent: 20,
        leftPercent: 26, 
        rotation: -10,
        scale: 0.95,
        width: '32%',
        delayMs: 300,
      },
      // 3. Top-Right (anh7): Đối xứng bên phải
      {
        id: 2,
        src: '/images/create/anh7.jpg',
        topPercent: 20,
        leftPercent: 74, 
        rotation: 10,
        scale: 0.95,
        width: '32%',
        delayMs: 450,
      },
      // 4. Mid-Left (anh17): Xòe ngang bên trái
      {
        id: 3,
        src: '/images/create/anh17.jpg',
        topPercent: 38,
        leftPercent: 21, 
        rotation: -15,
        scale: 1.0,
        width: '34%',
        delayMs: 600,
      },
      // 5. Mid-Right (anh8): Xòe ngang bên phải
      {
        id: 4,
        src: '/images/create/anh8.jpg',
        topPercent: 38,
        leftPercent: 79, 
        rotation: 15,
        scale: 1.0,
        width: '34%',
        delayMs: 750,
      },
      // 6. Mid-Center HERO (anh16): Trực diện trung tâm, to nhất
      {
        id: 5,
        src: '/images/create/anh16.jpg',
        topPercent: 42,
        leftPercent: 50, 
        rotation: 0,
        scale: 1.08,
        width: '38%',
        delayMs: 900,
      },
    ];
  }, []);

  // 2. 3D Space: 24 Items (12 Photos + 12 Wishes) Alternating around 360° Cylinder
  const orbitItems: OrbitItem[] = useMemo(() => {
    const photos = EM_PHOTOS.slice(0, 12);
    const wishes = [
      ...DLOVE_SHORT_WISHES,
      'Yêu thương & Trân trọng Em ❤️', // 12th finale wish
    ].slice(0, 12);

    const items: OrbitItem[] = [];
    const totalItems = 24;
    const angleStep = 360 / totalItems; // 15 degrees per step

    // Alternating vertical rhythm
    const yOffsets = [
      -45, 35, -20, 50, -55, 25, -35, 45, -60, 20, -25, 40,
      -50, 30, -30, 55, -40, 25, -55, 35, -20, 45, -45, 30,
    ];

    for (let i = 0; i < totalItems; i++) {
      const angle = i * angleStep;
      const isPhoto = i % 2 === 0;
      const itemIndex = Math.floor(i / 2);

      if (isPhoto) {
        items.push({
          id: i,
          type: 'photo',
          angle,
          yOffset: yOffsets[i],
          src: photos[itemIndex % photos.length],
        });
      } else {
        items.push({
          id: i,
          type: 'wish',
          angle,
          yOffset: yOffsets[i],
          wishText: wishes[itemIndex % wishes.length],
        });
      }
    }

    return items;
  }, []);

  // Continuous Auto-rotation loop around Y-axis
  useEffect(() => {
    if (phase !== 'floating-3d') return;

    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isDraggingRef.current && isAutoRotate) {
        setRotY((prev) => (prev + (delta * 0.018)) % 360);
      }
      autoRotateReqRef.current = requestAnimationFrame(animate);
    };

    autoRotateReqRef.current = requestAnimationFrame(animate);

    return () => {
      if (autoRotateReqRef.current) {
        cancelAnimationFrame(autoRotateReqRef.current);
      }
    };
  }, [phase, isAutoRotate]);

  // Pointer Drag Handlers for 360° 3D Orbit Space
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'floating-3d') return;
    // Don't capture drag if clicking buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[data-no-drag="true"]')) {
      return;
    }

    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotY: rotY,
      startRotX: rotX,
      distance: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current.distance = Math.hypot(dx, dy);

    // Sensitivities for smooth drag rotation
    const newRotY = dragStartRef.current.startRotY + dx * 0.35;
    const newRotX = Math.max(-24, Math.min(22, dragStartRef.current.startRotX - dy * 0.2));

    setRotY(newRotY);
    setRotX(newRotX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Intro sequential progression
  const handleNextIntro = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (phase === 'intro-0') {
      setPhase('intro-1');
    } else if (phase === 'intro-1') {
      setPhase('single-bouquet');
    }
  };

  const handleTouchBouquet = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (phase === 'single-bouquet') {
      setPhase('bouquet-revealed');
    }
  };

  // Ribbon knot touch -> Untie -> Enter 360° 3D space
  const handleTouchBow = (e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (phase === 'bouquet-revealed') {
      setPhase('untying');
      setTimeout(() => {
        setPhase('floating-3d');
      }, 1100);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#12070e] via-[#1c0b15] to-[#0a0307] text-white flex flex-col items-center justify-between p-3 sm:p-5 select-none overflow-hidden">
      
      {/* Ambient background glow & soft floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[550px] bg-rose-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[60vw] max-w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      {/* TOP STATUS BAR: ONLY ANH'S VOICE */}
      <div className="relative z-20 w-full max-w-xl text-center pt-2 sm:pt-4">
        {phase === 'intro-0' && (
          <div
            id="bouquet-step-0"
            data-testid="bouquet-step-0"
            onClick={handleNextIntro}
            className="cursor-pointer inline-block animate-fade-in px-5 py-3 rounded-2xl bg-zinc-950/70 border border-rose-500/30 backdrop-blur-md shadow-xl hover:border-rose-400 transition"
          >
            <p className="font-serif italic text-base sm:text-xl text-rose-100 drop-shadow-md">
              "{BOUQUET_INTRO_MESSAGES[0]}"
            </p>
            <span className="text-[11px] text-rose-300/80 font-sans mt-1 block">
              Chạm để nghe tiếp • 1/2
            </span>
          </div>
        )}

        {phase === 'intro-1' && (
          <div
            id="bouquet-step-1"
            data-testid="bouquet-step-1"
            onClick={handleNextIntro}
            className="cursor-pointer inline-block animate-fade-in px-5 py-3 rounded-2xl bg-zinc-950/70 border border-rose-500/30 backdrop-blur-md shadow-xl hover:border-rose-400 transition"
          >
            <p className="font-serif italic text-base sm:text-xl text-rose-100 drop-shadow-md">
              "{BOUQUET_INTRO_MESSAGES[1]}"
            </p>
            <span className="text-[11px] text-rose-300/80 font-sans mt-1 block">
              Chạm để nhận hoa • 2/2
            </span>
          </div>
        )}

        {phase === 'single-bouquet' && (
          <div className="animate-fade-in space-y-1">
            <h1 className="text-lg sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 drop-shadow-lg">
              Bó hoa dành riêng cho Em 🌹
            </h1>
            <p className="text-xs sm:text-sm text-rose-200/80 font-sans flex items-center justify-center gap-1">
              <span>Chạm vào bó hoa để ngắm những điều dịu dàng</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse inline" />
            </p>
          </div>
        )}

        {phase === 'bouquet-revealed' && (
          <div className="animate-fade-in space-y-1">
            <h2 className="text-base sm:text-2xl font-serif italic text-rose-100 drop-shadow-md font-medium">
              Và những điều dịu dàng nhất gửi trao Em ❤️
            </h2>
            <p className="text-[11px] sm:text-xs text-amber-300 font-sans flex items-center justify-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm vào nơ này để mở thêm...</span>
            </p>
          </div>
        )}
      </div>

{/* =========================================================================
          CENTRAL STAGE: TRẠNG THÁI 1 & 2 (BÓ HOA VÀ ẢNH CHỒNG TRỰC TIẾP VÀO GIỮA HOA)
          ========================================================================= */}
      {(phase === 'intro-0' ||
        phase === 'intro-1' ||
        phase === 'single-bouquet' ||
        phase === 'bouquet-revealed' ||
        phase === 'untying') && (
        <div className="relative z-10 flex-1 w-full max-w-lg flex items-center justify-center my-auto py-2">
          
          <div
            id="bouquet-touch-container"
            data-testid="bouquet-touch-container"
            onClick={phase === 'single-bouquet' ? handleTouchBouquet : undefined}
            className={`relative group transition-all duration-1000 ease-out select-none ${
              phase === 'single-bouquet' ? 'cursor-pointer hover:scale-103 active:scale-98' : ''
            } ${phase === 'untying' ? 'scale-115 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
            style={{ width: 'min(84vw, 340px)' }}
          >
            {/* Ánh sáng nền */}
            <div
              className={`absolute -inset-4 bg-gradient-to-t from-rose-600/30 to-pink-400/20 rounded-full blur-2xl transition-opacity duration-700 ${
                phase === 'bouquet-revealed' ? 'opacity-100' : 'opacity-65'
              }`}
            />

            {/* HỆ TỌA ĐỘ CHUẨN: Bọc sát vào ảnh bó hoa */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-rose-400/15 via-pink-500/10 to-transparent border border-rose-400/25 shadow-2xl shadow-rose-950/90 overflow-visible">
              
              {/* Lớp 1: Bó hoa (Làm gốc tọa độ) */}
              <img
                src={BOUQUET_IMAGE}
                alt="Bó hoa tặng Em 20/10"
                className="w-full h-auto block rounded-xl sm:rounded-2xl select-none pointer-events-none drop-shadow-xl"
              />

              {/* Gợi ý chạm (Trạng thái 1) */}
              {phase === 'single-bouquet' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-3 pointer-events-none">
                  <div className="p-3 sm:p-4 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.85)] border border-rose-300 animate-bounce mb-2 text-2xl sm:text-3xl">💐</div>
                  <div className="text-xs sm:text-sm font-semibold text-rose-100 bg-black/85 px-4 py-1.5 rounded-full border border-rose-400/80 shadow-2xl backdrop-blur-md">
                    Chạm vào bó hoa để mở ảnh 🌸
                  </div>
                </div>
              )}

              {/* Nút chiếc nơ (Trạng thái 2) */}
              {phase === 'bouquet-revealed' && (
                <div
                  id="ribbon-bow-button"
                  data-testid="ribbon-bow-button"
                  onClick={handleTouchBow}
                  onMouseEnter={() => setIsBowHovered(true)}
                  onMouseLeave={() => setIsBowHovered(false)}
                  className="absolute cursor-pointer select-none group/bow flex flex-col items-center pointer-events-auto"
                  style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', zIndex: 35, width: '120px', height: '80px' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-400/35 rounded-full blur-md animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-500/30 rounded-full blur-sm animate-pulse" />
                  <div className="relative flex flex-col items-center animate-bounce">
                    <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]">👆</span>
                  </div>
                </div>
              )}

              {/* Lớp 2: Cụm ảnh Polaroid đè lên (Căn tuyệt đối inset-0 để ăn khớp 100% tỷ lệ bó hoa) */}
              {(phase === 'bouquet-revealed' || phase === 'untying') && (
                <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  {bouquetOverlayPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                      style={{
                        top: `${photo.topPercent}%`,
                        left: `${photo.leftPercent}%`,
                        transform: `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${phase === 'untying' ? 1.5 : photo.scale})`,
                        width: typeof photo.width === 'number' ? `${photo.width}px` : photo.width,
                        zIndex: 10 + photo.id,
                        opacity: phase === 'untying' ? 0 : 1,
                        animation: `zoomInStagger 600ms cubic-bezier(0.16, 1, 0.3, 1) ${photo.delayMs}ms both`,
                      }}
                    >
                      <div className="bg-[#fefdfa] p-1.5 pb-4 sm:pb-5 rounded-md shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-[#ece3d8] transform transition hover:scale-105 pointer-events-auto">
                        <img src={photo.src} alt="Ảnh Em" className="w-full aspect-square object-cover rounded-[2px] select-none pointer-events-none" loading="eager" />
                      </div>
                    </div>
                  ))}

                  {/* Bướm trang trí */}
                  <div className="absolute top-[12%] -left-2 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] animate-bounce pointer-events-none" style={{ animationDuration: '3s' }}>🦋</div>
                  <div className="absolute top-[16%] -right-2 text-2xl filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] animate-bounce pointer-events-none" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🦋</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TRẠNG THÁI 3: KHÔNG GIAN 3D XOAY 360 ĐỘ VỚI CÂU CHÚC BAY LƠ LỬNG XEN KẼ ẢNH
          (Interactive 360-degree cylindrical 3D space with touch & mouse drag orbit)
          ========================================================================= */}
      {phase === 'floating-3d' && (
        <div
          className="fixed inset-0 z-20 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
        >
          {/* 360° Instructions Badge & Rotation Toggle at top */}
          <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 pointer-events-auto">
            <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-rose-500/30 backdrop-blur-md text-[11px] sm:text-xs text-rose-200 shadow-xl flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3 h-3 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Có thể vuốt kéo thử</span>
            </div>
            <button
              type="button"
              data-no-drag="true"
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className="p-1.5 rounded-full bg-black/60 border border-rose-500/30 text-rose-300 hover:text-white backdrop-blur-md transition active:scale-95 shadow-md"
              title={isAutoRotate ? 'Tạm dừng tự xoay' : 'Bật tự xoay 360°'}
            >
              {isAutoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          {/* 3D World Stage (Rotates 360° smoothly around Y and X axes) */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.08s ease-out',
            }}
          >
            {/* Center Ambient Light Sphere */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"
              style={{ transform: 'translate(-50%, -50%) translateZ(0px)' }}
            />

            {/* 24 Items (Photos and Wishes Interspersed / Xen Kẽ) in 360° Orbit */}
            {orbitItems.map((item) => {
              // Calculate relative angle to camera for dynamic depth styling
              const relativeAngle = ((item.angle + rotY) % 360 + 360) % 360;
              const isFrontFacing = relativeAngle < 90 || relativeAngle > 270;

              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 pointer-events-auto transition-transform duration-300"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translate(-50%, -50%) rotateY(${item.angle}deg) translateZ(${orbitRadius}px) translateY(${item.yOffset}px)`,
                    backfaceVisibility: 'hidden',
                    zIndex: isFrontFacing ? 35 : 15,
                  }}
                >
                  {/* ITEM TYPE 1: PHOTO CARD */}
                  {item.type === 'photo' && item.src && (
                    <div
                      data-no-drag="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Only trigger click if user didn't drag
                        if (dragStartRef.current.distance < 6) {
                          setSelectedZoomPhoto(item.src!);
                        }
                      }}
                      className="cursor-pointer group/photo transform transition duration-300 hover:scale-120 active:scale-95"
                      title="Chạm để phóng to ảnh Em"
                    >
                      <div className="p-1 sm:p-1.5 bg-stone-100/95 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] border border-pink-300/80 w-22 sm:w-30 overflow-hidden backdrop-blur-sm">
                        <img
                          src={item.src}
                          alt="Ảnh Em"
                          className="w-full h-26 sm:h-34 object-cover rounded-lg group-hover/photo:brightness-105 transition"
                          loading="lazy"
                        />
                        <div className="h-3 flex items-center justify-center mt-1">
                          <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 group-hover/photo:scale-125 transition" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ITEM TYPE 2: WISH CARD (BAY LƠ LỬNG XEN KẼ CÁC TẤM ẢNH) */}
                  {item.type === 'wish' && item.wishText && (
                    <div
                      data-no-drag="true"
                      className="cursor-default transform transition duration-300 hover:scale-120 select-none"
                    >
                      <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-rose-950/90 via-pink-900/85 to-purple-950/90 border border-rose-400/60 backdrop-blur-md shadow-[0_8px_25px_rgba(244,63,94,0.55)] whitespace-nowrap text-center flex items-center gap-1.5 group/wish hover:border-rose-300">
                        <Sparkles className="w-3 h-3 text-amber-300 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
                        <span className="font-serif italic text-xs sm:text-sm text-rose-100 font-medium drop-shadow-[0_0_10px_rgba(244,63,94,0.85)]">
                          "{item.wishText}"
                        </span>
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400 shrink-0" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER HERO: ROMANTIC LETTER CARD TRIGGER */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto flex flex-col items-center justify-center">
            <button
              type="button"
              id="open-letter-center-btn"
              data-testid="open-letter-center-btn"
              data-no-drag="true"
              onClick={(e) => {
                e.stopPropagation();
                setShowLetter(true);
              }}
              title="Mở thư tình cảm của Anh"
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.7)] border border-rose-300/70 hover:scale-108 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <Mail className="w-4 h-4 text-rose-100" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide">
                Thân gửi Em 💌 • Chạm để mở
              </span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHẦN 9: CHIẾC THIỆP HỒNG HOA ĐÀO (DLOVE ROMANTIC LETTER CARD)
          ========================================================================= */}
      {showLetter && (
        <div
          data-testid="dlove-letter-modal"
          onClick={() => setShowLetter(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none cursor-pointer"
        >
          {/* Letter Card Wrapper */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] max-w-[430px] max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#fceef1] to-[#f8dce2] p-2.5 sm:p-4 shadow-2xl shadow-black/80 border border-[#f3b9c5] transform transition duration-500 scale-100"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setShowLetter(false)}
              className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 p-2 rounded-full bg-zinc-900 border border-rose-400/60 text-rose-300 hover:text-white shadow-lg transition active:scale-90 z-20 cursor-pointer"
              title="Gấp thiệp lại để ngắm ảnh bay"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Inner Cream Paper Card */}
            <div className="relative rounded-2xl bg-[#fffcf9] p-3.5 sm:p-5 shadow-inner border border-[#f5ded5] overflow-hidden">
              
              {/* Corner Floral Cluster (Top Left) */}
              <div className="absolute top-1 left-1 pointer-events-none opacity-85">
                <span className="text-xl sm:text-2xl filter drop-shadow">🌸</span>
              </div>

              {/* Title */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="font-serif italic font-bold text-lg sm:text-2xl text-[#8b263e] tracking-wide flex items-center justify-center gap-1.5">
                  <span>🌸</span>
                  <span>{DLOVE_LETTER_CONTENT.title}</span>
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e08999] to-transparent mx-auto mt-1" />
              </div>

              {/* Main Content: Two Columns on wider mobile/desktop, or stacked on small */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-4 my-2">
                
                {/* Left Column: Sincere wishes from Anh */}
                <div className="flex-1 space-y-2 text-[#4a1e27] font-serif text-[11px] sm:text-[13px] leading-relaxed text-justify">
                  <p>
                    Chúc cho em ngày 20/10 và những ngày khác lúc nào cũng xinh đẹp, nhiều may mắn và bình an, được yêu thương như cách mình mong muốn.
                  </p>
                  <p>
                    Gặp được em là điều rất may mắn với anh, nên anh chỉ mong những điều tốt đẹp nhất sẽ tới bên em.
                  </p>
                  <p className="font-bold text-[#802636]">
                    Hi vọng sẽ thấy em cưới thật nhiều
                  </p>
                </div>

                {/* Vertical delicate separator line */}
                <div className="w-[1.5px] bg-[#d9a299]/50 self-stretch my-1 rounded" />

                {/* Right Column: Em's Portrait Photo */}
                <div className="w-24 sm:w-36 shrink-0 flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden border border-[#eed0c8] shadow-md bg-stone-100">
                    <img
                      src={DLOVE_LETTER_CONTENT.featuredPhoto}
                      alt="Ảnh Em"
                      className="w-full h-36 sm:h-48 object-cover"
                    />
                    {/* Flower cluster at bottom right of photo */}
                    <div className="absolute -bottom-2 -right-2 text-xl sm:text-2xl filter drop-shadow">
                      🌸
                    </div>
                  </div>
                </div>
              </div>

              {/* Envelope flap base at bottom */}
              <div className="mt-3 sm:mt-4 pt-2 border-t border-[#f4cfc5]/60 flex items-center justify-between text-xs text-[#8f4553] font-sans">
                <div className="flex items-center gap-1 font-['Caveat',cursive] text-sm">
                  <span>Thương mến gửi Em</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                </div>
                <div className="flex items-center gap-2">
                  {onViewAlbum && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowLetter(false);
                        onViewAlbum();
                      }}
                      className="px-3 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/40 text-rose-800 text-[11px] font-medium transition cursor-pointer active:scale-95"
                    >
                      Đọc album📖
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowLetter(false)}
                    className="px-3 py-1 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/40 text-rose-800 text-[11px] font-medium transition cursor-pointer active:scale-95"
                  >
                    Gấp thiệp lại 🌸
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Zoom Modal */}
      {selectedZoomPhoto && (
        <div
          onClick={() => setSelectedZoomPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-sm max-h-[80vh] p-2 bg-white rounded-2xl shadow-2xl">
            <img
              src={selectedZoomPhoto}
              alt="Ảnh Em phóng to"
              className="max-w-full max-h-[72vh] object-contain rounded-xl"
            />
            <div className="text-center py-1.5 text-stone-700 text-xs font-serif italic">
              Chạm để đóng lại
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION TOOLBAR: RE-OPEN LETTER ICON & REPLAY */}
      <div className="relative z-30 w-full flex items-center justify-between px-2 pt-2 pointer-events-auto">
        {/* Replay Bouquet / All button */}
        {phase === 'floating-3d' ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPhase('single-bouquet');
                setShowLetter(false);
              }}
              className="px-3 py-1.5 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-rose-500/30 text-rose-200 text-xs font-sans shadow-lg backdrop-blur-md transition flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Ngắm lại bó hoa</span>
            </button>
            {onViewAlbum && (
              <button
                type="button"
                onClick={onViewAlbum}
                className="px-3 py-1.5 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-pink-500/40 text-pink-200 text-xs font-sans shadow-lg backdrop-blur-md transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>Album lời chúc 📖</span>
              </button>
            )}
            {onReplayAll && (
              <button
                type="button"
                onClick={onReplayAll}
                className="px-3 py-1.5 rounded-full bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-sans shadow-lg backdrop-blur-md transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                <span>Xem từ đầu</span>
              </button>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-zinc-500 font-sans">
            Anh T gửi tặng H • 20/10
          </div>
        )}

        {/* Floating Letter Icon in 3D phase */}
        {phase === 'floating-3d' && (
          <button
            type="button"
            onClick={() => setShowLetter(true)}
            className="p-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xl shadow-rose-950/80 border border-rose-400 hover:scale-110 active:scale-95 transition cursor-pointer flex items-center gap-1.5 animate-pulse"
            title="Mở thư tình cảm của Anh"
          >
            <Mail className="w-4 h-4" />
            <span className="text-xs font-semibold pr-1">Xem thư 💌</span>
          </button>
        )}
      </div>

      {/* Global CSS for 3D Animations & Staggered Reveal */}
      <style>{`
        @keyframes zoomInStagger {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

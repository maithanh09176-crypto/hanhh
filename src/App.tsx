/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TinyExperience } from './components/TinyExperience';
import { ControlHUD } from './components/ControlHUD';
import { TinyTransitionScene } from './components/TinyTransitionScene';
import { BouquetScene } from './components/BouquetScene';
import { FinalAlbumScene } from './components/FinalAlbumScene';
import {
  GreetingSettings,
  DEFAULT_GREETING_SETTINGS,
  decodeGreetingParams,
} from './utils/greetingConfig';

export type StoryPhase = 'tiny' | 'transition' | 'bouquet' | 'album';

export default function App() {
  const [settings] = useState<GreetingSettings>(() => {
    if (typeof window !== 'undefined') {
      const decoded = decodeGreetingParams(window.location.search);
      return {
        ...DEFAULT_GREETING_SETTINGS,
        sender: 'Thành',
        ...decoded,
      };
    }
    return DEFAULT_GREETING_SETTINGS;
  });

  const [phase, setPhase] = useState<StoryPhase>('tiny');
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Audio status sync and crossfade management
  useEffect(() => {
    const tinyAudio = document.getElementById('tiny-soundtrack') as HTMLAudioElement | null;
    const romanticAudio = document.getElementById('romantic-soundtrack') as HTMLAudioElement | null;

    if (phase === 'tiny') {
      if (romanticAudio && !romanticAudio.paused) {
        romanticAudio.pause();
        romanticAudio.currentTime = 0;
      }
      if (tinyAudio) {
        tinyAudio.volume = 1;
        setIsAudioPlaying(!tinyAudio.paused);
      }
    } else if (phase === 'transition') {
      // Fade out tiny soundtrack smoothly as Tiny bids farewell
      if (tinyAudio && !tinyAudio.paused) {
        let vol = tinyAudio.volume;
        const fadeOut = setInterval(() => {
          vol = Math.max(0, vol - 0.15);
          tinyAudio.volume = vol;
          if (vol <= 0) {
            clearInterval(fadeOut);
            tinyAudio.pause();
          }
        }, 120);
      }
    } else if (phase === 'bouquet' || phase === 'album') {
      // Ensure old tiny soundtrack is stopped completely
      if (tinyAudio && !tinyAudio.paused) {
        tinyAudio.pause();
      }
      // Start new romantic soundtrack (May Mắn - Anh Quân Idol) seamlessly
      if (romanticAudio && romanticAudio.paused) {
        romanticAudio.volume = 0;
        romanticAudio
          .play()
          .then(() => {
            let vol = 0;
            const fadeIn = setInterval(() => {
              vol = Math.min(0.85, vol + 0.1);
              romanticAudio.volume = vol;
              if (vol >= 0.85) clearInterval(fadeIn);
            }, 120);
            setIsAudioPlaying(true);
          })
          .catch(() => {
            // Browser autoplay restrictions: will resume on next user touch/click
            setIsAudioPlaying(false);
          });
      }
    }
  }, [phase]);

  // Audio check interval
  useEffect(() => {
    const checkAudio = () => {
      if (phase === 'tiny') {
        const audio = document.getElementById('tiny-soundtrack') as HTMLAudioElement | null;
        if (audio) setIsAudioPlaying(!audio.paused);
      } else {
        const audio = document.getElementById('romantic-soundtrack') as HTMLAudioElement | null;
        if (audio) setIsAudioPlaying(!audio.paused);
      }
    };
    const interval = setInterval(checkAudio, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Resume romantic soundtrack on user interaction if autoplay was blocked
  useEffect(() => {
    if (phase === 'bouquet' || phase === 'album') {
      const handleUserInteraction = () => {
        const romanticAudio = document.getElementById('romantic-soundtrack') as HTMLAudioElement | null;
        if (romanticAudio && romanticAudio.paused) {
          romanticAudio.volume = 0.85;
          romanticAudio
            .play()
            .then(() => setIsAudioPlaying(true))
            .catch(() => {});
        }
      };

      window.addEventListener('click', handleUserInteraction, { once: true });
      window.addEventListener('touchstart', handleUserInteraction, { once: true });
      return () => {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, [phase]);

  const handleNextScene = useCallback(() => {
    if (phase === 'tiny') {
      if (currentScene < 11) {
        if (typeof window !== 'undefined' && (window as any).TINY_API) {
          (window as any).TINY_API.triggerNext();
          setCurrentScene((prev) => prev + 1);
        }
      } else {
        // Move to Tiny's farewell transition
        setPhase('transition');
      }
    }
  }, [phase, currentScene]);

  const handlePrevScene = useCallback(() => {
    if (phase === 'tiny' && currentScene > 0) {
      if (typeof window !== 'undefined' && (window as any).TINY_API) {
        const nextTarget = Math.max(0, currentScene - 1);
        (window as any).TINY_API.jumpTo(nextTarget);
        setCurrentScene(nextTarget);
      }
    }
  }, [phase, currentScene]);

  const handleToggleAudio = useCallback(() => {
    if (phase === 'tiny') {
      if (typeof window !== 'undefined' && (window as any).TINY_API) {
        const playing = (window as any).TINY_API.togglePlay();
        setIsAudioPlaying(playing);
      }
    } else {
      const romanticAudio = document.getElementById('romantic-soundtrack') as HTMLAudioElement | null;
      if (romanticAudio) {
        if (romanticAudio.paused) {
          romanticAudio
            .play()
            .then(() => setIsAudioPlaying(true))
            .catch(() => {});
        } else {
          romanticAudio.pause();
          setIsAudioPlaying(false);
        }
      }
    }
  }, [phase]);

  // Keyboard navigation for Tiny phase
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextScene();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextScene, handlePrevScene]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none font-sans">
      {/* Tiny Experience (Cảnh 0 đến 11 - Tiny là người dẫn chuyện "tớ - cậu") */}
      <TinyExperience
        settings={settings}
        currentScene={currentScene}
        onSceneChange={setCurrentScene}
        onFinishTiny={() => setPhase('transition')}
        isVisible={phase === 'tiny'}
      />

      {/* Cảnh Chuyển Tiếp: Lần cuối Tiny xuất hiện, nhớ ra món quà bí mật từ Anh */}
      {phase === 'transition' && (
        <TinyTransitionScene
          onTransitionComplete={() => setPhase('bouquet')}
        />
      )}

      {/* Cảnh Bó Hoa DLove: Từ đây chính Anh nói với Em (Bó hoa -> Ảnh chồng lên hoa -> Chạm nơ -> 3D bay bổng -> Thiệp hồng) */}
      {phase === 'bouquet' && (
        <BouquetScene
          onViewAlbum={() => setPhase('album')}
          onReplayAll={() => {
            if (typeof window !== 'undefined' && (window as any).TINY_API) {
              (window as any).TINY_API.jumpTo(0);
            }
            setCurrentScene(0);
            setPhase('tiny');
          }}
        />
      )}

      {/* Cảnh Album Ảnh Cuối & 5 Đoạn Lời Chúc Tình Cảm Sâu Sắc Của Anh */}
      {phase === 'album' && (
        <FinalAlbumScene
          onReplayBouquet={() => setPhase('bouquet')}
          onReplayAll={() => {
            if (typeof window !== 'undefined' && (window as any).TINY_API) {
              (window as any).TINY_API.jumpTo(0);
            }
            setCurrentScene(0);
            setPhase('tiny');
          }}
        />
      )}

      {/* Minimalist Audio Controller & Scene Navigator */}
      <ControlHUD
        currentScene={currentScene}
        onPrev={handlePrevScene}
        onNext={handleNextScene}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        showNavigation={phase === 'tiny'}
      />

      {/* Romantic Soundtrack: May Mắn - Anh Quân Idol (Plays continuously through Bouquet, 3D space, Letter & Album) */}
      <audio
        id="romantic-soundtrack"
        src="/may_man.mp3"
        loop
        preload="auto"
      />
    </main>
  );
}

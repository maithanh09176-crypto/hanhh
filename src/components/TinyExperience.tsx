import React, { useEffect, useRef } from 'react';
import { TINY_HTML_TEMPLATE } from './tinyTemplateHtml';
import { initTinyScripts } from '../engine/tinyEngine';
import { GreetingSettings, formatSceneText } from '../utils/greetingConfig';

interface TinyExperienceProps {
  settings: GreetingSettings;
  onSceneChange: (sceneIndex: number) => void;
  onFinishTiny?: () => void;
  currentScene: number;
  isVisible?: boolean;
}

export const TinyExperience: React.FC<TinyExperienceProps> = ({
  settings,
  onSceneChange,
  onFinishTiny,
  currentScene,
  isVisible = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Initialize scripts on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Hook window scene change listener
    (window as any).TINY_API_ON_SCENE = (idx: number) => {
      onSceneChange(idx);
    };

    (window as any).TINY_API_ON_FINISH_TINY = () => {
      if (onFinishTiny) onFinishTiny();
    };

    try {
      initTinyScripts();
    } catch (err) {
      console.error('Failed to initialize Tiny engine:', err);
    }
  }, [onSceneChange]);

  // Enforce clean text layer visibility so no intermediate scene timeouts leak into current scene
  useEffect(() => {
    const targetTextId = currentScene < 13 ? `text-${currentScene + 1}` : null;
    for (let i = 1; i <= 13; i++) {
      const el = document.getElementById(`text-${i}`);
      if (!el) continue;
      if (targetTextId && `text-${i}` === targetTextId) {
        el.classList.add('hien-thi');
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
      } else {
        el.classList.remove('hien-thi');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
      }
    }
  }, [currentScene]);

  // Sync custom texts to DOM elements for Tiny's story (keeping "tớ - cậu" style)
  useEffect(() => {
    const updateText = (id: string, content: string, isHtml: boolean = false) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (isHtml) {
        el.innerHTML = content;
      } else {
        el.textContent = content;
      }
    };

    const recipient = 'cậu';
    const sender = settings.sender || 'Thành';

    updateText('text-1', 'này cậu gì ơi');
    updateText('text-2', 'tớ là Tiny');
    updateText('text-3', `Hôm nay tớ nhận lệnh từ ${sender} là để...`);
    updateText('text-4', 'ui cậu đẹp quá');
    updateText('text-6', 'nên là tớ muốn');
    updateText('text-7', 'chúc cậu thật nhiều sức khỏe');
    updateText('text-8', 'chúc cậu thật xinh đẹp');
    updateText('text-9', 'và chúc cậu luôn giữ<br>nụ cười trên môi', true);
    updateText('text-10', 'tớ tặng cậu ngọn <span class="clover-word">cỏ 4 lá</span> này', true);
    updateText('text-11', 'nè cầm lấy đi');
    updateText(
      'text-12',
      'chúc cậu gặp được thật nhiều điều <span class="luck-green-words">may mắn</span>',
      true
    );

    // Update audio volume safely if available
    if ((window as any).TINY_API) {
      (window as any).TINY_API.setVolume(settings.musicVolume);
    }
  }, [settings]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full min-h-screen overflow-hidden bg-black font-mono select-none transition-opacity duration-1000 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      dangerouslySetInnerHTML={{ __html: TINY_HTML_TEMPLATE }}
    />
  );
};

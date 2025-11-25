/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useDisplayDevice } from '@/hooks/useDisplayDevice';
import type { Game } from '@/types';

interface GameIframeProps {
  game: Game;
}

export const GameIframe = ({ game }: GameIframeProps) => {
  const iframeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const deviceInfo = useDisplayDevice();
  const [introDismissed, setIntroDismissed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    {
      text: 'On mobile, tap ⛶ button to fullscreen or move the game box!',
    },
    {
      text: 'Controls may differ, but you can customize them inside the game!',
    },
    {
      text: 'Playing at work? We won’t tell anyone!',
    },
    {
      text: "Save progress using the 'Save State' button inside the game!",
    },
    {
      text: 'Bit Legends isn’t responsible for any finger calluses!',
    },
    {
      text: 'Log in to Bit Legends to save game favorites and track playtime!',
    },
    {
      text: 'Tired of ads? Try Brave Browser for a faster experience!',
    },
    {
      text: 'Joystick controls are detected automatically when connected!',
    },
    {
      text: 'Some games can be tough, take a break before trying again!',
    },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTipIndex(randomIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const iframeUrl =
    game.embedUrl ||
    `https://www.retrogames.cc/embed/${game.embedId}-${game.slug}.html`;

  const toggleFullscreen = () => {
    const container = iframeRef.current;
    if (!container) return;
    const iframe = container.querySelector('iframe') as any;
    const el: any = iframe || container;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() =>
        container.classList.toggle('fullscreen-sim')
      );
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else {
      container.classList.toggle('fullscreen-sim');
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-accent/30 bg-card">
      <div
        ref={iframeRef}
        className="relative bg-black rounded-lg overflow-hidden"
        style={isMobile ? { height: 'calc(68vh)' } : { aspectRatio: '4/3' }}
      >
        {!introDismissed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-neutral-900 to-black p-6">
            <div className="w-[180px] h-[180px] mb-4 flex items-center justify-center bg-neutral-800 rounded-md overflow-hidden border-2 border-accent/50 shadow-[0_0_10px_rgba(255,255,255,0.15)]">
              <img
                src={game.coverImage || '/placeholder-game-logo.png'}
                alt={`${game.title} Logo`}
                className="w-full h-full object-cover drop-shadow-md"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              {game.title}
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300 max-w-md mb-5 leading-relaxed transition-all duration-500 ease-in-out">
              <p className="italic text-gray-300">{tips[tipIndex].text}</p>
            </div>
            <button
              onClick={() => setIntroDismissed(true)}
              className="px-4 py-2 rounded-md border border-gray-400 text-gray-200 text-sm hover:bg-white/10 transition-all"
            >
              READY
            </button>
          </div>
        ) : (
          <>
            <iframe
              src={iframeUrl}
              scrolling="no"
              className="absolute inset-0 w-full h-full rounded-lg"
              title={game.title}
              allow="gamepad; fullscreen; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{
                border: 'none',
                overflow: 'hidden',
                backgroundColor: 'black',
              }}
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-presentation"
            />
            {isMobile && (
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-1 right-1 z-10 bg-black/60 text-white rounded px-3 py-1 text-xs sm:text-sm border border-white/20 hover:bg-black/10 transition-all"
                title="Fullscreen"
              >
                ⛶
              </button>
            )}
          </>
        )}
      </div>
      <div className="p-3 sm:p-4 bg-muted/30 border-t border-accent/20">
        <div className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
          <Gamepad2 className="h-4 w-4 text-accent" />
          Playing On: {deviceInfo}
        </div>
      </div>
    </Card>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
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
  const [braveDetected] = useState(false);
  const [braveWarningDismissed, setBraveWarningDismissed] = useState(false);
  const braveLink = 'https://brave.com/download/';
  const braveLabel = 'DOWNLOAD';

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
        {!braveWarningDismissed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-neutral-900 to-black p-6">
            <div className="w-20 h-20 mb-3">
              <img
                src="https://brave.com/static-assets/images/brave-logo-sans-text.svg"
                alt="Brave Browser Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              The Fastest browser for Games
            </h2>
            <p className="text-sm text-gray-300 max-w-md mb-4">
              For the best ad-free gaming experience, download{' '}
              <strong>Brave Browser</strong>, it blocks ads by default and
              boosts performance for Bit Legends on PC and Mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={braveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-all"
              >
                {braveLabel}
              </a>

              <button
                onClick={() => setBraveWarningDismissed(true)}
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-200 text-sm hover:bg-white/10 transition-all"
              >
                CONTINUE
              </button>
            </div>
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
          Playing On: {deviceInfo} {braveDetected}
        </div>
      </div>
    </Card>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
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

  const iframeUrl =
    game.embedUrl ||
    `https://www.retrogames.cc/embed/${game.embedId}-${game.slug}.html`;

  const toggleFullscreen = () => {
    const container = iframeRef.current;
    if (!container) return;
    const el: any = container;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen)
        (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen)
        (document as any).msExitFullscreen();
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-accent/30 bg-card">
      <div
        ref={iframeRef}
        className="relative bg-black rounded-lg overflow-hidden"
        style={isMobile ? { height: 'calc(68vh)' } : { aspectRatio: '4/3' }}
      >
        <iframe
          src={iframeUrl}
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
            className="absolute bottom-0 right-0 z-10 bg-black/60 text-white rounded px-3 py-1 text-xs sm:text-sm border border-white/20 hover:bg-black/10 transition-all"
            title="Fullscreen"
          >
            ⛶
          </button>
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

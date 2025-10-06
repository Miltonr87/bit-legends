import { useEffect, useRef, useState } from 'react';

interface EmulatorCDNProps {
  romUrl: string;
  core?: string;
}

export function EmulatorCDN({ romUrl, core = 'arcade' }: EmulatorCDNProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!romUrl) return;

    let mounted = true;

    // ✅ Detect mobile
    const mm = window.matchMedia('(max-width: 639px)');
    const apply = () => setIsMobile(mm.matches);
    apply();
    mm.addEventListener('change', apply);

    // ✅ EmulatorJS global config
    const CDN_BASE = 'https://emulatorjs.vercel.app/data/';
    (window as any).EJS_player = '#emulator-container';
    (window as any).EJS_gameUrl = romUrl;
    (window as any).EJS_core = core;
    (window as any).EJS_pathtodata = CDN_BASE;
    (window as any).usingVersion = '0.5.49';
    (window as any).EJS_buttons = true;

    // ✅ Create script
    const script = document.createElement('script');
    script.src = `${CDN_BASE}loader.js`;
    script.async = true;
    script.onload = () => {
      if (mounted) {
        console.log('✅ EmulatorJS loaded successfully (Vercel mirror)');
        setIsLoaded(true);
      }
    };
    script.onerror = (err) => {
      console.error('❌ Failed to load EmulatorJS loader', err);
      setIsLoaded(false);
    };

    document.body.appendChild(script);

    // ✅ Cleanup
    return () => {
      mounted = false;
      mm.removeEventListener('change', apply);
      try {
        document.body.removeChild(script);
      } catch {}
      if (containerRef.current) containerRef.current.innerHTML = '';
      delete (window as any).EJS_player;
      delete (window as any).EJS_gameUrl;
      delete (window as any).EJS_core;
      delete (window as any).EJS_pathtodata;
      delete (window as any).usingVersion;
    };
  }, [romUrl, core]);

  // ✅ Fullscreen handler (only mobile)
  const handleFullscreen = () => {
    if (!isMobile || !containerRef.current) return;
    const el = containerRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch((err) =>
        console.warn('Fullscreen failed:', err)
      );
    }
  };

  return (
    <div
      id="emulator-container"
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            opacity: 0.8,
            fontSize: '0.9rem',
            textAlign: 'center',
          }}
        >
          🕹️ Loading EmulatorJS from Vercel mirror...
        </div>
      )}

      {/* ✅ Fullscreen button (mobile only) */}
      {isMobile && (
        <button
          onClick={handleFullscreen}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            padding: '6px 10px',
            zIndex: 50,
          }}
        >
          ⛶ Fullscreen
        </button>
      )}

      {/* ✅ Adjust buttons container (closer to bottom) */}
      <style>
        {`
          #emulator-container canvas {
            touch-action: none;
          }
          /* Move emulator on-screen buttons down */
          #emulator-container .EJS_mobileButtons {
            bottom: 4% !important;
          }
          #emulator-container .EJS_mobileButtons button {
            transform: scale(0.95);
            margin-bottom: 0.25rem;
          }
        `}
      </style>
    </div>
  );
}

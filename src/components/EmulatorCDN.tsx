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
    const mm = window.matchMedia('(max-width: 639px)');
    const apply = () => setIsMobile(mm.matches);
    apply();
    mm.addEventListener('change', apply);

    const loadCoreConfig = async () => {
      try {
        const apiUrl = `https://www.emulatorjs.com/api/v?name=${core}&_t=${Date.now()}`;
        const response = await fetch(apiUrl);
        const config = await response.json();
        console.log(`✅ Loaded core config for ${core}`, config);
      } catch (error) {
        console.error('❌ Failed to fetch EmulatorJS core config', error);
      }
    };

    loadCoreConfig();

    // ✅ EmulatorJS global setup
    const CDN_BASE = 'https://emulatorjs.vercel.app/data/';
    (window as any).EJS_player = '#emulator-container';
    (window as any).EJS_gameUrl = romUrl;
    (window as any).EJS_core = core;
    (window as any).EJS_pathtodata = CDN_BASE;
    (window as any).EJS_buttons = true;
    (window as any).usingVersion = '0.5.49';

    const loadEmulatorScript = () => {
      if (document.querySelector('script[data-emulatorjs]')) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `${CDN_BASE}loader.js`;
      script.async = true;
      script.setAttribute('data-emulatorjs', 'true');

      script.onload = () => {
        if (mounted) {
          console.log('✅ EmulatorJS loaded successfully from Vercel mirror');
          setIsLoaded(true);
        }
      };

      script.onerror = (err) => {
        console.error('❌ Failed to load EmulatorJS loader', err);
        setIsLoaded(false);
      };

      document.body.appendChild(script);
    };

    loadEmulatorScript();

    return () => {
      mounted = false;
      mm.removeEventListener('change', apply);
      if (containerRef.current) containerRef.current.innerHTML = '';
      delete (window as any).EJS_player;
      delete (window as any).EJS_gameUrl;
      delete (window as any).EJS_core;
      delete (window as any).EJS_pathtodata;
      delete (window as any).EJS_buttons;
      delete (window as any).usingVersion;
    };
  }, [romUrl, core]);

  return (
    <div
      id="emulator-container"
      ref={containerRef}
      style={{
        width: '100%',
        height: isMobile ? '88vh' : '100%',
        background: 'black',
        position: 'relative',
        borderRadius: '0.5rem',
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
          🕹️ Loading EmulatorJS from CDN...
        </div>
      )}
    </div>
  );
}

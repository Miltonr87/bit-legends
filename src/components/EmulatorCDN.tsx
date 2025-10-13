import { useEffect, useRef, useState } from 'react';

interface EmulatorCDNProps {
  romUrl: string;
  core?: string;
}

export function EmulatorCDN({ romUrl, core = 'arcade' }: EmulatorCDNProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!romUrl) return;
    let mounted = true;
    const win = window as any;
    const CDN_BASE = 'https://emulatorjs.vercel.app/data/';

    try {
      if (win.EJS_emulator) {
        win.EJS_emulator.pause?.();
        win.EJS_emulator.stop?.();
        win.EJS_emulator = null;
      }
    } catch (e) {
      console.warn('⚠️ Cleanup before reload failed:', e);
    }

    if (innerRef.current) innerRef.current.innerHTML = '';

    // ⚙️ Define globals BEFORE script load
    win.EJS_player = '#emulator-inner';
    win.EJS_gameUrl = romUrl;
    win.EJS_core = core;
    win.EJS_pathtodata = CDN_BASE;
    win.EJS_buttons = true;
    win.usingVersion = '0.5.49';

    const originalLog = console.log;
    console.log = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Using emulatorjs version')
      )
        return;
      originalLog(...args);
    };
    const originalWarn = console.warn;
    console.warn = (msg, ...rest) => {
      if (typeof msg === 'string' && msg.includes('Enlarging memory arrays'))
        return;
      originalWarn(msg, ...rest);
    };
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0] &&
        typeof args[0] === 'string' &&
        args[0].includes('Unable to preventDefault')
      )
        return;
      originalError(...args);
    };

    const loadEmulatorScript = () => {
      const oldScript = document.querySelector('script[data-emulatorjs]');
      if (oldScript) oldScript.remove();

      if (win._babelPolyfill) delete win._babelPolyfill;

      const script = document.createElement('script');
      script.src = `${CDN_BASE}loader.js`;
      script.async = true;
      script.setAttribute('data-emulatorjs', 'true');

      script.onload = () => {
        if (mounted) {
          console.log(`✅ EmulatorJS loaded successfully for ${core}`);
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
      try {
        if (win.EJS_emulator) {
          win.EJS_emulator.pause?.();
          win.EJS_emulator.stop?.();
          win.EJS_emulator = null;
        }

        if (innerRef.current) innerRef.current.innerHTML = '';

        delete win.EJS_player;
        delete win.EJS_gameUrl;
        delete win.EJS_core;
        delete win.EJS_pathtodata;
        delete win.EJS_buttons;
        delete win.usingVersion;
      } catch (err) {
        console.warn('⚠️ Failed to clean up EmulatorJS:', err);
      }

      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [romUrl, core]);

  return (
    <div
      ref={outerRef}
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        position: 'relative',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <div id="emulator-inner" ref={innerRef} />
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

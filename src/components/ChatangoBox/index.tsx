'use client';

import { useEffect, useRef } from 'react';

export function ChatangoBox() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.id = 'cid0020000425368133495';
    script.dataset.cfasync = 'false';
    script.async = true;
    script.src = 'https://st.chatango.com/js/gz/emb.js';
    script.setAttribute('style', 'width: 300px; height: 400px;');

    script.innerHTML = JSON.stringify({
      handle: 'bitlegends',
      arch: 'js',
      styles: {
        a: '000000',
        b: 78,
        c: 'ffffff',
        d: 'ffffff',
        f: 78,
        i: 78,
        k: '3333ff',
        l: '3333ff',
        m: '3333ff',
        o: 78,
        p: '10',
        q: '3333ff',
        r: 78,
        fwtickm: 1,
      },
    });

    containerRef.current.appendChild(script);
    return () => {
      containerRef.current!.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 hidden md:block rounded-xl border border-border/60 bg-card/80 shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-md"
    />
  );
}

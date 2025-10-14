import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = '(max-width: 639px)') {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(breakpoint);
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [breakpoint]);

    return isMobile;
}

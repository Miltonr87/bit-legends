import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Music } from 'lucide-react';

export const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userStoppedMusic, setUserStoppedMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const stopped =
      localStorage.getItem('bitlegends_user_stopped_music') === 'true';
    setUserStoppedMusic(stopped);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const isHomePage = location.pathname === '/';
    const isGamePage = location.pathname.startsWith('/game/');

    if (userStoppedMusic) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (isHomePage) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          const handleUserGesture = async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              window.removeEventListener('click', handleUserGesture);
            } catch {}
          };
          window.addEventListener('click', handleUserGesture);
        });
    } else if (isGamePage || !isHomePage) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [location.pathname, userStoppedMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setUserStoppedMusic(true);
      localStorage.setItem('bitlegends_user_stopped_music', 'true');
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setUserStoppedMusic(false);
          localStorage.setItem('bitlegends_user_stopped_music', 'false');
        })
        .catch(() => {});
    }
  };

  return (
    <footer className="border-t border-border/50 mt-12 sm:mt-20 py-6 sm:py-8 relative">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-2">
        <audio
          ref={audioRef}
          src="/assets/music/intro.mp3"
          loop
          preload="auto"
        />
        <div className="flex items-center justify-center gap-1">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Bit Legends •{' '}
            <a
              href="https://miltonr87.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Milton Rodrigues - 2025
            </a>
          </p>
          <button
            onClick={toggleMusic}
            className="ml-1 text-accent hover:text-accent/80 transition-colors"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            <Music
              className={`h-3 w-3 sm:h-4 sm:w-4 transition-opacity ${
                isPlaying ? 'opacity-100' : 'opacity-60'
              }`}
            />
          </button>
        </div>
        <p className="text-muted-foreground/60 text-[10px] sm:text-xs mt-1">
          All games are property of their respective owners.
        </p>
      </div>
    </footer>
  );
};

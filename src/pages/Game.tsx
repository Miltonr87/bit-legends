import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { allGames } from '../data';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Users,
  Gamepad2,
  Share2,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ControllerSetup } from '@/components/ControllerSetup';
import { useToast } from '@/hooks/use-toast';
import { addGameHistory } from '@/lib/localStorage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoGame } from '@/components/LogoGame';
import { useDisplayDevice } from '@/hooks/useDisplayDevice';
import { db, auth } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { Game } from '../data';

const Game = () => {
  const { id } = useParams();
  const game: Game | undefined = allGames.find((g) => g.id === id);
  const [isMobile, setIsMobile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const gameIframeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const deviceInfo = useDisplayDevice();

  useEffect(() => {
    const mm = window.matchMedia('(max-width: 639px)');
    const apply = () => setIsMobile(mm.matches);
    apply();
    mm.addEventListener('change', apply);
    return () => mm.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (game) startTimeRef.current = Date.now();
    return () => {
      if (!game) return;
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      addGameHistory({
        gameId: game.id,
        gameTitle: game.title,
        timeSpent,
        playedAt: new Date().toISOString(),
      });
    };
  }, [game]);

  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (!user || !game) return;
      const favRef = doc(db, 'favorites', user.uid, 'games', game.id);
      const snapshot = await getDoc(favRef);
      setIsFavorite(snapshot.exists());
    };
    checkFavorite();
  }, [game]);

  const handleSaveFavorite = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'You need to log in to save favorites.',
        variant: 'destructive',
      });
      return;
    }

    if (!game) return;

    try {
      const favRef = doc(db, 'favorites', user.uid, 'games', game.id);
      await setDoc(favRef, {
        title: game.title,
        cover: game.cover ?? null,
        addedAt: new Date().toISOString(),
      });
      setIsFavorite(true);
      toast({
        title: 'Saved!',
        description: `${game.title} added to your favorites.`,
      });
    } catch (error) {
      console.error('Error saving favorite:', error);
      toast({
        title: 'Error',
        description: 'Could not save this game.',
        variant: 'destructive',
      });
    }
  };

  const handleWhatsAppShare = () => {
    if (!game) return;
    const text = `Check out ${game.title} on Bit Legends! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleFullscreen = () => {
    const container = gameIframeRef.current;
    if (!container) return;
    container.classList.toggle('fullscreen-sim');
  };

  if (!game) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const iframeUrl =
    game.embedUrl ||
    `https://www.retrogames.cc/embed/${game.embedId}-${game.slug}.html`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Link to="/">
              <Button
                variant="outline"
                className="border-accent/50 hover:bg-accent/10 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card className="overflow-hidden border-2 border-accent/30 bg-card">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-3 sm:p-4 border-b border-accent/30">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl sm:text-3xl font-bold glow-text truncate">
                        {game.title}
                      </h1>
                      <p className="text-xs sm:text-base text-muted-foreground mt-1">
                        {game.developer} • {game.year}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSaveFavorite}
                        disabled={isFavorite}
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 sm:h-10 sm:w-10 border-accent/50 transition-all duration-300 
                          ${
                            isFavorite
                              ? 'bg-green-500/10 hover:bg-green-500/20'
                              : 'hover:bg-accent/10'
                          }`}
                        title="Add to favorites"
                      >
                        <Heart
                          className={`h-4 w-4 transition-all duration-300 
                            ${
                              isFavorite
                                ? 'fill-green-400 text-green-400 drop-shadow-[0_0_6px_rgba(0,255,0,0.6)]'
                                : 'text-accent hover:fill-accent'
                            }`}
                        />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-accent/50 h-8 w-8 sm:h-10 sm:w-10"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={handleWhatsAppShare}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Share to WhatsApp
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <div
                  ref={gameIframeRef}
                  className="relative bg-black rounded-lg overflow-hidden"
                  style={
                    isMobile ? { height: 'calc(68vh)' } : { aspectRatio: '4/3' }
                  }
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
              <Card className="p-4 sm:p-6 border-2 border-border bg-card">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent">
                  About This Game
                </h2>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {game.longDescription}
                </p>
              </Card>
              {game.characters?.length > 0 && (
                <Card className="p-4 sm:p-6 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent flex items-center gap-2">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6" /> Main Characters
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {game.characters.map((char, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/20 text-sm font-semibold text-foreground/90 hover:scale-105 transition-all"
                      >
                        #{index + 1} {char}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
            <div className="space-y-4 sm:space-y-6">
              <LogoGame
                logoUrl={game.logo}
                title={game.title}
                backgroundColor="linear-gradient(135deg, #0f172a, #1e293b)"
              />
              <Card className="p-4 sm:p-6 border-2 border-accent/30 bg-gradient-to-br from-card to-card/50">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <Calendar className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Release Year
                      </p>
                      <p className="font-semibold text-lg">{game.year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <Gamepad2 className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Genre</p>
                      <p className="font-semibold text-lg">{game.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <Users className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Players</p>
                      <p className="font-semibold text-lg">{game.players}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 flex items-center justify-center mt-1">
                      <div className="h-3 w-3 rounded-full bg-accent animate-glow-pulse" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Developer</p>
                      <p className="font-semibold">{game.developer}</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                <h3 className="font-bold text-lg mb-3 text-primary">
                  Platform
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">{game.platform}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.publisher}
                    </p>
                  </div>
                </div>
              </Card>
              {!isMobile && <ControllerSetup />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;

import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { games } from '@/data/games';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Users,
  Gamepad2,
  Star,
  Share2,
  MessageCircle,
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
import { useDisplayDevice } from '@/hooks/useDisplayDevice';

const Game = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);

  const [starRating, setStarRating] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
    if (!game) return;
    const saved = localStorage.getItem(`game_rating_${game.id}`);
    if (saved) setStarRating(parseInt(saved, 10));
  }, [game]);

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

  const handleStarClick = (rating: number) => {
    if (!game) return;
    setStarRating(rating);
    localStorage.setItem(`game_rating_${game.id}`, rating.toString());
    toast({
      title: 'Rating saved!',
      description: `You rated ${game.title} ${rating} star${
        rating !== 1 ? 's' : ''
      }`,
    });
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
      </div>
    );
  }

  // need to add a proxy
  const iframeUrl =
    game.embedUrl ||
    `https://www.retrogames.cc/embed/${game.embedId}-${game.slug}.html`;

  return (
    <div className="min-h-screen">
      <Header />
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
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <div className="hidden sm:flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleStarClick(rating)}
                          className="transition-transform hover:scale-110"
                          type="button"
                          aria-label={`Rate ${rating} star${
                            rating !== 1 ? 's' : ''
                          }`}
                        >
                          <Star
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${
                              rating <= starRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-accent/50 h-8 w-8 sm:h-10 sm:w-10"
                        >
                          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
                  referrerPolicy="no-referrer"
                  allow="gamepad; fullscreen; autoplay; orientation-lock; encrypted-media; picture-in-picture"
                  allowFullScreen
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    backgroundColor: 'black',
                  }}
                  sandbox="allow-scripts allow-downloads allow-same-origin allow-pointer-lock allow-forms allow-presentation"
                ></iframe>
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute bottom-0 right-0 z-10 bg-black/60 text-white rounded px-3 py-1 text-xs sm:text-sm border border-white/20 hover:bg-black/10 transition-all"
                  title="Fullscreen"
                >
                  ⛶
                </button>
              </div>
              <div className="p-3 sm:p-4 bg-muted/30 border-t border-accent/20">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">
                      Playing On: {deviceInfo}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6 border-2 border-border bg-card">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-accent">
                About This Game
              </h2>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {game.longDescription}
              </p>
            </Card>
          </div>
          <div className="space-y-4 sm:space-y-6">
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
              <h3 className="font-bold text-lg mb-3 text-primary">Platform</h3>
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
    </div>
  );
};

export default Game;

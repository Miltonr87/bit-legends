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
  Info,
  Star,
  Share2,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import { addGameHistory } from '@/lib/localStorage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Game = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  const [starRating, setStarRating] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const startTimeRef = useRef<number>(Date.now());
  const gameIframeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // ✅ Detect viewport width for mobile layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (game) {
      const savedRating = localStorage.getItem(`game_rating_${game.id}`);
      if (savedRating) setStarRating(parseInt(savedRating));
    }
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

  const handleInstagramShare = async () => {
    if (!gameIframeRef.current) return;
    try {
      toast({
        title: 'Capturing screenshot...',
        description: 'Please wait a moment',
      });
      const canvas = await html2canvas(gameIframeRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
      });
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${game?.title || 'game'}-screenshot.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast({
            title: 'Screenshot saved!',
            description: 'Share it on Instagram',
          });
        }
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to capture screenshot',
        variant: 'destructive',
      });
    }
  };

  const handleWhatsAppShare = () => {
    if (!game) return;
    const text = `Check out ${game.title} on BitLegends! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    if (game) startTimeRef.current = Date.now();
    return () => {
      if (game) {
        const timeSpent = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        addGameHistory({
          gameId: game.id,
          gameTitle: game.title,
          timeSpent,
          playedAt: new Date().toISOString(),
        });
      }
    };
  }, [game]);

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

  const iframeUrl =
    game.embedUrl ||
    `https://www.retrogames.cc/embed/${game.embedId}-${game.slug}.html`;

  const isMinijogos = iframeUrl.includes('minijogos.com.br');
  const cleanedUrl = isMinijogos
    ? `${iframeUrl}?noads=1&embed=1&controls=0`
    : iframeUrl;

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
          {/* Game Player */}
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
                        <DropdownMenuItem onClick={handleInstagramShare}>
                          <Instagram className="mr-2 h-4 w-4" />
                          Share to Instagram
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleWhatsAppShare}>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Share to WhatsApp
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              {isMobile ? (
                // --- MOBILE LAYOUT ---
                <div
                  ref={gameIframeRef}
                  className={`relative w-full max-w-[480px] mx-auto bg-black rounded-lg overflow-hidden ${
                    isMinijogos ? 'minijogos-embed-clean' : ''
                  }`}
                  style={{
                    height: 'calc(80vh - 240px)',
                    minHeight: '520px',
                  }}
                >
                  <iframe
                    src={cleanedUrl}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    title={game.title}
                    allowFullScreen
                    allow="gamepad; fullscreen; autoplay"
                    style={{
                      border: 'none',
                      overflow: 'hidden',
                      backgroundColor: 'black',
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-presentation"
                  />
                </div>
              ) : (
                // --- DESKTOP LAYOUT ---
                <div
                  ref={gameIframeRef}
                  className={`relative bg-black rounded-lg overflow-hidden ${
                    isMinijogos ? 'minijogos-embed-clean' : ''
                  }`}
                  style={{ aspectRatio: '4/3' }}
                >
                  <iframe
                    src={cleanedUrl}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    title={game.title}
                    allowFullScreen
                    allow="gamepad; fullscreen; autoplay"
                    style={{
                      border: 'none',
                      overflow: 'hidden',
                      backgroundColor: 'black',
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-presentation"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4 bg-muted/30 border-t border-accent/20">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">
                      Use arrow keys and Z, X, C keys
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">
                      Progress autosaves between sessions
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

          {/* Sidebar */}
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
                  <p className="font-bold text-primary">Sega Genesis</p>
                  <p className="text-xs text-muted-foreground">Mega Drive</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

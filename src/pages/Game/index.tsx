import { useParams, Link } from 'react-router-dom';
import { allGames } from '@/data';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, MessageCircle, Heart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GameIframe } from '@/components/Game/GameIframe';
import { GameSidebar } from '@/components/Game/GameSidebar';
import { useFavoriteGame } from '@/hooks/useFavoriteGame';
import { useGameSession } from '@/hooks/useGameSession';
import type { Game } from '@/types';

const Game = () => {
  const { id } = useParams();
  const game: Game | undefined = allGames.find((g) => g.id === id);
  const { isFavorite, saveFavorite } = useFavoriteGame(game);

  useGameSession(game);

  const handleWhatsAppShare = () => {
    if (!game) return;
    const text = `Check out ${game.title} on Bit Legends! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
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
                        onClick={saveFavorite}
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
                <GameIframe game={game} />
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
            <GameSidebar game={game} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;

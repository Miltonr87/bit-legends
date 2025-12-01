import { useEffect, useState } from 'react';
import { allGames, seriesFilters } from '../data';
import { GameCard } from '@/components/Game/GameCard';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Server, RadioTower } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const GAMES_PER_PAGE = 10;
const GAME_COUNT_SIMULATED = allGames.length;

const fadeUp = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};

const Index = () => {
  const [selectedSeries, setSelectedSeries] = useState<string>('All Games');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [shuffledGames, setShuffledGames] = useState(allGames);

  useEffect(() => {
    const shuffled = [...allGames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledGames(shuffled);
  }, []);

  let filteredGames = shuffledGames;
  if (selectedSeries !== 'All Games') {
    filteredGames = filteredGames.filter((game) => {
      const normalizedGenre = game.genre.toLowerCase();
      const normalizedFolder = game.folder.toLowerCase();
      const normalizedFilter =
        typeof selectedSeries === 'string' ? selectedSeries.toLowerCase() : '';
      return (
        normalizedGenre.includes(normalizedFilter) ||
        normalizedFolder.includes(normalizedFilter)
      );
    });
  }

  if (searchQuery.trim()) {
    filteredGames = filteredGames.filter(
      (game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + GAMES_PER_PAGE
  );

  const handleSeriesChange = (series: string) => {
    setSelectedSeries(series);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const genreDescriptions: Record<string, string> = {
    Fantasy: 'Epic quests and magical realms',
    Urban: 'Streets and gangs in pure mayhem',
    Horror: 'Dark atmospheres with terrifying creatures',
    Tournament: 'Head-to-head battles with unique fighters',
    Indie: 'Global characters from independent comics',
    'DC Comics': 'Metahumans superheroes and vigilantes',
    'Marvel Comics': 'Avengers and mutants facing cosmic threats',
    Rare: 'Cancelled prototypes or limited releases',
    'Sci-Fi': 'Futuristic worlds with advanced technology',
    Race: 'High-speed races through challenging tracks',
    Sports: 'Retro 16-bit sports classics',
    RPG: 'Diverse RPG adventures with exploration',
    Hack: 'Fan-made mods with enhancements',
    Brasil: 'Jogos hackeados e traduzidos para o PT-BR',
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col">
      <Header />
      <section
        className="relative py-12 sm:py-20 px-4 overflow-hidden bg-cover bg-bottom flex-grow"
        style={{
          backgroundImage: "url('/assets/backgrounds/retro-grid.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          animation: 'parallaxScroll 60s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight px-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              Bit Legends
            </span>
            <br />
            <span className="text-foreground">16-Bit Game Collection</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Step into a pixel-powered universe where every legend lives again:
            fighters, heroes, athletes and adventurers collide across iconic
            worlds
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <AnimatePresence>
              <motion.div
                key="server-status"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeUp}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-card/50 border border-green-500/50 shadow-lg backdrop-blur-sm text-green-400 transition-all duration-500 hover:scale-[1.02]"
              >
                <RadioTower className="h-5 w-5" />
                <span className="text-sm font-semibold tracking-wider">
                  Online
                </span>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                key="game-counter"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeUp}
                className="px-3 py-1 rounded-full bg-card/50 border border-primary/50 shadow-lg backdrop-blur-sm text-primary transition-all duration-500 hover:scale-[1.02]"
              >
                <span className="text-sm font-semibold tracking-wider flex items-center gap-1">
                  <Server className="h-5 w-5 animate-pulse" />
                  {GAME_COUNT_SIMULATED} Games
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="text-accent">Library</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {filteredGames.length} games available
              </p>
            </div>
          </div>
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9 sm:pl-10 bg-card/50 border-accent/30 focus:border-accent text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {seriesFilters.map((series) => (
              <Button
                key={series}
                onClick={() => handleSeriesChange(series)}
                variant={selectedSeries === series ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedSeries === series
                    ? 'bg-gradient-to-r from-primary to-accent text-xs sm:text-sm'
                    : 'border-accent/50 hover:bg-accent/10 text-xs sm:text-sm'
                }
              >
                {series}
              </Button>
            ))}
          </div>
        </div>
        {selectedSeries !== 'All Games' &&
          genreDescriptions[selectedSeries] && (
            <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl bg-accent/5 border border-accent/20 shadow-[0_0_12px_rgba(0,0,0,0.4)] backdrop-blur-sm animate-fade-in text-center">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {genreDescriptions[selectedSeries]}
              </p>
            </div>
          )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 animate-slide-up">
          {paginatedGames.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page} className="hidden sm:block">
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Index;

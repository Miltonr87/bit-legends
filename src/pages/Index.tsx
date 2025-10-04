import { useState } from 'react';
import { games, seriesFilters } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const GAMES_PER_PAGE = 10;

const Index = () => {
  const [selectedSeries, setSelectedSeries] = useState<string>('All Games');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  let filteredGames = games;

  // Filter by series
  if (selectedSeries !== 'All Games') {
    filteredGames = filteredGames.filter((game) =>
      game.title.includes(selectedSeries)
    );
  }

  // Filter by search query
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

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 border-2 border-accent rounded-full backdrop-blur-sm animate-glow-pulse">
              <span className="text-accent font-bold text-xs sm:text-sm">
                16-BIT LEGENDS
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight px-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              Bit Legends
            </span>
            <br />
            <span className="text-foreground">16-Bit Fighting Collection</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Enter the ring and master the art of 16-bit combat. Classic
            fighters, iconic stages, and timeless duels reborn for the modern
            age.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground px-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card/50 rounded-lg border border-border">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Instant Play</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card/50 rounded-lg border border-border">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Save States</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card/50 rounded-lg border border-border">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="hidden sm:inline">Full Screen Mode</span>
              <span className="sm:hidden">Full Screen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
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

          {/* Search Bar */}
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

          {/* Series Filter */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3">
              Classic Series
            </h3>
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
        </div>

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

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 sm:mt-20 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            BitLegends • Powered by{' '}
            <a
              href="https://playminigames.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              PlayMiniGames
            </a>
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            All games are property of their respective owners
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

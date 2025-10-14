import { useState, useMemo, useEffect } from 'react';
import { Clock, Gamepad2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameHistory } from '@/types';

interface HistoryCardProps {
  gameHistory: GameHistory[];
  handleDeleteHistory: (id: string) => void;
  formatTime: (seconds: number) => string;
}

type PageToken = number | '…';

export const HistoryCard = ({
  gameHistory,
  handleDeleteHistory,
  formatTime,
}: HistoryCardProps) => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmingErase, setConfirmingErase] = useState(false);

  const totalPages = Math.ceil(gameHistory.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages);
    if (totalPages === 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return gameHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, gameHistory]);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const pages: PageToken[] = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out: PageToken[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) out.push('…');
    for (let p = start; p <= end; p++) out.push(p);
    if (end < totalPages - 1) out.push('…');
    out.push(totalPages);
    return out;
  }, [currentPage, totalPages]);

  const handleEraseAll = () => setConfirmingErase(true);
  const handleConfirmErase = () => {
    localStorage.setItem('bitlegends_game_history', JSON.stringify([]));
    window.location.reload();
  };
  const handleCancelErase = () => setConfirmingErase(false);

  return (
    <Card className="w-full md:col-span-2 p-4 sm:p-6 border-2 border-accent/30 bg-card">
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-accent" />
          <h2 className="text-xl sm:text-2xl font-bold">Game History</h2>
        </div>
        {gameHistory.length > 0 && !confirmingErase && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEraseAll}
            className="flex items-center gap-2 bg-destructive/90 hover:bg-destructive"
            title="Erase All History"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
        {confirmingErase && (
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-center sm:justify-between text-center">
            <span className="text-sm text-muted-foreground">
              Erase all history? This can’t be undone.
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelErase}
                className="border-accent/50 hover:bg-accent/10"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmErase}
                className="bg-destructive/90 hover:bg-destructive text-destructive-foreground"
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>
      {gameHistory.length === 0 ? (
        <div className="text-center py-10 sm:py-12">
          <Gamepad2 className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm sm:text-base">
            No games played yet. Start playing to see your history!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedGames.map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/30 border border-accent/20 hover:border-accent/40 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base">
                    {history.gameTitle}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 mt-1 flex-wrap text-xs sm:text-sm">
                    <p className="text-muted-foreground">
                      {new Date(history.playedAt).toLocaleDateString()} •{' '}
                      <span className="text-accent">
                        {new Date(history.playedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTime(history.timeSpent)}
                    </div>
                    {history.score && (
                      <p className="text-accent font-semibold">
                        Score: {history.score.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteHistory(history.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap overflow-x-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent pb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-accent/50 hover:bg-accent/10 flex-shrink-0"
              >
                Prev
              </Button>
              <div className="flex gap-1 px-1 sm:px-2 flex-nowrap items-center">
                {pages.map((token, idx) =>
                  token === '…' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-muted-foreground select-none"
                    >
                      …
                    </span>
                  ) : (
                    <Button
                      key={token}
                      variant={token === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(token)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 ${
                        token === currentPage
                          ? 'bg-accent text-background'
                          : 'border-accent/50 hover:bg-accent/10'
                      }`}
                    >
                      {token}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border-accent/50 hover:bg-accent/10 flex-shrink-0"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

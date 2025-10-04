import { useState, useEffect } from "react";
import { getGameHistory, deleteGameHistory, type GameHistory } from "@/lib/localStorage";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadGameHistory();
  }, []);

  const loadGameHistory = () => {
    const history = getGameHistory();
    setGameHistory(history.slice(0, 10));
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (historyToDelete) {
      deleteGameHistory(historyToDelete);
      loadGameHistory();
      toast.success("Game history deleted");
    }
    setDeleteDialogOpen(false);
    setHistoryToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="absolute inset-0 scanline pointer-events-none" />
      
      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <Card className="border-accent/30">
          <CardHeader>
            <CardTitle className="glow-text">Game History</CardTitle>
          </CardHeader>
          <CardContent>
            {gameHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No games played yet. Start playing to see your history!
              </p>
            ) : (
              <div className="space-y-3">
                {gameHistory.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-accent/20 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{history.gameTitle}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {new Date(history.playedAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(history.timeSpent)}
                        </div>
                        {history.score && (
                          <p className="text-sm text-accent font-semibold">
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
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Game History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this game from your history? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;

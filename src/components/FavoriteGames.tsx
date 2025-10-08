import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteGame {
  id: string;
  title: string;
  cover?: string;
  addedAt?: string;
}

export function FavoriteGames() {
  const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;

      if (!user) {
        toast.error('You must be logged in to view favorites.');
        setLoading(false);
        return;
      }

      try {
        const favRef = collection(db, 'favorites', user.uid, 'games');
        const snapshot = await getDocs(favRef);

        const favList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as FavoriteGame),
        }));

        setFavorites(favList);
      } catch (err) {
        console.error('Error loading favorites:', err);
        toast.error('Failed to load favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return toast.error('You must be logged in.');

    try {
      await deleteDoc(doc(db, 'favorites', user.uid, 'games', id));
      setFavorites((prev) => prev.filter((g) => g.id !== id));
      toast.success('Removed from favorites.');
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast.error('Failed to remove favorite.');
    }
  };

  if (loading)
    return (
      <Card className="p-6 border-2 border-accent/30 bg-card text-center">
        <p className="text-muted-foreground">Loading favorites...</p>
      </Card>
    );

  return (
    <Card className="p-6 border-2 border-accent/30 bg-card">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Favorite Games</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            You haven’t added any favorite games yet.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {favorites.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-accent/20 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                {game.cover ? (
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-12 h-12 rounded object-cover border border-accent/30"
                  />
                ) : (
                  <Gamepad2 className="w-8 h-8 text-accent" />
                )}
                <div>
                  <p className="font-semibold">{game.title}</p>
                  {game.addedAt && (
                    <p className="text-xs text-muted-foreground">
                      Added on {new Date(game.addedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeFavorite(game.id)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

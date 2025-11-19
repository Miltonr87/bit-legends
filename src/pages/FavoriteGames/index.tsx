import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FavoriteGame } from '@/types';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { GameCard } from '@/components/Game/GameCard';
import { Button } from '@/components/ui/button';
import { Trash2, Gamepad2, ScanHeart } from 'lucide-react';
import { toast } from 'sonner';
import { allGames } from '@/data';

export default function FavoriteGames() {
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center">
        <Gamepad2 className="h-10 w-10 text-accent mb-3 animate-pulse" />
        <p className="text-muted-foreground">Loading your favorite games...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <section
          className="relative py-10 sm:py-14 px-4 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/backgrounds/retro-grid.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            animation: 'parallaxScroll 60s linear infinite',
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 scanline pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto text-center relative z-10">
            <ScanHeart className="inline-block h-20 w-20 text-accent mb-1 mr-2 animate-pulse" />
            <h1 className="text-4xl sm:text-6xl font-black mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
                Favorite Games
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              All your 16-bit legends in one place!
            </p>
          </div>
        </section>
        <section className="container mx-auto px-4 py-8 sm:py-10">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground text-lg">
                You haven’t added any favorite games yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 animate-slide-up">
              <AnimatePresence>
                {favorites.map((fav, index) => {
                  const game = allGames.find((g) => g.id === fav.id);
                  if (!game) return null;
                  return (
                    <motion.div
                      key={fav.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="relative group"
                    >
                      <GameCard game={game} />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFavorite(fav.id)}
                        className="absolute top-2 right-2 bg-black/70 text-red-500 hover:bg-red-600/80 hover:text-white transition rounded-full"
                        title="Remove from favorites"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

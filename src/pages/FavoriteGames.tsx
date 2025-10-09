import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';
import { allGames } from '@/data';

interface FavoriteGame {
  id: string;
  title: string;
  addedAt?: string;
}

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
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section
        className="relative py-14 sm:py-20 px-4 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/backgrounds/streets-of-rage-city.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          animation: 'parallaxScroll 60s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <Heart className="h-10 w-10 text-accent mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              Favorite Games
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            All your 16-bit legends in one place!
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 sm:py-16">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              You haven’t added any favorite games yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-7 animate-slide-up">
            <AnimatePresence>
              {favorites.map((fav, index) => {
                // Match favorite ID to the allGames dataset
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
      <footer className="border-t border-border/50 mt-12 sm:mt-20 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Bit Legends •{' '}
            <a
              href="https://miltonr87.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Milton Rodrigues - 2025
            </a>
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            All games are property of their respective owners!
          </p>
        </div>
      </footer>
    </div>
  );
}

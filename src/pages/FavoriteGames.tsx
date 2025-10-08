import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteGame {
  id: string;
  title: string;
  cover?: string | null;
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

        // ✅ fallback: load local cover if missing
        const withLocalCovers = favList.map((g) => ({
          ...g,
          cover: g.cover || `/assets/covers/${g.id}.jpg`,
        }));

        setFavorites(withLocalCovers);
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
        <Gamepad2 className="h-10 w-10 text-accent mb-3 animate-pulse" />
        <p className="text-muted-foreground">Loading your favorite games...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* ✅ Hero Section */}
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
              Favorites
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            All your favorites games in one place — jump right back into battle!
          </p>
        </div>
      </section>

      {/* ✅ Games Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              You haven’t added any favorite games yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-slide-up">
            <AnimatePresence>
              {favorites.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group rounded-xl overflow-hidden border-2 border-accent/20 bg-card/90 hover:border-accent/40 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(0,255,200,0.1)]"
                >
                  {/* Cover */}
                  <Link to={`/game/${game.id}`}>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={game.cover}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h2 className="text-sm sm:text-lg font-bold text-white truncate drop-shadow-md">
                          {game.title}
                        </h2>
                        {game.addedAt && (
                          <p className="text-xs text-white/70 mt-1">
                            Added on{' '}
                            {new Date(game.addedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFavorite(game.id)}
                    className="absolute top-2 right-2 bg-black/70 text-red-500 p-1.5 rounded-full hover:bg-red-600/80 hover:text-white transition"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ✅ Footer */}
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

import { Link } from 'react-router-dom';
import { Gamepad2, User, FolderHeart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AboutDialog } from '@/components/AboutDialog';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const Header = () => {
  const [user, setUser] = useState<{
    username: string;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('bitlegends_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const updatedUser = {
          username: firebaseUser.displayName || 'Player',
          avatar_url: firebaseUser.photoURL,
        };
        localStorage.setItem('bitlegends_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        localStorage.removeItem('bitlegends_user');
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-3 h-16 flex items-center justify-between gap-3 sm:gap-10">
        <Link to="/" className="flex items-center gap-2 sm:gap-4 group min-w-0">
          <div className="relative shrink-0">
            <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent group-hover:text-accent/80 transition-colors" />
            <div className="absolute inset-0 blur-xl bg-accent/30 group-hover:bg-accent/40 transition-all" />
          </div>
          <h1
            className="font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent 
             text-lg sm:text-2xl leading-tight 
             max-sm:text-[clamp(1rem,4vw,1.4rem)] max-sm:truncate"
          >
            Bit Legends
          </h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 shrink-0">
          <AboutDialog />
          <Link to="/netplay">
            <Button
              variant="outline"
              size="sm"
              className="border-accent/50 hover:bg-accent/10 px-2 sm:px-3 flex items-center gap-2 transition-all hover:shadow-[0_0_10px_rgba(0,255,255,0.25)]"
            >
              <Globe className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline font-medium">Netplay</span>
            </Button>
          </Link>
          {user && (
            <Link to="/favorites">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/50 hover:bg-accent/10 px-2 sm:px-3 flex items-center gap-2"
              >
                <FolderHeart className="h-4 w-4 text-accent" />
                <span className="hidden sm:inline font-medium">Favorites</span>
              </Button>
            </Link>
          )}
          <Link to="/profile">
            <Button
              variant="outline"
              size="sm"
              className="border-accent/50 hover:bg-accent/10 px-2 sm:px-3 flex items-center gap-1 sm:gap-2 sm:max-w-none"
            >
              {user?.avatar_url ? (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback>
                    {user.username?.charAt(0).toUpperCase() || (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-4 w-4 text-accent" />
              )}
              <span className="hidden sm:inline font-medium truncate max-w-[120px]">
                {user ? user.username || 'Profile' : 'Sign In'}
              </span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

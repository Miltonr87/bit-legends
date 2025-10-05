import { Link } from 'react-router-dom';
import { Gamepad2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AboutDialog } from '@/components/AboutDialog';

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
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent group-hover:text-accent/80 transition-colors" />
            <div className="absolute inset-0 blur-xl bg-accent/30 group-hover:bg-accent/40 transition-all" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Bit Legends
          </h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <AboutDialog />
          <Link to="/profile">
            <Button
              variant="outline"
              size="sm"
              className="border-accent/50 hover:bg-accent/10 px-2 sm:px-3 flex items-center gap-2"
            >
              {user?.avatar_url ? (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback>
                    {user.username?.charAt(0).toUpperCase() || (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-4 w-4 sm:mr-1 text-accent" />
              )}
              <span className="hidden sm:inline">
                {user ? user.username || 'Profile' : 'Sign In'}
              </span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

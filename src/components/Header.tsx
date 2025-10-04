import { Link } from 'react-router-dom';
import { Gamepad2, User, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    // Load user data from localStorage (set by /profile)
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
        {/* Logo / Home */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent group-hover:text-accent/80 transition-colors" />
            <div className="absolute inset-0 blur-xl bg-accent/30 group-hover:bg-accent/40 transition-all" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold glow-text bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            BitLegends
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {/* About Dialog */}
          <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent px-2 sm:px-4"
              >
                <Info className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">About</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl glow-text">
                  About BitLegends
                </DialogTitle>
                <DialogDescription className="text-base pt-4 space-y-4">
                  <p>
                    BitLegends is a retro gaming platform where you can play
                    classic arcade and console games right in your browser.
                    Relive the golden age of gaming!
                  </p>

                  <div className="pt-2">
                    <h4 className="font-semibold text-accent mb-2">
                      Tech Stack:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>React 18 with TypeScript</li>
                      <li>Vite for blazing fast builds</li>
                      <li>Tailwind CSS for styling</li>
                      <li>Shadcn UI components</li>
                      <li>React Router for navigation</li>
                      <li>EmulatorJS for games</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-semibold text-accent mb-2">
                      Features:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Play classic games instantly</li>
                      <li>Track your gameplay history locally</li>
                      <li>Fully responsive design</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Profile / Avatar */}
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

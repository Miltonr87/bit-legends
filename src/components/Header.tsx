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
import { motion } from 'framer-motion';

export const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
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
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/90 supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto px-3 sm:px-6 h-[68px] sm:h-16 flex items-center justify-between">
        {/* Logo / Home */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group relative z-10"
        >
          <div className="relative flex items-center justify-center">
            <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent group-hover:text-accent/80 transition-colors relative z-10" />
            <div className="absolute inset-0 blur-lg bg-accent/30 group-hover:bg-accent/40 transition-all rounded-full" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent tracking-tight">
            BitLegends
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-4 relative z-10">
          {/* About Dialog */}
          <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent px-2 sm:px-4 flex items-center justify-center"
              >
                <Info className="h-4 w-4 sm:mr-2 shrink-0" />
                <span className="hidden sm:inline">About</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-background to-secondary/30 border border-border/50 shadow-[0_0_25px_rgba(0,255,200,0.1)]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-primary mb-4">
                  About BitLegends
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground space-y-5 leading-relaxed">
                  <p>
                    <strong className="text-primary">BitLegends</strong> is a
                    retro-inspired gaming platform that revives the nostalgia of
                    arcade and console classics — all playable directly in your
                    browser. Built for dreamers who grew up with the 8-bit and
                    16-bit era of console adventures.
                  </p>

                  <p>
                    Every detail is designed with love for the golden age of
                    gaming, while leveraging modern web technology for speed,
                    style, and immersion.
                  </p>

                  <div>
                    <h4 className="font-semibold text-accent mb-3">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        'React 18',
                        'TypeScript',
                        'Vite',
                        'Tailwind CSS',
                        'Shadcn UI',
                        'Framer Motion',
                        'Radix UI',
                        'html2canvas',
                        'Lucide React',
                        'EmulatorJS',
                      ].map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium cursor-default"
                          whileHover={{ scale: 1.1, rotate: 1.5 }}
                          transition={{ type: 'spring', stiffness: 180 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 text-center">
                    <p className="text-sm">
                      Created by{' '}
                      <a
                        href="https://miltonr87.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent font-medium hover:underline hover:text-primary transition-colors"
                      >
                        Milton Rodrigues
                      </a>
                    </p>
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
              className="border-accent/50 hover:bg-accent/10 px-2 sm:px-3 flex items-center gap-2 backdrop-blur-sm"
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
              <span className="hidden sm:inline truncate max-w-[120px]">
                {user ? user.username || 'Profile' : 'Sign In'}
              </span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

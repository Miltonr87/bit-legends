import { Calendar, Users, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LogoGame } from '@/components/LogoGame';
import { ControllerSetup } from './ControllerSetup';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { Game } from '@/types';

interface GameSidebarProps {
  game: Game;
}

export const GameSidebar = ({ game }: GameSidebarProps) => {
  const isMobile = useIsMobile();

  return (
    <aside className="space-y-4 sm:space-y-6">
      <LogoGame
        logoUrl={game.logo}
        title={game.title}
        backgroundColor="linear-gradient(135deg, #0f172a, #1e293b)"
      />
      <Card className="p-4 sm:p-6 border-2 border-accent/30 bg-gradient-to-br from-card to-card/50">
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <Calendar className="h-5 w-5 text-accent mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Release Year</p>
              <p className="font-semibold text-lg">{game.year}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <Gamepad2 className="h-5 w-5 text-accent mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-semibold text-lg">{game.genre}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-border">
            <Users className="h-5 w-5 text-accent mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Players</p>
              <p className="font-semibold text-lg">{game.players}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 flex items-center justify-center mt-1">
              <div className="h-3 w-3 rounded-full bg-accent animate-glow-pulse" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Developer</p>
              <p className="font-semibold">{game.developer}</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
        <h3 className="font-bold text-lg mb-3 text-primary">Platform</h3>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-bold text-primary">{game.platform}</p>
            <p className="text-xs text-muted-foreground">{game.publisher}</p>
          </div>
        </div>
      </Card>
      {!isMobile && <ControllerSetup />}
    </aside>
  );
};

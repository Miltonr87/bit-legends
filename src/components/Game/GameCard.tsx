import { Link } from 'react-router-dom';
import { Game } from '@/types';
import { Calendar, Gamepad } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link to={`/game/${game.id}`}>
      <Card className="group game-card-hover overflow-hidden bg-card border-2 border-border hover:border-accent h-full flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          {game.coverImage && (
            <img
              src={game.coverImage}
              alt={game.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>
        <div className="p-3 space-y-2 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {game.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{game.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gamepad className="h-3 w-3" />
              <span>{game.platform}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

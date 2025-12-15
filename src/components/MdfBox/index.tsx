import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import type { Game } from '@/types';

interface MdfBoxProps {
  game: Game;
}

export const MdfBox = ({ game }: MdfBoxProps) => {
  const handleOpenWhatsApp = () => {
    const message = `
Olá! Gostaria de saber se o diorama em MDF do jogo "${game.title}" está disponível.

Hi! I’d like to know if the MDF diorama for the game "${game.title}" is available.
    `.trim();

    const phone = '5582981122732'; // seu número com DDI + DDD
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <Card className="border-2 border-accent/40 bg-card overflow-hidden max-w-md mx-auto mt-8 text-center">
      <div className="p-4 border-b border-accent/30">
        <h2 className="text-2xl font-bold text-accent drop-shadow">
          {game.title}
        </h2>
      </div>
      <div className="relative">
        <img
          src={game?.mdf}
          alt={`MDF Diorama ${game.title}`}
          className="w-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm text-foreground/90 leading-relaxed">
          High-quality MDF diorama with retro pixel art design and 3D depth
          effect. Perfect for collectors and fans of {game.title}.
        </p>
        <p className="text-accent font-bold text-lg">R$ 70,00 + shipping</p>
        <Button
          onClick={handleOpenWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-xl py-2 transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          Buy Here
        </Button>
      </div>
    </Card>
  );
};

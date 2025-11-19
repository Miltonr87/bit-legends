import { Calendar, Users, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LogoGame } from '@/components/Game/LogoGame';
import { GameController } from '@/components/Game/GameController';
import { useIsMobile } from '@/hooks/useIsMobile';

import arcadeLogo from '../../../public/assets/platforms/arcade.png';
import genesisLogo from '../../../public/assets/platforms/genesis.png';
import snesLogo from '../../../public/assets/platforms/snes.png';

import { motion } from 'framer-motion';
import type { Game } from '@/types';

// ---------------------------
// Platform Name → Logo Mapping
// ---------------------------
const PLATFORM_LOGO_MAP: Record<string, string> = {
  Arcade: arcadeLogo,
  SNES: snesLogo,
  Genesis: genesisLogo,
};

// ---------------------------
// Platform Alias Mapping
// ---------------------------
const PLATFORM_MAP: Record<string, keyof typeof PLATFORM_LOGO_MAP> = {
  Nintendo: 'SNES',
  SNES: 'SNES',
  NES: 'SNES',
  'Sega CD': 'Genesis',
  Genesis: 'Genesis',
  'Mega Drive': 'Genesis',
  Arcade: 'Arcade',
  GBA: 'Arcade',
  'Game Boy Advance': 'Arcade',
  PlayStation: 'Arcade',
  PSX: 'Arcade',
  PS1: 'Arcade',
};

// Background used in LogoGame
const PANEL_BACKGROUND = 'linear-gradient(135deg, #1e1e2f, #2c2c54)';

// ---------------------------
// Sidebar Component
// ---------------------------
interface GameSidebarProps {
  game: Game;
}

export const GameSidebar = ({ game }: GameSidebarProps) => {
  const isMobile = useIsMobile();

  // Resolve logo
  const platformKey =
    PLATFORM_MAP[game.platform.trim()] ||
    Object.keys(PLATFORM_MAP).find((p) =>
      game.platform.toLowerCase().includes(p.toLowerCase())
    ) ||
    'Arcade';

  const platformLogo = PLATFORM_LOGO_MAP[platformKey] || arcadeLogo;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <aside className="space-y-4 sm:space-y-6">
        <LogoGame
          logoUrl={game.logo}
          title={game.title}
          backgroundColor="linear-gradient(135deg, #1e1e2f, #2c2c54)"
        />

        {/* INFO CARD */}
        <Card className="p-4 sm:p-6 border-2 border-accent/30 bg-gradient-to-br from-card to-card/40 rounded-2xl backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
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
                <p className="text-sm text-muted-foreground">Category</p>
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
        <Card
          className="p-6 border-2 border-accent/30 rounded-2xl backdrop-blur-sm hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 flex justify-center"
          style={{ background: PANEL_BACKGROUND }}
        >
          <img
            src={platformLogo}
            alt={`${game.platform} Logo`}
            className="object-contain w-full h-12 drop-shadow-md"
          />
        </Card>
        {!isMobile && <GameController />}
      </aside>
    </motion.div>
  );
};

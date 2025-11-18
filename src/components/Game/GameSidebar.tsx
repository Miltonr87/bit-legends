import { Calendar, Users, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LogoGame } from '@/components/Game/LogoGame';
import { GameController } from '@/components/Game/GameController';
import { useIsMobile } from '@/hooks/useIsMobile';

import { motion } from 'framer-motion';
import type { Game } from '@/types';

const PLATFORM_STYLES: Record<
  string,
  { border: string; bg: string; text: string; shadow: string }
> = {
  Arcade: {
    border: 'border-green-500/50',
    bg: 'from-green-900/60 via-green-800/40 to-green-950/60',
    text: 'text-green-300',
    shadow: 'shadow-[0_0_25px_rgba(74,222,128,0.35)]',
  },
  SNES: {
    border: 'border-pink-500/50',
    bg: 'from-pink-900/60 via-pink-800/40 to-pink-950/60',
    text: 'text-pink-300',
    shadow: 'shadow-[0_0_25px_rgba(249,168,212,0.35)]',
  },
  Genesis: {
    border: 'border-blue-500/50',
    bg: 'from-blue-900/60 via-blue-800/40 to-blue-950/60',
    text: 'text-blue-300',
    shadow: 'shadow-[0_0_25px_rgba(147,197,253,0.35)]',
  },
};

const PLATFORM_MAP: Record<string, keyof typeof PLATFORM_STYLES> = {
  Nintendo: 'SNES',
  SNES: 'SNES',
  NES: 'NES',
  'Sega CD': 'Genesis',
  Genesis: 'Genesis',
  'Mega Drive': 'Genesis',
  Arcade: 'Arcade',
  GBA: 'GBA',
  'Game Boy Advance': 'GBA',
  PlayStation: 'PlayStation',
  PSX: 'PlayStation',
  PS1: 'PlayStation',
};

const getPlatformTheme = (platform: string) => {
  const key =
    PLATFORM_MAP[platform.trim()] ||
    Object.keys(PLATFORM_MAP).find((p) =>
      platform.toLowerCase().includes(p.toLowerCase())
    );
  return PLATFORM_STYLES[key ? PLATFORM_MAP[key] : 'Arcade'];
};

interface GameSidebarProps {
  game: Game;
}

export const GameSidebar = ({ game }: GameSidebarProps) => {
  const isMobile = useIsMobile();
  const theme = getPlatformTheme(game.platform);

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
          backgroundColor="linear-gradient(135deg, #0f172a, #1e293b)"
        />
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
        {!isMobile && (
          <Card
            className={`p-6 border-2 ${theme.border} bg-gradient-to-br ${theme.bg} rounded-2xl ${theme.shadow} transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/20`}
          >
            <h3 className={`font-bold text-lg mb-3 ${theme.text}`}>Platform</h3>
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center border ${theme.border} bg-black/20`}
              >
                <Gamepad2 className={`h-6 w-6 ${theme.text}`} />
              </div>
              <div>
                <p className={`font-bold text-lg ${theme.text}`}>
                  {game.platform}
                </p>
                <p className="text-xs text-gray-300">{game.publisher}</p>
              </div>
            </div>
          </Card>
        )}
        {!isMobile && <GameController />}
      </aside>
    </motion.div>
  );
};

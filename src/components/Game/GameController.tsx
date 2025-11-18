import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Gamepad2, Keyboard } from 'lucide-react';
import gamepad from '../../../public/assets/backgrounds/controller_min.jpg';

export const GameController = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 border-2 border-accent/30 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-6 w-6 text-accent animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Controller
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground pr-2">
            <Keyboard className="h-4 w-4" />
            Keyboard Default
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border-2 border-accent/20 shadow-xl">
          <img
            src={gamepad}
            alt="Gamepad Illustration"
            className="object-cover w-full h-[200px] sm:h-[340px]"
          />
        </div>
      </Card>
    </motion.div>
  );
};

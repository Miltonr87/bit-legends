import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface LogoGameProps {
  logoUrl?: string;
  backgroundColor?: string;
  title?: string;
}

export const LogoGame = ({
  logoUrl,
  backgroundColor = 'linear-gradient(135deg, #1e1e2f, #2c2c54)',
  title,
}: LogoGameProps) => {
  if (!logoUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="p-6 border-2 border-accent/30 bg-gradient-to-br from-card/80 to-background/50
                   shadow-lg hover:shadow-accent/30 transition-all duration-300 rounded-2xl"
        style={{ background: backgroundColor }}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <img
            src={logoUrl}
            alt={title || 'Game Logo'}
            className="max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          />
        </div>
      </Card>
    </motion.div>
  );
};

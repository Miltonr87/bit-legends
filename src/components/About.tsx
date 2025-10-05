import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* 🔲 Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* 💡 Modal */}
        <motion.div
          className="relative w-[92vw] sm:w-full max-w-[380px] sm:max-w-[640px] max-h-[85vh] overflow-y-auto rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-b from-background/95 to-secondary/30 shadow-[0_0_25px_rgba(0,255,200,0.1)] p-4 sm:p-8 backdrop-blur-lg"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ❌ Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* 🧩 Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-2">
              About BitLegends
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A modern web arcade built to relive the <b>16-bit era</b> —
              powered by open web tech, retro design, and pixel-perfect passion.
            </p>
          </div>

          {/* 📖 Description */}
          <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-accent">BitLegends</strong> is a
              retro-inspired gaming platform that lets you play classic titles
              right from your browser — no downloads, no ads, just pure
              nostalgia.
            </p>

            <p>
              Designed with love for the golden age of gaming and modernized
              with sleek UI, responsive layouts, and smooth animations.
            </p>

            {/* 🧠 Tech Stack */}
            <div className="pt-2">
              <h3 className="font-semibold text-accent mb-3 text-center sm:text-left">
                Project Tech Stack
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {[
                  'React 18',
                  'TypeScript',
                  'Vite',
                  'Tailwind CSS',
                  'Shadcn UI',
                  'Framer Motion',
                  'Radix UI',
                  'Lucide Icons',
                  'html2canvas',
                  'EmulatorJS',
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium select-none"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* 👤 Footer */}
          <div className="pt-6 mt-6 border-t border-border/40 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1">
              Created by{' '}
              <a
                href="https://miltonr87.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                Milton Rodrigues
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

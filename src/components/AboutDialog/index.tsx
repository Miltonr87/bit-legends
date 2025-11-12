import { useState } from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const AboutDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="text-center hover:text-accent px-3 sm:px-4 sm:text-base text-sm"
        >
          <Info className="h-6 w-6 sm:h-5 sm:w-5 sm:mr-2" />
          <span className="hidden sm:inline">About</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[90vw] max-w-md sm:max-w-lg bg-gradient-to-b from-background to-secondary/30 
                   border border-border/50 shadow-lg rounded-2xl overflow-y-auto max-h-[85vh] 
                   p-6 sm:p-8 scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary mb-4">
            About
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground space-y-5 leading-relaxed text-left">
            <p>
              <strong className="text-primary">Bit Legends</strong> is a
              retro-gaming platform that revives the nostalgia of arcade and
              console classics: all playable directly in your browser. Built for
              dreamers who grew up with the 16-bit golden era.
            </p>
            <div>
              <h4 className="font-semibold text-accent mb-3">
                Project Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'ReactJS',
                  'TypeScript',
                  'Tailwind CSS',
                  'Framer Motion',
                  'EmulatorJS',
                  'Firebase',
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium cursor-default"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                <a
                  href="https://miltonr87.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors font-medium flex items-center gap-1"
                >
                  Milton Rodrigues
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

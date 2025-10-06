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
          className="text-center hover:text-accent px-2 sm:px-4"
        >
          <Info className="h-5 w-5 sm:mr-2" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[40vh] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-background to-secondary/30 border border-border/50 shadow-lg">
        <DialogHeader>
          <DialogTitle className=" text-center text-2xl font-bold text-primary mb-4">
            About
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground space-y-5 leading-relaxed text-left">
            <p>
              <strong className="text-primary">Bit Legends</strong> is a
              retro-inspired gaming platform that revives the nostalgia of
              arcade and console classics. All playable directly in your
              browser. Built for dreamers who grew up with the 16-bit era of
              console adventures.
            </p>
            <div>
              <h4 className="font-semibold text-accent mb-3">
                Project Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'ReactJS',
                  'TypeScript',
                  'Vite',
                  'Tailwind CSS',
                  'Shadcn UI',
                  'Framer Motion',
                  'Radix UI',
                  'Lucide React',
                  'EmulatorJS',
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

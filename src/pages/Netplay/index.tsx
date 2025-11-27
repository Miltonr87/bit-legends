import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { RoomList } from '@/components/RoomList';

export default function Netplay() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 flex flex-col items-center text-center space-y-12">
        <section className="flex flex-col items-center justify-center space-y-5">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-accent drop-shadow-md">
            Multiplayer Games
          </h1>
          <p className="max-w-2xl text-muted-foreground text-base sm:text-lg mx-auto leading-relaxed">
            Bit Legends now supports{' '}
            <span className="text-primary font-semibold">
              EmulatorJS Netplay
            </span>{' '}
            — join or host live retro multiplayer sessions, all directly from
            your browser.
          </p>
        </section>
        <section className="w-full max-w-3xl animate-fade-in-up">
          <RoomList />
        </section>
        <Card className="w-full max-w-2xl p-8 border border-border/60 bg-muted/10 rounded-2xl text-left leading-relaxed shadow-[0_0_25px_rgba(0,255,255,0.05)] backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-accent flex items-center gap-2 mb-5">
            <Info className="h-5 w-5 text-primary" /> How Netplay Works
          </h3>

          <ul className="list-decimal list-inside space-y-3 text-muted-foreground/90 text-base leading-relaxed">
            <li>
              <strong>Create or Join a Room</strong> inside the{' '}
              <strong>Netplay</strong> tab of the game and pick the closest
              server region (e.g. Brazil, USA, Japan) for the lowest possible
              latency.
            </li>

            <li>
              <strong>Share your Game Link or this page</strong> with your
              friends and tell them your <strong>room name</strong>.
            </li>

            <li>
              Once they open the game link, they should start and then select
              the <strong>Netplay</strong> option to find the same room.
            </li>

            <li>
              The <strong>host</strong> is always <strong>Player 1</strong> and
              can manage player slots before starting the match.
            </li>

            <li>
              Enjoy seamless <strong>cross-platform play</strong>: works
              flawlessly on both desktop and mobile with zero setup required.
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground italic text-center">
            Tip: Bit Legends automatically detects your best region for smoother
            gameplay.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

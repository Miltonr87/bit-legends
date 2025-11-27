'use client';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Info, Globe } from 'lucide-react';
import { RoomList } from '@/components/RoomList';

export default function Netplay() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      <Header />
      <section
        className="relative py-10 sm:py-14 px-4 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/backgrounds/retro-grid2.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          animation: 'parallaxScroll 60s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 scanline pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <Globe className="inline-block h-20 w-20 text-accent mb-2 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              Netplay Lobby
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bit Legends supports{' '}
            <span className="text-primary font-semibold">
              EmulatorJS Netplay
            </span>
            : join or host live retro multiplayer sessions directly from your
            browser in real time.
          </p>
        </div>
      </section>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-10 sm:py-12 animate-fade-in-up">
          <RoomList />
        </section>
        <section className="container mx-auto px-4 pb-16">
          <Card className="w-full max-w-2xl mx-auto p-8 border border-border/60 bg-muted/10 rounded-2xl text-left leading-relaxed shadow-[0_0_25px_rgba(0,255,255,0.05)] backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-accent flex items-center gap-2 mb-5">
              <Info className="h-5 w-5 text-primary" /> How Netplay Works
            </h3>

            <ul className="list-decimal list-inside space-y-3 text-muted-foreground/90 text-base leading-relaxed">
              <li>
                <strong>Create or Join a Room</strong> inside the{' '}
                <strong>Netplay</strong> tab of your selected game.
              </li>

              <li>
                <strong>Share the Game link page</strong> with your friends or
                tell them your <strong>room name</strong>.
              </li>

              <li>
                Once they open the game, they can access{' '}
                <strong>Netplay</strong> to connect to your room.
              </li>

              <li>
                The <strong>host</strong> is always <strong>Player 1</strong>{' '}
                and manages player slots before the game begins.
              </li>

              <li>
                Works seamlessly across <strong>desktop and mobile</strong>{' '}
                (cross-platform play with zero setup required).
              </li>
            </ul>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}

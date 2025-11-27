import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Globe } from 'lucide-react';
import { RoomList } from '@/components/RoomList';

export default function Netplay() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      <Header />
      <section
        className="relative py-10 sm:py-14 px-4 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/backgrounds/retro-grid.png')",
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
            Host or join retro game sessions directly from your browser.
          </p>
        </div>
      </section>
      <main className="flex-grow">
        <section className="animate-fade-in-up px-4 sm:px-6 md:px-10">
          <RoomList />
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { RoomList } from '@/components/RoomList';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function Netplay() {
  const { user, loginWithGoogle } = useUserProfile();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 flex flex-col items-center text-center space-y-10">
        <section className="flex flex-col items-center justify-center space-y-5">
          <img
            src="/assets/backgrounds/bitlegends_min.jpg"
            alt="Bit Legends Logo"
            className="w-[180px] sm:w-[220px] rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.15)] border border-border/50"
          />
          {user ? (
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-accent drop-shadow-lg tracking-tight">
                Hi, {user.username}!
              </h1>
              <p className="max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
                Bit Legends now supports{' '}
                <span className="text-primary font-semibold">
                  EmulatorJS Netplay
                </span>
                . Team up with friends worldwide and play directly from your
                browser!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-accent drop-shadow-md">
                Play Online with Friends
              </h1>
              <p className="max-w-2xl text-muted-foreground text-base sm:text-lg mx-auto">
                Bit Legends now supports{' '}
                <span className="text-primary font-semibold">
                  EmulatorJS Netplay
                </span>
                ! Sign in below to see rooms and start playing.
              </p>
              <button
                onClick={loginWithGoogle}
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground text-base font-medium hover:bg-primary/80 transition-all shadow-lg"
              >
                Sign in with Google
              </button>
            </>
          )}
        </section>
        <section className="w-full max-w-3xl animate-fade-in-up">
          <RoomList />
        </section>
        <Card className="w-full max-w-2xl p-8 border border-border/60 bg-muted/10 rounded-2xl text-left leading-relaxed shadow-[0_0_25px_rgba(0,255,255,0.05)] backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-accent flex items-center gap-2 mb-5">
            <Info className="h-5 w-5 text-primary" /> How Netplay Works
          </h3>

          <ul className="list-decimal list-inside space-y-3 text-muted-foreground/90 text-base">
            <li>
              <strong>Create or Join a Room</strong> — choose the nearest region
              for best latency (e.g., Brazil, USA, Japan).
            </li>
            <li>
              Share your <strong>room link</strong> with friends to join
              instantly.
            </li>
            <li>
              Ensure everyone uses the same <strong>ROM version</strong> for
              sync.
            </li>
            <li>
              The <strong>host controls Player 1</strong> and can assign others
              before starting.
            </li>
            <li>Works on desktop and mobile — no installs needed.</li>
          </ul>

          <p className="mt-6 text-sm text-muted-foreground italic text-center">
            💡 Tip: Bit Legends auto-detects the best region and ping for your
            connection.
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

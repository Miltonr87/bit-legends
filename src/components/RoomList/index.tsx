'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { allGames } from '@/data';

interface NetplayRoom {
  id: string;
  name: string;
  server: string;
  password: boolean;
  players: number;
  url: string;
  rom: string;
  system: string;
}

const regionFlags: Record<string, string> = {
  us: '🇺🇸',
  us2: '🇺🇸',
  us3: '🇺🇸',
  uk: '🇬🇧',
  nl: '🇳🇱',
  es: '🇪🇸',
  au: '🇦🇺',
  br: '🇧🇷',
  jp: '🇯🇵',
};

export function RoomList() {
  const [rooms, setRooms] = useState<NetplayRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchRooms = async () => {
      try {
        const res = await fetch('https://lobby.emulatorjs.com/list');
        const data: NetplayRoom[] | { rooms?: NetplayRoom[] } =
          await res.json();
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data.rooms)
          ? data.rooms
          : [];
        const filtered = normalized.filter((room) => {
          const urlSegments = room.url.split('/');
          const lastPart = urlSegments[urlSegments.length - 1]
            ?.replace('#', '')
            ?.trim();
          return allGames.some((game) => game.embedUrl?.includes(lastPart));
        });

        setRooms(filtered);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchRooms();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchRooms, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const getFlag = (region: string) => {
    const code = region?.toLowerCase().replace(/\d+/g, '');
    return regionFlags[code] || '🌍';
  };

  if (loading)
    return (
      <div className="w-full max-w-2xl text-center text-muted-foreground animate-pulse">
        Loading active rooms...
      </div>
    );

  if (!rooms.length)
    return (
      <div className="mt-10 w-full max-w-3xl mx-auto p-8 border border-border/60 rounded-2xl bg-card/70 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,255,0.08)] flex flex-col items-center text-center space-y-5">
        <h3 className="text-2xl font-bold text-accent">
          No Active Rooms Found!
        </h3>
        <p className="text-muted-foreground text-base max-w-md leading-relaxed">
          There are no multiplayer rooms right now. You can create one by
          launching any game, opening the <strong>Netplay</strong> tab in the
          emulator, and choosing a region to host your room.
        </p>
      </div>
    );

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto border border-border/60 rounded-2xl bg-card/70 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,255,0.08)] p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]">
      <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-5 text-center tracking-tight">
        Active Rooms
      </h3>

      <div className="overflow-x-auto rounded-xl border border-border/40">
        <table className="w-full text-sm sm:text-base border-collapse min-w-[600px]">
          <thead className="bg-accent/10 text-muted-foreground border-b border-border/50">
            <tr className="text-left">
              <th className="py-3 px-3">Room</th>
              <th className="py-3 px-3">Game</th>
              <th className="py-3 px-3">Players</th>
              <th className="py-3 px-3 text-center">Server</th>
              <th className="py-3 px-3 text-center">Private</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              const urlSegments = room.url.split('/');
              const lastPart = urlSegments[urlSegments.length - 1]
                ?.replace('#', '')
                ?.trim();
              const matchedGame = allGames.find((game) =>
                game.embedUrl?.includes(lastPart)
              );
              if (!matchedGame) return null;
              const gameLink = `${window.location.origin}/game/${matchedGame.id}`;
              return (
                <tr
                  key={room.id}
                  className="border-b border-border/30 hover:bg-accent/5 transition-colors"
                >
                  <td className="py-3 px-3 font-medium text-foreground truncate">
                    {room.name || '—'}
                  </td>
                  <td className="py-3 px-3 flex items-center gap-3 min-w-[200px]">
                    <img
                      src={matchedGame.coverImage}
                      alt={matchedGame.title}
                      className="w-10 h-10 rounded-md border border-border/40 object-cover shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground leading-tight">
                        {matchedGame.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {matchedGame.genre}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-foreground/80">
                    {room.players}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-lg">{getFlag(room.server)}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-foreground/70">
                    {room.password ? 'Yes' : 'No'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="px-5 py-1.5 text-sm font-medium bg-accent/20 hover:bg-accent/30 text-accent-foreground rounded-lg hover:scale-105 transition-transform"
                      onClick={() => window.open(gameLink, '_blank')}
                    >
                      Join
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
        Scroll horizontally to see all columns →
      </div>
    </div>
  );
}

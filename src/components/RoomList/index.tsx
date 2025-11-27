'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface NetplayRoom {
  id: string;
  name: string;
  server: string;
  password: boolean;
  players: number;
}

// ✅ Servers supported in your setup
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
    fetch('https://lobby.emulatorjs.com/list')
      .then((res) => res.json())
      .then((data: NetplayRoom[] | { rooms?: NetplayRoom[] }) => {
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data.rooms)
          ? data.rooms
          : [];
        setRooms(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      <div className="w-full max-w-2xl text-center text-muted-foreground">
        No active rooms right now.
      </div>
    );

  return (
    <div className="mt-8 w-full max-w-3xl border border-border/70 rounded-2xl bg-card/60 backdrop-blur-sm shadow-[0_0_25px_rgba(0,255,255,0.05)] p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.12)]">
      <h3 className="text-2xl font-bold text-accent mb-6 text-center">
        Active Rooms
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base border-collapse">
          <thead className="text-muted-foreground border-b border-border/70">
            <tr className="text-left">
              <th className="py-3 px-2">Room</th>
              <th className="py-3 px-2">Players</th>
              <th className="py-3 px-2">Server</th>
              <th className="py-3 px-2">Private</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b border-border/30 hover:bg-accent/5 transition-colors"
              >
                <td className="py-3 px-2 font-medium text-foreground/90 truncate">
                  {room.name}
                </td>
                <td className="py-3 px-2 text-foreground/70">{room.players}</td>
                <td className="py-3 px-2 flex items-center gap-2 text-foreground/80">
                  <span className="text-lg">{getFlag(room.server)}</span>
                  <span className="uppercase tracking-wide font-medium">
                    {room.server}
                  </span>
                </td>
                <td className="py-3 px-2 text-foreground/70">
                  {room.password ? 'Yes' : 'No'}
                </td>
                <td className="py-3 px-2 text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="px-4 py-1.5 text-sm font-medium hover:scale-105 transition-transform"
                    onClick={() => {
                      // ✅ Redirect to retrogames or embed emulator
                      const joinUrl = `https://www.retrogames.cc/?room=${encodeURIComponent(
                        room.id
                      )}`;
                      window.open(joinUrl, '_blank');
                    }}
                  >
                    Join
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

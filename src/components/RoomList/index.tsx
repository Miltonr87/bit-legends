import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { allGames } from '@/data';
import {
  Lock,
  Unlock,
  ListVideo,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

export function RoomList() {
  const [rooms, setRooms] = useState<NetplayRoom[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = rooms.slice(startIndex, startIndex + roomsPerPage);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const fetchRooms = async () => {
      try {
        const res = await axios.get('https://lobby.emulatorjs.com/list');
        const data: NetplayRoom[] | { rooms?: NetplayRoom[] } = res.data;
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data.rooms)
          ? data.rooms
          : [];
        const filtered = normalized.filter((room) => {
          const lastPart = room.url
            .split('/')
            .pop()
            ?.replace('#', '')
            .trim()
            .toLowerCase();
          const isKnownGame = allGames.some((g) =>
            g.embedUrl?.toLowerCase().includes(lastPart || '')
          );
          const isSportsGame = allGames.some(
            (g) => g.id.toLowerCase() === lastPart
          );
          return isKnownGame || isSportsGame;
        });
        setRooms(filtered);
      } catch (error) {
        console.error('Failed to load rooms:', error);
        setRooms([]);
      }
    };
    fetchRooms();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchRooms, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const getFlag = (region: string) => {
    const code = region?.toLowerCase().replace(/\d+/g, '');
    const validCodes = ['us', 'uk', 'nl', 'es', 'au', 'br', 'jp'];
    const countryCode = code === 'uk' ? 'gb' : code;
    if (validCodes.includes(code)) {
      return (
        <img
          src={`https://flagcdn.com/w20/${countryCode}.png`}
          alt={countryCode.toUpperCase()}
          className="inline-block w-4 h-3 rounded object-cover sm:w-5 sm:h-4"
        />
      );
    }
    return (
      <img
        src="https://flagcdn.com/w20/un.png"
        alt="Unknown"
        className="inline-block w-4 h-3 rounded object-cover sm:w-5 sm:h-4 opacity-70"
      />
    );
  };

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto space-y-6">
      <div className="border border-border/60 rounded-2xl bg-card/70 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.08)] overflow-hidden">
        <div className="w-full flex items-center justify-between px-6 py-4 bg-accent/10">
          <div className="flex items-center gap-3">
            <ListVideo className="w-5 h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              Active Rooms
            </h3>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.35 }}
          className="p-4 sm:p-6 border-t border-border/40"
        >
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-sm sm:text-base border-collapse min-w-[600px]">
              <thead className="bg-accent/10 text-muted-foreground border-b border-border/50">
                <tr className="text-left">
                  <th className="py-3 px-3">Room</th>
                  <th className="py-3 px-3">Game</th>
                  <th className="py-3 px-3">Players</th>
                  <th className="py-3 px-3 text-center">Server</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No active rooms at the moment!
                    </td>
                  </tr>
                ) : (
                  currentRooms.map((room) => {
                    const lastPart = room.url
                      .split('/')
                      .pop()
                      ?.replace('#', '')
                      .trim()
                      .toLowerCase();
                    const game =
                      allGames.find((g) =>
                        g.embedUrl?.toLowerCase().includes(lastPart || '')
                      ) ||
                      allGames.find((g) => g.id.toLowerCase() === lastPart);
                    if (!game) return null;

                    const link = `${window.location.origin}/game/${game.id}`;
                    return (
                      <tr
                        key={room.id}
                        className={`border-b border-border/30 hover:bg-accent/5 transition-colors ${
                          room.password ? 'bg-red-500/5' : ''
                        }`}
                      >
                        <td className="py-3 px-3 font-medium text-foreground truncate">
                          {room.name || '—'}
                        </td>
                        <td className="py-3 px-3 flex items-center gap-3 min-w-[200px]">
                          <img
                            src={game.coverImage}
                            alt={game.title}
                            className="w-10 h-10 rounded-md border border-border/40 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-foreground">
                              {game.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {game.genre}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-foreground/80">
                          {room.players}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {getFlag(room.server)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {room.password ? (
                            <span className="flex items-center justify-center gap-1 text-red-400 font-medium">
                              <Lock className="w-4 h-4" /> Private
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1 text-emerald-400 font-medium">
                              <Unlock className="w-4 h-4" /> Public
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="px-5 py-1.5 text-sm font-medium bg-accent/20 hover:bg-accent/30 text-accent-foreground rounded-lg hover:scale-105 transition-transform"
                            onClick={() => window.open(link, '_blank')}
                          >
                            Join
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden grid gap-4">
            {currentRooms.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No active rooms at the moment!
              </p>
            ) : (
              currentRooms.map((room) => {
                const lastPart = room.url
                  .split('/')
                  .pop()
                  ?.replace('#', '')
                  .trim()
                  .toLowerCase();
                const game =
                  allGames.find((g) =>
                    g.embedUrl?.toLowerCase().includes(lastPart || '')
                  ) || allGames.find((g) => g.id.toLowerCase() === lastPart);
                if (!game) return null;
                const link = `${window.location.origin}/game/${game.id}`;
                return (
                  <div
                    key={room.id}
                    className="border border-border/40 rounded-xl bg-card/60 p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-12 h-12 rounded-lg border border-border/30 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {game.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {room.name || '—'}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {getFlag(room.server)} · {room.players} players ·{' '}
                          {room.password ? 'Private' : 'Public'}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-xs px-3 py-1 bg-accent/20 hover:bg-accent/30"
                      onClick={() => window.open(link, '_blank')}
                    >
                      Join
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          {rooms.length > roomsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        key="netplay-info"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5 }}
        className="text-center border border-border/50 bg-card/60 backdrop-blur-md rounded-xl py-6 px-6 shadow-[0_0_12px_rgba(0,255,255,0.08)] text-muted-foreground/90"
      >
        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          The <b>Netplay Lobby</b> lets you discover and join world games
          directly in your browser: anytime and anywhere. Create a room and
          it’ll appear here!
        </p>
      </motion.div>
    </div>
  );
}

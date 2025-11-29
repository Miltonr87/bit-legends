import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { allGames } from '@/data';
import {
  Lock,
  Unlock,
  Gamepad2,
  ListVideo,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const steps = [
  {
    image: '/assets/netplay/t1.png',
    caption:
      '1. Open the game and click on the “Netplay” tab in the bottom bar',
  },
  {
    image: '/assets/netplay/t2.png',
    caption: '2. Enter your nickname so others can identify you in the lobby',
  },
  {
    image: '/assets/netplay/t3.png',
    caption: '3. Create a room, choose your region and optional password',
  },
  {
    image: '/assets/netplay/t4.png',
    caption: '4. Once created, your friends can join your room',
  },
];

export function RoomList() {
  const [rooms, setRooms] = useState<NetplayRoom[]>([]);
  const [showRooms, setShowRooms] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = rooms.slice(startIndex, startIndex + roomsPerPage);

  const nextStep = () => setStepIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

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
          const lastPart = room.url.split('/').pop()?.replace('#', '').trim();
          return allGames.some((game) => game.embedUrl?.includes(lastPart));
        });
        setRooms(filtered);
      } catch (error) {
        console.error('Error fetching rooms:', error);
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
    return regionFlags[code] || '🌍';
  };

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto space-y-8">
      <div className="border border-border/60 rounded-2xl bg-card/70 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.08)] overflow-hidden">
        <button
          onClick={() => setShowRooms((prev) => !prev)}
          className="w-full flex items-center justify-between px-6 py-4 bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ListVideo className="w-5 h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              Active Rooms
            </h3>
          </div>
          {showRooms ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        <AnimatePresence>
          {showRooms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
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
                          .trim();
                        const matchedGame = allGames.find((g) =>
                          g.embedUrl?.includes(lastPart)
                        );
                        if (!matchedGame) return null;
                        const gameLink = `${window.location.origin}/game/${matchedGame.id}`;
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
                                src={matchedGame.coverImage}
                                alt={matchedGame.title}
                                className="w-10 h-10 rounded-md border border-border/40 object-cover"
                              />
                              <div>
                                <p className="font-semibold text-foreground">
                                  {matchedGame.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {matchedGame.genre}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-foreground/80">
                              {room.players}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="text-lg">
                                {getFlag(room.server)}
                              </span>
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
                                onClick={() => window.open(gameLink, '_blank')}
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
              <div className="sm:hidden grid grid-cols-1 gap-4 mt-4">
                {currentRooms.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 text-base">
                    No active rooms at the moment!
                  </p>
                ) : (
                  currentRooms.map((room) => {
                    const lastPart = room.url
                      .split('/')
                      .pop()
                      ?.replace('#', '')
                      .trim();
                    const matchedGame = allGames.find((g) =>
                      g.embedUrl?.includes(lastPart)
                    );
                    if (!matchedGame) return null;
                    const gameLink = `${window.location.origin}/game/${matchedGame.id}`;
                    return (
                      <div
                        key={room.id}
                        className={`p-4 rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm flex flex-col gap-3 ${
                          room.password ? 'border-red-500/60' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={matchedGame.coverImage}
                            alt={matchedGame.title}
                            className="w-14 h-14 rounded-md border border-border/40 object-cover"
                          />
                          <div>
                            <h4 className="text-base font-semibold text-accent">
                              {matchedGame.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {matchedGame.genre}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col border-t border-border/30 pt-3 text-sm text-muted-foreground">
                          <div className="flex justify-between mb-1">
                            <p>
                              <strong>Room:</strong> {room.name || '—'}
                            </p>
                            <p>
                              <strong>Players:</strong> {room.players}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p>
                              <strong>Server:</strong> {getFlag(room.server)}
                            </p>
                            {room.password ? (
                              <p className="flex items-center gap-1 text-red-400 font-medium">
                                <Lock className="w-4 h-4" /> Private
                              </p>
                            ) : (
                              <p className="flex items-center gap-1 text-emerald-400 font-medium">
                                <Unlock className="w-4 h-4" /> Public
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`w-full mt-2 rounded-lg hover:scale-105 transition-transform ${
                            room.password
                              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-100'
                              : 'bg-accent/20 hover:bg-accent/30 text-accent-foreground'
                          }`}
                          onClick={() => window.open(gameLink, '_blank')}
                        >
                          Join Game
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
          )}
        </AnimatePresence>
      </div>
      <div className="border border-border/60 rounded-2xl bg-card/70 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.08)] overflow-hidden">
        <button
          onClick={() => setShowGuide((prev) => !prev)}
          className="w-full flex items-center justify-between px-6 py-4 bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              Create a Room
            </h3>
          </div>
          {showGuide ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 pt-3 border-t border-border/40 text-base text-muted-foreground/90 leading-relaxed"
            >
              <div className="text-center">
                <div className="relative w-full max-w-3xl mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={stepIndex}
                      src={steps[stepIndex].image}
                      alt={steps[stepIndex].caption}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 20,
                        mass: 0.8,
                      }}
                      className="rounded-xl border border-accent/30 shadow-[0_0_20px_rgba(0,255,255,0.15)] mx-auto"
                    />
                  </AnimatePresence>
                  <button
                    onClick={prevStep}
                    className="absolute top-1/2 -left-4 sm:-left-10 transform -translate-y-1/2 bg-background/60 backdrop-blur-md border border-border/60 rounded-full p-2 hover:bg-accent/20 transition"
                  >
                    <ChevronLeft className="h-6 w-6 text-accent" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="absolute top-1/2 -right-4 sm:-right-10 transform -translate-y-1/2 bg-background/60 backdrop-blur-md border border-border/60 rounded-full p-2 hover:bg-accent/20 transition"
                  >
                    <ChevronRight className="h-6 w-6 text-accent" />
                  </button>
                </div>
                <p className="mt-5 text-muted-foreground text-base max-w-xl mx-auto">
                  {steps[stepIndex].caption}
                </p>
                <div className="flex justify-center mt-3 gap-2">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStepIndex(i)}
                      className={`w-3 h-3 rounded-full transition ${
                        i === stepIndex
                          ? 'bg-accent shadow-[0_0_10px_rgba(0,255,255,0.7)]'
                          : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

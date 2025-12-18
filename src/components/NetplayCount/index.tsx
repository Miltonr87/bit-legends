import { Users, Gamepad2, SquareActivity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetplayRooms } from '@/hooks/useNetplayRooms';

const fadeUp = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export function NetplayCount() {
  const { rooms } = useNetplayRooms();

  const totalRooms = rooms.length;
  const playersOnline = rooms.reduce((sum, room) => sum + room.players, 0);

  const hasRooms = totalRooms > 0;

  const playersLabel = playersOnline === 1 ? 'Player' : 'Players';

  const roomsLabel = totalRooms === 1 ? 'Room' : 'Rooms';

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
      <AnimatePresence mode="wait">
        {!hasRooms ? (
          <motion.div
            key="offline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="
              flex items-center gap-2
              px-3 py-1
              rounded-full
              bg-card/50
              border border-red-500/50
              shadow-lg
              backdrop-blur-sm
              text-red-400
              transition-all
              hover:scale-[1.02]
            "
          >
            <Users className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wider">
              No Players
            </span>
          </motion.div>
        ) : (
          <>
            {/* PLAYERS */}
            <motion.div
              key="players"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                flex items-center gap-2
                px-3 py-1
                rounded-full
                bg-card/50
                border border-green-500/50
                shadow-lg
                backdrop-blur-sm
                text-green-400
                transition-all
                hover:scale-[1.02]
              "
            >
              <Users className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-semibold tracking-wider">
                {playersOnline} {playersLabel}
              </span>
            </motion.div>

            {/* ROOMS */}
            <motion.div
              key="rooms"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="
                flex items-center gap-2
                px-3 py-1
                rounded-full
                bg-card/50
                border border-violet-400/50
                shadow-lg
                backdrop-blur-sm
                text-violet-400
                transition-all
                hover:scale-[1.02]
              "
            >
              <Gamepad2 className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wider">
                {totalRooms} {roomsLabel}
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

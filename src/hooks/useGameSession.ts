import { useEffect } from 'react';
import { addGameHistory } from '@/lib/localStorage';
import type { Game } from '@/types';

export function useGameSession(game?: Game) {
    useEffect(() => {
        if (!game) return;
        const startTime = Date.now();

        return () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            addGameHistory({
                gameId: game.id,
                gameTitle: game.title,
                timeSpent,
                playedAt: new Date().toISOString(),
            });
        };
    }, [game]);
}

import { useState, useEffect, useCallback } from 'react';
import { getGameHistory, deleteGameHistory, addGameHistory } from '@/lib/localStorage';
import { toast } from 'sonner';
import type { GameHistory, UseGameHistory } from '@/types';

export function useGameHistory(): UseGameHistory {
    const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

    const loadGameHistory = useCallback(() => {
        setGameHistory(getGameHistory());
    }, []);

    useEffect(() => {
        loadGameHistory();
    }, [loadGameHistory]);

    const deleteHistory = useCallback((id: string) => {
        deleteGameHistory(id);
        loadGameHistory();
        toast.success('Game history deleted');
    }, [loadGameHistory]);

    const addHistory = useCallback((game: Omit<GameHistory, 'id'>) => {
        if (game.playTime && game.playTime >= 60) {
            addGameHistory(game);
            loadGameHistory();
        }
    }, [loadGameHistory]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return h ? `${h}h ${m}m` : `${m}m`;
    };

    return { gameHistory, loadGameHistory, deleteHistory, addHistory, formatTime };
}

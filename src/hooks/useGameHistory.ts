import { useState, useEffect } from 'react';
import { getGameHistory, deleteGameHistory } from '@/lib/localStorage';
import { toast } from 'sonner';
import { GameHistory } from "@/types";
import type { UseGameHistory } from '@/types';

export function useGameHistory(): UseGameHistory {
    const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

    useEffect(() => {
        loadGameHistory();
    }, []);

    const loadGameHistory = () => {
        const history = getGameHistory();
        setGameHistory(history);
    };

    const deleteHistory = (id: string) => {
        deleteGameHistory(id);
        loadGameHistory();
        toast.success('Game history deleted');
    };

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    return {
        gameHistory,
        loadGameHistory,
        deleteHistory,
        formatTime,
    };
}

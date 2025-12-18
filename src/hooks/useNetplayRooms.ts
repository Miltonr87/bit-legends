import { useEffect, useState } from 'react';
import axios from 'axios';
import { allGames } from '@/data';

export interface NetplayRoom {
    id: string;
    name: string;
    server: string;
    password: boolean;
    players: number;
    url: string;
    rom: string;
    system: string;
}

export function useNetplayRooms() {
    const [rooms, setRooms] = useState<NetplayRoom[]>([]);
    const [loading, setLoading] = useState(true);

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
            } catch (err) {
                console.error('Failed to load rooms:', err);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
        intervalId = setInterval(fetchRooms, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return {
        rooms,
        loading,
    };
}

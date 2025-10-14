import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { Game } from '@/types';

export function useFavoriteGame(game?: Game) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const checkFavorite = async () => {
            const user = auth.currentUser;
            if (!user || !game) return;
            try {
                const favRef = doc(db, 'favorites', user.uid, 'games', game.id);
                const snapshot = await getDoc(favRef);
                setIsFavorite(snapshot.exists());
            } catch (err) {
                console.error('Failed to check favorite:', err);
            }
        };
        checkFavorite();
    }, [game]);

    const saveFavorite = useCallback(async () => {
        const user = auth.currentUser;
        if (!user) {
            toast({
                title: 'Sign in required',
                description: 'You need to log in to save favorites.',
                variant: 'destructive',
                duration: 3000,
            });
            return;
        }
        if (!game) return;

        try {
            const favRef = doc(db, 'favorites', user.uid, 'games', game.id);
            await setDoc(favRef, {
                title: game.title,
                cover: game.cover ?? null,
                addedAt: new Date().toISOString(),
            });
            setIsFavorite(true);
            toast({
                title: 'Saved!',
                description: `${game.title} added to your favorites.`,
                duration: 3000,
            });
        } catch (error) {
            console.error('Error saving favorite:', error);
            toast({
                title: 'Error',
                description: 'Could not save this game.',
                variant: 'destructive',
                duration: 3000,
            });
        }
    }, [game, toast]);

    return { isFavorite, saveFavorite };
}

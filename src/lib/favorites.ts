import { db } from './firebase';
import {
    doc, setDoc, deleteDoc, collection, getDocs, serverTimestamp, onSnapshot
} from 'firebase/firestore';

export type FavoriteGame = {
    gameId: string;
    title: string;
    coverUrl?: string;
    addedAt?: any; // Firestore timestamp
};

// add/overwrite
export async function addFavorite(uid: string, game: FavoriteGame) {
    const ref = doc(db, 'users', uid, 'favorites', game.gameId);
    await setDoc(ref, { ...game, addedAt: serverTimestamp() }, { merge: true });
}

export async function removeFavorite(uid: string, gameId: string) {
    const ref = doc(db, 'users', uid, 'favorites', gameId);
    await deleteDoc(ref);
}

export async function listFavorites(uid: string) {
    const snap = await getDocs(collection(db, 'users', uid, 'favorites'));
    return snap.docs.map(d => d.data() as FavoriteGame);
}

// realtime (optional)
export function listenFavorites(uid: string, cb: (games: FavoriteGame[]) => void) {
    return onSnapshot(collection(db, 'users', uid, 'favorites'), (snap) => {
        cb(snap.docs.map(d => d.data() as FavoriteGame));
    });
}

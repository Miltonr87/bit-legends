export interface Game {
    id: string;
    title: string;
    slug: string;
    embedId: string;
    year: number;
    genre: string;
    folder: string;
    publisher: string;
    characters: string[];
    description: string;
    longDescription: string;
    players: string;
    developer: string;
    coverImage: string;
    platform: string;
    embedUrl?: string;
    logo: string;
}
export interface FavoriteGame {
    id: string;
    title: string;
    addedAt?: string;
}

export interface ProfileData {
    username: string;
    email: string;
    avatar_url: string | null;
    provider?: 'google' | 'local';
    uid?: string;
}
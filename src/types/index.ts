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
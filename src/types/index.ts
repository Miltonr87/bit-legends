// ---------- GAME TYPES ----------
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
    platform: string;
    logo: string;
    cover: string | null;
    coverImage: string;
    embedUrl?: string;
}

// ---------- HISTORY / SAVE ----------
export interface GameHistory {
    id: string;
    gameId: string;
    gameTitle: string;
    platform: string;
    playedAt: string;
    playTime?: number;
    timeSpent?: number;
    score?: number;
}

export interface UseGameHistory {
    gameHistory: GameHistory[];
    loadGameHistory: () => void;
    deleteHistory: (id: string) => void;
    addHistory: (game: GameHistory) => void;
    formatTime: (seconds: number) => string;
}

export interface GameSave {
    id: string;
    gameId: string;
    gameTitle: string;
    saveName: string;
    createdAt: string;
    saveData: unknown;
}

export interface FavoriteGame {
    id: string;
    title: string;
    addedAt?: string;
}

// ---------- USER PROFILE ----------
export interface ProfileData {
    username: string;
    email: string;
    avatar_url: string | null;
    provider?: 'google' | 'local';
    uid?: string;
}

// ---------- COMPONENT PROPS ----------
export interface ProfileCardProps {
    user: ProfileData;
    uploading: boolean;
    username: string;
    onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUsernameChange: (value: string) => void;
    onUpdateProfile: () => void;
    onSignOut: () => void;
}

export interface HistoryListProps {
    gameHistory: GameHistory[];
    onDeleteHistory: (id: string) => void;
    formatTime: (seconds: number) => string;
}

export interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirmDelete: () => void;
}

// ---------- HOOK RETURN TYPES ----------
export interface UseUserProfile {
    user: ProfileData | null;
    username: string;
    uploading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithEmail: (email: string) => void;
    logout: () => Promise<void>;
    uploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateProfile: () => void;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseGameHistory {
    gameHistory: GameHistory[];
    loadGameHistory: () => void;
    deleteHistory: (id: string) => void;
    formatTime: (seconds: number) => string;
}

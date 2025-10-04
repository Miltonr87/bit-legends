// Local storage utilities for game data

export interface GameHistory {
  id: string;
  gameId: string;
  gameTitle: string;
  playedAt: string;
  timeSpent: number;
  score?: number;
}

export interface GameSave {
  id: string;
  gameId: string;
  gameTitle: string;
  saveName: string;
  createdAt: string;
  saveData: any;
}

const GAME_HISTORY_KEY = 'bitlegends_game_history';
const GAME_SAVES_KEY = 'bitlegends_game_saves';

// Game History
export const getGameHistory = (): GameHistory[] => {
  try {
    const data = localStorage.getItem(GAME_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addGameHistory = (history: Omit<GameHistory, 'id'>): void => {
  const current = getGameHistory();
  const newHistory: GameHistory = {
    ...history,
    id: crypto.randomUUID(),
  };
  localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify([newHistory, ...current]));
};

export const deleteGameHistory = (id: string): void => {
  const current = getGameHistory();
  const filtered = current.filter(h => h.id !== id);
  localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(filtered));
};

// Game Saves
export const getGameSaves = (): GameSave[] => {
  try {
    const data = localStorage.getItem(GAME_SAVES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addGameSave = (save: Omit<GameSave, 'id'>): void => {
  const current = getGameSaves();
  const newSave: GameSave = {
    ...save,
    id: crypto.randomUUID(),
  };
  localStorage.setItem(GAME_SAVES_KEY, JSON.stringify([newSave, ...current]));
};

export const deleteGameSave = (id: string): void => {
  const current = getGameSaves();
  const filtered = current.filter(s => s.id !== id);
  localStorage.setItem(GAME_SAVES_KEY, JSON.stringify(filtered));
};

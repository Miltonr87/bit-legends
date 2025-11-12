import type { GameHistory, GameSave } from "@/types";

const GAME_HISTORY_KEY = "bitlegends_game_history";
const GAME_SAVES_KEY = "bitlegends_game_saves";

/* ---------- GAME HISTORY ---------- */

// Normalize and filter entries (<60s excluded)
function normalizeHistory(list: any[]): GameHistory[] {
  return (list || [])
    .map((item) => {
      const playTime =
        typeof item.playTime === "number"
          ? item.playTime
          : typeof item.timeSpent === "number"
            ? item.timeSpent
            : 0;

      return {
        id: String(item.id ?? crypto.randomUUID()),
        gameId: String(item.gameId ?? item.id ?? ""),
        gameTitle: String(item.gameTitle ?? item.title ?? ""),
        platform: String(item.platform ?? ""),
        playedAt: String(item.playedAt ?? new Date().toISOString()),
        playTime,
        timeSpent: item.timeSpent,
        score: typeof item.score === "number" ? item.score : undefined,
      } as GameHistory;
    })
    .filter((h) => h.playTime >= 60); // ⛔ Ignore sessions shorter than 1 minute
}

export const getGameHistory = (): GameHistory[] => {
  try {
    const raw = localStorage.getItem(GAME_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return normalizeHistory(parsed);
  } catch {
    return [];
  }
};

export const addGameHistory = (history: Omit<GameHistory, "id">): void => {
  const playTime =
    typeof history.playTime === "number"
      ? history.playTime
      : (history as any).timeSpent ?? 0;

  // Skip sessions < 60s
  if (playTime < 60) return;

  const raw = localStorage.getItem(GAME_HISTORY_KEY);
  const current = raw ? JSON.parse(raw) : [];

  const newHistory: GameHistory = {
    ...history,
    playTime,
    id: crypto.randomUUID(),
  };

  localStorage.setItem(
    GAME_HISTORY_KEY,
    JSON.stringify([newHistory, ...current])
  );
};

export const deleteGameHistory = (id: string): void => {
  const raw = localStorage.getItem(GAME_HISTORY_KEY);
  const current: any[] = raw ? JSON.parse(raw) : [];
  const filtered = current.filter((h) => String(h.id) !== id);
  localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(filtered));
};

/* ---------- GAME SAVES ---------- */

export const getGameSaves = (): GameSave[] => {
  try {
    const data = localStorage.getItem(GAME_SAVES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addGameSave = (save: Omit<GameSave, "id">): void => {
  const current = getGameSaves();
  const newSave: GameSave = { ...save, id: crypto.randomUUID() };
  localStorage.setItem(GAME_SAVES_KEY, JSON.stringify([newSave, ...current]));
};

export const deleteGameSave = (id: string): void => {
  const current = getGameSaves();
  const filtered = current.filter((s) => s.id !== id);
  localStorage.setItem(GAME_SAVES_KEY, JSON.stringify(filtered));
};

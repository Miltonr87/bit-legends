import { beatnupGames, beatnupFilters } from "./games/beatemup";
import { fightGames, fightFilters } from "./games/fight";
import { raceGames, raceFilters } from "./games/race";

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

export const allGames: Game[] = [
    ...beatnupGames,
    ...fightGames,
    ...raceGames,
];

export const seriesFilters = Array.from(
    new Set([
        ...beatnupFilters,
        ...fightFilters,
        ...raceFilters
    ])
);

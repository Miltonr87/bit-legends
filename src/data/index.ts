import { Game } from "../types";
import { beatnupGames, beatnupFilters } from "./games/beatemup";
import { fightGames, fightFilters } from "./games/fight";
import { raceGames, raceFilters } from "./games/race";
import { actionGames, actionFilters } from "./games/action";

export const allGames: Game[] = [
    ...beatnupGames,
    ...fightGames,
    ...raceGames,
    ...actionGames
];

export const seriesFilters = Array.from(
    new Set([
        ...beatnupFilters,
        ...fightFilters,
        ...raceFilters,
        ...actionFilters
    ])
);

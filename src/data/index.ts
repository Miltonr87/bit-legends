import { Game } from "../types";
import { beatnupGames, beatnupFilters } from "./games/beatemup";
import { fightGames, fightFilters } from "./games/fight";
import { raceGames, raceFilters } from "./games/race";
import { actionGames, actionFilters } from "./games/action";
import { sportsGames, sportsFilters } from "./games/sports";
import { rpgsGames, rpgsFilters } from './games/rpg';

export const allGames: Game[] = [
    ...beatnupGames,
    ...fightGames,
    ...raceGames,
    ...actionGames,
    ...sportsGames,
    ...rpgsGames,
];

const rawFilters = Array.from(
    new Set([
        ...beatnupFilters,
        ...fightFilters,
        ...raceFilters,
        ...actionFilters,
        ...sportsFilters,
        ...rpgsFilters,
    ])
);

export const seriesFilters = [
    ...rawFilters.filter((f) => f !== "Rare" && "PT-BR"),
    "Rare", "PT-BR"

];
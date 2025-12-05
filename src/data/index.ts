import type { Game } from "../types";

export const loadGames = async (): Promise<Game[]> => {
    const [
        { beatnupGames },
        { fightGames },
        { raceGames },
        { actionGames },
        { sportsGames },
        { rpgsGames },
    ] = await Promise.all([
        import("./games/beatemup"),
        import("./games/fight"),
        import("./games/race"),
        import("./games/action"),
        import("./games/sports"),
        import("./games/rpg"),
    ]);
    return [
        ...beatnupGames,
        ...fightGames,
        ...raceGames,
        ...actionGames,
        ...sportsGames,
        ...rpgsGames,
    ];
};

export const loadFilters = async (): Promise<string[]> => {
    const [
        { beatnupFilters },
        { fightFilters },
        { raceFilters },
        { actionFilters },
        { sportsFilters },
        { rpgsFilters },
    ] = await Promise.all([
        import("./games/beatemup"),
        import("./games/fight"),
        import("./games/race"),
        import("./games/action"),
        import("./games/sports"),
        import("./games/rpg"),
    ]);
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

    return [...rawFilters.filter((f) => f !== "Rare" && "Brasil"), "Rare", "Brasil"];
};

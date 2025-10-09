import { Game } from "../index";

export const raceGames: Game[] = [
    {
        id: "rock-n-roll-racing",
        title: "Rock N’ Roll Racing",
        slug: "rock-n-roll-racing-usa",
        embedId: "24053",
        year: 1993,
        genre: "Fight Race",
        folder: "Racing",
        publisher: "Interplay",
        characters: ["Snake Sanders", "Cyberhawk", "Jake Badlands", "Tarquinn", "Ivanzypher", "Katarina Lyons"],
        description: "Racing with rock soundtrack!",
        longDescription:
            "Rock N’ Roll Racing roars with high-octane combat and an electrifying licensed rock soundtrack. " +
            "Blast opponents with missiles and mines while drifting through interplanetary circuits. " +
            "Each victory earns cash to upgrade your car’s weapons and armor. " +
            "Heavy metal meets explosive racing in this cult Blizzard classic.",
        players: "1-2 Players",
        developer: "Silicon & Synapse",
        coverImage: "/assets/covers/rock.png",
        logo: "https://gam.onl/user/snes/logos/Rock%20n'%20Roll%20Racing%20(USA).png",
        platform: "Super Nintendo",
    },
    {
        id: "biker-mice-from-mars",
        title: "Biker Mice from Mars",
        slug: "biker-mice-from-mars-usa",
        embedId: "20158",
        year: 1994,
        genre: "Fight Race",
        folder: "Racing",
        publisher: "Konami",
        characters: ["Throttle", "Vinnie", "Modo", "Limburger", "Greasepit", "Dr.Karbunkle"],
        description: "Cartoon motorcycle racing on Mars!",
        longDescription:
            "Rev up as the radical rodents from Mars in this action-packed racing brawler. " +
            "Speed through wild tracks, dodge hazards, and launch attacks against rival bikers. " +
            "Vivid graphics, tight controls, and cartoon humor capture the show’s spirit. " +
            "A cosmic, adrenaline-fueled ride from Konami’s golden SNES era.",
        players: "1-2 Players",
        developer: "Konami",
        coverImage: "/assets/covers/bike.jpg",
        logo: "https://gam.onl/user/snes/logos/Biker%20Mice%20from%20Mars%20(USA).png",
        platform: "Super Nintendo",
    },
];

export const raceFilters = [
    "Fight Race",
];

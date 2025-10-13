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
        logo: "/assets/logos/rock.png",
        platform: "Super Nintendo",
    },
    {
        id: "biker-mice-from-mars",
        title: "Biker Mice from Mars",
        slug: "biker-mice-from-mars-usa",
        embedId: "20158",
        year: 1994,
        genre: "Fight Race",
        folder: "Race",
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
        logo: "/assets/logos/bike.png",
        platform: "Super Nintendo",
    },
    {
        id: "riding-fight",
        title: "Riding Fight",
        slug: "riding-fight-ver-1-0a",
        embedId: "34209",
        year: 1992,
        genre: "Fight Race",
        folder: "Race",
        publisher: "Taito",
        characters: ["Ryu", "Billy", "Gary", "Burt", "Lisa"],
        description: "High-speed futuristic combat on the streets!",
        longDescription:
            "Riding Fight combines racing and brawling in a fast-paced futuristic city. " +
            "Battle rival riders while zooming through neon-lit highways and sky roads. " +
            "A showcase of Taito’s arcade flair, this 1992 gem blends speed, combat, and style " +
            "in an unforgettable ride through cyberpunk chaos.",
        players: "1-2 Players",
        developer: "Taito",
        coverImage: "/assets/covers/ridingfight.jpg",
        logo: "/assets/logos/ridingf.png",
        platform: "Arcade",
    },
];

export const raceFilters = ["Fight Race"];

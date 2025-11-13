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
            "Rock N’ Roll Racing (1993) fuses explosive vehicular combat with an iconic licensed rock soundtrack that defined a generation. " +
            "Tear through interplanetary tracks, launch missiles, drop mines, and shred rivals in chaotic isometric battles. " +
            "Win races to upgrade engines, armor, and weapons as you carve your way through the galaxy’s deadliest circuits. " +
            "A loud, rebellious, high-octane Blizzard classic — where every race feels like a metal concert on wheels.",
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
            "Biker Mice from Mars (1994) puts players behind the handlebars of the galaxy’s most radical rodent trio. " +
            "Fight through twisting tracks, dodge environmental hazards, and fire weapons at rival bikers as you try to take down the villainous Limburger. " +
            "Konami’s colorful graphics, fast gameplay, and cartoon humor perfectly capture the spirit of the TV show. " +
            "A wild, high-energy SNES classic packed with personality and turbo-charged mayhem.",
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
            "Riding Fight (1992) is Taito’s cyberpunk fusion of racing and brawling — a kinetic ride through neon-lit megacities and high-tech sky highways. " +
            "Punch, kick, and clash with rival riders at breakneck speeds while weaving through traffic and futuristic landscapes. " +
            "Its smooth scaling effects, fast action, and arcade flair make it a standout hybrid of combat and speed. " +
            "A stylish, adrenaline-pumping sprint through a world where every race is a street fight.",
        players: "1-2 Players",
        developer: "Taito",
        coverImage: "/assets/covers/ridingfight.jpg",
        logo: "/assets/logos/ridingf.png",
        platform: "Arcade",
    },
];

export const raceFilters = ["Fight Race"];

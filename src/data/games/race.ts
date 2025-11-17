import { Game } from "../index";

export const raceGames: Game[] = [
    {
        id: "rock-n-roll-racing",
        title: "Rock N’ Roll Racing",
        slug: "rock-n-roll-racing-usa",
        embedId: "24053",
        year: 1993,
        genre: "Fight Race",
        folder: "Fight Race",
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
        folder: "Fight Race",
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
        id: "batman-returns",
        title: "Batman Returns CD",
        slug: "batman-returns-usa",
        embedId: "40680",
        year: 1993,
        genre: "Fight Race",
        folder: "Fight Race",
        publisher: "Sega",
        characters: ["Batman", "Catwoman", "The Penguin"],
        description: "Batmobile & Batskiboat driving levels from the Sega CD version of Batman Returns.",
        longDescription:
            "Batman Returns CD (1993) turns Gotham’s dark winter into a high-speed battleground — a fusion of cinematic racing and explosive combat across snow-soaked streets and icy riverways. " +
            "Command the Batmobile and Batskiboat through neon-lit chaos, smashing enemy vehicles, dodging hazards, and unleashing gadgets at breakneck speed. " +
            "Its behind-view arcade perspective, movie-grade cutscenes, and fluid action create a unique hybrid of superhero drama and pure driving adrenaline. " +
            "A sleek, atmospheric sprint through Gotham where every chase feels like a showdown in the shadows.",
        players: "1 Player",
        developer: "Malibu Interactive",
        coverImage: "/assets/covers/batmanreturnscd.jpg",
        logo: "/assets/logos/batman_returns.png",
        platform: "Sega CD"
    },
    {
        id: "riding-fight",
        title: "Riding Fight",
        slug: "riding-fight-ver-1-0a",
        embedId: "34209",
        year: 1992,
        genre: "Fight Race",
        folder: "Fight Race",
        publisher: "Taito",
        characters: ["Ryu", "Billy", "Gary", "Burt", "Lisa"],
        description: "High-speed futuristic combat on the streets!",
        longDescription:
            "Riding Fight (1992) is Taito’s cyberpunk interpretation of Fight Race — a high-speed pursuit through neon-drenched megacities and skyway highways. " +
            "Clash with rival riders using punches, kicks, and acrobatic strikes as you rocket forward at breakneck speed. " +
            "Its fluid scaling effects, nonstop motion, and explosive arcade flair create a seamless fusion of combat and momentum. " +
            "A pulse-pounding sprint where every encounter hits at full throttle.",
        players: "1-2 Players",
        developer: "Taito",
        coverImage: "/assets/covers/ridingfight.jpg",
        logo: "/assets/logos/ridingf.png",
        platform: "Arcade",
    },

];

export const raceFilters = ["Fight Race"];

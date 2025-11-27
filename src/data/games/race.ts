import { Game } from "../index";

export const raceGames: Game[] = [
    {
        id: "rock-n-roll-racing",
        title: "Rock N’ Roll Racing",
        slug: "rock-n-roll-racing-usa",
        embedId: "24053",
        year: 1993,
        genre: "Combat Race",
        folder: "Fight Race",
        publisher: "Interplay",
        characters: ["Snake Sanders", "Cyberhawk", "Jake Badlands", "Tarquinn", "Ivanzypher", "Katarina Lyons"],
        description: "Racing with rock soundtrack!",
        longDescription:
            "Rock N’ Roll Racing (1993) amps up the chaos with explosive vehicular combat, sharp isometric handling, and a legendary lineup of licensed rock and heavy-metal tracks blasting in the background. " +
            "Race across hostile planets filled with hazards, traps, and vicious opponents who will ram, blast, and sabotage you at every turn. " +
            "Upgrade engines, tires, armor, and weapons to dominate the circuit — from missile volleys to land mines and brutal side-swipes that send rivals flying off the track. " +
            "Its energetic commentary, rebellious attitude, and unforgettable soundtrack make it one of Blizzard’s earliest cult classics, turning every race into a roaring, intergalactic metal showdown.",
        players: "1-2 Players",
        developer: "Silicon & Synapse",
        coverImage: "/assets/covers/rock.png",
        logo: "/assets/logos/rock.png",
        platform: "Nintendo",
    },
    {
        id: "battle-cars-snes",
        title: "Battle Cars",
        slug: "battle-cars-usa",
        embedId: "19832",
        year: 1993,
        genre: "Combat Race",
        folder: "Fight Race",
        publisher: "Namco Hometek",
        characters: ["Spike Vehicle", "Hot Rod", "Formula-Car", "Boss Car 1", "Boss Car 2"],
        description: "Armored vehicles battle it out on futuristic circuits!",
        longDescription:
            "Battle Cars (1993) thrusts players into a post-apocalyptic racing arena where speed alone isn’t enough because you must fight to win. " +
            "Developed by Malibu Interactive and published by Namco Hometek for the SNES, the game blends Mode 7 track visuals with vehicular combat: missiles, bouncing discs, grenades, and brutal head-on clashes across hazardous tracks." +
            "Choose from radically different vehicles — the spiked muscle car, the hot rod, or the formula-style racer — upgrade your weapons and armor with earnings from cross-country and boss races, and adapt quickly: each weapon behaves differently and each track demands quick reflexes." +
            "With its blend of high-octane racing and ruthless combat, Battle Cars stands as a distinctive entry in the 16-bit era’s vehicular brawlers — equal parts speed and destruction."
        ,
        players: "1-2 Players",
        developer: "Malibu Interactive",
        coverImage: "/assets/covers/battle_cars.jpg",
        platform: "Nintendo",
        logo: "/assets/logos/battle_cars.png"
    },
    {
        id: "biker-mice-from-mars",
        title: "Biker Mice from Mars",
        slug: "biker-mice-from-mars-usa",
        embedId: "20158",
        year: 1994,
        genre: "Indie Comics / Combat Race",
        folder: "Indie Comics / Combat Race",
        publisher: "Konami",
        characters: ["Throttle", "Vinnie", "Modo", "Limburger", "Greasepit", "Dr.Karbunkle"],
        description: "Cartoon motorcycle racing on Mars!",
        longDescription:
            "Biker Mice from Mars (1994) created by Rick Ungar and published by Oni Press as and independent comics book puts players behind the handlebars of the galaxy’s most radical rodent trio. " +
            "Fight through twisting tracks, dodge environmental hazards, and fire weapons at rival bikers as you try to take down the villainous Limburger. " +
            "Konami’s colorful graphics, fast gameplay, and cartoon humor perfectly capture the spirit of the TV show. " +
            "A wild, high-energy SNES classic packed with personality and turbo-charged mayhem.",
        players: "1-2 Players",
        developer: "Konami",
        coverImage: "/assets/covers/bike.jpg",
        logo: "/assets/logos/bike.png",
        platform: "Nintendo",
    },
    {
        id: "batman-vehicles",
        title: "Batman Vehicles",
        slug: "batman-vehicles-usa",
        embedUrl: "https://www.retrogames.cc/embed/40680-batman-returns.html",
        year: 1993,
        genre: "DC Comics / Combat Race",
        folder: "Fight Race",
        publisher: "Sega",
        characters: ["Batman", "Catwoman", "The Penguin"],
        description: "Batmobile & Batskiboat driving levels from the Sega CD version of Batman Returns.",
        longDescription:
            "Batman Vehicles in Batman Returns CD (1993) turns Gotham’s dark winter into a high-speed battleground — a fusion of cinematic racing and explosive combat across snow-soaked streets and icy riverways. " +
            "Command the Batmobile and Batskiboat through neon-lit chaos, smashing enemy vehicles, dodging hazards, and unleashing gadgets at breakneck speed. " +
            "Its behind-view arcade perspective, movie-grade cutscenes, and fluid action create a unique hybrid of superhero drama and pure driving adrenaline. " +
            "A sleek, atmospheric sprint through Gotham where every chase feels like a showdown in the shadows.",
        players: "1 Player",
        developer: "Malibu Interactive",
        coverImage: "/assets/covers/batmanreturnscd.jpg",
        logo: "/assets/logos/batman_returns.png",
        platform: "Sega CD"
    },


];

export const raceFilters = ["Combat Race"];

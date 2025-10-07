import { Game } from "../index";

export const raceGames: Game[] = [
    {
        id: "lamborghini-american-challenge",
        title: "Lamborghini Challenge",
        slug: "lamborghini-american-challenge-usa",
        embedId: "24643",
        year: 1992,
        genre: "Fight Race",
        folder: "Racing",
        publisher: "Todd-LucasArts / Titus",
        characters: ["Pam", "Joe", "Sly"],
        description: "Exotic car racing in America!",
        longDescription:
            "Race Lamborghinis across iconic American highways, fighting rivals for glory through intense time trials and circuit challenges.",
        players: "1 Player",
        developer: "Titus",
        coverImage: "/assets/covers/lamborghini.jpg",
        platform: "Super Nintendo",
    },
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
            "Rock N’ Roll Racing features vehicular combat and a licensed rock soundtrack as you race across planets.",
        players: "1-2 Players",
        developer: "Silicon & Synapse",
        coverImage: "/assets/covers/rock.png",
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
            "Based on the animated series, Biker Mice from Mars lets you race motorbikes across cosmic tracks and perform stunts.",
        players: "1-2 Players",
        developer: "Konami",
        coverImage: "/assets/covers/bike.jpg",
        platform: "Super Nintendo",
    },
];

export const raceFilters = [
    "Fight Race",
];

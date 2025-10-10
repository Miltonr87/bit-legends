import { Game } from "../game";

export const actionGames: Game[] = [
    {
        id: "castlevania-bloodlines-genesis",
        title: "Castlevania: Bloodlines",
        slug: "castlevania-bloodlines-genesis",
        embedId: "30108",
        year: 1994,
        genre: "Action",
        folder: "Konami",
        publisher: "Konami",
        characters: ["John Morris", "Eric Lecarde", "Elizabeth Bartley", "Dracula", "Drolta Tzuentes"],
        description: "A gothic action platformer where two vampire hunters fight to stop Dracula’s resurrection.",
        longDescription:
            "Castlevania: Bloodlines (1994) is an action adventure for the Sega Genesis developed and published by Konami. " +
            "Set during World War I, the story follows John Morris and Eric Lecarde as they travel across Europe to thwart Elizabeth Bartley’s scheme to resurrect Dracula. " +
            "The game features multiple branching paths, special weapons (axe, boomerang, holy water), and stage gimmicks like inverted rooms and reflections. " +
            "With rich visuals, a sweeping soundtrack by Michiru Yamane, and fast-paced gameplay, it stands out as the only Castlevania title made specifically for the Genesis.",
        players: "1 Player",
        developer: "Konami",
        coverImage: "/assets/covers/castlevania_bloodlines_genesis.jpg",
        platform: "Sega Genesis",
        logo: "https://gam.onl/user/segaMD/logos/Castlevania%20-%20Bloodlines%20(U)%20[!].png"
    },
    {
        id: "shinobi-iii",
        title: "Shinobi III",
        slug: "shinobi-iii-return-of-the-ninja-master-europe",
        embedId: "30503",
        year: 1993,
        genre: "Action",
        folder: "Ninja Legends",
        publisher: "Sega",
        characters: ["Joe Musashi"],
        description: "The ultimate ninja strikes back — fast, fluid, and stylish!",
        longDescription:
            "Shinobi III: Return of the Ninja Master (1993) refines Sega’s legendary ninja series with cinematic action and fluid controls. Guide Joe Musashi through forests, military bases, and techno-temples as you battle the Neo Zeed clan. Known for its speed, acrobatics, and iconic soundtrack, it’s one of the greatest 16-bit action games ever made.",
        players: "1 Player",
        developer: "Sega",
        coverImage: "/assets/covers/shinobi.jpg",
        platform: "Sega Genesis",
        logo: "https://gam.onl/user/segaMD/logos/Shinobi%20III%20-%20Return%20of%20the%20Ninja%20Master%20(U)%20[!].png"
    }
];

export const actionFilters = [
    "All Games",
    "Action",
];
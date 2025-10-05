export interface Game {
  id: string;
  title: string;
  slug: string;
  embedId: string;
  year: number;
  genre: string;
  folder: string;
  publisher: string;
  characters: string[];
  description: string;
  longDescription: string;
  players: string;
  developer: string;
  coverImage: string;
}

export const games: Game[] = [
  // Streets of Rage Series (Genesis)
  {
    id: "sor1",
    title: "Streets of Rage",
    slug: "streets-of-rage",
    embedId: "30497",
    year: 1991,
    genre: "Beat 'em Up",
    folder: "Streets of Rage",
    publisher: "Sega",
    characters: [],
    description: "The start of the legendary beat 'em up trilogy!",
    longDescription:
      "Three young police officers fight a syndicate that controls a crime-ridden city in this Genesis classic.",
    players: "1-2 Players",
    developer: "Sega",
    coverImage: "/assets/covers/sor1.png",
  },
  {
    id: "sor2",
    title: "Streets of Rage 2",
    slug: "streets-of-rage-2",
    embedId: "28481",
    year: 1992,
    genre: "Beat 'em Up",
    folder: "Streets of Rage",
    publisher: "Sega",
    characters: [],
    description: "The legendary beat 'em up masterpiece!",
    longDescription:
      "The legendary beat 'em up returns with improved graphics, gameplay, and an unforgettable soundtrack.",
    players: "1-2 Players",
    developer: "Sega",
    coverImage: "/assets/covers/sor2.png",
  },
  {
    id: "sor3",
    title: "Streets of Rage 3",
    slug: "streets-of-rage-3",
    embedId: "16812",
    year: 1994,
    genre: "Beat 'em Up",
    folder: "Streets of Rage",
    publisher: "Sega",
    characters: [],
    description: "The epic conclusion to the trilogy!",
    longDescription:
      "The third installment adds new moves, multiple storylines, and a challenging difficulty curve.",
    players: "1-2 Players",
    developer: "Sega",
    coverImage: "/assets/covers/sor3.png",
  },

  {
    id: "kingdragons",
    title: "The King of Dragons",
    slug: "the-king-of-dragons",
    embedId: "the-king-of-dragons",
    year: 1991,
    genre: "Beat 'em Up",
    folder: "Beat 'em Up",
    publisher: "Capcom",
    characters: [],
    description: "Fantasy beat 'em up adventure!",
    longDescription:
      "Embark on an epic fantasy adventure in this Capcom beat 'em up classic. Choose from five character classes and battle through hordes of monsters to defeat the evil dragon.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage: "/assets/covers/the-king-of-dragons.png",
    embedUrl: "https://www.retrogames.cc/embed/10347-the-king-of-dragons.html",
  },

  // Mortal Kombat Series (SNES / Arcade)
  {
    id: "mk1",
    title: "Mortal Kombat",
    slug: "mortal-kombat-usa",
    embedId: "27007",
    year: 1993,
    genre: "Fighting",
    folder: "Mortal Kombat",
    publisher: "Acclaim",
    characters: [],
    description: "The game that started it all!",
    longDescription:
      "The first Mortal Kombat game that started the legendary fighting franchise with brutal kombat.",
    players: "1-2 Players",
    developer: "Midway",
    coverImage:
      "/assets/covers/Mortal_Kombat_cover.jpeg",
  },
  {
    id: "mk2",
    title: "Mortal Kombat II",
    slug: "mortal-kombat-ii-usa",
    embedId: "22440",
    year: 1994,
    genre: "Fighting",
    folder: "Mortal Kombat",
    publisher: "Acclaim",
    characters: [],
    description: "The brutal sequel!",
    longDescription:
      "The second installment with improved graphics and new brutal fatalities that shocked the world.",
    players: "1-2 Players",
    developer: "Midway",
    coverImage:
      "/assets/covers/Mortal_Kombat_2.png",
  },
  {
    id: "mk3",
    title: "Mortal Kombat 3",
    slug: "mortal-kombat-3-usa",
    embedId: "24920",
    year: 1995,
    genre: "Fighting",
    folder: "Mortal Kombat",
    publisher: "Acclaim",
    characters: [],
    description: "Run button and combo system!",
    longDescription:
      "Introducing run button and combination system to the series with even more brutal combat.",
    players: "1-2 Players",
    developer: "Midway",
    coverImage:
      "/assets/covers/Mortal_Kombat_3_cover.jpeg",
  },
  {
    id: "umk3",
    title: "Ultimate Mortal Kombat 3",
    slug: "ultimate-mortal-kombat-3-usa",
    embedId: "23432",
    year: 1995,
    genre: "Fighting",
    folder: "Mortal Kombat",
    publisher: "Acclaim",
    characters: [],
    description: "The ultimate MK3!",
    longDescription:
      "The ultimate version with more characters and refined gameplay mechanics.",
    players: "1-2 Players",
    developer: "Midway",
    coverImage:
      "/assets/covers/Ultimate_MK3.png",
  },

  // Street Fighter Series (SNES)
  {
    id: "sf2",
    title: "Street Fighter II - The World Warrior",
    slug: "street-fighter-ii-the-world-warrior-usa",
    embedId: "23597",
    year: 1992,
    genre: "Fighting",
    folder: "Street Fighter",
    publisher: "Capcom",
    characters: [],
    description: "The game that revolutionized fighting games!",
    longDescription:
      "The game that revolutionized fighting games forever with 8 world warriors and legendary gameplay.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/street_fighter_2.png",
  },
  {
    id: "sf2turbo",
    title: "Street Fighter II Turbo - Hyper Fighting",
    slug: "street-fighter-ii-turbo-hyper-fighting-usa",
    embedId: "20197",
    year: 1993,
    genre: "Fighting",
    folder: "Street Fighter",
    publisher: "Capcom",
    characters: [],
    description: "Faster and better!",
    longDescription:
      "Faster gameplay and new special moves for all characters in this enhanced version.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/street_fighter_2_turbo.jpeg",
  },
  {
    id: "ssf2",
    title: "Super Street Fighter II - The New Challengers",
    slug: "super-street-fighter-ii-the-new-challengers-usa",
    embedId: "23550",
    year: 1994,
    genre: "Fighting",
    folder: "Street Fighter",
    publisher: "Capcom",
    characters: [],
    description: "New challengers enter the fight!",
    longDescription:
      "Four new fighters join the World Warriors tournament in this enhanced edition.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/street2_new_challenge.png",
  },
  {
    id: "sfa2",
    title: "Street Fighter Alpha 2",
    slug: "street-fighter-alpha-2-usa",
    embedId: "23010",
    year: 1996,
    genre: "Fighting",
    folder: "Street Fighter",
    publisher: "Capcom",
    characters: [],
    description: "The Alpha series!",
    longDescription:
      "The Alpha series brings a new fighting style and new characters to the Street Fighter universe.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/sf_aplha_2.jpeg",
  },

  // The King of Fighters Series (Neo Geo)
  {
    id: "kof94",
    title: "The King of Fighters '94",
    slug: "the-king-of-fighters-94",
    embedId: "10348",
    year: 1994,
    genre: "Fighting",
    folder: "The King of Fighters",
    publisher: "SNK",
    characters: [],
    description: "The first KOF tournament!",
    longDescription:
      "The first KOF tournament with legendary 3-on-3 team battles that defined a franchise.",
    players: "1-2 Players",
    developer: "SNK",
    coverImage:
      "/assets/covers/kof_94.jpg",
  },
  {
    id: "kof98",
    title: "The King of Fighters '98",
    slug: "the-king-of-fighters-98",
    embedId: "10368",
    year: 1998,
    genre: "Fighting",
    folder: "The King of Fighters",
    publisher: "SNK",
    characters: [],
    description: "The Dream Match!",
    longDescription:
      "Dream Match - No story, just pure fighting perfection. Considered by many the best KOF game.",
    players: "1-2 Players",
    developer: "SNK",
    coverImage:
      "/assets/covers/kof_98.jpg",
  },

  // Crossover Fighters (Arcade/MAME)
  {
    id: "maximumcarnage",
    title: "Spider-Man & Venom: Maximum Carnage",
    slug: "spider-man-venom-maximum-carnage-usa",
    embedId: "23888",
    year: 1994,
    genre: "Marvel",
    folder: "Marvel",
    publisher: "Acclaim",
    characters: ["Spider-Man", "Venom", "Carnage"],
    description: "A red-cartridge classic — fight Carnage through New York!",
    longDescription:
      "Based on the Marvel comic crossover, Spider-Man and Venom must team up to stop Carnage and his symbiote army. Battle through the streets of New York in this side-scrolling beat 'em up with fluid animations and comic-style cutscenes.",
    players: "1 Player",
    developer: "Software Creations",
    coverImage:
      "/assets/covers/spider_carnage.jpg",
  },

  {
    id: "spidermanxmen",
    title: "Spider-Man and the X-Men in Arcade's Revenge",
    slug: "spider-man-and-the-x-men-in-arcade-s-revenge-europe",
    embedId: "22758",
    year: 1992,
    genre: "Marvel",
    folder: "Marvel",
    publisher: "LJN",
    characters: ["Spider-Man", "Wolverine", "Cyclops", "Storm", "Gambit"],
    description: "Marvel heroes trapped in Arcade's deadly games!",
    longDescription:
      "Spider-Man and the X-Men must survive Arcade’s deadly traps! Play as five heroes across unique action and platforming levels to defeat the villain and escape his twisted amusement park.",
    players: "1 Player",
    developer: "Software Creations",
    coverImage:
      "/assets/covers/spiderman_xmen.jpg",
  },
  {
    id: "warofthegems",
    title: "Marvel: War of The Gems",
    slug: "marvel-super-heroes-war-of-the-gems-europe",
    embedId: "24033",
    year: 1996,
    genre: "Marvel",
    folder: "Marvel",
    publisher: "Capcom",
    characters: ["Spider-Man", "Iron Man", "Hulk", "Captain America", "Wolverine"],
    description: "Battle Thanos in the ultimate gem hunt!",
    longDescription:
      "Join Earth's mightiest heroes in a quest to collect the powerful Infinity Gems before Thanos does. Choose from five Marvel legends and fight through intense platforming and combat stages inspired by the comic saga.",
    players: "1 Player",
    developer: "Capcom",
    coverImage:
      "/assets/covers/marvel_war_gems.jpg",
  },
  {
    id: "marvelsuperheroes",
    title: "Marvel Super Heroes",
    slug: "marvel-super-heroes",
    embedId: "marvel-super-heroes",
    year: 1995,
    genre: "Marvel",
    folder: "Marvel vs Capcom",
    publisher: "Capcom",
    characters: [],
    description: "Infinity Gem powered battles!",
    longDescription:
      "Marvel's mightiest heroes and villains clash in this fighting game featuring the powerful Infinity Gems. Master unique abilities and unleash devastating super combos.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage: "/assets/covers/marvelheroes.png",
    embedUrl: "https://www.minijogos.com.br/embed/marvel-super-heroes",
  },
  {
    id: "xmvsf",
    title: "X-Men vs. Street Fighter",
    slug: "x-men-vs-street-fighter",
    embedId: "34755",
    year: 1996,
    genre: "Marvel",
    folder: "Marvel vs Capcom",
    publisher: "Capcom",
    characters: [],
    description: "Marvel vs Capcom begins!",
    longDescription:
      "Marvel mutants clash with Capcom's World Warriors in epic tag battles that started the crossover craze.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/xmen_vs_street.jpg",
  },
  {
    id: "mvc",
    title: "Marvel vs. Capcom",
    slug: "marvel-vs-capcom-clash-of-super-heroes",
    embedId: "9123",
    year: 1998,
    genre: "Marvel",
    folder: "Marvel vs Capcom",
    publisher: "Capcom",
    characters: [],
    description: "The ultimate crossover!",
    longDescription:
      "The ultimate crossover featuring Marvel and Capcom's greatest heroes in explosive 2v2 battles.",
    players: "1-2 Players",
    developer: "Capcom",
    coverImage:
      "/assets/covers/marvel_vs_capcom.jpg",
  },
];

export const seriesFilters = [
  "All Games",
  "Fighting",
  "Beat 'em Up",
  "Marvel"
] as const;

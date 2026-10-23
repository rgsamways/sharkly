/**
 * "Which shark are you?" Six questions, four answers each. Each answer gives a point to one or
 * two of the sharks below. The shark with the most points wins; a tie goes to whichever shark is
 * listed first in `quizResults`. Result text only repeats things already on the species pages.
 */

export interface QuizResult {
  /** Must match a species slug in content/species.ts (a unit test checks). */
  slug: string;
  /** Shown as "You're a ...". */
  title: string;
  /** Two or three friendly sentences. */
  description: string;
}

export const quizResults: QuizResult[] = [
  {
    slug: "great-white-shark",
    title: "Great white shark",
    description:
      "You are bold and confident, and you walk into a room like you own it. Great whites are powerful swimmers, and they can even keep parts of their bodies warmer than the sea around them, which keeps them strong in cold water.",
  },
  {
    slug: "whale-shark",
    title: "Whale shark",
    description:
      "You are calm, kind and big-hearted: a gentle giant. The whale shark is the biggest fish alive, yet it feeds on tiny animals that it filters out of the water, and it drifts along without any fuss.",
  },
  {
    slug: "scalloped-hammerhead",
    title: "Scalloped hammerhead",
    description:
      "You are a natural team player who is happiest with friends. Scalloped hammerheads often gather in big schools, and the babies can spend years sheltering together in mangrove roots.",
  },
  {
    slug: "goblin-shark",
    title: "Goblin shark",
    description:
      "You are wonderfully unusual, and proud of it. The goblin shark is pink, mysterious and from the deep sea, and its jaws can shoot forward out of its face. There is nobody else quite like you.",
  },
  {
    slug: "greenland-shark",
    title: "Greenland shark",
    description:
      "You are patient, calm and wise, and you are never in a hurry. Greenland sharks cruise slowly through icy water, and they may live for hundreds of years, so they have plenty of time.",
  },
  {
    slug: "dwarf-lanternshark",
    title: "Dwarf lanternshark",
    description:
      "You are small, bright and full of ideas. The dwarf lanternshark is small enough to hold in your hand, and it makes its own light in the dark of the deep sea.",
  },
  {
    slug: "tiger-shark",
    title: "Tiger shark",
    description:
      "You are curious and fearless, and you will try anything once. Tiger sharks have the widest menu of any shark, and they travel the warm seas looking for something new.",
  },
  {
    slug: "blue-shark",
    title: "Blue shark",
    description:
      "You are a born explorer who loves the open road. Blue sharks cross huge stretches of ocean, and they seem to steer by the Earth's magnetic field.",
  },
];

export interface QuizOption {
  label: string;
  /** Result slugs that get a point when this answer is chosen. */
  points: string[];
}

export interface QuizQuestion {
  prompt: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
}

export const quizQuestions: QuizQuestion[] = [
  {
    prompt: "You have a free Saturday. What sounds best?",
    options: [
      { label: "Trying something I have never done", points: ["tiger-shark", "blue-shark"] },
      {
        label: "Hanging out with my whole group of friends",
        points: ["scalloped-hammerhead", "whale-shark"],
      },
      { label: "A quiet day doing my own thing", points: ["greenland-shark", "goblin-shark"] },
      { label: "Making or building something", points: ["dwarf-lanternshark", "goblin-shark"] },
    ],
  },
  {
    prompt: "You get one superpower. Which do you pick?",
    options: [
      { label: "Super strength", points: ["great-white-shark"] },
      { label: "Glowing in the dark", points: ["dwarf-lanternshark"] },
      {
        label: "Travelling anywhere in the world in a flash",
        points: ["blue-shark", "tiger-shark"],
      },
      { label: "Living for hundreds of years", points: ["greenland-shark", "whale-shark"] },
    ],
  },
  {
    prompt: "You join a new group. What do you do first?",
    options: [
      { label: "Take charge and get things going", points: ["great-white-shark", "tiger-shark"] },
      { label: "Make friends with everyone", points: ["scalloped-hammerhead"] },
      { label: "Watch quietly for a while", points: ["greenland-shark", "whale-shark"] },
      { label: "Ask a hundred questions", points: ["tiger-shark", "goblin-shark"] },
    ],
  },
  {
    prompt: "Which place sounds the most like home?",
    options: [
      { label: "The wide open ocean", points: ["blue-shark", "whale-shark"] },
      { label: "A cosy, dim cave", points: ["goblin-shark", "dwarf-lanternshark"] },
      { label: "Somewhere busy and full of life", points: ["scalloped-hammerhead", "tiger-shark"] },
      { label: "Somewhere cold and peaceful", points: ["greenland-shark"] },
    ],
  },
  {
    prompt: "How would your friends describe you?",
    options: [
      { label: "Brave", points: ["great-white-shark"] },
      { label: "Kind and gentle", points: ["whale-shark", "scalloped-hammerhead"] },
      { label: "Funny and one of a kind", points: ["goblin-shark", "dwarf-lanternshark"] },
      { label: "Always up for an adventure", points: ["blue-shark", "tiger-shark"] },
    ],
  },
  {
    prompt: "It is snack time. What do you reach for?",
    options: [
      { label: "One big, hearty meal", points: ["great-white-shark", "whale-shark"] },
      { label: "A bit of everything", points: ["tiger-shark", "scalloped-hammerhead"] },
      { label: "Lots of tiny bites", points: ["dwarf-lanternshark", "goblin-shark"] },
      { label: "Whatever I can grab on the road", points: ["blue-shark", "greenland-shark"] },
    ],
  },
];

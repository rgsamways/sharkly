import type { FactTopic, Verdict } from "@/lib/fact-rules";

/**
 * The shark facts and "myth or fact?" answers. This file is the source of truth: the seed script
 * (`pnpm seed:content`) copies it into the database. Edit the words here, in a pull request.
 *
 * Every entry needs a source. Facts were researched from NOAA, Smithsonian, the Natural History
 * Museum, the Florida Museum and similar, with Wikipedia only as a fallback. Where sources
 * disagreed or confidence was medium, the wording is cautious and a comment says why. Robin
 * should read all of it before search indexing is switched on.
 */

export interface FactEntry {
  slug: string;
  topic: FactTopic;
  /** The headline, or for a myth the popular claim. */
  title: string;
  /** Myths only. */
  verdict?: Verdict;
  /** Myths only: one plain sentence, shown first. */
  shortAnswer?: string;
  body: string;
  sources: { label: string; url: string }[];
}

const noaa = {
  label: "NOAA Fisheries: 12 shark facts that may surprise you",
  url: "https://www.fisheries.noaa.gov/feature-story/12-shark-facts-may-surprise-you",
};

export const factEntries: FactEntry[] = [
  // ---- Myth or fact? ----
  {
    slug: "myth-sharks-must-keep-swimming",
    topic: "myths",
    title: "Sharks must keep swimming or they will die.",
    verdict: "partly",
    shortAnswer: "Some sharks must keep swimming to breathe, but many can rest on the seafloor.",
    body: "Sharks like great whites and makos breathe by swimming, which pushes water over their gills. Sharks that live on the bottom, such as nurse sharks, can lie still because they pull water in through an opening just behind each eye.",
    sources: [
      noaa,
      {
        label: "Hakai Magazine: Rock-a-bye Shark-y",
        url: "https://hakaimagazine.com/news/rock-a-bye-shark-y/",
      },
    ],
  },
  {
    slug: "myth-one-drop-of-blood",
    topic: "myths",
    title: "A shark can smell a single drop of blood from miles away.",
    verdict: "false",
    shortAnswer:
      "Sharks smell very well, but not well enough to find one drop of blood miles away.",
    body: "Scientists tested five kinds of sharks and rays and found they can pick up a smell at about one part in a billion. That is excellent, but no better than ordinary fish. How far a smell travels also depends on the ocean currents.",
    // Confidence medium: we opened a news report of the 2010 study (Meredith and Kajiura), not the paper.
    sources: [
      {
        label:
          "Practical Fishkeeping, reporting a 2010 study in the Journal of Experimental Biology",
        url: "https://www.practicalfishkeeping.co.uk/fishkeeping-news/popular-shark-myth-dispelled/",
      },
    ],
  },
  {
    slug: "myth-sharks-have-no-bones",
    topic: "myths",
    title: "Sharks have no bones.",
    verdict: "partly",
    shortAnswer: "Sharks have no true bones, but they do have a skeleton.",
    body: "A shark's skeleton is made of cartilage, the bendy material in your nose and ears. It is much lighter than bone. Many sharks add hard calcium to their cartilage as they get older, so it becomes stiff, but it is still not bone.",
    sources: [noaa, { label: "Wikipedia: Shark", url: "https://en.wikipedia.org/wiki/Shark" }],
  },
  {
    slug: "myth-sharks-never-get-cancer",
    topic: "myths",
    title: "Sharks never get sick or never get cancer.",
    verdict: "false",
    shortAnswer: "Sharks can get sick, and they can get cancer too.",
    body: "Scientists have found both harmless and cancerous tumours in sharks and their relatives. The idea that sharks are cancer-proof led people to sell shark cartilage as a cancer treatment, but the evidence does not show that it works.",
    sources: [
      {
        label:
          "Cancer Research (2004): Shark Cartilage, Cancer and the Growing Threat of Pseudoscience",
        url: "https://pure.psu.edu/en/publications/shark-cartilage-cancer-and-the-growing-threat-of-pseudoscience/",
      },
    ],
  },
  {
    slug: "myth-sharks-are-colour-blind",
    topic: "myths",
    title: "Sharks are colour blind and can barely see.",
    verdict: "partly",
    shortAnswer:
      "Sharks see well in dim light, and many are probably colour blind, though scientists are not completely sure.",
    body: "A 2011 study of 17 shark species found no colour-sensing cells in 10 of them and only one type in the other 7, so they probably cannot tell colours apart. They are far from blind, though: a mirror-like layer at the back of the eye helps them see in dark water. Scientists still disagree about how much colour some sharks can see.",
    // Disputed: NOAA says sharks can see colours; the 2011 study sampled only 17 Australian species.
    sources: [
      noaa,
      {
        label: "ScienceDaily: Sharks may be colour blind",
        url: "https://www.sciencedaily.com/releases/2011/01/110118092224.htm",
      },
      {
        label: "National Geographic: Sharks are colour blind, study suggests",
        url: "https://www.nationalgeographic.com/animals/article/110119-sharks-color-blind-eyes-rods-cones-australia-animals-science",
      },
    ],
  },
  {
    slug: "myth-sharks-hunt-people",
    topic: "myths",
    title: "Sharks hunt people on purpose.",
    verdict: "false",
    shortAnswer: "Sharks do not hunt people as food, and bites on people are rare.",
    body: 'Researchers at the Florida Museum say many quick "hit and run" bites are probably mistaken identity in murky water. The shark soon finds out a person is not its usual prey, lets go, and does not come back.',
    sources: [
      {
        label: "Florida Museum, International Shark Attack File: How, Where and When Sharks Attack",
        url: "https://www.floridamuseum.ufl.edu/shark-attacks/odds/how-where-when/",
      },
    ],
  },
  {
    slug: "myth-all-sharks-lay-eggs",
    topic: "myths",
    title: "All sharks lay eggs.",
    verdict: "false",
    shortAnswer: "Only some sharks lay eggs, and most give birth to live pups.",
    body: "There are more than 500 kinds of sharks. Most give birth to live young, and the rest, like the horn shark, lay tough egg cases.",
    sources: [
      {
        label: "Natural History Museum: Do sharks lay eggs?",
        url: "https://www.nhm.ac.uk/discover/do-sharks-lay-eggs.html",
      },
      noaa,
    ],
  },
  {
    slug: "myth-sharks-older-than-trees",
    topic: "myths",
    title: "Sharks are older than trees.",
    verdict: "true",
    shortAnswer:
      "Yes. Sharks go back about 450 million years, and the first trees came roughly 60 to 70 million years later.",
    body: "The first trees appeared around 385 million years ago. The oldest shark evidence is a few tiny scales, so scientists still debate exactly when true sharks began, but sharks were around well before any forest.",
    // Confidence medium: the earliest shark scales may belong to a close relative.
    sources: [
      {
        label: "Discover Wildlife: Are sharks older than trees?",
        url: "https://www.discoverwildlife.com/prehistoric-life/are-sharks-older-than-trees",
      },
      noaa,
    ],
  },
  {
    slug: "myth-shark-skin-sandpaper",
    topic: "myths",
    title: "Shark skin feels like sandpaper.",
    verdict: "true",
    shortAnswer: "Yes, it feels rough when you rub it from tail to head, and smooth the other way.",
    body: "A shark's skin is covered in tiny tooth-like scales called dermal denticles, which point toward the tail. Please never touch a wild shark, though.",
    sources: [
      noaa,
      { label: "Wikipedia: Dermal denticle", url: "https://en.wikipedia.org/wiki/Dermal_denticle" },
    ],
  },
  {
    slug: "myth-sharks-never-sleep",
    topic: "myths",
    title: "Sharks never sleep.",
    verdict: "false",
    shortAnswer: "Sharks do rest, and at least some of them sleep.",
    body: "In a 2022 study, scientists measured draughtsboard sharks, small sharks that rest on the seafloor. Their bodies used less energy while resting, which is a sign of sleep. Fast swimmers like great whites have not been tested yet.",
    sources: [
      {
        label: "Biology Letters (2022): Energy conservation characterizes sleep in sharks",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8915397",
      },
      {
        label: "Hakai Magazine: Rock-a-bye Shark-y",
        url: "https://hakaimagazine.com/news/rock-a-bye-shark-y/",
      },
    ],
  },

  // ---- Super senses ----
  {
    slug: "senses-electric-fields",
    topic: "senses",
    title: "Sharks can sense tiny electric fields",
    body: "Jelly-filled pores on a shark's snout, called ampullae of Lorenzini, pick up the weak electricity that living animals give off. They work over a fairly short distance, around a few feet.",
    sources: [
      { label: "Hawaii DLNR: Shark senses", url: "https://dlnr.hawaii.gov/sharks/?p=27" },
      {
        label: "Wikipedia: Ampullae of Lorenzini",
        url: "https://en.wikipedia.org/wiki/Ampullae_of_Lorenzini",
      },
    ],
  },
  {
    slug: "senses-lateral-line",
    topic: "senses",
    title: "A line of pores feels water moving",
    body: "Sharks have a lateral line, a row of tiny pores running from the snout all the way to the tail. Special cells inside feel water flowing past, which helps a shark notice fish swimming nearby.",
    sources: [
      { label: "Shark Trust: Shark senses", url: "https://www.sharktrust.org/shark-senses" },
      { label: "Hawaii DLNR: Shark senses", url: "https://dlnr.hawaii.gov/sharks/?p=27" },
    ],
  },
  {
    slug: "senses-hearing",
    topic: "senses",
    title: "Sharks hear low, wobbly sounds best",
    body: "Sharks seem to hear best at low pitches, roughly between 20 and 300 hertz. They seem especially drawn to uneven, wobbly sounds at the low end, like the splashing of a struggling fish.",
    // Medium confidence: hearing range varies by species and study.
    sources: [
      { label: "Hawaii DLNR: Shark senses", url: "https://dlnr.hawaii.gov/sharks/?p=27" },
      { label: "Shark Trust: Shark senses", url: "https://www.sharktrust.org/shark-senses" },
    ],
  },
  {
    slug: "senses-night-vision-mirror",
    topic: "senses",
    title: "A mirror behind the eye helps sharks see in the dark",
    body: "Many sharks have a layer of reflective crystals behind the retina, called the tapetum lucidum. It bounces light back for a second chance to be seen, which helps in dim water.",
    // Medium confidence: Oceana is a charity source, and not every shark has a tapetum.
    sources: [
      {
        label: "Oceana: Shark and ray eyes",
        url: "https://oceana.org/blog/5-incredible-ways-shark-and-ray-eyes-create-super-sensitive-vision/",
      },
      { label: "Shark Trust: Shark senses", url: "https://www.sharktrust.org/shark-senses" },
    ],
  },

  // ---- Body ----
  {
    slug: "anatomy-skin-denticles",
    topic: "anatomy",
    title: "Shark skin is covered in tiny teeth",
    body: "Instead of ordinary scales, sharks have tiny tooth-like scales called dermal denticles. A lab study found that scales with tiny ridges can cut drag by about 2 percent compared with a flat surface.",
    // Medium confidence: whether denticles make sharks faster is still debated.
    sources: [
      {
        label: "University of Leeds and Hull study (White Rose)",
        url: "https://eprints.whiterose.ac.uk/id/eprint/173716/",
      },
      { label: "Wikipedia: Shark anatomy", url: "https://en.wikipedia.org/wiki/Shark_anatomy" },
    ],
  },
  {
    slug: "anatomy-teeth-replaced",
    topic: "anatomy",
    title: "Sharks lose thousands of teeth and grow new ones",
    body: "A shark can shed many thousands of teeth in its lifetime. New ones grow in rows behind the old ones, and how fast they are replaced depends on the shark, from every week or two to every few months.",
    // Medium confidence: the replacement rate comes from Wikipedia and varies by species.
    sources: [
      {
        label: "Florida Museum: Shark teeth",
        url: "https://www.floridamuseum.ufl.edu/discover-fish/sharks/fossil/shark-teeth/",
      },
      { label: "Wikipedia: Shark", url: "https://en.wikipedia.org/wiki/Shark" },
    ],
  },
  {
    slug: "anatomy-oily-liver",
    topic: "anatomy",
    title: "An oily liver keeps sharks from sinking",
    body: "Sharks have no swim bladder, so they would sink. Instead they have big livers full of oil, which is lighter than seawater, and a light skeleton of cartilage to help them stay afloat.",
    sources: [
      {
        label: "Natural History Museum: Do sharks have bones?",
        url: "https://www.nhm.ac.uk/discover/quick-questions/do-sharks-have-bones.html",
      },
      {
        label: "Hawaii DLNR: Skeleton and buoyancy",
        url: "https://dlnr.hawaii.gov/sharks/anatomy/skeleton-and-buoyancy/",
      },
    ],
  },
  {
    slug: "anatomy-gills-and-spiracles",
    topic: "anatomy",
    title: "Sharks breathe through gill slits, and some have extra openings",
    body: "Most sharks have five gill slits on each side of the head, and they take oxygen from the water passing over their gills. Bottom-dwellers such as wobbegongs and angelsharks also have openings behind the eyes, called spiracles, to draw water in.",
    sources: [
      { label: "Sharks4Kids: Shark gills", url: "https://sharks4kids.com/shark-gills" },
      { label: "Wikipedia: Shark", url: "https://en.wikipedia.org/wiki/Shark" },
    ],
  },
  {
    slug: "anatomy-warm-bodied-mako",
    topic: "anatomy",
    title: "Mako sharks keep their swimming muscles warm",
    body: "Most sharks are about as warm as the water around them, but the shortfin mako keeps its swimming muscles warmer. A 2025 study found them to be on average about 1.5 to 3.9 degrees Celsius warmer than the sea.",
    sources: [
      {
        label: "Journal of Animal Ecology (2025), via PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12586780/",
      },
      {
        label: "University of St Andrews: Secret of the great white shark revealed",
        url: "https://news.st-andrews.ac.uk/archive/secret-of-the-great-white-shark-revealed/",
      },
    ],
  },
  {
    slug: "anatomy-thresher-tail-slap",
    topic: "anatomy",
    title: "Thresher sharks stun fish with their tails",
    body: "A thresher shark's tail is nearly half as long as its whole body. Scientists filmed thresher sharks slapping schools of sardines with it, stunning or hurting the fish before eating them.",
    sources: [
      {
        label: "Bangor University: thresher sharks use tail slaps to hunt",
        url: "https://bangor.ac.uk/news/archive/researchers-reveal-that-thresher-sharks-use-tail-slaps-to-hunt-14880",
      },
      {
        label: "NBC News: Thresher shark stuns prey",
        url: "https://www.nbcnews.com/news/amp/wbna52444211",
      },
    ],
  },

  // ---- Babies and life ----
  {
    slug: "babies-three-ways-born",
    topic: "babies",
    title: "Sharks are born in three different ways",
    body: "Some sharks lay eggs in tough cases. Others keep the eggs inside their body until the pups hatch. And some, like bull and hammerhead sharks, feed their pups through a link a bit like a mammal's umbilical cord.",
    sources: [
      {
        label: "Shark Trust: Shark reproduction",
        url: "https://www.sharktrust.org/shark-reproduction",
      },
      {
        label: "NOAA Fisheries: Eight surprising shark facts",
        url: "https://fisheries.noaa.gov/feature-story/eight-surprising-shark-facts",
      },
    ],
  },
  {
    slug: "babies-egg-cases",
    topic: "babies",
    title: "Some sharks leave their eggs on the seabed",
    body: "Egg-laying sharks leave leathery egg cases fixed to the seabed, a reef or seaweed. The pups inside can take around 6 to 9 months to be ready to hatch.",
    sources: [
      {
        label: "Shark Trust: Shark reproduction",
        url: "https://www.sharktrust.org/shark-reproduction",
      },
      {
        label: "Peer-reviewed paper on egg-laying in sharks (PubMed Central)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7378224/",
      },
    ],
  },
  {
    slug: "babies-on-their-own",
    topic: "babies",
    title: "Shark pups are on their own from birth",
    body: "Most live-bearing shark pups swim away and look after themselves right after they are born. Many are born in warm, shallow nursery areas such as coastal bays, where there is plenty of small food and fewer big predators.",
    sources: [
      { label: "Shark Trust: Pups", url: "https://www.sharktrust.org/pups-shark-reproduction" },
      {
        label: "NOAA Fisheries: Eight surprising shark facts",
        url: "https://fisheries.noaa.gov/feature-story/eight-surprising-shark-facts",
      },
    ],
  },
  {
    slug: "babies-great-whites-grow-up-slowly",
    topic: "babies",
    title: "Great white sharks take decades to grow up",
    body: "Male great white sharks are not old enough to have pups until about age 26, and females until about age 33. Many sharks take years, or even decades, to mature, so they have babies slowly.",
    sources: [
      {
        label: "NOAA Fisheries: Eight surprising shark facts",
        url: "https://fisheries.noaa.gov/feature-story/eight-surprising-shark-facts",
      },
    ],
  },
  {
    slug: "babies-longest-pregnancies",
    topic: "babies",
    title: "A spiny dogfish can be pregnant for two years",
    body: "A female spiny dogfish can carry her pups for up to two years, one of the longest confirmed pregnancies of any backboned animal. A few deep-sea sharks may carry theirs even longer.",
    // Sources disagree about the record holder, so the confirmed two-year figure is used.
    sources: [
      {
        label: "NOAA Fisheries: Eight surprising shark facts",
        url: "https://fisheries.noaa.gov/feature-story/eight-surprising-shark-facts",
      },
      {
        label: "Guinness World Records: Longest gestation period",
        url: "https://www.guinnessworldrecords.com/world-records/longest-gestation-period",
      },
    ],
  },
  {
    slug: "babies-sand-tiger-siblings",
    topic: "babies",
    title: "Sand tiger pups eat their brothers and sisters",
    body: "Inside a mother sand tiger shark, the first pup to hatch in each womb eats its siblings. Only one pup survives per womb, so she gives birth to just two, and each is already more than three feet long.",
    sources: [
      {
        label: "PBS NOVA: When shark fetuses attack",
        url: "https://www.pbs.org/wgbh/nova/nature/shark-fetuses-attack.html",
      },
      {
        label: "NOAA Fisheries: Eight surprising shark facts",
        url: "https://fisheries.noaa.gov/feature-story/eight-surprising-shark-facts",
      },
    ],
  },

  // ---- Long ago ----
  {
    slug: "history-older-than-dinosaurs",
    topic: "history",
    title: "Sharks are older than dinosaurs",
    body: "Sharks have been around for at least 400 million years. That is before the first trees, about 385 million years ago, and well before the first dinosaurs, about 230 million years ago.",
    // Cautious figure: some sources say about 450 million years, but the earliest evidence is disputed scales.
    sources: [
      {
        label: "BBC Discover Wildlife: Are sharks older than trees?",
        url: "https://www.discoverwildlife.com/prehistoric-life/are-sharks-older-than-trees",
      },
      {
        label: "Natural History Museum: Where did dinosaurs come from?",
        url: "https://nhm.ac.uk/discover/where-did-dinosaurs-come-from.html",
      },
    ],
  },
  {
    slug: "history-survivors-of-mass-extinctions",
    topic: "history",
    title: "Sharks lived through huge mass extinctions",
    body: "Small sharks survived the Great Dying, about 250 million years ago, perhaps by moving into deeper water. Shark teeth also show that sharks stayed fairly varied when the dinosaurs died out 66 million years ago, although some big predators among them were lost.",
    sources: [
      {
        label: "Science News Explores: How sharks survived the Great Dying",
        url: "https://www.snexplores.org/article/how-sharks-survived-great-dying",
      },
      {
        label: "ScienceDaily: Shark diversity unaffected when dinosaurs were wiped out",
        url: "https://www.sciencedaily.com/releases/2021/08/210810143102.htm",
      },
    ],
  },
  {
    slug: "history-megalodon-teeth",
    topic: "history",
    title: "Megalodon was huge, but we mostly have teeth",
    body: "Megalodon lived from roughly 20 million to about 3 million years ago. Scientists think it grew to around 15 to 18 metres (50 to 60 feet) long, but they work that out from teeth and a few backbone pieces, because no complete skeleton has been found.",
    // Medium confidence: size estimates are debated.
    sources: [
      {
        label: "Florida Museum: Five facts about megalodon",
        url: "https://www.floridamuseum.ufl.edu/science/five-facts-megalodon/",
      },
      {
        label: "National Geographic: Maybe megalodon wasn't so chonky after all",
        url: "https://nationalgeographic.com/science/article/megalodon-shark-bigger-size-slim-fossil",
      },
    ],
  },
  {
    slug: "history-fossil-shark-teeth",
    topic: "history",
    title: "Fossil shark teeth turn up where the sea used to be",
    body: "Most fossil shark teeth are found in layers of rock from places that used to be shallow sea, such as parts of Florida. Water wears away the sediment and uncovers them, so beaches at low tide and creek beds can be good places to look.",
    sources: [
      {
        label: "Florida Museum: Five facts about fossil shark teeth in Florida",
        url: "https://www.floridamuseum.ufl.edu/science/five-facts-fossil-shark-teeth-in-florida/",
      },
      {
        label: "Florida Museum: Five facts about megalodon",
        url: "https://www.floridamuseum.ufl.edu/science/five-facts-megalodon/",
      },
    ],
  },

  // ---- Records ----
  {
    slug: "records-biggest-fish",
    topic: "records",
    title: "The whale shark is the biggest fish",
    body: "The whale shark is the largest fish in the ocean and can grow to about 12 metres (40 feet) long. Sharks longer than that are rare.",
    sources: [
      {
        label: "NOAA National Ocean Service: What is the biggest fish in the ocean?",
        url: "https://oceanservice.noaa.gov/facts/bigfish.html",
      },
    ],
  },
  {
    slug: "records-smallest-sharks",
    topic: "records",
    title: "Some sharks are small enough to hold",
    body: "The dwarf lanternshark is one of the smallest sharks in the world. Adults are only about 16 to 20 centimetres (6 to 8 inches) long.",
    // Medium confidence: the dwarf lanternshark, spined pygmy shark and pygmy ribbontail catshark are all contenders.
    sources: [
      {
        label: "Guinness World Records: Smallest shark",
        url: "https://www.guinnessworldrecords.com/world-records/smallest-shark",
      },
    ],
  },
  {
    slug: "records-fastest-shark",
    topic: "records",
    title: "The shortfin mako is the fastest known shark",
    body: "Shortfin makos have been measured swimming at about 50 kilometres an hour (31 miles an hour). Some reports claim even faster bursts, but those top speeds have not been measured well.",
    // Medium confidence: sources range from 50 to 74 km/h, so the cautious measured figure is used.
    sources: [
      {
        label: "Shark Trust: The Blowfish on the world's fastest shark",
        url: "https://www.sharktrust.org/blog/the-blowfish-on-the-worlds-fastest-shark",
      },
      {
        label: "BBC Discover Wildlife: Fastest shark in the world",
        url: "https://www.discoverwildlife.com/animal-facts/fish/fastest-shark-in-world",
      },
    ],
  },
  {
    slug: "records-deepest-shark",
    topic: "records",
    title: "The Portuguese dogfish lives deeper than any other known shark",
    body: "The Portuguese dogfish has been found as deep as about 3,700 metres (12,100 feet), the deepest of any shark known. Most of the time it lives at depths of roughly 400 to 2,000 metres.",
    sources: [
      {
        label: "Guinness World Records: Deepest shark",
        url: "https://www.guinnessworldrecords.com/world-records/729988-deepest-shark",
      },
      {
        label: "FishBase: Centroscymnus coelolepis",
        url: "https://www.fishbase.se/summary/Centroscymnus-coelolepis.html",
      },
    ],
  },
  {
    slug: "records-longest-lived",
    topic: "records",
    title: "Greenland sharks may live for centuries",
    body: "The Greenland shark is the longest-lived backboned animal known. Scientists who dated 28 of them by looking at their eyes estimated that the oldest was roughly 400 years old, and at least 272, though the exact age is uncertain.",
    // Medium confidence: based on a 2016 study in Science that was summarised, not read in full.
    sources: [
      {
        label: "Sci.News: Greenland sharks are the longest-lived vertebrates on Earth",
        url: "https://www.sci.news/biology/greenland-sharks-longest-lived-vertebrates-04099.html",
      },
    ],
  },
  {
    slug: "records-longest-whale-shark-trip",
    topic: "records",
    title: "One whale shark swam more than 20,000 kilometres",
    body: "A female whale shark nicknamed Anne was tracked swimming about 20,142 kilometres (12,500 miles) across the Pacific Ocean over 841 days, the longest whale shark journey ever recorded.",
    // Medium confidence: a single tagged shark, reported by Mongabay from a 2018 study.
    sources: [
      {
        label: "Mongabay: Longest recorded whale shark migration eclipses 20,000 kilometers",
        url: "https://news.mongabay.com/2018/05/longest-recorded-whale-shark-migration-eclipses-20000-kilometers/",
      },
    ],
  },

  // FACTS-BELOW
];

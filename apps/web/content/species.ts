import type { Habitat, IucnStatus } from "@/lib/species-rules";

/**
 * The shark content. This file is the source of truth: `pnpm seed:species` copies it into the
 * database. Edit the words here, in a pull request, and re-run the seed.
 *
 * How the facts were gathered: each species was researched on Wikipedia and FishBase. Both cite the
 * IUCN Red List, but the IUCN website itself blocked our automated lookups, so every conservation
 * status below is "as reported by Wikipedia and FishBase" and links to the species' IUCN page,
 * which has NOT been opened by us. Review the statuses (and the IUCN links) before search
 * indexing is switched on. Where sources disagreed we chose the more cautious number.
 */

export interface SpeciesEntry {
  slug: string;
  commonName: string;
  scientificName: string;
  /** Longest length we are comfortable stating, in centimetres. */
  maxLengthCm: number;
  habitats: Habitat[];
  depthMinM?: number;
  depthMaxM?: number;
  diet: string;
  iucnStatus: IucnStatus;
  iucnSourceUrl: string;
  /** The year of the IUCN assessment, as given by Wikipedia or FishBase. */
  iucnAssessedYear: number;
  summary: string;
  weirdBit: string;
  sources: { label: string; url: string }[];
}

const wiki = (page: string) => ({
  label: "Wikipedia",
  url: `https://en.wikipedia.org/wiki/${page}`,
});
const fishbase = (page: string) => ({
  label: "FishBase",
  url: `https://www.fishbase.se/summary/${page}.html`,
});
const iucn = (path: string) => `https://www.iucnredlist.org/species/${path}`;

export const speciesEntries: SpeciesEntry[] = [
  {
    slug: "great-white-shark",
    commonName: "Great white shark",
    scientificName: "Carcharodon carcharias",
    maxLengthCm: 600,
    habitats: ["coastal", "open-ocean"],
    diet: "Fish, rays, other sharks, seals, dolphins, seabirds, squid and carrion",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("3855/212629880"),
    iucnAssessedYear: 2018,
    summary:
      "The great white is the world's biggest predatory fish, a powerful swimmer found in cooler coastal waters on every continent except Antarctica. Its teeth are serrated like steak knives and are replaced as they wear out.",
    weirdBit:
      "A great white is partly warm-blooded. A web of blood vessels keeps some of its body warmer than the sea around it, which lets it hunt hard in cold water.",
    sources: [wiki("Great_white_shark"), fishbase("Carcharodon-carcharias")],
  },
  {
    slug: "whale-shark",
    commonName: "Whale shark",
    scientificName: "Rhincodon typus",
    maxLengthCm: 1200,
    habitats: ["open-ocean", "coastal"],
    depthMaxM: 1928,
    diet: "Plankton, krill, fish eggs and small schooling fish, filtered from the water",
    iucnStatus: "EN",
    iucnSourceUrl: iucn("19488/2365291"),
    iucnAssessedYear: 2016,
    summary:
      "The whale shark is the biggest fish alive. It is gentle and slow, and it feeds by swimming along with its huge mouth open, filtering tiny animals out of the water.",
    weirdBit:
      "Every whale shark has its own pattern of pale spots and stripes, like a fingerprint. Scientists use the patterns to tell individuals apart.",
    sources: [wiki("Whale_shark"), fishbase("Rhincodon-typus")],
  },
  {
    slug: "scalloped-hammerhead",
    commonName: "Scalloped hammerhead",
    scientificName: "Sphyrna lewini",
    maxLengthCm: 430,
    habitats: ["coastal", "open-ocean"],
    depthMinM: 0,
    depthMaxM: 1043,
    diet: "Fish such as sardines and mackerel, squid, octopus and crustaceans",
    iucnStatus: "CR",
    iucnSourceUrl: iucn("39385/2918526"),
    iucnAssessedYear: 2018,
    summary:
      "The scalloped hammerhead has a wide, flat head with a gently scooped front edge. It lives in warm waters around the world and often gathers in big schools.",
    weirdBit:
      "Baby scalloped hammerheads can spend around three years sheltering in mangrove roots before they head out to open water.",
    sources: [wiki("Scalloped_hammerhead"), fishbase("Sphyrna-lewini")],
  },
  {
    slug: "great-hammerhead",
    commonName: "Great hammerhead",
    scientificName: "Sphyrna mokarran",
    maxLengthCm: 610,
    habitats: ["reef", "coastal"],
    depthMinM: 1,
    depthMaxM: 300,
    diet: "Stingrays, bony fish, squid, crustaceans and smaller sharks",
    iucnStatus: "CR",
    iucnSourceUrl: iucn("39386/2920499"),
    iucnAssessedYear: 2018,
    summary:
      "The biggest of the hammerheads, with a tall fin and a very wide head. It hunts along warm coasts and reefs, and loves to eat stingrays.",
    weirdBit:
      "Great hammerheads often swim tipped over on their sides, which may cut drag by about 10 percent.",
    sources: [wiki("Great_hammerhead"), fishbase("Sphyrna-mokarran")],
  },
  {
    slug: "goblin-shark",
    commonName: "Goblin shark",
    scientificName: "Mitsukurina owstoni",
    maxLengthCm: 400,
    habitats: ["deep-sea"],
    depthMinM: 30,
    depthMaxM: 1300,
    diet: "Deep-sea fish, squid and crustaceans such as shrimp",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("44565/2994832"),
    iucnAssessedYear: 2018,
    summary:
      "A pink, soft-bodied shark from the deep sea with a long, flat snout. It is the only living member of a family that goes back about 125 million years, which is why people call it a living fossil.",
    weirdBit:
      "Its jaws shoot forward out of its face to snatch prey. Scientists estimate they stretch out much further than the jaws of any other shark.",
    sources: [wiki("Goblin_shark"), fishbase("Mitsukurina-owstoni")],
  },
  {
    slug: "greenland-shark",
    commonName: "Greenland shark",
    scientificName: "Somniosus microcephalus",
    maxLengthCm: 550,
    habitats: ["polar", "deep-sea"],
    depthMaxM: 2200,
    diet: "Fish such as cod and skates, seals, squid, and carrion",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("60213/124452872"),
    iucnAssessedYear: 2020,
    summary:
      "A slow, big shark of the icy North Atlantic and Arctic. It cruises along at under one kilometre an hour and spends much of its life in very cold, very deep water.",
    weirdBit:
      "The Greenland shark may live for hundreds of years. Scientists dated the lenses of their eyes and estimated lifespans of at least 272 years, which makes it the longest-lived backboned animal we know of.",
    sources: [wiki("Greenland_shark"), fishbase("Somniosus-microcephalus")],
  },
  {
    slug: "dwarf-lanternshark",
    commonName: "Dwarf lanternshark",
    scientificName: "Etmopterus perryi",
    maxLengthCm: 21,
    habitats: ["deep-sea"],
    depthMinM: 230,
    depthMaxM: 530,
    diet: "Probably small deep-sea animals. Scientists have not studied what it eats yet.",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("60240/124455061"),
    iucnAssessedYear: 2020,
    summary:
      "One of the smallest sharks in the world, small enough to rest on your hand. It lives in deep water off Colombia and Venezuela.",
    weirdBit:
      "It makes its own light. Special organs called photophores on its body glow in the dark of the deep sea.",
    sources: [wiki("Dwarf_lanternshark"), fishbase("Etmopterus-perryi")],
  },
  {
    slug: "tiger-shark",
    commonName: "Tiger shark",
    scientificName: "Galeocerdo cuvier",
    maxLengthCm: 550,
    habitats: ["coastal", "reef", "open-ocean"],
    depthMinM: 0,
    depthMaxM: 800,
    diet: "Fish, turtles, seabirds, rays, other sharks, dolphins, squid and carrion",
    iucnStatus: "NT",
    iucnSourceUrl: iucn("39378/2913541"),
    iucnAssessedYear: 2018,
    summary:
      "A big, striped shark of warm seas. Faint stripes on its sides fade as it grows up. It will eat almost anything, and its jaws can crack open turtle shells.",
    weirdBit:
      'Tiger sharks have the widest menu of any shark, and they have been found with all sorts of things in their stomachs. That earned them the nickname "garbage can of the sea".',
    sources: [wiki("Tiger_shark"), fishbase("Galeocerdo-cuvier")],
  },
  {
    slug: "bull-shark",
    commonName: "Bull shark",
    scientificName: "Carcharhinus leucas",
    maxLengthCm: 400,
    habitats: ["coastal", "estuary"],
    depthMinM: 1,
    depthMaxM: 164,
    diet: "Bony fish, other sharks, stingrays, turtles, birds and crustaceans",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39372/2910670"),
    iucnAssessedYear: 2020,
    summary:
      "A stocky, strong shark that can live in salt water and in fresh water. It turns up in warm coastal seas, rivers and even lakes.",
    weirdBit:
      "For its size, the bull shark has the strongest bite of any shark scientists have measured.",
    sources: [wiki("Bull_shark"), fishbase("Carcharhinus-leucas")],
  },
  {
    slug: "basking-shark",
    commonName: "Basking shark",
    scientificName: "Cetorhinus maximus",
    maxLengthCm: 1000,
    habitats: ["coastal", "open-ocean"],
    depthMinM: 0,
    depthMaxM: 910,
    diet: "Tiny plankton, mostly small crustaceans called copepods, filtered from the water",
    iucnStatus: "EN",
    iucnSourceUrl: iucn("4292/194720078"),
    iucnAssessedYear: 2018,
    summary:
      "The second-biggest fish in the sea, after the whale shark. It looks fearsome with its gaping mouth, but it only eats plankton, which it strains out of the water as it glides along.",
    weirdBit:
      "A basking shark has the smallest brain, compared with its body weight, of any shark.",
    sources: [wiki("Basking_shark"), fishbase("Cetorhinus-maximus")],
  },
  {
    slug: "megamouth-shark",
    commonName: "Megamouth shark",
    scientificName: "Megachasma pelagios",
    maxLengthCm: 549,
    habitats: ["open-ocean", "deep-sea"],
    depthMaxM: 1500,
    diet: "Krill, jellyfish, shrimp larvae and other tiny animals filtered from the water",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("39338/124402302"),
    iucnAssessedYear: 2019,
    summary:
      "A very rare, big, filter-feeding shark with an enormous mouth. Only a few hundred have ever been caught or seen, so we still know very little about it.",
    weirdBit:
      "The first one ever found, in 1976, was tangled in the anchor of a US Navy research ship off Hawaii. Nobody even knew the species existed before that.",
    sources: [wiki("Megamouth_shark")],
  },
  {
    slug: "common-thresher-shark",
    commonName: "Common thresher shark",
    scientificName: "Alopias vulpinus",
    maxLengthCm: 573,
    habitats: ["coastal", "open-ocean"],
    depthMinM: 0,
    depthMaxM: 550,
    diet: "Mostly schooling fish such as anchovies, sardines and herring, plus squid",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39339/212641186"),
    iucnAssessedYear: 2019,
    summary:
      "A shark with an amazing tail. The top lobe is almost as long as the rest of its body. It lives in warm and temperate seas and chases schools of small fish.",
    weirdBit:
      "A thresher whips its long tail through a school of fish to stun them, then comes back round to eat.",
    sources: [wiki("Common_thresher")],
  },
  {
    slug: "shortfin-mako",
    commonName: "Shortfin mako",
    scientificName: "Isurus oxyrinchus",
    maxLengthCm: 445,
    habitats: ["open-ocean", "coastal"],
    diet: "Squid and fish such as mackerel and tuna, sometimes other sharks and dolphins",
    iucnStatus: "EN",
    iucnSourceUrl: iucn("39341/2903170"),
    iucnAssessedYear: 2019,
    summary:
      "The fastest known shark, built like a torpedo. It roams warm and temperate oceans, hunting fast fish such as tuna.",
    weirdBit:
      "The mako is the fastest shark known, measured at about 50 kilometres an hour, with reports of even faster bursts. It is also one of the few partly warm-blooded sharks, which helps its muscles work harder.",
    sources: [wiki("Shortfin_mako_shark")],
  },
  {
    slug: "blue-shark",
    commonName: "Blue shark",
    scientificName: "Prionace glauca",
    maxLengthCm: 380,
    habitats: ["open-ocean"],
    depthMinM: 0,
    depthMaxM: 350,
    diet: "Mainly squid, plus bony fish, small sharks and carrion",
    iucnStatus: "NT",
    iucnSourceUrl: iucn("39381/2915850"),
    iucnAssessedYear: 2019,
    summary:
      "A slim, graceful shark with a deep blue back and a long snout. It is one of the most widespread sharks in the world and travels huge distances across the open ocean.",
    weirdBit:
      "Blue sharks seem to steer by the Earth's magnetic field. They can hold a straight course for hundreds of kilometres over many days.",
    sources: [wiki("Blue_shark")],
  },
  {
    slug: "nurse-shark",
    commonName: "Nurse shark",
    scientificName: "Ginglymostoma cirratum",
    maxLengthCm: 308,
    habitats: ["reef", "coastal"],
    diet: "Small fish, stingrays, crustaceans, molluscs and sea urchins, found on the seabed",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("144141186/3095153"),
    iucnAssessedYear: 2021,
    summary:
      "A sleepy-looking bottom dweller with whisker-like feelers on its chin. It often rests in groups under ledges during the day and hunts at night.",
    weirdBit:
      "A nurse shark sucks in its food. Its suction is among the strongest ever measured in any water animal with a backbone.",
    sources: [wiki("Nurse_shark")],
  },
  {
    slug: "lemon-shark",
    commonName: "Lemon shark",
    scientificName: "Negaprion brevirostris",
    maxLengthCm: 343,
    habitats: ["reef", "coastal", "estuary"],
    depthMinM: 0,
    depthMaxM: 92,
    diet: "Mostly fish eaten at night, plus crustaceans, rays and molluscs",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39380/2915472"),
    iucnAssessedYear: 2021,
    summary:
      "A yellow-brown shark of warm, shallow water, the colour of a lemon peel. Young lemon sharks grow up in sheltered places like mangrove shallows.",
    weirdBit:
      "Scientists have studied the lemon sharks of Bimini in the Bahamas since 1967. It is probably the best-known shark population in the world.",
    sources: [wiki("Lemon_shark")],
  },
  {
    slug: "whitetip-reef-shark",
    commonName: "Whitetip reef shark",
    scientificName: "Triaenodon obesus",
    maxLengthCm: 160,
    habitats: ["reef"],
    depthMinM: 8,
    depthMaxM: 40,
    diet: "Bony fish, eels, octopus, spiny lobsters and crabs, hunted mostly at night",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39384/173436715"),
    iucnAssessedYear: 2020,
    summary:
      "A slim reef shark with white tips on its fins. It spends the day resting in caves and under ledges, then comes out at night to hunt.",
    weirdBit:
      "Most sharks must keep swimming to breathe. The whitetip can pump water over its gills while it lies still on the seabed.",
    sources: [wiki("Whitetip_reef_shark")],
  },
  {
    slug: "blacktip-reef-shark",
    commonName: "Blacktip reef shark",
    scientificName: "Carcharhinus melanopterus",
    maxLengthCm: 180,
    habitats: ["reef", "coastal"],
    depthMinM: 0,
    depthMaxM: 75,
    diet: "Small fish like mullet and wrasse, plus squid, crustaceans and sea snakes",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39375/58303674"),
    iucnAssessedYear: 2020,
    summary:
      "A common shark of shallow reefs in the Indian and Pacific oceans, with black tips on its fins. You can often see its fin cutting the surface in water only a few metres deep.",
    weirdBit:
      "At Palmyra Atoll, a blacktip's home range was only about half a square kilometre, among the smallest recorded for any shark.",
    sources: [wiki("Blacktip_reef_shark")],
  },
  {
    slug: "spotted-wobbegong",
    commonName: "Spotted wobbegong",
    scientificName: "Orectolobus maculatus",
    maxLengthCm: 320,
    habitats: ["reef", "coastal"],
    depthMinM: 0,
    depthMaxM: 218,
    diet: "Fish, crabs, lobsters and octopus, caught by ambush at night",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("41837/68638559"),
    iucnAssessedYear: 2015,
    summary:
      "A flat, blotchy shark from Australian waters that looks like a patch of seaweed-covered rock. It lies still on the bottom and ambushes whatever swims by.",
    weirdBit:
      "Its skin is covered in electric-sensing pores, and the frilly beard around its mouth helps it blend into the seabed.",
    sources: [wiki("Spotted_wobbegong")],
  },
  {
    slug: "cookiecutter-shark",
    commonName: "Cookiecutter shark",
    scientificName: "Isistius brasiliensis",
    maxLengthCm: 56,
    habitats: ["open-ocean", "deep-sea"],
    depthMinM: 0,
    depthMaxM: 3700,
    diet: "Cuts round plugs of flesh from whales and large fish; also eats squid",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("41830/2956761"),
    iucnAssessedYear: 2018,
    summary:
      "A small, cigar-shaped shark that spends the day deep down and rises toward the surface at night. It takes neat, round bites out of bigger animals, which leave marks like cookie-cutter holes.",
    weirdBit:
      "In the 1970s its bites damaged the rubber sonar domes of US Navy submarines, and nobody knew what was doing it until the shark was identified.",
    sources: [wiki("Cookiecutter_shark")],
  },
  {
    slug: "frilled-shark",
    commonName: "Frilled shark",
    scientificName: "Chlamydoselachus anguineus",
    maxLengthCm: 200,
    habitats: ["deep-sea"],
    depthMaxM: 1570,
    diet: "Mostly squid, plus smaller sharks, bony fish and sinking carrion",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("41794/68617785"),
    iucnAssessedYear: 2016,
    summary:
      "An eel-like shark of the deep sea, with frilly gill covers and a mouth full of needle-sharp teeth. Its family goes back an enormous way, so it is often called a living fossil.",
    weirdBit:
      "A frilled shark may carry its babies for up to about three and a half years, one of the longest pregnancies of any backboned animal.",
    sources: [wiki("Frilled_shark"), fishbase("Chlamydoselachus-anguineus")],
  },
  {
    slug: "angelshark",
    commonName: "Angelshark",
    scientificName: "Squatina squatina",
    maxLengthCm: 244,
    habitats: ["coastal"],
    depthMinM: 5,
    depthMaxM: 150,
    diet: "Flatfish and other bottom fish, crustaceans and molluscs, caught by ambush",
    iucnStatus: "CR",
    iucnSourceUrl: iucn("39332/117498371"),
    iucnAssessedYear: 2019,
    summary:
      "A flat shark that looks like a ray but is a true shark. It buries itself in sand or mud and waits for a fish to swim past.",
    weirdBit:
      "An angelshark can lunge and gulp down its prey in a fraction of a second, from a hiding place under the sand.",
    sources: [wiki("Angelshark"), fishbase("Squatina-squatina")],
  },
  {
    slug: "sand-tiger-shark",
    commonName: "Sand tiger shark",
    scientificName: "Carcharias taurus",
    maxLengthCm: 330,
    habitats: ["coastal", "reef"],
    depthMinM: 1,
    depthMaxM: 191,
    diet: "Mostly bony fish, plus small sharks, rays, squid, crabs and lobsters",
    iucnStatus: "CR",
    iucnSourceUrl: iucn("3854/2876505"),
    iucnAssessedYear: 2020,
    summary:
      "A shark with a fierce-looking mouth of ragged teeth that is actually fairly calm. It is not related to tiger sharks. In Australia it is called the grey nurse shark.",
    weirdBit:
      "It is the only shark known to gulp air at the surface and store it in its stomach, so it can hang in the water almost motionless.",
    sources: [wiki("Sand_tiger_shark"), fishbase("Carcharias-taurus")],
  },
  {
    slug: "porbeagle",
    commonName: "Porbeagle",
    scientificName: "Lamna nasus",
    maxLengthCm: 300,
    habitats: ["open-ocean", "coastal"],
    depthMinM: 0,
    depthMaxM: 1360,
    diet: "Mackerel, herring, cod and other bony fish, plus squid",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("11200/500969"),
    iucnAssessedYear: 2018,
    summary:
      "A stout shark of cool seas, related to great whites and makos, with a white patch at the back of its first fin. It lives in the North Atlantic, the Southern Hemisphere, and the Mediterranean.",
    weirdBit:
      "A porbeagle keeps its body core about 8 to 10 degrees warmer than the water around it, which is a big help in cold seas.",
    sources: [wiki("Porbeagle"), fishbase("Lamna-nasus")],
  },
  {
    slug: "salmon-shark",
    commonName: "Salmon shark",
    scientificName: "Lamna ditropis",
    maxLengthCm: 305,
    habitats: ["open-ocean", "coastal"],
    depthMinM: 0,
    depthMaxM: 650,
    diet: "Salmon, squid, herring, pollock and sablefish",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("39342/124402990"),
    iucnAssessedYear: 2018,
    summary:
      "A powerful shark of the cold North Pacific, found off Canada, Alaska and Japan. As its name says, it loves salmon.",
    weirdBit:
      "Salmon sharks gather in Prince William Sound, Alaska, to feast during the salmon run. They are partly warm-blooded, which keeps them active in icy water.",
    sources: [wiki("Salmon_shark"), fishbase("Lamna-ditropis")],
  },
  {
    slug: "epaulette-shark",
    commonName: "Epaulette shark",
    scientificName: "Hemiscyllium ocellatum",
    maxLengthCm: 107,
    habitats: ["reef", "coastal"],
    depthMinM: 0,
    depthMaxM: 50,
    diet: "Worms, crabs, shrimp, small bottom-dwelling invertebrates and small fish",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("41818/68625284"),
    iucnAssessedYear: 2015,
    summary:
      "A small, slender reef shark from northern Australia and New Guinea with a big dark spot behind each gill, like a soldier's shoulder badge.",
    weirdBit:
      "It walks. An epaulette shark wriggles along the seabed on its paired fins, and it can even crawl from one tide pool to the next.",
    sources: [wiki("Epaulette_shark"), fishbase("Hemiscyllium-ocellatum")],
  },
  {
    slug: "horn-shark",
    commonName: "Horn shark",
    scientificName: "Heterodontus francisci",
    maxLengthCm: 122,
    habitats: ["reef", "coastal"],
    depthMinM: 0,
    depthMaxM: 152,
    diet: "Sea urchins, crabs, snails, clams and other hard-shelled animals",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("39333/124401602"),
    iucnAssessedYear: 2024,
    summary:
      "A small bottom-dwelling shark of the eastern Pacific, with a pair of spines in front of its fins like little horns. It crunches shellfish with flat, grinding teeth.",
    weirdBit:
      "For its size, a horn shark has the strongest bite known among sharks. Mothers also tuck their spiral egg cases into rock crevices to keep them safe.",
    sources: [wiki("Horn_shark"), fishbase("Heterodontus-francisci")],
  },
  {
    slug: "leopard-shark",
    commonName: "Leopard shark",
    scientificName: "Triakis semifasciata",
    maxLengthCm: 198,
    habitats: ["coastal", "estuary", "reef"],
    depthMinM: 0,
    depthMaxM: 156,
    diet: "Crabs, shrimp, clams, fish eggs and small bony fish",
    iucnStatus: "LC",
    iucnSourceUrl: iucn("39363/80672743"),
    iucnAssessedYear: 2014,
    summary:
      "A slim, spotted shark of the North American Pacific coast. It is a common sight in shallow bays and estuaries, and it is harmless to people.",
    weirdBit:
      "Female leopard sharks gather in warm, shallow bays in summer. The warmth may help them and their young grow faster.",
    sources: [wiki("Leopard_shark"), fishbase("Triakis-semifasciata")],
  },
  {
    slug: "spiny-dogfish",
    commonName: "Spiny dogfish",
    scientificName: "Squalus acanthias",
    maxLengthCm: 200,
    habitats: ["coastal", "open-ocean", "deep-sea"],
    depthMinM: 0,
    depthMaxM: 1978,
    diet: "Fish, squid, crabs, jellyfish and other small sea animals",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("91209505/124551959"),
    iucnAssessedYear: 2019,
    summary:
      "A small, slim shark found in cool seas around the world, including both coasts of Canada. It travels in big groups and has a spine in front of each of its two back fins.",
    weirdBit:
      "A spiny dogfish mother carries her pups for about 18 to 24 months, one of the longest pregnancies of any animal.",
    sources: [wiki("Spiny_dogfish"), fishbase("Squalus-acanthias")],
  },
  {
    slug: "silky-shark",
    commonName: "Silky shark",
    scientificName: "Carcharhinus falciformis",
    maxLengthCm: 350,
    habitats: ["open-ocean", "reef"],
    depthMinM: 0,
    depthMaxM: 500,
    diet: "Tuna, mackerel and sardines, plus squid and swimming crabs",
    iucnStatus: "VU",
    iucnSourceUrl: iucn("39370/117721799"),
    iucnAssessedYear: 2017,
    summary:
      "A sleek open-ocean shark named for its smooth, shiny skin. It lives in warm waters and often follows schools of tuna.",
    weirdBit:
      "A silky shark can hear low rumbling sounds from hundreds of metres away, which lets it find feeding birds and dolphins.",
    sources: [wiki("Silky_shark"), fishbase("Carcharhinus-falciformis")],
  },
];

/** Which shark is featured in which month, with a one-line teaser. Months are "YYYY-MM". */
export const featuredMonths: { month: string; slug: string; teaser: string }[] = [
  {
    month: "2026-10",
    slug: "goblin-shark",
    teaser: "A pink living fossil whose jaws shoot out of its face. Perfect for spooky season.",
  },
  {
    month: "2026-11",
    slug: "greenland-shark",
    teaser: "A slow giant of the Arctic that may live for hundreds of years.",
  },
  {
    month: "2026-12",
    slug: "whale-shark",
    teaser: "The biggest fish in the sea, and a gentle one.",
  },
  {
    month: "2027-01",
    slug: "scalloped-hammerhead",
    teaser: "The shark with a head like a wide, scooped shovel.",
  },
  {
    month: "2027-02",
    slug: "great-white-shark",
    teaser: "The famous one, and a lot more interesting than the movies suggest.",
  },
  {
    month: "2027-03",
    slug: "dwarf-lanternshark",
    teaser: "A shark small enough for your hand, and it glows in the dark.",
  },
];

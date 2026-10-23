/**
 * The photo for each species, from Wikimedia Commons. Only public domain, CC BY and CC BY-SA files
 * are used, and each one was looked at to make sure it shows the right shark. Credits are shown
 * under photos on profiles and on /credits. To change a photo, replace its entry and run
 * `pnpm seed:content`. Photos load straight from Wikimedia.
 */

export interface SpeciesImage {
  /** An https address of the 960 pixel wide version, on Wikimedia's thumbnail host. */
  url: string;
  /** Null when the file names no author (public domain files sometimes do not). */
  photographer: string | null;
  /** The license as Commons names it, for example "CC BY-SA 4.0" or "Public domain". */
  license: string;
  /** The license text, when there is one (public domain files have none). */
  licenseUrl: string | null;
  /** The image’s page on Commons, which shows the author and license. */
  filePage: string;
}

export const speciesImages: Record<string, SpeciesImage> = {
  // Great white shark
  "great-white-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/960px-White_shark.jpg",
    photographer: "Terry Goss",
    license: "CC BY 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5",
    filePage: "https://commons.wikimedia.org/wiki/File:White_shark.jpg",
  },
  // Whale shark
  "whale-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Similan_Dive_Center_-_great_whale_shark.jpg/960px-Similan_Dive_Center_-_great_whale_shark.jpg",
    photographer: "Abe Khao Lak",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Similan_Dive_Center_-_great_whale_shark.jpg",
  },
  // Scalloped hammerhead
  "scalloped-hammerhead": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Scalloped_hammerhead_shark_%28Sphyrna_lewini%29_Costa_Rica_%28cropped%29.jpg/960px-Scalloped_hammerhead_shark_%28Sphyrna_lewini%29_Costa_Rica_%28cropped%29.jpg",
    photographer: "Kris-Mikael Krister",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    filePage:
      "https://commons.wikimedia.org/wiki/File:Scalloped_hammerhead_shark_(Sphyrna_lewini)_Costa_Rica_(cropped).jpg",
  },
  // Great hammerhead
  "great-hammerhead": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Great_hammerhead2.jpg",
    photographer: "Albert kok",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Great_hammerhead2.jpg",
  },
  // Goblin shark
  "goblin-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Goblin_shark_%28Mitsukurina_owstoni%29.jpg/960px-Goblin_shark_%28Mitsukurina_owstoni%29.jpg",
    photographer: "Michigan State University/USFWS",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Goblin_shark_(Mitsukurina_owstoni).jpg",
  },
  // Greenland shark
  "greenland-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Somniosus_microcephalus_okeanos.jpg/960px-Somniosus_microcephalus_okeanos.jpg",
    photographer: "NOAA Okeanos Explorer Program",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Somniosus_microcephalus_okeanos.jpg",
  },
  // Dwarf lanternshark
  "dwarf-lanternshark": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Etmopterus_perryi_SI_cr.jpg",
    photographer: "Chip Clark/Smithsonian Institution",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Etmopterus_perryi_SI_cr.jpg",
  },
  // Tiger shark
  "tiger-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Tiger_shark.jpg/960px-Tiger_shark.jpg",
    photographer: "Albert kok",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Tiger_shark.jpg",
  },
  // Bull shark
  "bull-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Bull_shark_%28Carcharhinus_leucas%29.jpg/960px-Bull_shark_%28Carcharhinus_leucas%29.jpg",
    photographer: "João D'Andretta",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Bull_shark_(Carcharhinus_leucas).jpg",
  },
  // Basking shark
  "basking-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Cetorhinus_maximus_by_greg_skomal.JPG/960px-Cetorhinus_maximus_by_greg_skomal.JPG",
    photographer: "Greg Skomal / NOAA Fisheries Service",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Cetorhinus_maximus_by_greg_skomal.JPG",
  },
  // Megamouth shark
  "megamouth-shark": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Megamouth_shark_Megachasma_pelagios.jpg",
    photographer: "opencage",
    license: "CC BY-SA 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
    filePage: "https://commons.wikimedia.org/wiki/File:Megamouth_shark_Megachasma_pelagios.jpg",
  },
  // Common thresher shark
  "common-thresher-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Alopias_vulpinus_242252421.jpg/960px-Alopias_vulpinus_242252421.jpg",
    photographer: "alicia penney",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Alopias_vulpinus_242252421.jpg",
  },
  // Shortfin mako
  "shortfin-mako": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Shortfin_mako_%28Isurus_oxyrinchus%29.jpg/960px-Shortfin_mako_%28Isurus_oxyrinchus%29.jpg",
    photographer: "Fábio Olmos",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Shortfin_mako_(Isurus_oxyrinchus).jpg",
  },
  // Blue shark
  "blue-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg/960px-Tibur%C3%B3n_azul_%28Prionace_glauca%29%2C_canal_Fayal-Pico%2C_islas_Azores%2C_Portugal%2C_2020-07-27%2C_DD_31.jpg",
    photographer: "Diego Delso",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePage:
      "https://commons.wikimedia.org/wiki/File:Tibur%C3%B3n_azul_(Prionace_glauca),_canal_Fayal-Pico,_islas_Azores,_Portugal,_2020-07-27,_DD_31.jpg",
  },
  // Nurse shark
  "nurse-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Nurse_shark.jpg/960px-Nurse_shark.jpg",
    photographer: null,
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Nurse_shark.jpg",
  },
  // Lemon shark
  "lemon-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Lemonshark.JPG/960px-Lemonshark.JPG",
    photographer: "Albert Kok",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Lemonshark.JPG",
  },
  // Whitetip reef shark
  "whitetip-reef-shark": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Triaenodon_obesus_moc.jpg",
    photographer: "NOAA",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Triaenodon_obesus_moc.jpg",
  },
  // Blacktip reef shark
  "blacktip-reef-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Blacktip_reef_shark_%28Carcharhinus_melanopterus%29_Moorea.jpg/960px-Blacktip_reef_shark_%28Carcharhinus_melanopterus%29_Moorea.jpg",
    photographer: "Charles J. Sharp",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    filePage:
      "https://commons.wikimedia.org/wiki/File:Blacktip_reef_shark_(Carcharhinus_melanopterus)_Moorea.jpg",
  },
  // Spotted wobbegong
  "spotted-wobbegong": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Orectolobus_maculatus_cod_ground.jpg/960px-Orectolobus_maculatus_cod_ground.jpg",
    photographer: "Rick Stuart-Smith / Reef Life Survey",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Orectolobus_maculatus_cod_ground.jpg",
  },
  // Cookiecutter shark
  "cookiecutter-shark": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Isistius_brasiliensis.jpg",
    photographer: "NOAA Observer Project",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Isistius_brasiliensis.jpg",
  },
  // Frilled shark
  "frilled-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Chlamydoselachus_anguineus_head.jpg/960px-Chlamydoselachus_anguineus_head.jpg",
    photographer: "Citron",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Chlamydoselachus_anguineus_head.jpg",
  },
  // Angelshark
  angelshark: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Squatina_squatina_254848662.jpg/960px-Squatina_squatina_254848662.jpg",
    photographer: "Ben Jobson",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Squatina_squatina_254848662.jpg",
  },
  // Sand tiger shark
  "sand-tiger-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Sand_tiger_shark_%28Carcharias_taurus%29.jpg/960px-Sand_tiger_shark_%28Carcharias_taurus%29.jpg",
    photographer: "Bryce Watts-Parker",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Sand_tiger_shark_(Carcharias_taurus).jpg",
  },
  // Porbeagle
  porbeagle: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Lamna_nasus_noaa.jpg/960px-Lamna_nasus_noaa.jpg",
    photographer: "NOAA",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Lamna_nasus_noaa.jpg",
  },
  // Salmon shark
  "salmon-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Lamna_ditropis.jpg/960px-Lamna_ditropis.jpg",
    photographer: "PIRO-NOAA Observer Program",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Lamna_ditropis.jpg",
  },
  // Epaulette shark
  "epaulette-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Hemiscyllium_ocellatum_060417w1.jpg/960px-Hemiscyllium_ocellatum_060417w1.jpg",
    photographer: "Strobilomyces",
    license: "CC BY-SA 3.0",
    licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
    filePage: "https://commons.wikimedia.org/wiki/File:Hemiscyllium_ocellatum_060417w1.jpg",
  },
  // Horn shark
  "horn-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Hornhai_%28Heterodontus_francisci%29.JPG/960px-Hornhai_%28Heterodontus_francisci%29.JPG",
    photographer: "Cymothoa exigua",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Hornhai_(Heterodontus_francisci).JPG",
  },
  // Leopard shark
  "leopard-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Leopard_shark_in_kelp.jpg/960px-Leopard_shark_in_kelp.jpg",
    photographer: "Matthew Field",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    filePage: "https://commons.wikimedia.org/wiki/File:Leopard_shark_in_kelp.jpg",
  },
  // Spiny dogfish
  "spiny-dogfish": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Squalus_acanthias_stellwagen.jpg/960px-Squalus_acanthias_stellwagen.jpg",
    photographer: "Doug Costa, NOAA/SBNMS",
    license: "Public domain",
    licenseUrl: null,
    filePage: "https://commons.wikimedia.org/wiki/File:Squalus_acanthias_stellwagen.jpg",
  },
  // Silky shark
  "silky-shark": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Carcharhinus_falciformis_off_Cuba.jpg/960px-Carcharhinus_falciformis_off_Cuba.jpg",
    photographer: "Alex Chernikh",
    license: "CC BY 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5",
    filePage: "https://commons.wikimedia.org/wiki/File:Carcharhinus_falciformis_off_Cuba.jpg",
  },
};

export interface Planet {
  id: string
  exhibit: string
  romanNumeral: string
  name: string
  subtitle: string
  tagline: string
  description: string
  longDescription: string
  color: string
  glowColor: string
  heroImage?: string
  cardImage?: string
  surfaceImage?: string
  distanceFromSun: number   // million km
  distanceMiles: string     // formatted
  diameter: number          // km
  moons: number
  orbitalPeriod: number     // Earth days
  rotationPeriod: string    // formatted
  surfaceTemp: { min: number; max: number; unit: string }
  gravity: number           // relative to Earth
  atmosphere: string[]
  travelTime: string
  designTheme: string
  href: string
  accentClass: string       // Tailwind color class
}

export const planets: Planet[] = [
  {
    id: 'mercury',
    exhibit: 'I',
    romanNumeral: 'I',
    name: 'Mercury',
    subtitle: 'The Scorched Messenger',
    tagline: 'Closest to the Sun. Fastest in orbit. First to face the void.',
    description:
      'Mercury races around the Sun every 88 Earth days, the fastest planet in our solar system. Its surface — a cratered wasteland of extremes — bakes at 430 °C in daylight and plummets to −180 °C in darkness.',
    longDescription:
      'Mercury is a world of dramatic contrasts. Despite being closest to the Sun, it is not the hottest planet — that distinction belongs to Venus. Mercury has no atmosphere to retain heat, so temperatures swing by over 600 °C between its scorching days and frozen nights. Its surface is heavily cratered, resembling our Moon, shaped by billions of years of asteroid impacts.',
    color: '#B5B3BB',
    glowColor: 'rgba(181,179,187,0.4)',
    heroImage: '/images/mercury-hero.png',
    cardImage: '/images/mercury-sphere.png',
    surfaceImage: '/images/mercury-surface.png',
    distanceFromSun: 57.9,
    distanceMiles: '35.98 million miles',
    diameter: 4879,
    moons: 0,
    orbitalPeriod: 87.97,
    rotationPeriod: '58.6 Earth days',
    surfaceTemp: { min: -180, max: 430, unit: '°C' },
    gravity: 0.38,
    atmosphere: ['Oxygen', 'Sodium', 'Hydrogen', 'Helium', 'Potassium'],
    travelTime: '3.2 light-minutes from Earth',
    designTheme: 'brutalist',
    href: '/mercury',
    accentClass: 'text-planet-mercury',
  },
  {
    id: 'venus',
    exhibit: 'II',
    romanNumeral: 'II',
    name: 'Venus',
    subtitle: 'The Veiled Inferno',
    tagline: 'Shrouded in mystery. Burning beneath the clouds.',
    description:
      'Venus glows as the brightest object in our sky after the Sun and Moon, yet beneath those beautiful clouds lies a hellish world of crushing pressure and acid rain. Its surface temperature exceeds 465 °C — hot enough to melt lead.',
    longDescription:
      'Venus is Earth\'s twisted twin — similar in size and composition, yet wildly different in outcome. A runaway greenhouse effect has made it the hottest planet in the solar system. Its thick atmosphere of carbon dioxide, laced with clouds of sulfuric acid, traps heat so effectively that surface temperatures never dip below 400 °C, day or night.',
    color: '#E8C285',
    glowColor: 'rgba(232,194,133,0.4)',
    heroImage: '/images/venus-hero.png',
    cardImage: '/images/venus-hero.png',
    surfaceImage: '/images/venus-clouds.png',
    distanceFromSun: 108.2,
    distanceMiles: '67.24 million miles',
    diameter: 12104,
    moons: 0,
    orbitalPeriod: 224.7,
    rotationPeriod: '243 Earth days (retrograde)',
    surfaceTemp: { min: 462, max: 465, unit: '°C' },
    gravity: 0.91,
    atmosphere: ['Carbon Dioxide (96.5%)', 'Nitrogen (3.5%)', 'Sulfuric Acid'],
    travelTime: '6 light-minutes from Earth',
    designTheme: 'organic',
    href: '/venus',
    accentClass: 'text-planet-venus',
  },
  {
    id: 'earth',
    exhibit: 'III',
    romanNumeral: 'III',
    name: 'Earth',
    subtitle: 'The Living World',
    tagline: 'The only world we know of that harbors life.',
    description:
      'Earth is a pale blue dot of liquid water, breathable air, and extraordinary life. From its iron core to its ozone shield, every layer conspires to make it uniquely habitable — a rarity in a vast, silent universe.',
    longDescription:
      'Earth is the densest planet in the solar system and the largest of the four terrestrial planets. Its powerful magnetic field protects life from solar radiation. Vast oceans regulate climate, plate tectonics recycle the crust, and a perfectly balanced atmosphere sustains millions of species — including a species now reaching for the stars.',
    color: '#4B9CD3',
    glowColor: 'rgba(75,156,211,0.4)',
    heroImage: '/images/earth-hero.png',
    cardImage: '/images/earth-hero.png',
    surfaceImage: '/images/earth-atmosphere.png',
    distanceFromSun: 149.6,
    distanceMiles: '92.96 million miles',
    diameter: 12742,
    moons: 1,
    orbitalPeriod: 365.25,
    rotationPeriod: '23h 56m',
    surfaceTemp: { min: -89, max: 58, unit: '°C' },
    gravity: 1.0,
    atmosphere: ['Nitrogen (78%)', 'Oxygen (21%)', 'Argon', 'Carbon Dioxide'],
    travelTime: 0 as unknown as string,
    designTheme: 'apple',
    href: '/earth',
    accentClass: 'text-planet-earth',
  },
  {
    id: 'mars',
    exhibit: 'IV',
    romanNumeral: 'IV',
    name: 'Mars',
    subtitle: 'The Frontier World',
    tagline: 'The first foothold of a multi-planetary civilisation.',
    description:
      'Mars is a cold, dusty world with the tallest volcano and longest canyon in the solar system. It is the most explored planet beyond Earth — and humanity\'s most likely second home.',
    longDescription:
      'Mars holds Olympus Mons, three times taller than Everest, and Valles Marineris, a canyon system that would stretch across the entire United States. Evidence of ancient rivers, lakes, and possibly an ocean suggests Mars was once warm and wet. Today, rovers and landers continue to search for signs of past life — and lay the groundwork for human arrival.',
    color: '#C1440E',
    glowColor: 'rgba(193,68,14,0.4)',
    heroImage: '/images/mars-hero.png',
    cardImage: '/images/mars-hero.png',
    surfaceImage: '/images/mars-terrain.png',
    distanceFromSun: 227.9,
    distanceMiles: '141.6 million miles',
    diameter: 6779,
    moons: 2,
    orbitalPeriod: 686.97,
    rotationPeriod: '24h 37m',
    surfaceTemp: { min: -140, max: 20, unit: '°C' },
    gravity: 0.38,
    atmosphere: ['Carbon Dioxide (95.3%)', 'Nitrogen (2.7%)', 'Argon (1.6%)'],
    travelTime: '3–22 light-minutes (varies)',
    designTheme: 'colony',
    href: '/mars',
    accentClass: 'text-planet-mars',
  },
  {
    id: 'jupiter',
    exhibit: 'V',
    romanNumeral: 'V',
    name: 'Jupiter',
    subtitle: 'The Colossus',
    tagline: 'A world so vast it could swallow all other planets combined.',
    description:
      'Jupiter is the undisputed giant — more than twice as massive as all other planets combined. Its Great Red Spot is a storm that has raged for centuries, and its magnetic field dwarfs the Sun itself.',
    longDescription:
      'Jupiter is a gas giant with no solid surface — a swirling ocean of liquid hydrogen beneath turbulent clouds of ammonia and water. Its system of 95 known moons includes Europa, which harbors a subsurface ocean that may support life, and Io, the most volcanically active body in the solar system. Jupiter acts as a cosmic shield, deflecting asteroids that might otherwise strike Earth.',
    color: '#C88B3A',
    glowColor: 'rgba(200,139,58,0.4)',
    heroImage: '/images/jupiter-hero.png',
    cardImage: '/images/jupiter-hero.png',
    surfaceImage: '/images/jupiter-great-red-spot.png',
    distanceFromSun: 778.5,
    distanceMiles: '483.8 million miles',
    diameter: 139820,
    moons: 95,
    orbitalPeriod: 4332.59,
    rotationPeriod: '9h 55m (fastest planet)',
    surfaceTemp: { min: -145, max: -108, unit: '°C (cloud tops)' },
    gravity: 2.53,
    atmosphere: ['Hydrogen (89%)', 'Helium (10%)', 'Methane', 'Ammonia'],
    travelTime: '43 light-minutes from Earth',
    designTheme: 'massive',
    href: '/jupiter',
    accentClass: 'text-planet-jupiter',
  },
  {
    id: 'saturn',
    exhibit: 'VI',
    romanNumeral: 'VI',
    name: 'Saturn',
    subtitle: 'The Ringed Jewel',
    tagline: 'The most beautiful object in the solar system.',
    description:
      'Saturn\'s rings — made of ice and rock, stretching 282,000 km across — are the most spectacular structure in our solar system. Despite its immense size, Saturn is so light it would float on water.',
    longDescription:
      'Saturn\'s ring system is divided into seven major groups with thousands of individual ringlets, all orbiting in perfect formation. Its largest moon, Titan, has a thick nitrogen atmosphere and liquid methane lakes — the only moon in the solar system with a substantial atmosphere. Saturn\'s pale gold hue and ethereal rings have captivated astronomers since Galileo first glimpsed them in 1610.',
    color: '#E8C878',
    glowColor: 'rgba(232,200,120,0.5)',
    heroImage: '/images/saturn-hero.png',
    cardImage: '/images/saturn-rings.png',
    surfaceImage: '/images/saturn-rings.png',
    distanceFromSun: 1432,
    distanceMiles: '890 million miles',
    diameter: 116460,
    moons: 146,
    orbitalPeriod: 10759.22,
    rotationPeriod: '10h 34m',
    surfaceTemp: { min: -178, max: -138, unit: '°C (cloud tops)' },
    gravity: 1.07,
    atmosphere: ['Hydrogen (96%)', 'Helium (3%)', 'Methane', 'Ammonia'],
    travelTime: '79 light-minutes from Earth',
    designTheme: 'editorial',
    href: '/saturn',
    accentClass: 'text-planet-saturn',
  },
  {
    id: 'uranus',
    exhibit: 'VII',
    romanNumeral: 'VII',
    name: 'Uranus',
    subtitle: 'The Tilted Giant',
    tagline: 'Rolling through space at a 98° tilt. An anomaly at the edge of reason.',
    description:
      'Uranus orbits the Sun nearly on its side — tilted 98° — possibly the result of a massive ancient collision. Its pale cyan hue comes from methane in its atmosphere, and its rings orbit the planet vertically.',
    longDescription:
      'Uranus is an ice giant composed of water, methane, and ammonia ice beneath its hydrogen-helium atmosphere. It is the coldest planetary atmosphere in the solar system at −224 °C. Uranus has 13 known rings and 28 moons, many named after characters from Shakespeare\'s plays. Only one spacecraft — Voyager 2 — has ever visited it.',
    color: '#82D8D8',
    glowColor: 'rgba(130,216,216,0.4)',
    heroImage: '/images/uranus-hero.png',
    cardImage: '/images/uranus-hero.png',
    distanceFromSun: 2871,
    distanceMiles: '1.78 billion miles',
    diameter: 50724,
    moons: 28,
    orbitalPeriod: 30589,
    rotationPeriod: '17h 14m (retrograde)',
    surfaceTemp: { min: -224, max: -216, unit: '°C' },
    gravity: 0.89,
    atmosphere: ['Hydrogen (83%)', 'Helium (15%)', 'Methane (2.3%)'],
    travelTime: '2.7 light-hours from Earth',
    designTheme: 'scientific',
    href: '/uranus',
    accentClass: 'text-planet-uranus',
  },
  {
    id: 'neptune',
    exhibit: 'VIII',
    romanNumeral: 'VIII',
    name: 'Neptune',
    subtitle: 'The Dark Sovereign',
    tagline: 'At the edge of the known solar system. Cold, blue, and unknowable.',
    description:
      'Neptune is the most distant planet and the windiest world in the solar system, with storms reaching 2,100 km/h. Its deep blue colour and remote location make it one of the most enigmatic objects humanity has ever observed.',
    longDescription:
      'Neptune was discovered mathematically before it was seen — astronomers predicted its existence based on perturbations in Uranus\'s orbit. It has 16 known moons; the largest, Triton, orbits backwards and is slowly spiraling toward Neptune, destined to be torn apart in 3.6 billion years. Only Voyager 2 has visited Neptune, flying by in 1989, revealing a world of extraordinary storms and an active, dynamic atmosphere.',
    color: '#4B70DD',
    glowColor: 'rgba(75,112,221,0.5)',
    cardImage: '/images/neptune-sphere.png',
    distanceFromSun: 4495,
    distanceMiles: '2.79 billion miles',
    diameter: 49244,
    moons: 16,
    orbitalPeriod: 60190,
    rotationPeriod: '16h 6m',
    surfaceTemp: { min: -218, max: -200, unit: '°C' },
    gravity: 1.14,
    atmosphere: ['Hydrogen (80%)', 'Helium (19%)', 'Methane (1.5%)'],
    travelTime: '4.1 light-hours from Earth',
    designTheme: 'luxury-minimal',
    href: '/neptune',
    accentClass: 'text-planet-neptune',
  },
]

export const getPlanetBySlug = (slug: string) =>
  planets.find((p) => p.id === slug) ?? null

export const getPlanetIndex = (slug: string) =>
  planets.findIndex((p) => p.id === slug)

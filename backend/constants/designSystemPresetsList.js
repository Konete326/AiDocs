const PRESETS = [
  { id: "monochrome", name: "Minimalist Monochrome", tagline: "Clean black & white design with sharp typography and zero extra colors." },
  { id: "bauhaus", name: "Bauhaus / Neo-Constructivism", tagline: "Classic geometric style with red, blue, yellow colors and strong dark box shadows." },
  { id: "linear", name: "Linear / Modern", tagline: "Dark space background with glowing indigo buttons, smooth glass cards, and modern font." },
  { id: "luxury", name: "Luxury / Editorial", tagline: "High-end luxury aesthetic with warm off-white canvas, charcoal text, and metallic gold accents." },
  { id: "minimalist-modern", name: "Minimalist Modern", tagline: "Clean modern design with electric blue gradient buttons and crisp typography." },
  { id: "terminal", name: "Retro Terminal / Cyber-Hacker", tagline: "Classic retro computer screen with bright green text on pitch black background." },
  { id: "swiss", name: "Swiss / International Typographic Style", tagline: "Clean grid alignment with bright orange accents, bold headlines, and solid black borders." },
  { id: "kinetic", name: "Kinetic Brutalism", tagline: "High energy style with neon acid yellow on dark void background and sharp corners." },
  { id: "flat", name: "Flat 2.0 / Clean Corporate", tagline: "Simple modern business look with soft slate background, emerald green accents, and clean layout." },
  { id: "artdeco", name: "Art Deco / Roaring 20s", tagline: "Geometric luxury style with rich metallic gold and deep velvet black backgrounds." },
  { id: "boldtype", name: "Bold Typography / Magazine Editorial", tagline: "Extra large bold headlines, bright red accent underline, and strong magazine style." },
  { id: "neobrutalism", name: "Neo-Brutalism", tagline: "Trendy high-contrast look with canary yellow, cyan accents, and 3D offset black shadows." },
  { id: "material", name: "Material You / M3 Expressive", tagline: "Google Material Design 3 with soft purple tones, rounded pill buttons, and friendly cards." },
  { id: "academia", name: "Dark Academia", tagline: "Classic vintage library style with aged parchment background, crimson, and brass accents." },
  { id: "cyberpunk", name: "Cyberpunk / High-Tech Neon", tagline: "Futuristic neon theme with cyber yellow, neon magenta, glitch text, and tech borders." },
  { id: "bitcoindefi", name: "Bitcoin DeFi / Sovereign Finance", tagline: "Crypto & financial style with gold coin orange, dark obsidian cards, and gold accents." },
  { id: "playfulgeo", name: "Playful Geometric", tagline: "Fun & friendly theme with pastel pink, mint green, rounded pill badges, and soft shapes." },
  { id: "mindark", name: "Minimalist Dark", tagline: "Sleek dark mode with warm amber glow accents, soft glass cards, and comfortable spacing." },
  { id: "claymorphism", name: "Claymorphism", tagline: "Soft 3D clay look with lavender background, hot pink accents, and super-rounded corners." },
  { id: "serif", name: "Serif Editorial", tagline: "Classic newspaper editorial style with ivory background, gold rules, and serif fonts." },
  { id: "botanical", name: "Botanical Organic", tagline: "Natural eco style with soft alabaster canvas, deep forest green, and sage green accents." },
  { id: "vaporwave", name: "Vaporwave / Outrun", tagline: "Retro 80s neon void background with hot magenta, electric cyan, and grid floors." },
  { id: "corporatetrust", name: "Corporate Trust", tagline: "Professional SaaS look with indigo-violet gradient buttons and clean slate background." },
  { id: "handdrawn", name: "Hand-Drawn", tagline: "Warm paper background with pencil sketch lines, marker fonts, and correction red accents." },
  { id: "industrialkeuo", name: "Industrial Skeuomorphism", tagline: "Industrial metal control panel look with safety orange buttons, LED lights, and screws." },
  { id: "neumorphism", name: "Neumorphism (Soft UI)", tagline: "Soft clay 3D effect with opposing soft shadows, extruded wells, and violet accent." },
  { id: "organicnatural", name: "Organic / Natural", tagline: "Warm eco design with rice paper texture, moss green, terracotta, and soft natural curves." },
  { id: "maximalism", name: "Maximalism / Dopamine", tagline: "Bold Y2K style with vibrant neon colors, cosmic dark background, and fun visual layers." }
];

const getPresetById = (id) => {
  if (!id) return PRESETS[0];
  const query = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRESETS.find(p => p.id.toLowerCase().replace(/[^a-z0-9]/g, '') === query) || PRESETS[0];
};

module.exports = {
  PRESETS,
  getPresetById
};

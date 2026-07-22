const PRESETS = [
  { id: "monochrome", name: "Minimalist Monochrome", tagline: "Reduction to Essence. Strips design down to black, white, and typography. #FFFFFF background, #000000 foreground, Playfair Display." },
  { id: "bauhaus", name: "Bauhaus / Neo-Constructivism", tagline: "Form follows function with primary colors (#D02020 red, #1040C0 blue, #F0C020 yellow) and hard 4px/8px offset shadows. Outfit font." },
  { id: "linear", name: "Linear / Modern", tagline: "Cinematic dark space base (#050506) with indigo accent glows (#5E6AD2) and glass cards. Inter font." },
  { id: "luxury", name: "Luxury / Editorial", tagline: "Elegance through restraint with Warm Alabaster (#F9F8F6), Rich Charcoal (#1A1A1A), Metallic Gold (#D4AF37), Playfair Display + Inter." },
  { id: "minimalist-modern", name: "Minimalist Modern", tagline: "Calistoga serif headlines, Electric Blue signature gradient (#0052FF to #4D7CFF), pill section badges, Calistoga + Inter." },
  { id: "terminal", name: "Retro Terminal / Cyber-Hacker", tagline: "Monochrome CRT green (#00FF66) on void black (#0A0A0A), VT323 pixel font, scanline flicker, phosphor glow." },
  { id: "swiss", name: "Swiss / International Typographic Style", tagline: "Grid-based perfection, International Orange (#FF4400), Neutral Canvas (#F4F4F0), Helvetica / Neue Haas Grotesk." },
  { id: "kinetic", name: "Kinetic Brutalism", tagline: "High-voltage energy, Acid Yellow (#DFE104) on void black (#09090B), Space Grotesk, 0px sharp corners, infinite marquees." },
  { id: "flat", name: "Flat 2.0 / Clean Corporate", tagline: "Friendly professionalism, Soft Slate (#F8FAFC), Vibrant Emerald (#10B981), Inter font, crisp micro-borders." },
  { id: "artdeco", name: "Art Deco / Roaring 20s", tagline: "Opulent geometric luxury, Metallic Gold (#D4AF37), Midnight Velvet (#0A0A0A), Marcellus + Josefin Sans." },
  { id: "boldtype", name: "Bold Typography / Magazine Editorial", tagline: "Extreme scale contrast, Vermillion (#FF3D00), Ink Black (#0A0A0A), Inter Tight 900, animated underline." },
  { id: "neobrutalism", name: "Neo-Brutalism", tagline: "Raw internet aesthetic, Canary Yellow (#FFE600), Electric Cyan (#00F5D4), 3px/4px hard offset shadows." },
  { id: "material", name: "Material You / M3 Expressive", tagline: "Dynamic color extraction, Tonal Palette (#6750A4), Soft Surface (#FEF7FF), Roboto + Google Sans." },
  { id: "academia", name: "Dark Academia", tagline: "Gothic library romance, Aged Parchment (#1C1714), Deep Crimson (#8B2635), Polished Brass (#C9A962), Cormorant Garamond." },
  { id: "cyberpunk", name: "Cyberpunk / High-Tech Neon", tagline: "High tech low life, Cyber Yellow (#FFEA00), Neon Magenta (#FF0055), HUD brackets, glitch text." },
  { id: "bitcoindefi", name: "Bitcoin DeFi / Sovereign Finance", tagline: "Sovereign financial engine, Bitcoin Orange (#F7931A), Metallic Gold (#FFD700), Space Grotesk." },
  { id: "playfulgeo", name: "Playful Geometric", tagline: "Joyful optimism, Pastel Pink (#FFB3C6), Soft Mint (#B7E4C7), Bungee + Outfit, pill shapes." },
  { id: "mindark", name: "Minimalist Dark", tagline: "Deep slate (#0A0A0F), Warm Amber glowing accent (#F59E0B), ambient light fields, glass cards." },
  { id: "claymorphism", name: "Claymorphism", tagline: "Lavender-white canvas (#F4F1FA), Candy Shop palette (Violet #7C3AED, Hot Pink #DB2777), Nunito Black 900." },
  { id: "serif", name: "Serif Editorial", tagline: "Ivory canvas (#FAFAF8), Rich Black (#1A1A1A), Burnished Gold (#B8860B), Playfair Display serif." },
  { id: "botanical", name: "Botanical Organic", tagline: "Warm Alabaster (#F9F8F4), Deep Forest Green (#2D3A31), Sage Green (#8C9A84), Playfair Display." },
  { id: "vaporwave", name: "Vaporwave / Outrun", tagline: "Dark void (#090014), Hot Magenta (#FF00FF), Electric Cyan (#00FFFF), Orbitron font, CRT scanlines." },
  { id: "corporatetrust", name: "Corporate Trust", tagline: "Indigo (#4F46E5) to Violet (#7C3AED) gradient, Slate 50 canvas, Plus Jakarta Sans." },
  { id: "handdrawn", name: "Hand-Drawn", tagline: "Warm Paper (#fdfbf7), Soft Pencil Black (#2d2d2d), Correction Red (#ff4d4d), Kalam + Patrick Hand fonts." },
  { id: "industrialkeuo", name: "Industrial Skeuomorphism", tagline: "Cool Industrial Gray (#e0e5ec), Safety Orange accent (#ff4757), Inter + JetBrains Mono, neumorphic dual shadows." },
  { id: "neumorphism", name: "Neumorphism (Soft UI)", tagline: "Cool clay canvas (#E0E5EC), dark slate text (#3D4852), soft violet accent (#6C63FF), dual opposing shadows." },
  { id: "organicnatural", name: "Organic / Natural", tagline: "Wabi-sabi philosophy, Rice Paper (#FDFCF8), Deep Loam (#2C2C24), Moss Green (#5D7052), Fraunces serif." },
  { id: "maximalism", name: "Maximalism / Dopamine", tagline: "MORE IS MORE Y2K hyperpop, Cosmic Void (#0D0D1A), 5 electric accents, triple text shadows." }
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

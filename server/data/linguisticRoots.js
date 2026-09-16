// Rich dataset of morphemes, semantic roots, phonetic clusters, and industry vocabularies
export const MORPHEMIC_ROOTS = {
  // Light, Vision, Clarity
  illum: { root: 'lum', meaning: 'light and clarity', emotion: 'optimistic', tones: ['modern', 'luxury', 'minimal'] },
  clar: { root: 'clar', meaning: 'lucid insight', emotion: 'confident', tones: ['minimal', 'professional', 'bold'] },
  aura: { root: 'aur', meaning: 'radiant presence', emotion: 'inspiring', tones: ['luxury', 'organic', 'futuristic'] },
  sol: { root: 'sol', meaning: 'sun, origin, vitality', emotion: 'warm', tones: ['organic', 'bold', 'modern'] },
  phos: { root: 'lux', meaning: 'glow and vision', emotion: 'uplifting', tones: ['modern', 'futuristic', 'luxury'] },
  
  // Future, Tech, Motion, Next
  nex: { root: 'nex', meaning: 'connection, next frontier', emotion: 'ambitious', tones: ['futuristic', 'technical', 'bold'] },
  neo: { root: 'neo', meaning: 'new dawn', emotion: 'progressive', tones: ['futuristic', 'modern', 'minimal'] },
  velo: { root: 'vel', meaning: 'swift motion and velocity', emotion: 'dynamic', tones: ['modern', 'bold', 'technical'] },
  syn: { root: 'syn', meaning: 'harmony, integration', emotion: 'cohesive', tones: ['technical', 'professional', 'minimal'] },
  arc: { root: 'arc', meaning: 'bridge, trajectory, arch', emotion: 'structured', tones: ['modern', 'bold', 'technical'] },
  pulse: { root: 'puls', meaning: 'energy and cadence', emotion: 'vibrant', tones: ['playful', 'bold', 'modern'] },
  vect: { root: 'vect', meaning: 'direction and purpose', emotion: 'focused', tones: ['technical', 'professional', 'bold'] },
  
  // Intelligence, Mind, Logic, Strategy
  cogni: { root: 'cog', meaning: 'deep understanding', emotion: 'intelligent', tones: ['professional', 'technical', 'modern'] },
  noo: { root: 'noo', meaning: 'mind and consciousness', emotion: 'thoughtful', tones: ['futuristic', 'organic', 'quirky'] },
  scio: { root: 'sci', meaning: 'knowledge and mastery', emotion: 'rigorous', tones: ['professional', 'technical', 'minimal'] },
  ment: { root: 'ment', meaning: 'mental acuity', emotion: 'perceptive', tones: ['professional', 'modern', 'minimal'] },
  strat: { root: 'strat', meaning: 'deliberate vision', emotion: 'commanding', tones: ['bold', 'professional', 'luxury'] },

  // Growth, Nature, Earth, Vitality
  viri: { root: 'vir', meaning: 'vitality, green thriving', emotion: 'grounded', tones: ['organic', 'minimal', 'modern'] },
  terra: { root: 'ter', meaning: 'earth, stability, bedrock', emotion: 'reliable', tones: ['organic', 'bold', 'professional'] },
  flora: { root: 'flor', meaning: 'blooming, flourishing', emotion: 'gentle', tones: ['organic', 'playful', 'luxury'] },
  bio: { root: 'bio', meaning: 'living systems', emotion: 'holistic', tones: ['organic', 'technical', 'modern'] },
  radix: { root: 'rad', meaning: 'root, foundational strength', emotion: 'authentic', tones: ['organic', 'bold', 'minimal'] },

  // Precision, Craft, Pure, Prime
  prim: { root: 'prim', meaning: 'first, finest, primary', emotion: 'prestigious', tones: ['luxury', 'professional', 'bold'] },
  veri: { root: 'ver', meaning: 'truth, authenticity', emotion: 'trustworthy', tones: ['professional', 'luxury', 'minimal'] },
  kura: { root: 'kur', meaning: 'care, curation, custody', emotion: 'refined', tones: ['luxury', 'modern', 'minimal'] },
  opti: { root: 'opt', meaning: 'ideal excellence', emotion: 'encouraging', tones: ['professional', 'modern', 'playful'] },
  apex: { root: 'apex', meaning: 'summit, peak potential', emotion: 'empowered', tones: ['bold', 'luxury', 'futuristic'] },
};

export const SUFFIX_PATTERNS = {
  // Ultra-modern / SaaS
  modern: ['ora', 'ix', 'ex', 'io', 'iq', 'ly', 'os', 'ia', 'on', 'is', 'a'],
  // High-end / Premium
  luxury: ['eaux', 'eur', 'a', 'ora', 'is', 'elle', 'ire', 'ano', 'via'],
  // Tech / Data / AI
  technical: ['ex', 'iq', 'ix', 'syn', 'on', 'grid', 'lab', 'os', 'byte', 'flow'],
  // Futuristic / Cyber / Cosmic
  futuristic: ['ora', 'on', 'is', 'ix', 'ar', 'a', 'ex', 'ium', 'yn'],
  // Friendly / Social / Consumer
  playful: ['o', 'y', 'pop', 'ly', 'oo', 'ie', 'up', 'bee', 'io'],
  // Clean / Scandinavian / Essence
  minimal: ['a', 'o', 'is', 'en', 'um', 'un', 'in'],
  // Strong / Disruptive
  bold: ['or', 'ax', 'ox', 'on', 'core', 'vault', 'forge', 'stride'],
  // Earthy / Wellness
  organic: ['a', 'ia', 'leaf', 'root', 'elle', 'is', 'ea', 'wood'],
  // Unconventional / Memorable
  quirky: ['ify', 'able', 'kin', 'ling', 'do', 'zen', 'zo'],
};

export const INDUSTRY_MODIFIERS = {
  Technology: { prefixes: ['Hyper', 'Meta', 'Omni', 'Neuro', 'Byte', 'Logic', 'Cyber'], keywords: ['compute', 'scale', 'flow', 'stack'] },
  Startup: { prefixes: ['Venture', 'Launch', 'Pulse', 'Catalyst', 'Apex', 'Sprint'], keywords: ['scale', 'growth', 'seed', 'leap'] },
  AI: { prefixes: ['Neuro', 'Cogni', 'Synthet', 'Mind', 'Tensor', 'Agent', 'Deep'], keywords: ['model', 'agent', 'vector', 'neural'] },
  Product: { prefixes: ['Prime', 'Forge', 'Craft', 'Form', 'Mono', 'Struct'], keywords: ['utility', 'design', 'tactile', 'grade'] },
  App: { prefixes: ['Tap', 'Swift', 'Pocket', 'Flow', 'Snap', 'Dock'], keywords: ['mobile', 'sync', 'loop', 'touch'] },
  Finance: { prefixes: ['Aegis', 'Vault', 'Crest', 'Sterling', 'Solv', 'Capital', 'Fid'], keywords: ['wealth', 'trust', 'yield', 'asset'] },
  Health: { prefixes: ['Vita', 'Cura', 'Sana', 'Hale', 'Thera', 'Pulse', 'Aura'], keywords: ['care', 'living', 'vital', 'renew'] },
  Education: { prefixes: ['Schola', 'Ment', 'Sage', 'Loom', 'Learn', 'Noo', 'Clavis'], keywords: ['skill', 'mind', 'path', 'clarity'] },
  Creative: { prefixes: ['Prism', 'Canvas', 'Muse', 'Chroma', 'Stro', 'Atelier'], keywords: ['express', 'color', 'shape', 'vision'] },
  Sustainability: { prefixes: ['Verde', 'Terra', 'Ecos', 'Leaf', 'Eden', 'Cycle'], keywords: ['clean', 'renew', 'planet', 'green'] },
  Fashion: { prefixes: ['Maison', 'Velvet', 'Vogue', 'Loom', 'Sartor', 'Moda'], keywords: ['silk', 'drape', 'haute', 'chic'] },
  Gaming: { prefixes: ['Quest', 'Rift', 'Vortex', 'Pixel', 'Myth', 'Chaos', 'Rogue'], keywords: ['level', 'boss', 'loot', 'play'] },
  Food: { prefixes: ['Gusto', 'Feast', 'Brio', 'Palate', 'Nour', 'Crave'], keywords: ['taste', 'fresh', 'craft', 'savor'] },
  Travel: { prefixes: ['Wander', 'Roam', 'Compass', 'Aero', 'Horizon', 'Venture'], keywords: ['journey', 'voyage', 'path', 'wild'] },
  Other: { prefixes: ['Aura', 'Omni', 'Nova', 'Sol', 'Nex', 'Vero'], keywords: ['core', 'spark', 'stride', 'reach'] }
};

export const CELEBRATED_INVENTED_NAMES = [
  {
    name: 'Lumora',
    root: 'lum',
    suffix: 'ora',
    meaning: 'Synthesizes light (lumen) with an open, euphonic horizon (ora).',
    sound: 'Two clean liquid syllables with a rising open vowel finale.',
    structure: 'Consonant-Vowel-Liquid-Vowel-Liquid-Vowel (C-V-L-V-L-V)',
    emotion: 'Optimistic, illuminating, and quietly prestigious.',
    audience: 'Design-conscious digital natives and forward-thinking founders.',
    brandPotential: 'Extremely high. Lends itself to glowing gradients and clean geometric wordmarks.',
    pronunciation: 'Loo-MOH-rah',
    ipa: '/luːˈmɔː.rə/',
    collisionLevel: 'Low',
    collisionNotes: 'Clean lexical space; no direct trademark collisions found in primary consumer classifications.',
    metrics: { memorability: 95, brandability: 96, pronunciation: 98, distinctiveness: 91, emotionalFit: 94 },
    style: 'Modern'
  },
  {
    name: 'Veyra',
    root: 'ver',
    suffix: 'a',
    meaning: 'Derived from verity (truth) fused with the aerodynamic swiftness of a vector.',
    sound: 'Crisp soft fricative opening giving way to resonant clarity.',
    structure: 'Disyllabic with trochaic stress (strong-weak).',
    emotion: 'Truthful, progressive, and razor-sharp.',
    audience: 'Modern enterprise, security, and developer infrastructure teams.',
    brandPotential: 'Sleek, minimalist, easily recognizable at small favicon scales.',
    pronunciation: 'VAY-rah',
    ipa: '/ˈveɪ.rə/',
    collisionLevel: 'Low',
    collisionNotes: 'Distinctive coined spelling prevents dictionary phrase overlap.',
    metrics: { memorability: 93, brandability: 94, pronunciation: 95, distinctiveness: 92, emotionalFit: 91 },
    style: 'Futuristic'
  },
  {
    name: 'Nexora',
    root: 'nex',
    suffix: 'ora',
    meaning: 'Signifies an intelligent junction (nexus) expanding into infinite possibility.',
    sound: 'Sharp decisive X-transition balanced by warm open vowel resolution.',
    structure: 'Three phonetic beats with balanced kinetic weight.',
    emotion: 'High-tech, capable, and visionary.',
    audience: 'AI product builders, cloud ecosystems, and SaaS leaders.',
    brandPotential: 'Strong architectural gravity suitable for enterprise software and network tools.',
    pronunciation: 'Neks-OH-rah',
    ipa: '/nɛksˈɔː.rə/',
    collisionLevel: 'Moderate',
    collisionNotes: 'Noticeable phonetic proximity to "Nexus", yet stands apart through feminine ending.',
    metrics: { memorability: 92, brandability: 93, pronunciation: 94, distinctiveness: 88, emotionalFit: 95 },
    style: 'Technical'
  },
  {
    name: 'Solvyn',
    root: 'sol',
    suffix: 'yn',
    meaning: 'Blends solar energy with mathematical resolution (solving complexities).',
    sound: 'Gentle sibilant start with a sharp, grounded terminal consonant.',
    structure: 'Bisyllabic with a closed coda.',
    emotion: 'Empathetic, smart, and dependable.',
    audience: 'Productivity seekers, fintech clients, and analytical thinkers.',
    brandPotential: 'Great for fintech or workflow automation platforms.',
    pronunciation: 'SAHL-vin',
    ipa: '/ˈsɒl.vɪn/',
    collisionLevel: 'Low',
    collisionNotes: 'Clear phonemic departure from common legal trademarks.',
    metrics: { memorability: 91, brandability: 90, pronunciation: 96, distinctiveness: 93, emotionalFit: 89 },
    style: 'Minimal'
  },
  {
    name: 'Arclume',
    root: 'arc',
    suffix: 'lume',
    meaning: 'The intersection of structural architecture (arc) and radiant clarity (lume).',
    sound: 'Stately plosive bridge flowing into smooth velvet resonance.',
    structure: 'Compound morphemic fusion with single-stress emphasis.',
    emotion: 'Sophisticated, masterful, and enduring.',
    audience: 'Architects, industrial designers, and luxury innovators.',
    brandPotential: 'Lends itself to dark-mode editorial layouts and sculpted physical goods.',
    pronunciation: 'ARK-loom',
    ipa: '/ˈɑːrk.luːm/',
    collisionLevel: 'Low',
    collisionNotes: 'Distinctive compound neologism with no standard dictionary duplicate.',
    metrics: { memorability: 94, brandability: 95, pronunciation: 93, distinctiveness: 95, emotionalFit: 92 },
    style: 'Luxury'
  }
];

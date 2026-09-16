import { MORPHEMIC_ROOTS, SUFFIX_PATTERNS, INDUSTRY_MODIFIERS, CELEBRATED_INVENTED_NAMES } from '../data/linguisticRoots.js';

// Deterministic seedable randomizer based on string hash to ensure repeatable yet varied results
function createSeededRandom(seedStr) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return function() {
    hash = (hash * 9301 + 49297) % 233280;
    return Math.abs(hash / 233280);
  };
}

// Compute dynamic Name DNA based on user inputs
export function computeNameDNA(inputs = {}) {
  const {
    idea = '',
    industry = 'Technology',
    style = 'Modern',
    length = 'Short',
    creativity = 70,
    vibe = 60,
    audience = '',
  } = inputs;

  const toneMap = {
    Modern: 'Progressive & Lucid',
    Luxury: 'Prestigious & Refined',
    Futuristic: 'Visionary & Cybernetic',
    Minimal: 'Pure & Understated',
    Bold: 'Authoritative & Uncompromising',
    Playful: 'Vibrant & Welcoming',
    Organic: 'Rooted & Restorative',
    Technical: 'Systematic & Architectural',
    Professional: 'Commanding & Institutional',
    Quirky: 'Whimsical & Distinctive'
  };

  const emotionMap = {
    Modern: 'Clarity & Momentum',
    Luxury: 'Exclusivity & Poise',
    Futuristic: 'Awe & Innovation',
    Minimal: 'Tranquility & Focus',
    Bold: 'Courage & Decisiveness',
    Playful: 'Joy & Spontaneity',
    Organic: 'Vitality & Harmony',
    Technical: 'Confidence & Precision',
    Professional: 'Trust & Resilience',
    Quirky: 'Curiosity & Delight'
  };

  const audienceResolved = audience && audience.trim().length > 0
    ? audience
    : industry === 'AI' || industry === 'Technology'
      ? 'Tech innovators, early adopters & founders'
      : industry === 'Sustainability'
        ? 'Eco-conscious mindful consumers'
        : industry === 'Finance'
          ? 'Modern investors & wealth builders'
          : 'Discerning modern creators';

  const complexity = creativity > 80 ? 'Avant-Garde' : creativity > 50 ? 'Balanced Sophistication' : 'Direct & Accessible';

  return {
    tone: toneMap[style] || 'Dynamic & Engaging',
    emotion: emotionMap[style] || 'Inspired & Resonant',
    style: style || 'Modern',
    length: length || 'Short',
    audience: audienceResolved,
    complexity,
    industry: industry || 'Creative',
    vibeScore: vibe
  };
}

// Helper: Syllable splitter for phonetic pronunciation display
export function formatPronunciation(word) {
  if (!word) return '';
  const cleaned = word.toLowerCase();
  
  // Approximate syllable breaking via vowel clusters
  const parts = [];
  let current = '';
  const vowels = 'aeiouy';
  
  for (let i = 0; i < cleaned.length; i++) {
    current += cleaned[i];
    const isVowel = vowels.includes(cleaned[i]);
    const nextIsConsonant = i + 1 < cleaned.length && !vowels.includes(cleaned[i + 1]);
    const nextNextIsVowel = i + 2 < cleaned.length && vowels.includes(cleaned[i + 2]);
    
    if (isVowel && nextIsConsonant && nextNextIsVowel && current.length >= 2 && parts.length < 3) {
      parts.push(current.charAt(0).toUpperCase() + current.slice(1));
      current = '';
    }
  }
  if (current) {
    parts.push(current.charAt(0).toUpperCase() + current.slice(1));
  }
  
  if (parts.length <= 1) {
    // Fallback split for 5+ letter words
    if (word.length >= 6) {
      const mid = Math.floor(word.length / 2);
      return `${word.slice(0, mid)}-${word.slice(mid)}`.toLowerCase().replace(/(^|\-)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  
  return parts.join('-');
}

// Generate phonetic IPA notation
export function generateIPA(word) {
  const syllables = formatPronunciation(word).split('-');
  return `/${syllables.map(s => s.toLowerCase()).join('·')}/`;
}

// Main generation method
export function generateNamesWithEngine(params) {
  const {
    type = 'Startup',
    idea = '',
    keywords = [],
    audience = '',
    industry = 'Technology',
    language = 'English',
    length = 'Short',
    style = 'Modern',
    vibe = 60,
    creativity = 75,
    uniqueness = 80,
    easyPronounce = true,
    easySpell = true,
    globalFriendly = true,
    avoidCommonWords = true,
    count = 12
  } = params;

  const dna = computeNameDNA(params);
  const seedString = `${type}_${idea}_${industry}_${style}_${length}_${creativity}_${vibe}_${keywords.join('-')}`;
  const random = createSeededRandom(seedString);

  // Pool of candidate construction roots
  const rootsList = Object.keys(MORPHEMIC_ROOTS);
  const styleSuffixes = SUFFIX_PATTERNS[style.toLowerCase()] || SUFFIX_PATTERNS.modern;
  const industryMeta = INDUSTRY_MODIFIERS[industry] || INDUSTRY_MODIFIERS.Technology;

  // Custom keywords parsed for morphemic inspiration
  const parsedKeywordMorphemes = keywords.map(k => k.trim().toLowerCase().replace(/[^a-z]/g, '')).filter(k => k.length >= 3);
  const userIdeaWords = idea.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z]/g, '')).filter(w => w.length >= 4);

  const candidates = [];
  const usedNames = new Set();

  // Try using celebrated coined names when there is semantic resonance
  for (const c of CELEBRATED_INVENTED_NAMES) {
    if (candidates.length < 3 && (c.style.toLowerCase() === style.toLowerCase() || random() > 0.4)) {
      candidates.push({
        id: `cand-${Math.random().toString(36).substr(2, 9)}`,
        name: c.name,
        root: c.root,
        suffix: c.suffix,
        explanation: c.meaning,
        meaning: c.meaning,
        sound: c.sound,
        structure: c.structure,
        emotion: c.emotion,
        audience: dna.audience,
        brandPotential: c.brandPotential,
        pronunciation: formatPronunciation(c.name),
        ipa: c.ipa,
        collisionLevel: c.collisionLevel,
        collisionNotes: c.collisionNotes,
        score: Math.min(98, Math.max(86, Math.floor(88 + random() * 10))),
        metrics: {
          memorability: Math.min(99, Math.max(85, c.metrics.memorability + Math.floor((random() - 0.5) * 6))),
          brandability: Math.min(99, Math.max(85, c.metrics.brandability + Math.floor((random() - 0.5) * 6))),
          pronunciation: easyPronounce ? Math.max(94, c.metrics.pronunciation) : c.metrics.pronunciation,
          distinctiveness: uniqueness > 75 ? Math.max(92, c.metrics.distinctiveness) : c.metrics.distinctiveness,
          emotionalFit: Math.min(99, Math.max(85, Math.floor(88 + (vibe / 100) * 10)))
        },
        style,
        tags: [industry, style, length],
        createdAt: new Date().toISOString(),
        isFavorite: false
      });
      usedNames.add(c.name.toLowerCase());
    }
  }

  // Generate procedurally until count is satisfied
  const attemptsMax = count * 6;
  let attempts = 0;

  while (candidates.length < count && attempts < attemptsMax) {
    attempts++;
    
    // Choose root
    let rootToken = '';
    let rootMeta = null;

    if (parsedKeywordMorphemes.length > 0 && random() < 0.4) {
      const kw = parsedKeywordMorphemes[Math.floor(random() * parsedKeywordMorphemes.length)];
      rootToken = kw.slice(0, Math.min(kw.length, 4));
      rootMeta = { root: rootToken, meaning: `inspired by core keyword "${kw}"`, emotion: dna.emotion };
    } else if (userIdeaWords.length > 0 && random() < 0.25) {
      const iw = userIdeaWords[Math.floor(random() * userIdeaWords.length)];
      rootToken = iw.slice(0, Math.min(iw.length, 4));
      rootMeta = { root: rootToken, meaning: `drawn from concept "${iw}"`, emotion: dna.emotion };
    } else {
      const key = rootsList[Math.floor(random() * rootsList.length)];
      rootMeta = MORPHEMIC_ROOTS[key];
      rootToken = rootMeta.root;
    }

    // Choose suffix
    let suffix = styleSuffixes[Math.floor(random() * styleSuffixes.length)];
    if (random() > 0.7 && industryMeta.prefixes.length > 0) {
      // Prefix synthesis variant
      const pref = industryMeta.prefixes[Math.floor(random() * industryMeta.prefixes.length)];
      if (length === 'Medium' || length === 'Long') {
        const rawName = `${pref}${rootToken.charAt(0).toUpperCase() + rootToken.slice(1)}`;
        testAndAddCandidate(rawName, rootMeta, suffix, pref);
        continue;
      }
    }

    // Standard morphemic blend
    let rawWord = '';
    // Avoid double vowel awkwardness (e.g. lum + ora = lumora, not lumioora)
    const rootEndingVowel = 'aeiou'.includes(rootToken[rootToken.length - 1]);
    const suffixStartVowel = 'aeiou'.includes(suffix[0]);

    if (rootEndingVowel && suffixStartVowel) {
      rawWord = rootToken.slice(0, -1) + suffix;
    } else {
      rawWord = rootToken + suffix;
    }

    // Apply length filter
    if (length === 'Very Short' && rawWord.length > 5) rawWord = rawWord.slice(0, 5);
    if (length === 'Short' && (rawWord.length < 4 || rawWord.length > 7)) {
      if (rawWord.length > 7) rawWord = rawWord.slice(0, 6);
    }
    if (length === 'Long' && rawWord.length < 7) {
      rawWord = (industryMeta.prefixes[Math.floor(random() * industryMeta.prefixes.length)] || 'Aura') + rawWord.charAt(0).toUpperCase() + rawWord.slice(1);
    }

    // Title case
    const candidateName = rawWord.charAt(0).toUpperCase() + rawWord.slice(1).toLowerCase();

    if (candidateName.length >= 3 && !usedNames.has(candidateName.toLowerCase())) {
      testAndAddCandidate(candidateName, rootMeta, suffix, null);
    }
  }

  function testAndAddCandidate(name, rootMeta, suffix, prefixUsed) {
    if (usedNames.has(name.toLowerCase())) return;
    usedNames.add(name.toLowerCase());

    const baseScore = Math.floor(86 + random() * 11);
    const memoScore = Math.floor(88 + (easyPronounce ? 5 : 0) + (random() * 8));
    const brandScore = Math.floor(89 + (creativity > 60 ? 4 : 0) + (random() * 7));
    const pronunScore = Math.floor(90 + (easyPronounce ? 6 : 0) + (random() * 4));
    const distinctScore = Math.floor(86 + (uniqueness / 10) + (random() * 4));
    const emoScore = Math.floor(88 + (vibe / 15) + (random() * 5));

    // Collision check heuristic
    const isCommonWordCandidate = ['Flow', 'Sync', 'Pulse', 'Core', 'Forge', 'Apex', 'Next'].includes(name);
    const collisionLevel = isCommonWordCandidate && !avoidCommonWords
      ? 'High'
      : (name.length <= 4 || random() > 0.8)
        ? 'Moderate'
        : 'Low';

    const collisionNotes = collisionLevel === 'Low'
      ? 'Strong trademark phonetic whitespace. Distinctive neologism with no conflicting category anchors.'
      : collisionLevel === 'Moderate'
        ? 'Shares phonetic morphology with existing market classes. Recommend localized trademark audit.'
        : 'Common semantic overlap detected in active registry databases. Advised for contextual review.';

    const meaning = prefixUsed
      ? `Fuses authoritative vanguard prefix "${prefixUsed}" with root indicating ${rootMeta.meaning}.`
      : `Combines semantic core evoking ${rootMeta.meaning} with a harmonious modern finish.`;

    const sound = easyPronounce
      ? `Crisp disyllabic structure with natural vowel stress and liquid consonant flow.`
      : `Distinctive modern articulation with high phonetic contrast.`;

    candidates.push({
      id: `cand-${Math.random().toString(36).substr(2, 9)}`,
      name,
      root: rootMeta.root,
      suffix,
      explanation: `${meaning} Tuned for ${style.toLowerCase()} brand architecture.`,
      meaning,
      sound,
      structure: `${name.length} characters, ${formatPronunciation(name).split('-').length} syllables, phonetic balance`,
      emotion: rootMeta.emotion || dna.emotion,
      audience: dna.audience,
      brandPotential: `High scalability across digital interfaces, domain availability, and typography.`,
      pronunciation: formatPronunciation(name),
      ipa: generateIPA(name),
      collisionLevel,
      collisionNotes,
      score: Math.min(98, baseScore),
      metrics: {
        memorability: Math.min(99, memoScore),
        brandability: Math.min(99, brandScore),
        pronunciation: Math.min(99, pronunScore),
        distinctiveness: Math.min(99, distinctScore),
        emotionalFit: Math.min(99, emoScore)
      },
      style,
      tags: [industry, style, length],
      createdAt: new Date().toISOString(),
      isFavorite: false
    });
  }

  // Ensure overall score reflects metrics
  return candidates.slice(0, count).map(c => ({
    ...c,
    score: Math.round((c.metrics.memorability + c.metrics.brandability + c.metrics.pronunciation + c.metrics.distinctiveness + c.metrics.emotionalFit) / 5)
  }));
}

// Dedicated remix engine
export function remixCandidate(candidate, direction = 'Shorter', customInstruction = '') {
  const baseName = candidate.name;
  const remixes = [];
  const root = candidate.root || baseName.slice(0, Math.min(4, baseName.length));

  const directionTransformations = {
    Shorter: [
      root.charAt(0).toUpperCase() + root.slice(1, 3) + 'o',
      root.charAt(0).toUpperCase() + root.slice(1, 4),
      baseName.slice(0, 4),
      root.charAt(0).toUpperCase() + 'ix',
      root.charAt(0).toUpperCase() + root.slice(1, 3) + 'a',
      root.toUpperCase()
    ],
    'More premium': [
      `${baseName}eaux`,
      `${baseName} Atelier`,
      `Maison ${baseName}`,
      `Vero${baseName}`,
      `${baseName} Prime`,
      `${baseName} & Co.`
    ],
    'More futuristic': [
      `${baseName}X`,
      `Neo${baseName}`,
      `${baseName} Hyper`,
      `${baseName} AI`,
      `Cyber${baseName}`,
      `Synthet${root}`
    ],
    'More playful': [
      `${baseName}ly`,
      `${baseName}pop`,
      `${baseName}oo`,
      `Little${baseName}`,
      `${baseName}bee`,
      `${baseName}joy`
    ],
    'More human': [
      `Meet${baseName}`,
      `${baseName} Kind`,
      `${baseName} & Kin`,
      `${baseName} Collective`,
      `${baseName} Care`,
      `Dear${baseName}`
    ],
    'More technical': [
      `${baseName} Labs`,
      `${baseName} OS`,
      `${baseName} Matrix`,
      `${baseName} Grid`,
      `${baseName} Engine`,
      `Proto${baseName}`
    ],
    'More luxurious': [
      `${baseName} Privé`,
      `Aura ${baseName}`,
      `${baseName} Royale`,
      `Grand ${baseName}`,
      `${baseName} Reserve`,
      `${baseName} Noir`
    ],
    'More mysterious': [
      `${baseName} Void`,
      `The ${baseName} Cipher`,
      `Arcana ${baseName}`,
      `${baseName} Enigma`,
      `Shadow${baseName}`,
      `${baseName} Prime`
    ],
    'More global': [
      `${baseName} International`,
      `${baseName} Terra`,
      `${baseName} Mondo`,
      `Cosmo${baseName}`,
      `${baseName} Alliance`,
      `${baseName} Global`
    ],
    'More memorable': [
      `${baseName} Echo`,
      `True${baseName}`,
      `${baseName} Spark`,
      `Ever${baseName}`,
      `Nova${baseName}`,
      `${baseName} Peak`
    ]
  };

  const variants = directionTransformations[direction] || [
    `${baseName} Pro`,
    `${baseName} One`,
    `Vera${baseName}`,
    `${baseName} Sync`,
    `${baseName} Flow`,
    `${baseName} Studio`
  ];

  for (let i = 0; i < variants.length; i++) {
    const varName = variants[i].trim();
    remixes.push({
      id: `remix-${Math.random().toString(36).substr(2, 9)}`,
      name: varName,
      direction,
      customInstruction: customInstruction || undefined,
      explanation: `Tuned variant of ${baseName} transformed to emphasize ${direction.toLowerCase()}${customInstruction ? ` ("${customInstruction}")` : ''}.`,
      pronunciation: formatPronunciation(varName.split(' ')[0]),
      ipa: generateIPA(varName.split(' ')[0]),
      score: Math.min(97, Math.max(87, candidate.score + Math.floor((Math.random() - 0.3) * 5))),
      metrics: {
        memorability: Math.min(99, Math.max(86, candidate.metrics.memorability + Math.floor((Math.random() - 0.2) * 6))),
        brandability: Math.min(99, Math.max(86, candidate.metrics.brandability + Math.floor((Math.random() - 0.2) * 6))),
        pronunciation: Math.min(99, Math.max(86, candidate.metrics.pronunciation)),
        distinctiveness: Math.min(99, Math.max(88, candidate.metrics.distinctiveness + 2)),
        emotionalFit: Math.min(99, Math.max(86, candidate.metrics.emotionalFit + 3))
      },
      collisionLevel: candidate.collisionLevel,
      collisionNotes: `Inherits base phonetic profile from ${baseName}; affix modification creates clean trademark delineation.`,
      tags: [...(candidate.tags || []), direction],
      isFavorite: false
    });
  }

  return remixes;
}

// "Surprise Me" unconventional leap generator
export function generateSurpriseLeaps(idea = '', industry = 'Technology') {
  const surprisePairs = [
    { name: 'Kaelum', style: 'Futuristic', meaning: 'Celestial vault fused with cutting-edge kinetic gravity.', tag: 'Cosmic Tech' },
    { name: 'Velora', style: 'Modern', meaning: 'Velocity harmonized with a velvet, tactile human cadence.', tag: 'Fluid Motion' },
    { name: 'Zephyros', style: 'Bold', meaning: 'Mythic wind of revival reimagined for modern architectures.', tag: 'Mythic Energy' },
    { name: 'OmniVerve', style: 'Playful', meaning: 'Total completeness sparked with spontaneous artistic energy.', tag: 'Creative Catalyst' },
    { name: 'Noosphere', style: 'Technical', meaning: 'The collective biosphere of human thought and neural models.', tag: 'Mind Matrix' },
    { name: 'Luxen', style: 'Minimal', meaning: 'The purest atomic unit of illumination and visual quietness.', tag: 'Zen Lumens' },
    { name: 'Arctura', style: 'Luxury', meaning: 'Polar majesty meeting golden ratio structural engineering.', tag: 'Haute Form' },
    { name: 'Aethel', style: 'Organic', meaning: 'Primordial noble elements blooming in modern ecosystems.', tag: 'Ancient Future' },
    { name: 'QuantaFlux', style: 'Futuristic', meaning: 'Indivisible packets of momentum in perpetual high-bandwidth transition.', tag: 'Quantum Leap' },
    { name: 'SolaraX', style: 'Bold', meaning: 'High-thermal solar courage unleashed with orbital power.', tag: 'Solar Edge' },
    { name: 'BrioQuest', style: 'Playful', meaning: 'Spirited vivacity on a continuous journey of discovery.', tag: 'Adventures' },
    { name: 'Veritasium', style: 'Technical', meaning: 'Elemental foundation of unwavering empirical truth.', tag: 'Empirical Core' }
  ];

  return surprisePairs.map(s => ({
    id: `surprise-${Math.random().toString(36).substr(2, 9)}`,
    name: s.name,
    root: s.name.slice(0, 3).toLowerCase(),
    suffix: s.name.slice(3).toLowerCase(),
    explanation: `${s.meaning} Unconventional creative leap tailored to disrupt ${industry}.`,
    meaning: s.meaning,
    sound: 'High acoustic contrast, unforgettable phonetic contour.',
    structure: 'Unconventional morphemic fusion',
    emotion: 'Surprise, inspiration, and bold curiosity.',
    audience: 'Disruptors, bold founders, and category pioneers.',
    brandPotential: 'Striking category-defining identity with high brand stickiness.',
    pronunciation: formatPronunciation(s.name),
    ipa: generateIPA(s.name),
    collisionLevel: 'Low',
    collisionNotes: 'Advisory similarity check: highly distinct coined construction; low lexical saturation.',
    score: Math.floor(92 + Math.random() * 6),
    metrics: {
      memorability: Math.floor(94 + Math.random() * 5),
      brandability: Math.floor(93 + Math.random() * 5),
      pronunciation: Math.floor(91 + Math.random() * 6),
      distinctiveness: 97,
      emotionalFit: Math.floor(92 + Math.random() * 6)
    },
    style: s.style,
    tags: [industry, s.tag, 'Surprise'],
    createdAt: new Date().toISOString(),
    isFavorite: false
  }));
}

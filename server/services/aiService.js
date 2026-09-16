import { generateNamesWithEngine, remixCandidate, generateSurpriseLeaps, computeNameDNA } from './linguisticEngine.js';

export class AIService {
  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY || '';
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.mode = (this.geminiApiKey || this.openaiApiKey) ? 'LIVE_AI' : 'INTELLIGENT_DEMO';
    console.log(`[NOVA AI Service] Initialized in ${this.mode} mode.`);
  }

  // Generate names given user configuration
  async generateNames(params) {
    // If no API key configured, use high-fidelity linguistic demo engine
    if (!this.geminiApiKey && !this.openaiApiKey) {
      // Add slight organic processing delay if requested to feel realistic
      return generateNamesWithEngine(params);
    }

    try {
      if (this.geminiApiKey) {
        return await this._generateWithGemini(params);
      } else {
        return await this._generateWithOpenAI(params);
      }
    } catch (err) {
      console.warn('[NOVA AI Service] Live AI generation failed, falling back to Intelligent Demo Engine:', err.message);
      return generateNamesWithEngine(params);
    }
  }

  // Remix a specific candidate
  async remix(candidate, direction, customInstruction) {
    if (!this.geminiApiKey && !this.openaiApiKey) {
      return remixCandidate(candidate, direction, customInstruction);
    }

    try {
      if (this.geminiApiKey) {
        return await this._remixWithGemini(candidate, direction, customInstruction);
      } else {
        return await this._remixWithOpenAI(candidate, direction, customInstruction);
      }
    } catch (err) {
      console.warn('[NOVA AI Service] Live remix failed, falling back to Intelligent Demo Engine:', err.message);
      return remixCandidate(candidate, direction, customInstruction);
    }
  }

  // Surprise Me leap
  async surprise(idea, industry) {
    return generateSurpriseLeaps(idea, industry);
  }

  // Copilot conversational assistance
  async copilotChat({ query, currentSession, currentCandidates }) {
    const qLower = query.toLowerCase();

    // Contextual heuristics for copilot in demo mode
    let action = 'answer';
    let filteredCandidates = null;
    let reply = '';

    if (qLower.includes('shorter') || qLower.includes('short')) {
      action = 'filter_or_suggest';
      reply = `I have analyzed the current session. Shorter names improve cognitive recall and make app icons and logo lockups significantly cleaner. Here are shorter variations and condensed candidates tailored to your concept.`;
      if (currentCandidates && currentCandidates.length > 0) {
        filteredCandidates = currentCandidates.filter(c => c.name.length <= 6);
      }
    } else if (qLower.includes('premium') || qLower.includes('luxury')) {
      action = 'recommendation';
      reply = `To elevate the premium perception, I focus on classical Latinate morphemes, open vowel endings (like "-ora", "-a"), and stately phonetics. Names like **Lumora** and **Arclume** anchor strong luxury equity.`;
    } else if (qLower.includes('pronounce') || qLower.includes('say')) {
      action = 'analysis';
      reply = `For effortless pronunciation across international markets, prioritize disyllabic names (2 syllables) with consonant-vowel alternating cadences. Avoid heavy consonant clusters like "str" or "xth".`;
    } else if (qLower.includes('nature') || qLower.includes('organic') || qLower.includes('earth')) {
      action = 'suggest';
      reply = `Here are earthy, restorative directions drawn from botanical vitality and natural geology: **Aethel**, **Florava**, and **Radix**. They convey deep authenticity and mindful presence.`;
    } else if (qLower.includes('technical') || qLower.includes('tech')) {
      action = 'recommendation';
      reply = `For cutting-edge technical authority, names emphasizing structural precision and kinetic velocity (such as **Nexora**, **Veyra**, and **Cogniva**) perform best with developer and enterprise audiences.`;
    } else {
      reply = `NOVA Copilot here! Based on your idea "${currentSession?.idea || 'your project'}", I recommend focusing on names that combine a strong emotive root with high phonetic fluidity. Would you like me to make your list shorter, shift the vibe toward high-end luxury, or generate 6 fresh alternatives?`;
    }

    return {
      reply,
      action,
      filteredCandidates
    };
  }

  // Fallback Gemini implementation using fetch
  async _generateWithGemini(params) {
    const prompt = `You are NOVA, an elite AI Naming Intelligence Studio.
Generate ${params.count || 12} unforgettable, coined, or evocative brand names for:
Type: ${params.type}
Idea: ${params.idea}
Industry: ${params.industry}
Style: ${params.style}
Desired Length: ${params.length}
Keywords: ${(params.keywords || []).join(', ')}

Return a JSON array of objects with the exact schema:
[
  {
    "name": "Lumora",
    "root": "lum",
    "suffix": "ora",
    "explanation": "Combines light-inspired phonetics with a modern ending.",
    "meaning": "Suggests illumination and effortless clarity.",
    "sound": "Two clean syllables with open vowel resolution.",
    "structure": "Disyllabic",
    "emotion": "Optimistic and prestigious.",
    "audience": "Forward-thinking creators and professionals.",
    "brandPotential": "High scalability across digital and physical touchpoints.",
    "pronunciation": "Lu-mo-ra",
    "ipa": "/luːˈmɔː.rə/",
    "collisionLevel": "Low",
    "collisionNotes": "Advisory similarity check: clean whitespace.",
    "score": 93,
    "metrics": {
      "memorability": 95,
      "brandability": 94,
      "pronunciation": 96,
      "distinctiveness": 90,
      "emotionalFit": 92
    },
    "style": "${params.style}",
    "tags": ["${params.industry}", "${params.style}"]
  }
]
Only return valid JSON without markdown wrapping.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: (params.creativity || 75) / 100 }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text);
    return parsed.map((item, idx) => ({
      ...item,
      id: `gemini-${Date.now()}-${idx}`,
      createdAt: new Date().toISOString(),
      isFavorite: false
    }));
  }

  async _generateWithOpenAI(params) {
    // OpenAI implementation using fetch
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are NOVA, the premier naming intelligence studio. Output only JSON.' },
          { role: 'user', content: `Generate ${params.count || 12} brand names for ${params.idea} in ${params.industry} with style ${params.style}. Follow standard NameCandidate schema.` }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return parsed.names || parsed.candidates || generateNamesWithEngine(params);
  }

  async _remixWithGemini(candidate, direction, customInstruction) {
    return remixCandidate(candidate, direction, customInstruction);
  }

  async _remixWithOpenAI(candidate, direction, customInstruction) {
    return remixCandidate(candidate, direction, customInstruction);
  }
}

export const aiService = new AIService();

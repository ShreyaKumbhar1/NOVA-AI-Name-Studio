import { aiService } from '../services/aiService.js';
import { computeNameDNA } from '../services/linguisticEngine.js';
import { SAMPLE_SESSIONS } from '../data/sampleSessions.js';

export async function handleGenerate(req, res) {
  try {
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
    } = req.body;

    if (!idea || idea.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a brief idea or description of what you are naming.'
      });
    }

    const dna = computeNameDNA(req.body);
    const candidates = await aiService.generateNames({
      type,
      idea: idea.trim(),
      keywords: Array.isArray(keywords) ? keywords : [],
      audience,
      industry,
      language,
      length,
      style,
      vibe: Number(vibe) || 60,
      creativity: Number(creativity) || 75,
      uniqueness: Number(uniqueness) || 80,
      easyPronounce: Boolean(easyPronounce),
      easySpell: Boolean(easySpell),
      globalFriendly: Boolean(globalFriendly),
      avoidCommonWords: Boolean(avoidCommonWords),
      count: Math.min(24, Math.max(6, Number(count) || 12))
    });

    const session = {
      id: `session-${Date.now()}`,
      type,
      idea: idea.trim(),
      keywords,
      settings: {
        industry,
        style,
        length,
        vibe,
        creativity,
        uniqueness,
        easyPronounce,
        easySpell,
        globalFriendly,
        avoidCommonWords,
      },
      dna,
      candidates,
      favoriteCount: 0,
      createdAt: new Date().toISOString()
    };

    return res.json({
      success: true,
      session,
      candidates,
      dna,
      mode: aiService.mode
    });
  } catch (error) {
    console.error('[Generate Error]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while generating names. Please try again.'
    });
  }
}

export async function handleRemix(req, res) {
  try {
    const { candidate, direction = 'Shorter', customInstruction = '' } = req.body;

    if (!candidate || !candidate.name) {
      return res.status(400).json({
        success: false,
        error: 'A valid name candidate is required for remixing.'
      });
    }

    const remixes = await aiService.remix(candidate, direction, customInstruction);

    return res.json({
      success: true,
      baseName: candidate.name,
      direction,
      remixes
    });
  } catch (error) {
    console.error('[Remix Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to remix name candidate.'
    });
  }
}

export function handleAnalyze(req, res) {
  try {
    const dna = computeNameDNA(req.body);
    return res.json({
      success: true,
      dna
    });
  } catch (error) {
    console.error('[Analyze Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute Name DNA.'
    });
  }
}

export async function handleSurprise(req, res) {
  try {
    const { idea = '', industry = 'Technology' } = req.body;
    const candidates = await aiService.surprise(idea, industry);

    return res.json({
      success: true,
      candidates,
      count: candidates.length
    });
  } catch (error) {
    console.error('[Surprise Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate surprise names.'
    });
  }
}

export async function handleCopilot(req, res) {
  try {
    const { query = '', currentSession = null, currentCandidates = [] } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message or prompt for NOVA Copilot.'
      });
    }

    const response = await aiService.copilotChat({ query: query.trim(), currentSession, currentCandidates });

    return res.json({
      success: true,
      ...response
    });
  } catch (error) {
    console.error('[Copilot Error]', error);
    return res.status(500).json({
      success: false,
      error: 'NOVA Copilot encountered an unexpected error.'
    });
  }
}

export function handleGetSampleSessions(req, res) {
  return res.json({
    success: true,
    sessions: SAMPLE_SESSIONS
  });
}

export function handleHealth(req, res) {
  return res.json({
    status: 'healthy',
    product: 'NOVA — AI Name Studio',
    version: '1.0.0',
    mode: aiService.mode,
    timestamp: new Date().toISOString()
  });
}

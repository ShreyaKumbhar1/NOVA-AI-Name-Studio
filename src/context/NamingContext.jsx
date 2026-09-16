import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { novaApi } from '../services/apiClient';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

const NamingContext = createContext(null);

const HISTORY_STORAGE_KEY = 'nova_history_v1';

const GENERATION_STEPS = [
  'Analyzing concept & semantic resonance...',
  'Understanding audience psychology...',
  'Exploring phonetic & linguistic patterns...',
  'Creating coined & evocative candidates...',
  'Evaluating memorability & sound structure...',
  'Running advisory collision radar...',
  'Synthesizing recommendations & DNA...'
];

export function NamingProvider({ children }) {
  const { addToast } = useToast();

  // Generator inputs
  const [formData, setFormData] = useState({
    type: 'Startup',
    idea: 'A premium AI productivity platform for students and young professionals seeking cognitive flow',
    keywords: ['productivity', 'flow', 'intelligence'],
    audience: 'Students, young creators & high-agency knowledge workers',
    industry: 'Technology',
    language: 'English',
    length: 'Short',
    style: 'Modern',
    vibe: 70,
    creativity: 80,
    uniqueness: 85,
    easyPronounce: true,
    easySpell: true,
    globalFriendly: true,
    avoidCommonWords: true,
    count: 12
  });

  // Dynamic Name DNA
  const [nameDNA, setNameDNA] = useState({
    tone: 'Progressive & Lucid',
    emotion: 'Clarity & Momentum',
    style: 'Modern',
    length: 'Short',
    audience: 'Students, young creators & high-agency knowledge workers',
    complexity: 'Balanced Sophistication',
    industry: 'Technology',
    vibeScore: 70
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState({
    stepIndex: 0,
    message: GENERATION_STEPS[0],
    progress: 0
  });

  // Results & Session
  const [candidates, setCandidates] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  // History sessions
  const [historySessions, setHistorySessions] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modal / Drawer active states
  const [detailsCandidate, setDetailsCandidate] = useState(null);
  const [remixCandidate, setRemixCandidate] = useState(null);
  const [brandPreviewCandidate, setBrandPreviewCandidate] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historySessions));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [historySessions]);

  // Load sample sessions if history is empty
  useEffect(() => {
    if (historySessions.length === 0) {
      novaApi.getSampleSessions().then((res) => {
        if (res.success && res.sessions) {
          setHistorySessions(res.sessions);
          if (!currentSession && res.sessions[0]) {
            setCurrentSession(res.sessions[0]);
            setCandidates(res.sessions[0].candidates || []);
            setFormData(prev => ({
              ...prev,
              type: res.sessions[0].type,
              idea: res.sessions[0].idea,
              keywords: res.sessions[0].keywords || [],
              ...res.sessions[0].settings
            }));
          }
        }
      }).catch(err => {
        console.warn('Could not fetch sample sessions:', err);
      });
    }
  }, []);

  // Update dynamic DNA as inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      novaApi.analyzeIdea(formData).then((res) => {
        if (res.success && res.dna) {
          setNameDNA(res.dna);
        }
      }).catch(() => {});
    }, 150);
    return () => clearTimeout(timer);
  }, [formData]);

  const updateField = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addKeyword = useCallback((rawKeyword) => {
    const trimmed = rawKeyword.trim().toLowerCase();
    if (!trimmed) return;
    setFormData((prev) => {
      if (prev.keywords.includes(trimmed) || prev.keywords.length >= 8) return prev;
      return { ...prev, keywords: [...prev.keywords, trimmed] };
    });
  }, []);

  const removeKeyword = useCallback((kwToRemove) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== kwToRemove)
    }));
  }, []);

  // 7-step Generation sequence animation
  const generateNames = useCallback(async (customOverrides = {}) => {
    const payload = { ...formData, ...customOverrides };
    if (!payload.idea || payload.idea.trim().length === 0) {
      addToast({
        type: 'error',
        title: 'Idea Required',
        message: 'Please describe your idea or concept before generating names.'
      });
      return;
    }

    setIsGenerating(true);
    setGenerationPhase({ stepIndex: 0, message: GENERATION_STEPS[0], progress: 10 });

    const totalSteps = GENERATION_STEPS.length;
    const intervalTime = 280; // ~2 seconds total sequence

    const progressInterval = setInterval(() => {
      setGenerationPhase((prev) => {
        const nextIndex = prev.stepIndex + 1;
        if (nextIndex < totalSteps) {
          return {
            stepIndex: nextIndex,
            message: GENERATION_STEPS[nextIndex],
            progress: Math.min(95, Math.round(((nextIndex + 1) / totalSteps) * 100))
          };
        }
        return prev;
      });
    }, intervalTime);

    try {
      const response = await novaApi.generateNames(payload);
      
      clearInterval(progressInterval);
      setGenerationPhase({ stepIndex: totalSteps - 1, message: 'Ready!', progress: 100 });

      // Small delay to admire the completion state
      setTimeout(() => {
        setIsGenerating(false);
        if (response.success && response.candidates) {
          setCandidates(response.candidates);
          setCurrentSession(response.session);
          setNameDNA(response.dna || nameDNA);

          // Add to history
          setHistorySessions((prev) => [response.session, ...prev.slice(0, 19)]);

          addToast({
            type: 'success',
            title: 'Names Generated',
            message: `Created ${response.candidates.length} intelligent names tailored to your idea.`
          });

          // Elegant celebratory confetti
          try {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#8B5CF6', '#6366F1', '#06B6D4', '#FFFFFF']
            });
          } catch {}
        }
      }, 400);

    } catch (err) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      addToast({
        type: 'error',
        title: 'Generation Failed',
        message: err.message || 'Unable to generate names at this time.'
      });
    }
  }, [formData, nameDNA, addToast]);

  // "Surprise Me" unconventional leap
  const surpriseMe = useCallback(async () => {
    setIsGenerating(true);
    setGenerationPhase({ stepIndex: 0, message: 'Taking an unconventional creative leap...', progress: 50 });

    try {
      const response = await novaApi.surpriseMe(formData.idea, formData.industry);
      setTimeout(() => {
        setIsGenerating(false);
        if (response.success && response.candidates) {
          setCandidates(response.candidates);
          addToast({
            type: 'success',
            title: 'Creative Leap Ready',
            message: 'NOVA generated 12 unexpected, boundary-pushing names.'
          });
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.75 },
              colors: ['#F43F5E', '#A855F7', '#06B6D4']
            });
          } catch {}
        }
      }, 600);
    } catch (err) {
      setIsGenerating(false);
      addToast({
        type: 'error',
        title: 'Surprise Me Failed',
        message: err.message || 'Could not trigger creative leap.'
      });
    }
  }, [formData.idea, formData.industry, addToast]);

  // Restore session from history
  const restoreSession = useCallback((session) => {
    setCurrentSession(session);
    setCandidates(session.candidates || []);
    if (session.dna) setNameDNA(session.dna);
    setFormData((prev) => ({
      ...prev,
      type: session.type || prev.type,
      idea: session.idea || prev.idea,
      keywords: session.keywords || [],
      ...(session.settings || {})
    }));
    addToast({
      type: 'info',
      title: 'Session Restored',
      message: `Restored session from ${new Date(session.createdAt).toLocaleDateString()}.`
    });
  }, [addToast]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistorySessions([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    addToast({
      type: 'info',
      title: 'History Cleared',
      message: 'All past generation sessions have been removed.'
    });
  }, [addToast]);

  return (
    <NamingContext.Provider
      value={{
        formData,
        nameDNA,
        isGenerating,
        generationPhase,
        candidates,
        setCandidates,
        currentSession,
        historySessions,
        detailsCandidate,
        setDetailsCandidate,
        remixCandidate,
        setRemixCandidate,
        brandPreviewCandidate,
        setBrandPreviewCandidate,
        isCopilotOpen,
        setIsCopilotOpen,
        isExportOpen,
        setIsExportOpen,
        updateField,
        addKeyword,
        removeKeyword,
        generateNames,
        surpriseMe,
        restoreSession,
        clearHistory,
      }}
    >
      {children}
    </NamingContext.Provider>
  );
}

export function useNaming() {
  const ctx = useContext(NamingContext);
  if (!ctx) throw new Error('useNaming must be used within a NamingProvider');
  return ctx;
}

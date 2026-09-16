import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState(false);
  const [speakingName, setSpeakingName] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text, nameId) => {
    if (!isSupported || !text) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly measured, clear articulation
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick clear natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google')));
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onstart = () => {
        setSpeakingName(nameId || text);
      };

      utterance.onend = () => {
        setSpeakingName(null);
      };

      utterance.onerror = () => {
        setSpeakingName(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setSpeakingName(null);
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setSpeakingName(null);
    }
  }, [isSupported]);

  return {
    isSupported,
    speakingName,
    speak,
    stop,
  };
}

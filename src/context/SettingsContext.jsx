import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const SettingsContext = createContext(null);
const SETTINGS_KEY = 'nova_settings_v1';

export function SettingsProvider({ children }) {
  const { addToast } = useToast();

  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : {
        appearance: 'dark',
        reducedMotion: false,
        defaultStyle: 'Modern',
        defaultCount: 12,
        language: 'English',
        speechEnabled: true,
      };
    } catch {
      return {
        appearance: 'dark',
        reducedMotion: false,
        defaultStyle: 'Modern',
        defaultCount: 12,
        language: 'English',
        speechEnabled: true,
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
    
    // Apply motion preference class if set
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearAllUserData = useCallback(() => {
    localStorage.removeItem('nova_favorites_v1');
    localStorage.removeItem('nova_comparison_v1');
    localStorage.removeItem('nova_history_v1');
    localStorage.removeItem(SETTINGS_KEY);
    addToast({
      type: 'info',
      title: 'Data Reset',
      message: 'All local studio data and preferences have been cleared.'
    });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }, [addToast]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, clearAllUserData }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}

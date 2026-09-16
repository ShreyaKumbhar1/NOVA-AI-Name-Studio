import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  Moon, 
  Activity, 
  Sliders, 
  Trash2, 
  ShieldAlert, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export function SettingsPage() {
  const { settings, updateSetting, clearAllUserData } = useSettings();
  const { speak, isSupported } = useSpeechSynthesis();
  const { addToast } = useToast();

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleTestVoice = () => {
    speak('Welcome to NOVA AI Name Studio. Turn ideas into names people remember.', 'settings-preview');
    addToast({
      type: 'info',
      title: 'Speech Preview',
      message: 'Playing Web Speech articulation test.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Studio Preferences & Settings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize generation defaults, motion dynamics, audio speech synthesis, and local memory.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance & Motion */}
        <div className="p-6 rounded-2xl bg-[#0C0F1D] border border-white/10 space-y-5">
          <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            Visual Design & Motion Dynamics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme selection */}
            <div className="p-4 rounded-xl bg-[#121628] border border-white/5 space-y-1">
              <span className="text-xs font-semibold text-white">Appearance Theme</span>
              <p className="text-[11px] text-slate-400">Default dark cosmic obsidian surface</p>
              <div className="pt-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-600 text-xs font-semibold text-white">
                  Obsidian Dark (Active)
                </span>
              </div>
            </div>

            {/* Reduced motion toggle */}
            <div className="p-4 rounded-xl bg-[#121628] border border-white/5 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-white">Reduced Motion</span>
                <p className="text-[11px] text-slate-400">Disable 3D tilt, floating loops & parallax</p>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                className="w-5 h-5 rounded bg-[#1A2035] border-white/20 text-purple-600 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Generation Defaults */}
        <div className="p-6 rounded-2xl bg-[#0C0F1D] border border-white/10 space-y-5">
          <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Studio Generation Defaults
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Default naming style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Default Naming Style</label>
              <select
                value={settings.defaultStyle}
                onChange={(e) => updateSetting('defaultStyle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {['Modern', 'Futuristic', 'Luxury', 'Minimal', 'Bold', 'Technical', 'Organic', 'Playful', 'Professional', 'Quirky'].map((st) => (
                  <option key={st} value={st} className="bg-[#141828] text-white">{st}</option>
                ))}
              </select>
            </div>

            {/* Default count */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Default Candidate Count</label>
              <select
                value={settings.defaultCount}
                onChange={(e) => updateSetting('defaultCount', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value={8} className="bg-[#141828] text-white">8 Candidates</option>
                <option value={12} className="bg-[#141828] text-white">12 Candidates (Recommended)</option>
                <option value={16} className="bg-[#141828] text-white">16 Candidates</option>
                <option value={20} className="bg-[#141828] text-white">20 Candidates</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Speech Preview & Audio */}
        <div className="p-6 rounded-2xl bg-[#0C0F1D] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            Phonetic Audio Articulation
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            NOVA uses the browser's native Web Speech API to provide accurate, multi-syllable pronunciation of coined names.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleTestVoice}
              disabled={!isSupported}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-200 text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-40"
            >
              <Volume2 className="w-4 h-4" />
              <span>Test Audio Speech Synthesis</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400">
              {isSupported ? 'System speech engine active' : 'Speech synthesis unavailable in browser'}
            </span>
          </div>
        </div>

        {/* Section 4: Data Management & Reset */}
        <div className="p-6 rounded-2xl bg-[#160E18] border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
              Local Storage Management
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            All your favorites, comparison lists, custom keywords, and past session history are stored locally in your browser's persistent storage. You can purge this data at any time.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Local Studio Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Purge All Studio Data?"
        subtitle="This action is irreversible and removes all locally stored favorites, history sessions, and settings."
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you sure you want to reset your studio? All generated names, favorites shortlists, and configurations will be completely cleared.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setConfirmClearOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                setConfirmClearOpen(false);
                clearAllUserData();
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/50"
            >
              Yes, Purge Data
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

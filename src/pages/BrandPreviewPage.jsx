import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Palette, 
  Sparkles, 
  Smartphone, 
  Globe, 
  CreditCard, 
  Package, 
  Share2, 
  Wand2, 
  ArrowRight 
} from 'lucide-react';
import { useNaming } from '../context/NamingContext';
import { useFavorites } from '../context/FavoritesContext';
import { GlassCard } from '../components/ui/GlassCard';

const MOODS = [
  { id: 'Minimal', label: 'Minimal', desc: 'Monochrome whitespace & Swiss typography' },
  { id: 'Luxury', label: 'Luxury', desc: 'Gold leaf accents & obsidian poise' },
  { id: 'Tech', label: 'Tech', desc: 'Cyber cyan gradients & dark glass' },
  { id: 'Playful', label: 'Playful', desc: 'Warm pastels & friendly curves' },
  { id: 'Editorial', label: 'Editorial', desc: 'High-contrast magazine layout' },
];

export function BrandPreviewPage() {
  const { candidates, currentSession } = useNaming();
  const { favorites } = useFavorites();

  const allAvailable = [...favorites, ...candidates];
  // Deduplicate by name
  const uniqueNames = Array.from(new Map(allAvailable.map(item => [item.name, item])).values());

  const [selectedCandidate, setSelectedCandidate] = useState(() => uniqueNames[0] || {
    name: 'Lumora',
    meaning: 'Synthesizes light (lumen) with an open, euphonic horizon (ora).',
    style: 'Modern'
  });

  const [selectedMood, setSelectedMood] = useState('Tech');

  const name = selectedCandidate.name;
  const tagline = selectedCandidate.meaning ? `${selectedCandidate.meaning.slice(0, 60)}...` : 'Intelligence engineered for tomorrow.';

  // Mood styles
  const moodStyles = {
    Minimal: {
      bg: 'bg-[#0E0E10]',
      cardBg: 'bg-[#18181B] border-neutral-800 text-neutral-100',
      accent: 'text-neutral-100',
      font: 'font-sans font-medium tracking-tight',
      logoStyle: 'text-white tracking-widest uppercase font-light text-3xl',
      badge: 'bg-neutral-800 text-neutral-300 border-neutral-700',
      border: 'border-neutral-800',
      gradient: 'from-neutral-200 to-neutral-400',
      iconGrad: 'from-neutral-800 to-neutral-900 border-neutral-700 text-white',
    },
    Luxury: {
      bg: 'bg-[#0A0807]',
      cardBg: 'bg-[#14110E] border-amber-500/20 text-amber-100 shadow-amber-950/20',
      accent: 'text-amber-300',
      font: 'font-serif tracking-normal',
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 tracking-wider font-semibold text-3xl uppercase',
      badge: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
      border: 'border-amber-500/20',
      gradient: 'from-amber-200 via-amber-300 to-yellow-500',
      iconGrad: 'from-amber-900/60 to-black border-amber-500/40 text-amber-300 shadow-amber-950/40',
    },
    Tech: {
      bg: 'bg-[#060812]',
      cardBg: 'bg-[#0B1020] border-cyan-500/30 text-cyan-50 shadow-cyan-950/30',
      accent: 'text-cyan-400',
      font: 'font-mono tracking-tight',
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 font-display font-black tracking-tight text-4xl',
      badge: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30',
      border: 'border-cyan-500/20',
      gradient: 'from-cyan-400 to-indigo-500',
      iconGrad: 'from-indigo-600 via-purple-600 to-cyan-500 text-white border-cyan-400/30 shadow-cyan-500/20',
    },
    Playful: {
      bg: 'bg-[#140E1A]',
      cardBg: 'bg-[#1E1426] border-pink-500/30 text-pink-50 shadow-pink-950/30',
      accent: 'text-pink-400',
      font: 'font-display tracking-wide font-bold',
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 font-display font-extrabold text-4xl',
      badge: 'bg-pink-950/40 text-pink-300 border-pink-500/30',
      border: 'border-pink-500/20',
      gradient: 'from-pink-400 to-amber-400',
      iconGrad: 'from-pink-500 via-rose-500 to-amber-400 text-white border-pink-400/30 shadow-pink-500/30',
    },
    Editorial: {
      bg: 'bg-[#0D0E12]',
      cardBg: 'bg-[#151720] border-slate-700 text-slate-100',
      accent: 'text-slate-200',
      font: 'font-display font-serif',
      logoStyle: 'text-white font-serif italic text-4xl tracking-wide',
      badge: 'bg-slate-800 text-slate-300 border-slate-600',
      border: 'border-slate-700',
      gradient: 'from-slate-100 to-slate-400',
      iconGrad: 'from-slate-800 to-slate-950 border-slate-600 text-white',
    },
  }[selectedMood];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Brand Preview Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time CSS brand mockups showing logo wordmarks, app store icons, web presences, and physical packaging.
          </p>
        </div>

        {/* Name Selector Dropdown */}
        {uniqueNames.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Active Name:</label>
            <select
              value={selectedCandidate.name}
              onChange={(e) => {
                const found = uniqueNames.find(u => u.name === e.target.value);
                if (found) setSelectedCandidate(found);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#141828] border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-purple-500"
            >
              {uniqueNames.map(u => (
                <option key={u.name} value={u.name} className="bg-[#141828] text-white">
                  {u.name} ({u.style || 'Modern'})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Mood Switcher Bar */}
      <div className="p-4 rounded-2xl bg-[#0C0F1D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0 mr-2">
            Visual Mood:
          </span>
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0
                  ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-950/40'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-purple-300 hidden sm:inline">
          {MOODS.find(m => m.id === selectedMood)?.desc}
        </span>
      </div>

      {/* Visual Mockups Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mockup 1: Large Wordmark Lockup (7 cols) */}
        <div className={`md:col-span-7 p-8 rounded-3xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[260px] shadow-2xl relative overflow-hidden group`}>
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
              Primary Wordmark Lockup
            </span>
            <span className="text-xs font-mono text-slate-400">100% Vector CSS</span>
          </div>

          <div className="my-8 text-center space-y-2">
            <h2 className={`${moodStyles.logoStyle} select-none`}>
              {name}
            </h2>
            <p className="text-xs text-slate-400 tracking-widest uppercase opacity-80 max-w-sm mx-auto">
              {tagline}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-white/5">
            <span>Grid Ratio: 1.618 (Golden Mean)</span>
            <span className="text-cyan-400">High Contrast Legibility</span>
          </div>
        </div>

        {/* Mockup 2: Mobile App Squircle Icon (5 cols) */}
        <div className={`md:col-span-5 p-8 rounded-3xl border ${moodStyles.cardBg} flex flex-col items-center justify-between min-h-[260px] shadow-2xl`}>
          <div className="w-full flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
              Mobile App Icon
            </span>
            <Smartphone className="w-4 h-4 text-slate-400" />
          </div>

          <div className="my-4 flex flex-col items-center">
            <div className={`w-28 h-28 rounded-[30px] bg-gradient-to-tr ${moodStyles.iconGrad} border shadow-2xl flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300`}>
              <span className="text-4xl font-black font-display tracking-tight text-white drop-shadow-lg">
                {name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-bold text-white mt-3">{name}</span>
            <span className="text-[11px] text-slate-400">Version 1.0</span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">Apple App Store & Google Play</span>
        </div>

        {/* Mockup 3: Full Website Header Hero (12 cols) */}
        <div className={`md:col-span-12 p-8 rounded-3xl border ${moodStyles.cardBg} space-y-6 shadow-2xl`}>
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                Digital Experience ({name.toLowerCase()}.studio)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          {/* Mini website navbar */}
          <div className="flex items-center justify-between px-5 py-3 rounded-xl bg-black/40 border border-white/5 text-xs">
            <div className="flex items-center gap-6">
              <span className="font-bold text-white font-display text-sm">{name}</span>
              <span className="text-slate-400 hidden sm:inline">Platform</span>
              <span className="text-slate-400 hidden sm:inline">Solutions</span>
              <span className="text-slate-400 hidden sm:inline">Developers</span>
            </div>
            <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-slate-200 transition-colors">
              Get Started
            </button>
          </div>

          {/* Hero Pitch Banner */}
          <div className="py-12 px-4 text-center max-w-xl mx-auto space-y-3">
            <span className={`text-xs font-mono uppercase tracking-widest ${moodStyles.accent}`}>
              Pioneering {selectedCandidate.style || 'modern'} intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Transforming everyday workflows with {name}.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              Empowering next-generation builders to scale their vision with unmatched velocity, clarity, and precision.
            </p>
          </div>
        </div>

        {/* Mockup 4: Premium Business Card (6 cols) */}
        <div className={`md:col-span-6 p-8 rounded-3xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[220px] shadow-2xl relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
              Foil-Embossed Card
            </span>
          </div>

          <div className="my-6">
            <h3 className="text-2xl font-bold font-display text-white">{name}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Founder & CEO</p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/5">
            <span>hello@{name.toLowerCase()}.com</span>
            <span>New York · London</span>
          </div>
        </div>

        {/* Mockup 5: Physical Product Packaging (6 cols) */}
        <div className={`md:col-span-6 p-8 rounded-3xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[220px] shadow-2xl`}>
          <div className="flex items-center justify-between">
            <Package className="w-4 h-4 text-slate-400" />
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
              Hardware Packaging & Merchandise
            </span>
          </div>

          <div className="my-6 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Specimen No. 84</span>
            <h3 className="text-xl font-bold font-display text-white">{name} Studio Edition</h3>
            <p className="text-xs text-slate-400">Industrial grade design. Anodized aluminum finish.</p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/5">
            <span>Model N-100</span>
            <span className="text-emerald-400">CE & FCC Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

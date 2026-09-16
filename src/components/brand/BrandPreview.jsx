import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Globe, 
  CreditCard, 
  Package, 
  Layers, 
  Check, 
  Copy, 
  Download 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useToast } from '../../context/ToastContext';

const MOODS = [
  { id: 'Minimal', label: 'Minimal', desc: 'Monochrome, whitespace, Swiss typography' },
  { id: 'Luxury', label: 'Luxury', desc: 'Gold leaf, serif accents, obsidian elegance' },
  { id: 'Tech', label: 'Tech', desc: 'Cyber cyan gradients, dark glass, mono accents' },
  { id: 'Playful', label: 'Playful', desc: 'Warm pastels, rounded curves, friendly glow' },
  { id: 'Editorial', label: 'Editorial', desc: 'High-contrast typography, magazine poise' },
];

export function BrandPreview({ candidate, isOpen, onClose }) {
  const { addToast } = useToast();
  const [selectedMood, setSelectedMood] = useState('Tech');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'icon' | 'header' | 'card' | 'product'

  if (!candidate) return null;

  const name = candidate.name;
  const tagline = candidate.meaning ? `${candidate.meaning.slice(0, 50)}...` : 'Intelligence engineered for tomorrow.';

  // Mood-specific styles
  const moodStyles = {
    Minimal: {
      bg: 'bg-[#0E0E10]',
      cardBg: 'bg-[#18181B] border-neutral-800 text-neutral-100',
      accent: 'text-neutral-100',
      font: 'font-sans font-medium tracking-tight',
      logoStyle: 'text-white tracking-widest uppercase font-light text-2xl',
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
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 tracking-wider font-semibold text-2xl uppercase',
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
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 font-display font-black tracking-tight text-3xl',
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
      logoStyle: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 font-display font-extrabold text-3xl',
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
      logoStyle: 'text-white font-serif italic text-3xl tracking-wide',
      badge: 'bg-slate-800 text-slate-300 border-slate-600',
      border: 'border-slate-700',
      gradient: 'from-slate-100 to-slate-400',
      iconGrad: 'from-slate-800 to-slate-950 border-slate-600 text-white',
    },
  }[selectedMood];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Brand Identity Preview — ${name}`}
      subtitle="Explore how this name translates across visual branding, app icons, digital websites, and physical touchpoints."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Mood Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Visual Direction
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MOODS.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id)}
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all
                      ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-950/40'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-mono text-purple-300">
              {MOODS.find(m => m.id === selectedMood)?.desc}
            </span>
          </div>
        </div>

        {/* Visual Mockups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-h-[500px] overflow-y-auto pr-1">
          {/* Item 1: Wordmark & Logo Lockup (cols 1-7) */}
          <div className={`md:col-span-7 p-6 rounded-2xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[190px] relative overflow-hidden group`}>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                Logo Wordmark
              </span>
              <span className="text-[10px] font-mono text-slate-500">Vector Lockup</span>
            </div>

            <div className="my-6 text-center">
              <h1 className={`${moodStyles.logoStyle} select-none`}>
                {name}
              </h1>
              <p className="text-[11px] text-slate-400 tracking-widest uppercase mt-2 opacity-80">
                {tagline}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
              <span>Aspect: 16:9 Brand Mark</span>
              <span>Vector Scalable</span>
            </div>
          </div>

          {/* Item 2: Mobile App Icon Mockup (cols 8-12) */}
          <div className={`md:col-span-5 p-6 rounded-2xl border ${moodStyles.cardBg} flex flex-col items-center justify-between min-h-[190px]`}>
            <div className="w-full flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                App Icon
              </span>
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* iOS style squircle app icon */}
            <div className="my-3 flex flex-col items-center">
              <div className={`w-20 h-20 rounded-[22px] bg-gradient-to-tr ${moodStyles.iconGrad} border shadow-2xl flex items-center justify-center p-3 transform transition-transform group-hover:scale-105 duration-300`}>
                <span className="text-2xl font-black font-display tracking-tight text-white drop-shadow-md">
                  {name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-2">{name}</span>
            </div>

            <span className="text-[10px] font-mono text-slate-500">iOS & Android App Store</span>
          </div>

          {/* Item 3: Website Hero Banner Mockup (cols 1-12) */}
          <div className={`md:col-span-12 p-6 rounded-2xl border ${moodStyles.cardBg} space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                  Web Studio Presence ({name.toLowerCase()}.ai)
                </span>
              </div>
              {/* Browser chrome buttons */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
            </div>

            {/* Website mini header */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-black/40 border border-white/5 text-xs">
              <div className="flex items-center gap-4">
                <span className="font-bold text-white font-display">{name}</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">Features</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">Intelligence</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">Pricing</span>
              </div>
              <button className={`px-3 py-1 rounded-lg text-[10px] font-bold bg-white text-black`}>
                Launch App
              </button>
            </div>

            {/* Hero pitch banner */}
            <div className="py-6 px-4 text-center max-w-md mx-auto space-y-2.5">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${moodStyles.accent}`}>
                Introducing the future of {candidate.style || 'modern'} thinking
              </span>
              <h2 className="text-2xl font-bold font-display text-white">
                Turn your biggest ideas into unforgettable reality with {name}.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed for founders and forward-thinking creators ready to build the next paradigm.
              </p>
            </div>
          </div>

          {/* Item 4: Business Card Mockup (cols 1-6) */}
          <div className={`md:col-span-6 p-6 rounded-2xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[170px] relative overflow-hidden`}>
            <div className="flex items-center justify-between">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                Business Card
              </span>
            </div>

            <div className="my-4">
              <h3 className="text-xl font-bold font-display text-white">{name}</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Founding Partner</p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>contact@{name.toLowerCase()}.studio</span>
              <span>San Francisco · Tokyo</span>
            </div>
          </div>

          {/* Item 5: Product Card / Packaging (cols 7-12) */}
          <div className={`md:col-span-6 p-6 rounded-2xl border ${moodStyles.cardBg} flex flex-col justify-between min-h-[170px]`}>
            <div className="flex items-center justify-between">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${moodStyles.badge}`}>
                Product Packaging / Label
              </span>
            </div>

            <div className="my-4 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Batch 001 · Edition No. 4</span>
              <h3 className="text-lg font-bold font-display text-white">{name} Studio Edition</h3>
              <p className="text-[11px] text-slate-400 leading-snug">
                Precision crafted. 100% sustainable materials.
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>Net Wt. 250ml / 8.5 oz</span>
              <span className="text-emerald-400">Verified Organic</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

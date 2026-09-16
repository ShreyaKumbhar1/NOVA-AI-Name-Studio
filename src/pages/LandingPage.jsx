import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Wand2, 
  Dna, 
  Scale, 
  ShieldCheck, 
  Palette, 
  Bot, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Volume2, 
  ChevronRight 
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScoreRing } from '../components/ui/ScoreRing';
import { GlassCard } from '../components/ui/GlassCard';
import { PronunciationPlayer } from '../components/results/PronunciationPlayer';
import { useNaming } from '../context/NamingContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { updateField, generateNames } = useNaming();
  const [quickIdea, setQuickIdea] = useState('');

  const floatingNames = [
    { name: 'Lumora', score: 94, style: 'Modern', top: '10%', left: '5%', delay: '0s', depth: 25 },
    { name: 'Veyra', score: 93, style: 'Futuristic', top: '15%', right: '8%', delay: '1s', depth: 40 },
    { name: 'Nexora', score: 92, style: 'Technical', bottom: '18%', left: '8%', delay: '2s', depth: 30 },
    { name: 'Solvyn', score: 90, style: 'Minimal', bottom: '12%', right: '12%', delay: '3s', depth: 20 },
    { name: 'Arclume', score: 96, style: 'Luxury', top: '55%', right: '2%', delay: '1.5s', depth: 35 },
  ];

  const categories = [
    { title: 'Brand', desc: 'Category-defining consumer & retail identities', icon: '✦' },
    { title: 'Startup', desc: 'Venture-backed high-velocity companies', icon: '▲' },
    { title: 'Product', desc: 'Hardware, software, & physical inventions', icon: '■' },
    { title: 'App', desc: 'Mobile, SaaS, & digital ecosystem experiences', icon: '●' },
    { title: 'Project', desc: 'Open-source, research labs, & initiatives', icon: '◆' },
    { title: 'Character', desc: 'Gaming, narrative worlds, & persona lore', icon: '★' },
    { title: 'Business', desc: 'Agencies, consultancies, & studios', icon: '❖' },
    { title: 'Creative', desc: 'Publications, media channels, & podcasts', icon: '✿' },
  ];

  const workflowSteps = [
    { step: '01', title: 'IDEA', desc: 'Describe your concept, mission, and unique audience in plain words.' },
    { step: '02', title: 'UNDERSTAND', desc: 'NOVA decodes tone, emotion, and phonetics into a dynamic Name DNA.' },
    { step: '03', title: 'GENERATE', desc: 'AI synthesis crafts coined, evocative, and compound candidate names.' },
    { step: '04', title: 'SCORE', desc: 'Multi-dimensional evaluation for memorability, pronunciation, and fit.' },
    { step: '05', title: 'REFINE', desc: 'Remix, alter vowels, tune style vectors, or take unconventional leaps.' },
    { step: '06', title: 'CHOOSE', desc: 'Compare side-by-side in Name Lab and inspect real-world brand mockups.' },
  ];

  const handleQuickLaunch = (e) => {
    e.preventDefault();
    if (quickIdea.trim()) {
      updateField('idea', quickIdea.trim());
    }
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-[#080A10] text-[#F8FAFC] selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Ambient Cosmic Lights */}
        <div className="glow-orb-purple w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-70" />
        <div className="glow-orb-cyan w-[400px] h-[400px] top-60 -left-20 opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-purple-500/30 text-xs font-semibold text-purple-200 shadow-glow-purple backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Next-Generation AI Naming Intelligence Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Names that make ideas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                unforgettable.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Generate, analyze, refine, and compare names with an AI-powered naming studio built for creative decisions.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <NavLink
                to="/generate"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-2xl shadow-purple-900/50 hover:scale-105 transition-all"
              >
                <Wand2 className="w-4 h-4" />
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink
                to="/dashboard"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Examples</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            </div>
          </div>

          {/* 3D Visual Centerpiece with Orbiting Floating Cards */}
          <div className="mt-16 lg:mt-24 relative max-w-4xl mx-auto h-[380px] sm:h-[460px] flex items-center justify-center perspective-container">
            {/* Central NOVA AI Orb */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer atmospheric aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 blur-3xl opacity-40 animate-pulse-slow" />
              {/* Planetary orbit rings */}
              <div className="absolute -inset-10 rounded-full border border-purple-500/20 border-dashed animate-spin-slow" />
              <div className="absolute -inset-20 rounded-full border border-cyan-400/15 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />

              {/* Core 3D Glowing Orb */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 p-1 shadow-2xl shadow-purple-900/60 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0A0D18] flex flex-col items-center justify-center text-center p-3">
                  <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-300 animate-pulse mb-1" />
                  <span className="font-extrabold font-display text-white text-xs sm:text-sm tracking-wider">
                    NOVA CORE
                  </span>
                  <span className="text-[9px] font-mono text-purple-300">Phonetic AI</span>
                </div>
              </div>
            </div>

            {/* Orbiting Floating 3D Cards */}
            {floatingNames.map((item, idx) => (
              <div
                key={item.name}
                style={{
                  top: item.top,
                  bottom: item.bottom,
                  left: item.left,
                  right: item.right,
                  animationDelay: item.delay,
                  zIndex: 20 + idx,
                }}
                className="absolute hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#121626]/85 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/70 animate-float-slow transform hover:scale-110 transition-all cursor-pointer"
                onClick={() => navigate('/generate')}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      {item.style}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">High Viability</span>
                </div>
                <ScoreRing score={item.score} size={42} strokeWidth={3.5} />
              </div>
            ))}
          </div>

          {/* Quick Idea Teaser Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleQuickLaunch}
              className="p-2 rounded-2xl bg-[#111422]/90 border border-white/10 shadow-2xl shadow-purple-950/40 backdrop-blur-xl flex flex-col sm:flex-row gap-2"
            >
              <input
                type="text"
                value={quickIdea}
                onChange={(e) => setQuickIdea(e.target.value)}
                placeholder="Enter your concept (e.g. AI studio for architect workflows)..."
                className="flex-1 px-4 py-3 bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-colors shrink-0"
              >
                <span>Generate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Built For Every Kind of Idea */}
      <section id="use-cases" className="py-20 border-t border-white/5 bg-[#090C16] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Versatile Linguistic Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Built for every kind of idea
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whether launching an enterprise SaaS platform, luxury fragrance, or gaming protagonist, NOVA tunes its phonetics to your domain.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <GlassCard
                key={cat.title}
                className="p-5 flex flex-col justify-between min-h-[140px] text-left group"
                onClick={() => {
                  updateField('type', cat.title);
                  navigate('/generate');
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl text-purple-400 group-hover:scale-125 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-300">
                    Explore →
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {cat.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Pipeline Section */}
      <section id="how-it-works" className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">
              The Creative Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              From raw concept to trademark-ready poise
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Six systematic steps that separate memorable brand names from generic autocomplete buzzwords.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {workflowSteps.map((ws, i) => (
              <div
                key={ws.step}
                className="p-5 rounded-2xl bg-[#0E111E]/80 border border-white/5 flex flex-col justify-between relative group hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {ws.step}
                  </span>
                  {i < workflowSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold font-display text-white tracking-tight mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {ws.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Cards */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#090C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Studio Intelligence Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Why NOVA is not a generic chatbot
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized tools built exclusively for brand strategists, founders, and creative directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Name DNA */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Dynamic Name DNA
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before generation even starts, NOVA synthesizes tone, emotion, target audience psychology, and linguistic complexity into a live fingerprint.
              </p>
            </GlassCard>

            {/* Feature 2: Collision Radar */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Collision Radar Advisory
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates common dictionary overlap, phonetic proximity, and category genericness so you avoid awkward trademark traps early.
              </p>
            </GlassCard>

            {/* Feature 3: Brand Preview */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Brand Mockup Engine
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switch between Minimal, Luxury, Tech, Playful, and Editorial moods to see your name live on app icons, website heroes, and product packaging.
              </p>
            </GlassCard>

            {/* Feature 4: Name Lab */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Name Lab Comparison
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lock up to 4 shortlisted names side-by-side to compare memorability, phonetics, and audience resonance without arbitrary winner declarations.
              </p>
            </GlassCard>

            {/* Feature 5: Name Remix */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 w-fit">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Surgical Morphing & Remix
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Love a name but want it punchier? Instantly transform candidates to be shorter, more luxurious, more futuristic, or guide with custom prompts.
              </p>
            </GlassCard>

            {/* Feature 6: NOVA Copilot */}
            <GlassCard className="p-7 space-y-4" interactive={false}>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Workspace Copilot
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An intelligent session assistant operating inside your studio. Ask it to filter technical suffixes, tune syllables, or inspire fresh creative pivots.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="glow-orb-purple w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

        <div className="max-w-3xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Ready to find the name that defines your vision?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Jump directly into the studio. No sign-up friction. High-fidelity intelligent generation ready instantly.
          </p>
          <div className="pt-2">
            <NavLink
              to="/generate"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-2xl shadow-purple-900/50 hover:scale-105 transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>Launch NOVA Name Studio</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

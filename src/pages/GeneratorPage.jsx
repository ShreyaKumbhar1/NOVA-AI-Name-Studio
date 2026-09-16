import React, { useState } from 'react';
import { 
  Wand2, 
  Zap, 
  Sparkles, 
  Sliders, 
  RefreshCw, 
  Filter, 
  Layers, 
  CheckSquare, 
  Square, 
  Info, 
  ArrowUpDown, 
  Search 
} from 'lucide-react';
import { useNaming } from '../context/NamingContext';
import { NameDNA } from '../components/generator/NameDNA';
import { KeywordChips } from '../components/generator/KeywordChips';
import { StyleSelector } from '../components/generator/StyleSelector';
import { GenerationLoader } from '../components/generator/GenerationLoader';
import { NameCard } from '../components/results/NameCard';

const NAMING_TYPES = [
  'Startup',
  'Brand',
  'Product',
  'App',
  'Project',
  'Character',
  'Business',
  'Website',
  'Team',
  'Other',
];

const INDUSTRIES = [
  'Technology',
  'AI',
  'Sustainability',
  'Finance',
  'Health',
  'Education',
  'Creative',
  'Fashion',
  'Gaming',
  'Food',
  'Travel',
  'Other',
];

const LENGTHS = ['Very Short', 'Short', 'Medium', 'Long'];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese-Inspired', 'Latin-Derived'];

export function GeneratorPage() {
  const {
    formData,
    nameDNA,
    isGenerating,
    generationPhase,
    candidates,
    updateField,
    addKeyword,
    removeKeyword,
    generateNames,
    surpriseMe,
    setDetailsCandidate,
    setRemixCandidate,
    setBrandPreviewCandidate,
  } = useNaming();

  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'alphabetical' | 'length'

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter((c) => {
      if (!filterQuery) return true;
      const q = filterQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        (c.meaning && c.meaning.toLowerCase().includes(q)) ||
        (c.style && c.style.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      if (sortBy === 'length') return a.name.length - b.name.length;
      return 0;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    generateNames();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Name Generation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure linguistic parameters, inspect your live Name DNA, and generate coined, brandable names.
          </p>
        </div>

        {/* Surprise Me Header Action */}
        <button
          type="button"
          onClick={surpriseMe}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 hover:border-pink-400 text-pink-200 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Surprise Me</span>
        </button>
      </div>

      {/* Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Configuration (cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#0C0F1B] border border-white/10 shadow-2xl space-y-5">
            {/* Field: What are you naming? */}
            <div className="space-y-1.5">
              <label htmlFor="naming-type" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                What are you naming?
              </label>
              <select
                id="naming-type"
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {NAMING_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#141828] text-white">{t}</option>
                ))}
              </select>
            </div>

            {/* Field: Describe your idea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="idea-desc" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Describe your idea
                </label>
                <span className="text-[11px] text-slate-400">Core concept</span>
              </div>
              <textarea
                id="idea-desc"
                rows={3}
                value={formData.idea}
                onChange={(e) => updateField('idea', e.target.value)}
                placeholder="Example: A premium AI productivity platform for students and young professionals..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
                required
              />
            </div>

            {/* Field: Keywords */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Keywords & Concept Anchors
              </label>
              <KeywordChips
                keywords={formData.keywords}
                onAdd={addKeyword}
                onRemove={removeKeyword}
              />
            </div>

            {/* Field: Target Audience */}
            <div className="space-y-1.5">
              <label htmlFor="target-audience" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Target Audience <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="target-audience"
                type="text"
                value={formData.audience}
                onChange={(e) => updateField('audience', e.target.value)}
                placeholder="e.g. Early-stage founders, Gen Z creatives, health enthusiasts..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Row: Industry & Language */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="industry-select" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Industry
                </label>
                <select
                  id="industry-select"
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#141828] text-white">{ind}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="language-select" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Language Feel
                </label>
                <select
                  id="language-select"
                  value={formData.language}
                  onChange={(e) => updateField('language', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l} className="bg-[#141828] text-white">{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Desired Length Segmented */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Desired Length
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#141828] border border-white/10">
                {LENGTHS.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => updateField('length', len)}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      formData.length === len
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Style Segmented Controls */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Name Style & Posture
              </label>
              <StyleSelector
                selectedStyle={formData.style}
                onSelect={(st) => updateField('style', st)}
              />
            </div>

            {/* Sliders: Vibe, Creativity, Uniqueness */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              {/* Vibe Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Tone Vibe</span>
                  <span className="font-mono text-purple-300">{formData.vibe}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={formData.vibe}
                  onChange={(e) => updateField('vibe', Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Subtle & Calm</span>
                  <span>High Energy & Bold</span>
                </div>
              </div>

              {/* Creativity Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Creativity Level</span>
                  <span className="font-mono text-cyan-300">{formData.creativity}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={formData.creativity}
                  onChange={(e) => updateField('creativity', Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Conservative</span>
                  <span>Experimental</span>
                </div>
              </div>

              {/* Uniqueness Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Uniqueness Requirement</span>
                  <span className="font-mono text-emerald-300">{formData.uniqueness}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={formData.uniqueness}
                  onChange={(e) => updateField('uniqueness', Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Familiar Morphemes</span>
                  <span>Distinctive Neologism</span>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-white/5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                Phonetic & Market Safeguards
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.easyPronounce}
                    onChange={(e) => updateField('easyPronounce', e.target.checked)}
                    className="w-4 h-4 rounded bg-[#141828] border-white/10"
                  />
                  <span>Easy to pronounce</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.easySpell}
                    onChange={(e) => updateField('easySpell', e.target.checked)}
                    className="w-4 h-4 rounded bg-[#141828] border-white/10"
                  />
                  <span>Easy to spell</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.globalFriendly}
                    onChange={(e) => updateField('globalFriendly', e.target.checked)}
                    className="w-4 h-4 rounded bg-[#141828] border-white/10"
                  />
                  <span>Global-friendly phonetics</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.avoidCommonWords}
                    onChange={(e) => updateField('avoidCommonWords', e.target.checked)}
                    className="w-4 h-4 rounded bg-[#141828] border-white/10"
                  />
                  <span>Avoid common words</span>
                </label>
              </div>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-2xl shadow-purple-900/50 hover:scale-[1.01] transition-all"
              >
                <Wand2 className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate Names'}</span>
              </button>
            </div>
          </form>

          {/* Dynamic Name DNA Widget */}
          <NameDNA dna={nameDNA} />
        </div>

        {/* RIGHT COLUMN: Live Preview / Generation Workspace (cols 6-12) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls Bar: Filter & Sort */}
          {candidates.length > 0 && !isGenerating && (
            <div className="p-4 rounded-2xl bg-[#0C0F1B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter generated names by sound, root, style..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#141828] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="score">Highest Score</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                  <option value="length">Length (Shortest First)</option>
                </select>
              </div>
            </div>
          )}

          {/* Main Display: Generating Loader OR Results Grid OR Empty State */}
          {isGenerating ? (
            <div className="p-8 rounded-2xl bg-[#0C0F1B] border border-white/10 min-h-[460px] flex items-center justify-center">
              <GenerationLoader phase={generationPhase} />
            </div>
          ) : filteredCandidates.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
                  Generated Recommendations
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                    {filteredCandidates.length} names
                  </span>
                </h3>
                <span className="text-[11px] text-slate-500">Click any card for full linguistic analysis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCandidates.map((candidate) => (
                  <NameCard
                    key={candidate.id}
                    candidate={candidate}
                    onOpenDetails={(cand) => setDetailsCandidate(cand)}
                    onOpenRemix={(cand) => setRemixCandidate(cand)}
                    onOpenBrandPreview={(cand) => setBrandPreviewCandidate(cand)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 rounded-2xl bg-[#0C0F1B] border border-white/10 text-center space-y-4 min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Wand2 className="w-8 h-8" />
              </div>
              <div className="max-w-sm space-y-1.5">
                <h3 className="text-base font-bold text-white">No Names Generated Yet</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your idea and choose a style in the left column, then click "Generate Names" to start the AI synthesis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => generateNames()}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                Generate Demo Sample
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Scale, 
  Plus, 
  Trash2, 
  Heart, 
  Sparkles, 
  Share2, 
  Wand2, 
  Layers, 
  Check, 
  HelpCircle, 
  ArrowRight 
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useNaming } from '../context/NamingContext';
import { ScoreRing } from '../components/ui/ScoreRing';
import { MetricBar } from '../components/ui/MetricBar';
import { PronunciationPlayer } from '../components/results/PronunciationPlayer';
import { CollisionRadar } from '../components/results/CollisionRadar';

export function NameLabPage() {
  const { comparisonList, removeFromComparison, clearComparison, toggleFavorite, isFavorite } = useFavorites();
  const { candidates, setDetailsCandidate, setBrandPreviewCandidate, setRemixCandidate, setIsExportOpen } = useNaming();

  const metricsKeys = [
    { key: 'overall', label: 'Overall AI Score' },
    { key: 'memorability', label: 'Memorability (Recall)' },
    { key: 'brandability', label: 'Brandability (Typographic)' },
    { key: 'pronunciation', label: 'Pronunciation (Fluency)' },
    { key: 'distinctiveness', label: 'Distinctiveness (Whitespace)' },
    { key: 'emotionalFit', label: 'Emotional Resonance' },
  ];

  if (comparisonList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-glow-cyan">
          <Scale className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Name Lab Comparison Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Compare up to 4 shortlisted names side-by-side across phonetics, memorability, trademark similarity, and standout qualities.
          </p>
        </div>

        <div className="pt-2">
          <NavLink
            to="/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            <span>Generate & Select Names</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Name Lab — Head-to-Head Analysis
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluating {comparisonList.length} of 4 candidates. NOVA delivers unbiased comparative insights so you make the final creative call.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearComparison}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export Comparison</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(4, Math.max(2, comparisonList.length))} gap-6 items-start`}>
        {comparisonList.map((cand) => {
          const isFav = isFavorite(cand.id) || isFavorite(cand.name);

          return (
            <div
              key={cand.id}
              className="p-6 rounded-2xl bg-[#0C0F1D] border border-white/10 space-y-6 relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                    {cand.name}
                  </h3>
                  <div className="mt-1">
                    <PronunciationPlayer
                      word={cand.name}
                      pronunciation={cand.pronunciation}
                      ipa={cand.ipa}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(cand)}
                    aria-label="Toggle favorite"
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isFav
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromComparison(cand.id)}
                    aria-label="Remove from comparison"
                    title="Remove from comparison"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Overall Score */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#131728] border border-white/5">
                <span className="text-xs font-semibold text-slate-300">Composite Score</span>
                <ScoreRing score={cand.score} size={48} strokeWidth={4} />
              </div>

              {/* Standout Quality Box */}
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Why This Name Stands Out
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cand.meaning || cand.explanation}
                </p>
              </div>

              {/* Metrics Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Performance Dimensions
                </h4>

                <div className="space-y-2.5">
                  <MetricBar label="Memorability" value={cand.metrics?.memorability || 92} accent="cyan" />
                  <MetricBar label="Brandability" value={cand.metrics?.brandability || 90} accent="purple" />
                  <MetricBar label="Pronunciation" value={cand.metrics?.pronunciation || 95} accent="emerald" />
                  <MetricBar label="Distinctiveness" value={cand.metrics?.distinctiveness || 88} accent="indigo" />
                  <MetricBar label="Emotional Fit" value={cand.metrics?.emotionalFit || 92} accent="purple" />
                </div>
              </div>

              {/* Key Attributes Table */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Length</span>
                  <span className="font-mono text-slate-200">{cand.name.length} letters</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Style Posture</span>
                  <span className="text-purple-300 font-medium">{cand.style || 'Modern'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Collision Advisory</span>
                  <CollisionRadar level={cand.collisionLevel} notes={cand.collisionNotes} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDetailsCandidate(cand)}
                  className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => setBrandPreviewCandidate(cand)}
                  className="py-2 px-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-xs font-semibold text-cyan-200 transition-colors text-center"
                >
                  Brand Mockup
                </button>
              </div>
            </div>
          );
        })}

        {/* Add more slot if < 4 */}
        {comparisonList.length < 4 && (
          <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-2xl min-h-[380px] flex flex-col items-center justify-center text-center space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">Compare Another Name</h4>
            <p className="text-xs text-slate-500 max-w-[200px]">
              Select "Compare" on any candidate card in the Generator or Favorites.
            </p>
            <NavLink
              to="/generate"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Browse Generated Names →
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

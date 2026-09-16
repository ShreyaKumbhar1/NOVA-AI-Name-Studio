import React from 'react';
import { 
  Heart, 
  Copy, 
  Check, 
  Wand2, 
  Palette, 
  Scale, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Compass, 
  Layers 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ScoreRing } from '../ui/ScoreRing';
import { MetricBar } from '../ui/MetricBar';
import { CollisionRadar } from './CollisionRadar';
import { PronunciationPlayer } from './PronunciationPlayer';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export function DetailsModal({
  candidate,
  isOpen,
  onClose,
  onOpenRemix,
  onOpenBrandPreview,
}) {
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, removeFromComparison } = useFavorites();
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!candidate) return null;

  const favorited = isFavorite(candidate.id) || isFavorite(candidate.name);
  const compared = isInComparison(candidate.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(candidate.name);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Copied',
      message: `"${candidate.name}" copied to clipboard.`
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleCompare = () => {
    if (compared) {
      removeFromComparison(candidate.id);
      addToast({
        type: 'info',
        title: 'Removed',
        message: `Removed "${candidate.name}" from Name Lab.`
      });
    } else {
      addToComparison(candidate);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {candidate.name}
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-200">
                {candidate.style || 'Modern'}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <PronunciationPlayer
                word={candidate.name}
                pronunciation={candidate.pronunciation}
                ipa={candidate.ipa}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0A0D17]/80 p-3 rounded-2xl border border-white/10">
            <ScoreRing score={candidate.score} size={68} strokeWidth={5} />
            <div className="text-left">
              <span className="text-xs font-semibold text-white">AI Overall Score</span>
              <p className="text-[11px] text-slate-400">Holistic brand viability</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <p className="text-xs text-purple-200/90 leading-relaxed">
            <strong>Advisory Guidance:</strong> Scores and Collision Radar are AI-generated creative metrics for branding evaluation, not legal, registered trademark, or commercial availability clearance.
          </p>
        </div>

        {/* Two-column layout: Left = Metrics & Radar; Right = Why it works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Metric Breakdown */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Linguistic & Brand Metrics
            </h4>

            <div className="space-y-3.5 bg-[#0B0E1A] p-4 rounded-xl border border-white/5">
              <MetricBar
                label="Memorability"
                value={candidate.metrics?.memorability || 94}
                description="Recall stickiness & phonological balance"
                accent="cyan"
              />
              <MetricBar
                label="Brandability"
                value={candidate.metrics?.brandability || 92}
                description="Typographic symmetry & domain readiness"
                accent="purple"
              />
              <MetricBar
                label="Pronunciation"
                value={candidate.metrics?.pronunciation || 96}
                description="Phonetic ease across international accents"
                accent="emerald"
              />
              <MetricBar
                label="Distinctiveness"
                value={candidate.metrics?.distinctiveness || 90}
                description="Lexical whitespace & dictionary differentiation"
                accent="indigo"
              />
              <MetricBar
                label="Emotional Fit"
                value={candidate.metrics?.emotionalFit || 93}
                description="Alignment with target tone and user sentiment"
                accent="purple"
              />
            </div>

            {/* Collision Radar full advisory */}
            <CollisionRadar
              level={candidate.collisionLevel || 'Low'}
              notes={candidate.collisionNotes}
              showFullCard={true}
            />
          </div>

          {/* Right Column: Why NOVA thinks this works */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Why NOVA Thinks This Works
            </h4>

            <div className="space-y-3.5 bg-[#0B0E1A] p-4 rounded-xl border border-white/5 text-xs divide-y divide-white/5">
              <div className="pb-3">
                <span className="font-semibold text-purple-300 block mb-1">Meaning & Origin</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.meaning || candidate.explanation}
                </p>
              </div>

              <div className="py-3">
                <span className="font-semibold text-cyan-300 block mb-1">Sound & Phonetics</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.sound || 'Pleasant acoustic flow with alternating consonants and open vowels.'}
                </p>
              </div>

              <div className="py-3">
                <span className="font-semibold text-emerald-300 block mb-1">Structure</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.structure || `${candidate.name.length} letters, compact syllable footprint.`}
                </p>
              </div>

              <div className="py-3">
                <span className="font-semibold text-amber-300 block mb-1">Emotion & Resonance</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.emotion || 'Inspiring, elevated, and quietly authoritative.'}
                </p>
              </div>

              <div className="py-3">
                <span className="font-semibold text-indigo-300 block mb-1">Audience Fit</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.audience || 'Forward-thinking digital natives, builders, and professionals.'}
                </p>
              </div>

              <div className="pt-3">
                <span className="font-semibold text-rose-300 block mb-1">Brand Potential</span>
                <p className="text-slate-300 leading-relaxed font-normal">
                  {candidate.brandPotential || 'High scalability across physical goods, apps, and digital wordmarks.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(candidate)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                favorited
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorited ? 'Favorited' : 'Favorite'}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <button
              type="button"
              onClick={handleToggleCompare}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                compared
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Scale className="w-4 h-4" />
              {compared ? 'In Lab' : 'Add to Lab'}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRemix?.(candidate);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition-all hover:scale-[1.02]"
            >
              <Wand2 className="w-4 h-4" />
              Remix Name
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBrandPreview?.(candidate);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-900/40 transition-all hover:scale-[1.02]"
            >
              <Palette className="w-4 h-4" />
              Brand Preview
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

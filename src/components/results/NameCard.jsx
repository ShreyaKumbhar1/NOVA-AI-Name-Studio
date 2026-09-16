import React, { useState } from 'react';
import { 
  Heart, 
  Copy, 
  Check, 
  Sparkles, 
  Wand2, 
  Eye, 
  Layers, 
  Scale, 
  Palette 
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ScoreRing } from '../ui/ScoreRing';
import { CollisionRadar } from './CollisionRadar';
import { PronunciationPlayer } from './PronunciationPlayer';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export function NameCard({
  candidate,
  onOpenDetails,
  onOpenRemix,
  onOpenBrandPreview,
  className = '',
}) {
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, removeFromComparison } = useFavorites();
  const { addToast } = useToast();

  const [copied, setCopied] = useState(false);

  const favorited = isFavorite(candidate.id) || isFavorite(candidate.name);
  const compared = isInComparison(candidate.id);

  const handleCopy = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(candidate.name);
      setCopied(true);
      addToast({
        type: 'success',
        title: 'Copied to Clipboard',
        message: `"${candidate.name}" copied.`
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Could not access clipboard.'
      });
    }
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(candidate);
  };

  const handleToggleCompare = (e) => {
    e.stopPropagation();
    if (compared) {
      removeFromComparison(candidate.id);
      addToast({
        type: 'info',
        title: 'Removed from Lab',
        message: `"${candidate.name}" removed from comparison.`
      });
    } else {
      addToComparison(candidate);
    }
  };

  return (
    <GlassCard
      className={`p-5 flex flex-col justify-between group relative overflow-hidden ${className}`}
      glowColor="purple"
      onClick={() => onOpenDetails?.(candidate)}
    >
      {/* Top row: Name, Pronunciation, Score */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {candidate.name}
            </h3>

            <PronunciationPlayer
              word={candidate.name}
              pronunciation={candidate.pronunciation}
              ipa={candidate.ipa}
            />
          </div>

          <ScoreRing score={candidate.score} size={54} strokeWidth={4} />
        </div>

        {/* Explanation */}
        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed font-normal">
          {candidate.explanation || candidate.meaning}
        </p>

        {/* Meta badges: Style, Collision, Syllables */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-3 border-t border-white/5">
          <CollisionRadar level={candidate.collisionLevel} notes={candidate.collisionNotes} />

          {candidate.style && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300">
              {candidate.style}
            </span>
          )}

          {candidate.metrics?.memorability && (
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
              Memo: {candidate.metrics.memorability}
            </span>
          )}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-1">
        {/* Left quick actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleToggleFav}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            title={favorited ? 'In Favorites' : 'Add to Favorites'}
            className={`p-1.5 rounded-lg border transition-all ${
              favorited
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy name to clipboard"
            title="Copy Name"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleToggleCompare}
            aria-label={compared ? 'Remove from Name Lab' : 'Add to Name Lab comparison'}
            title={compared ? 'In Comparison' : 'Compare in Name Lab'}
            className={`p-1.5 rounded-lg border transition-all ${
              compared
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Right CTA actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenRemix?.(candidate);
            }}
            title="Remix this name"
            className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-[11px] font-semibold text-purple-200 flex items-center gap-1 transition-colors"
          >
            <Wand2 className="w-3 h-3" />
            Remix
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenBrandPreview?.(candidate);
            }}
            title="Preview brand mockup"
            className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-[11px] font-semibold text-cyan-200 flex items-center gap-1 transition-colors"
          >
            <Palette className="w-3 h-3" />
            Brand
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

import React from 'react';
import { Dna, Sparkles, Target, Compass, Gauge } from 'lucide-react';

export function NameDNA({ dna, className = '' }) {
  if (!dna) return null;

  return (
    <div className={`p-4 rounded-xl bg-[#131726]/80 border border-purple-500/20 shadow-lg shadow-purple-950/20 backdrop-blur-md relative overflow-hidden ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Dna className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">Name DNA</h4>
            <p className="text-[10px] text-slate-400">Dynamic AI Creative Fingerprint</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Live Adaptive
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 relative z-10">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Tone</span>
          <p className="text-xs font-medium text-white truncate">{dna.tone || 'Progressive'}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Emotion</span>
          <p className="text-xs font-medium text-cyan-300 truncate">{dna.emotion || 'Clarity'}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Style</span>
          <p className="text-xs font-medium text-purple-300 truncate">{dna.style || 'Modern'}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Length</span>
          <p className="text-xs font-medium text-white truncate">{dna.length || 'Short'}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Complexity</span>
          <p className="text-xs font-medium text-amber-300 truncate">{dna.complexity || 'Balanced'}</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Industry</span>
          <p className="text-xs font-medium text-slate-200 truncate">{dna.industry || 'Technology'}</p>
        </div>
      </div>

      {dna.audience && (
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-start gap-1.5 relative z-10">
          <Target className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-300 leading-snug">
            <span className="text-slate-400 font-medium">Target Fit:</span> {dna.audience}
          </p>
        </div>
      )}
    </div>
  );
}

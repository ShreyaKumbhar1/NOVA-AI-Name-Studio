import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

export function CollisionRadar({ level = 'Low', notes = '', showFullCard = false }) {
  const isLow = level === 'Low';
  const isMod = level === 'Moderate';
  const isHigh = level === 'High';

  const badgeConfig = {
    Low: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      icon: ShieldCheck,
      label: 'Low Similarity',
      desc: 'High lexical whitespace; clean distinct phonetic profile.'
    },
    Moderate: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-300',
      icon: AlertTriangle,
      label: 'Moderate Similarity',
      desc: 'Shares phonetic affixes with existing brands; review recommended.'
    },
    High: {
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      text: 'text-rose-300',
      icon: AlertOctagon,
      label: 'Elevated Similarity',
      desc: 'Common word overlap or high lexical density detected.'
    }
  }[level] || {
    border: 'border-slate-500/30',
    bg: 'bg-slate-500/10',
    text: 'text-slate-300',
    icon: Info,
    label: 'Advisory Check',
    desc: 'Algorithmic phonetic similarity analysis.'
  };

  const Icon = badgeConfig.icon;

  if (!showFullCard) {
    return (
      <div 
        title={`${badgeConfig.label}: ${notes || badgeConfig.desc}`}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${badgeConfig.bg} ${badgeConfig.border} ${badgeConfig.text}`}
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span>{badgeConfig.label}</span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border ${badgeConfig.border} ${badgeConfig.bg} space-y-2.5`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${badgeConfig.text}`} />
          <h5 className={`text-xs font-bold uppercase tracking-wider ${badgeConfig.text}`}>
            Collision Radar — {badgeConfig.label}
          </h5>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Advisory Signal</span>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed">
        {notes || badgeConfig.desc}
      </p>

      <div className="pt-2 border-t border-white/5 flex items-start gap-1.5 text-[10px] text-slate-400 leading-tight">
        <Info className="w-3 h-3 shrink-0 mt-0.5 text-slate-500" />
        <span>
          <strong>Important:</strong> Collision Radar is an algorithmic similarity signal, not legal or trademark clearance.
        </span>
      </div>
    </div>
  );
}

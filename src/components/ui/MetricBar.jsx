import React from 'react';

export function MetricBar({
  label,
  value = 90,
  max = 100,
  description,
  accent = 'purple', // 'purple' | 'cyan' | 'indigo' | 'emerald'
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const barGradients = {
    purple: 'from-purple-500 to-indigo-500',
    cyan: 'from-cyan-400 to-teal-400',
    indigo: 'from-indigo-500 to-purple-600',
    emerald: 'from-emerald-400 to-cyan-500',
  }[accent] || 'from-purple-500 to-indigo-500';

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-300">{label}</span>
        <span className="font-mono font-semibold text-slate-200">{value}</span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className={`h-full rounded-full bg-gradient-to-r ${barGradients} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {description && (
        <p className="text-[10px] text-slate-400 leading-tight">{description}</p>
      )}
    </div>
  );
}

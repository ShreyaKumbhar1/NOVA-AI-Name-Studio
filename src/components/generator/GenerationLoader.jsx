import React from 'react';
import { Sparkles, Brain, Cpu, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

export function GenerationLoader({ phase }) {
  const { stepIndex = 0, message = 'Generating...', progress = 0 } = phase || {};

  const stepIcons = [Brain, Sparkles, Cpu, Search, ShieldCheck, CheckCircle2, Sparkles];
  const CurrentIcon = stepIcons[stepIndex % stepIcons.length] || Sparkles;

  return (
    <div className="py-16 px-6 flex flex-col items-center justify-center text-center relative max-w-lg mx-auto">
      {/* 3D Orb Centerpiece */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        {/* Ambient Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-cyan-500/30 blur-2xl animate-pulse-slow" />

        {/* Orbit Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-purple-500/30 border-dashed animate-spin-slow" />
        {/* Orbit Ring 2 */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

        {/* Central Core Orb */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple flex items-center justify-center shadow-2xl">
          <div className="w-full h-full rounded-full bg-[#0E121E] flex items-center justify-center">
            <CurrentIcon className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
        NOVA Intelligence Synthesis
      </h3>

      {/* Current Phase Message */}
      <div className="min-h-[32px] flex items-center justify-center mt-2 mb-6">
        <p className="text-sm font-medium text-cyan-300 transition-all duration-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          {message}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm space-y-2">
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 px-1">
          <span>Phase {stepIndex + 1} of 7</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export function ScoreRing({
  score = 90,
  size = 64,
  strokeWidth = 5,
  showLabel = true,
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  const isHigh = score >= 90;
  const isMed = score >= 80 && score < 90;

  const strokeGradientId = `score-grad-${score}-${Math.random().toString(36).substr(2, 4)}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={strokeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {isHigh ? (
              <>
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </>
            ) : isMed ? (
              <>
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6366F1" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F43F5E" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${strokeGradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>

      {/* Center score label */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display font-bold text-white tracking-tight leading-none" style={{ fontSize: size * 0.32 }}>
            {score}
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 mt-0.5">
            Score
          </span>
        </div>
      )}
    </div>
  );
}

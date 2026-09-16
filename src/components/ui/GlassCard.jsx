import React from 'react';
import { useTiltEffect } from '../../hooks/useTiltEffect';

export function GlassCard({
  children,
  className = '',
  elevated = false,
  interactive = true,
  glowColor = 'purple', // 'purple' | 'cyan' | 'indigo' | 'none'
  onClick,
  ...props
}) {
  const { cardRef, tiltStyle, tiltProps } = useTiltEffect(interactive ? 6 : 0);

  const glowClass = {
    purple: 'hover:shadow-glow-purple',
    cyan: 'hover:shadow-glow-cyan',
    indigo: 'hover:shadow-glow-indigo',
    none: '',
  }[glowColor] || '';

  return (
    <div
      ref={cardRef}
      style={interactive ? tiltStyle : undefined}
      {...(interactive ? tiltProps : {})}
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-300
        ${elevated ? 'glass-panel-elevated' : 'glass-panel'}
        ${interactive ? `glass-card-interactive cursor-pointer ${glowClass}` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

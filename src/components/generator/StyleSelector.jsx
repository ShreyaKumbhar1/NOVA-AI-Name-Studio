import React from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Crown, 
  Smile, 
  CircleDot, 
  Zap, 
  Rocket, 
  Leaf, 
  Cpu, 
  Wand2 
} from 'lucide-react';

const STYLES = [
  { id: 'Professional', label: 'Professional', icon: Briefcase, desc: 'Institutional & trustworthy' },
  { id: 'Modern', label: 'Modern', icon: Sparkles, desc: 'Clean SaaS & contemporary' },
  { id: 'Luxury', label: 'Luxury', icon: Crown, desc: 'Prestigious & refined' },
  { id: 'Playful', label: 'Playful', icon: Smile, desc: 'Vibrant & approachable' },
  { id: 'Minimal', label: 'Minimal', icon: CircleDot, desc: 'Pure & understated' },
  { id: 'Bold', label: 'Bold', icon: Zap, desc: 'Commanding & disruptive' },
  { id: 'Futuristic', label: 'Futuristic', icon: Rocket, desc: 'Visionary & next-gen' },
  { id: 'Organic', label: 'Organic', icon: Leaf, desc: 'Earthy & authentic' },
  { id: 'Technical', label: 'Technical', icon: Cpu, desc: 'Precision & system architecture' },
  { id: 'Quirky', label: 'Quirky', icon: Wand2, desc: 'Unconventional & memorable' },
];

export function StyleSelector({ selectedStyle, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {STYLES.map((st) => {
        const isSelected = selectedStyle.toLowerCase() === st.id.toLowerCase();
        const Icon = st.icon;

        return (
          <button
            key={st.id}
            type="button"
            onClick={() => onSelect(st.id)}
            className={`
              flex flex-col items-center text-center p-2.5 rounded-xl border transition-all duration-200 text-left relative overflow-hidden group
              ${
                isSelected
                  ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                  : 'bg-[#0E111C]/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15 hover:bg-[#131726]/60'
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400" />
            )}

            <div className={`p-1.5 rounded-lg mb-1.5 transition-colors ${
              isSelected ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-slate-400 group-hover:text-purple-300'
            }`}>
              <Icon className="w-4 h-4" />
            </div>

            <span className="text-xs font-semibold tracking-tight">{st.label}</span>
            <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 opacity-80">{st.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

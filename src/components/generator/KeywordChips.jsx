import React, { useState } from 'react';
import { X, Plus, Hash } from 'lucide-react';

export function KeywordChips({ keywords = [], onAdd, onRemove, maxKeywords = 8 }) {
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCurrent();
    }
  };

  const addCurrent = () => {
    const trimmed = inputVal.trim().replace(/^#/, '');
    if (trimmed && !keywords.includes(trimmed.toLowerCase())) {
      onAdd(trimmed);
      setInputVal('');
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl bg-[#0B0E18] border border-white/10 focus-within:border-purple-500/50 transition-colors">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-medium text-purple-200 animate-in fade-in zoom-in-90"
          >
            <Hash className="w-3 h-3 text-purple-400 opacity-60" />
            {kw}
            <button
              type="button"
              onClick={() => onRemove(kw)}
              className="text-purple-300 hover:text-white ml-0.5 hover:bg-purple-500/30 rounded p-0.5"
              aria-label={`Remove keyword ${kw}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {keywords.length < maxKeywords && (
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addCurrent}
            placeholder={keywords.length === 0 ? "Add keywords (e.g. speed, intelligence)..." : "Add more..."}
            className="flex-1 min-w-[130px] bg-transparent border-none text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 py-1"
          />
        )}
      </div>

      <p className="text-[11px] text-slate-400 flex items-center justify-between px-1">
        <span>Press Enter or comma to add keyword</span>
        <span>{keywords.length}/{maxKeywords}</span>
      </p>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Heart, 
  RotateCcw, 
  SlidersHorizontal 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { novaApi } from '../../services/apiClient';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

const REMIX_DIRECTIONS = [
  'Shorter',
  'More premium',
  'More futuristic',
  'More playful',
  'More human',
  'More technical',
  'More luxurious',
  'More mysterious',
  'More global',
  'More memorable',
];

export function RemixPanel({ candidate, isOpen, onClose }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();

  const [selectedDirection, setSelectedDirection] = useState('Shorter');
  const [customInstruction, setCustomInstruction] = useState('');
  const [remixes, setRemixes] = useState([]);
  const [isRemixing, setIsRemixing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Generate initial remixes when modal opens or candidate changes
  React.useEffect(() => {
    if (isOpen && candidate) {
      handleTriggerRemix(selectedDirection, customInstruction);
    }
  }, [isOpen, candidate]);

  const handleTriggerRemix = async (direction = selectedDirection, instruction = customInstruction) => {
    if (!candidate) return;
    setIsRemixing(true);

    try {
      const res = await novaApi.remixName(candidate, direction, instruction);
      if (res.success && res.remixes) {
        setRemixes(res.remixes);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Remix Failed',
        message: err.message || 'Could not generate remixes.'
      });
    } finally {
      setIsRemixing(false);
    }
  };

  const handleCopy = (remix) => {
    navigator.clipboard.writeText(remix.name);
    setCopiedId(remix.id);
    addToast({
      type: 'success',
      title: 'Copied',
      message: `"${remix.name}" copied to clipboard.`
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!candidate) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Remix "${candidate.name}"`}
      subtitle="Transform phonetics, morphemes, and brand posture into targeted variations."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Preset Direction Pills */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Select Transformation Vector
          </label>
          <div className="flex flex-wrap gap-1.5">
            {REMIX_DIRECTIONS.map((dir) => {
              const isSelected = selectedDirection === dir;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => {
                    setSelectedDirection(dir);
                    handleTriggerRemix(dir, customInstruction);
                  }}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                    ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-950/50'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {dir}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Instruction Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            Custom Instruction (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTriggerRemix(selectedDirection, customInstruction)}
              placeholder="e.g. Combine with Latin root for water, or keep ending with 'X'..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#090C16] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/60"
            />
            <button
              type="button"
              disabled={isRemixing}
              onClick={() => handleTriggerRemix(selectedDirection, customInstruction)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-950/40 transition-colors"
            >
              {isRemixing ? (
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Wand2 className="w-3.5 h-3.5" />
              )}
              Apply
            </button>
          </div>
        </div>

        {/* Remix Results Grid */}
        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Generated Remix Variations
            </h4>
            <span className="text-[11px] font-mono text-purple-300">
              {remixes.length} options ready
            </span>
          </div>

          {isRemixing ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Synthesizing linguistic variations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {remixes.map((remix) => {
                const isFav = isFavorite(remix.id) || isFavorite(remix.name);
                const isCopied = copiedId === remix.id;

                return (
                  <div
                    key={remix.id}
                    className="p-3.5 rounded-xl bg-[#090D18] border border-white/5 hover:border-purple-500/30 transition-all flex items-center justify-between gap-2 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors truncate">
                          {remix.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                          {remix.score}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {remix.explanation}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(remix)}
                        aria-label="Favorite remix"
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(remix)}
                        aria-label="Copy remix name"
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

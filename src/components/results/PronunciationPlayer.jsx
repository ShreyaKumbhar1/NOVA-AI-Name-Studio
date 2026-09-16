import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

export function PronunciationPlayer({ word, pronunciation, ipa, className = '' }) {
  const { isSupported, speakingName, speak, stop } = useSpeechSynthesis();
  const isSpeaking = speakingName === word;

  const handleToggleSpeak = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stop();
    } else {
      speak(word, word);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 text-xs ${className}`}>
      <span className="font-mono text-slate-300 font-medium">
        {pronunciation || word}
      </span>

      {ipa && (
        <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
          {ipa}
        </span>
      )}

      {isSupported && (
        <button
          type="button"
          onClick={handleToggleSpeak}
          aria-label={isSpeaking ? `Stop pronunciation for ${word}` : `Listen to pronunciation for ${word}`}
          title={isSpeaking ? 'Stop audio' : 'Listen to pronunciation'}
          className={`
            p-1 rounded-md transition-colors flex items-center justify-center
            ${
              isSpeaking
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }
          `}
        >
          {isSpeaking ? (
            <div className="flex items-center gap-0.5 px-0.5">
              <span className="w-0.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
}

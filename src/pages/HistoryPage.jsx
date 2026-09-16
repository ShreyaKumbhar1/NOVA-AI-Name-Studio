import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  Layers, 
  Heart, 
  Wand2, 
  Clock 
} from 'lucide-react';
import { useNaming } from '../context/NamingContext';

export function HistoryPage() {
  const navigate = useNavigate();
  const { historySessions, restoreSession, clearHistory } = useNaming();

  const handleSelectSession = (session) => {
    restoreSession(session);
    navigate('/generate');
  };

  if (historySessions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-glow-purple">
          <History className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            No Generation History Yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Every naming run you generate is automatically preserved in your private local workspace history so you can easily review and reopen previous sessions.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/generate')}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 transition-colors"
          >
            Start Naming in Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <History className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Session History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {historySessions.length} recorded naming explorations. Click any session to restore its configuration and generated candidates.
          </p>
        </div>

        <button
          type="button"
          onClick={clearHistory}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Session Cards List */}
      <div className="space-y-4">
        {historySessions.map((session, idx) => {
          const formattedDate = new Date(session.createdAt || Date.now()).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const candidatesCount = session.candidates ? session.candidates.length : 0;
          const previewNames = (session.candidates || []).slice(0, 4).map(c => c.name);

          return (
            <div
              key={session.id || idx}
              onClick={() => handleSelectSession(session)}
              className="p-6 rounded-2xl bg-[#0C0F1D] border border-white/5 hover:border-purple-500/40 hover:bg-[#111629] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                {/* Meta Row: Type, Date, Style */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-semibold text-purple-200">
                    {session.type || 'Startup'}
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {formattedDate}
                  </span>

                  {session.settings?.style && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-slate-400">
                      Style: {session.settings.style}
                    </span>
                  )}
                </div>

                {/* Original Idea */}
                <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  "{session.idea}"
                </h3>

                {/* Candidate Name Previews */}
                {previewNames.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-500">Sample names:</span>
                    {previewNames.map((name) => (
                      <span
                        key={name}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-xs font-mono font-medium"
                      >
                        {name}
                      </span>
                    ))}
                    {candidatesCount > 4 && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        +{candidatesCount - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Summary & Action */}
              <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <div className="text-right hidden sm:block space-y-1">
                  <span className="block text-xs font-semibold text-slate-300">
                    {candidatesCount} candidates
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-500" />
                    {session.favoriteCount || 0} saved
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-purple-600 text-slate-400 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

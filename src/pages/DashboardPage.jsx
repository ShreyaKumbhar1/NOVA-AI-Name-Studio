import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Wand2, 
  Scale, 
  Zap, 
  Heart, 
  History, 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  BarChart2 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { useNaming } from '../context/NamingContext';
import { useFavorites } from '../context/FavoritesContext';
import { GlassCard } from '../components/ui/GlassCard';

export function DashboardPage() {
  const navigate = useNavigate();
  const { historySessions, surpriseMe, restoreSession } = useNaming();
  const { favorites, comparisonList } = useFavorites();

  // Aggregate stats
  const totalNamesGenerated = historySessions.reduce(
    (acc, s) => acc + (s.candidates ? s.candidates.length : 0),
    0
  );

  const stats = [
    { label: 'Names Generated', value: totalNamesGenerated || 12, icon: Wand2, color: 'text-purple-400' },
    { label: 'Favorites Saved', value: favorites.length, icon: Heart, color: 'text-rose-400' },
    { label: 'Naming Sessions', value: historySessions.length, icon: History, color: 'text-cyan-400' },
    { label: 'In Name Lab', value: comparisonList.length, icon: Scale, color: 'text-emerald-400' },
  ];

  // Distribution of styles for Recharts "Creative Pulse"
  const styleCounts = {};
  historySessions.forEach((s) => {
    (s.candidates || []).forEach((c) => {
      const st = c.style || 'Modern';
      styleCounts[st] = (styleCounts[st] || 0) + 1;
    });
  });

  const chartData = Object.keys(styleCounts).length > 0
    ? Object.entries(styleCounts).map(([name, count]) => ({ name, count }))
    : [
        { name: 'Modern', count: 6 },
        { name: 'Futuristic', count: 4 },
        { name: 'Luxury', count: 3 },
        { name: 'Minimal', count: 4 },
        { name: 'Technical', count: 3 },
      ];

  const colors = ['#8B5CF6', '#6366F1', '#06B6D4', '#10B981', '#F43F5E', '#F59E0B'];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome Hero Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#12162A] via-[#101424] to-[#0A0D18] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Subtle glowing ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Welcome back to NOVA Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
            Ready to name something unforgettable?
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Launch a targeted AI generation run, explore unexpected leaps with Surprise Me, or compare shortlist candidates in the Name Lab.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            type="button"
            onClick={() => navigate('/generate')}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/40 hover:scale-105 transition-all"
          >
            <Wand2 className="w-4 h-4" />
            <span>Generate Names</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/lab')}
            className="px-5 py-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-200 font-semibold text-xs flex items-center gap-2 transition-all hover:scale-105"
          >
            <Scale className="w-4 h-4" />
            <span>Open Name Lab</span>
          </button>

          <button
            type="button"
            onClick={() => {
              surpriseMe();
              navigate('/generate');
            }}
            className="px-5 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-200 font-semibold text-xs flex items-center gap-2 transition-all hover:scale-105"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Surprise Me</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <GlassCard key={st.label} className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${st.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-white">
                  {st.value}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">{st.label}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Two-Column Section: Creative Pulse Chart + Recent Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creative Pulse Distribution (Recharts) (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0C0F1D] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-display text-white">
                Creative Pulse — Style Distribution
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Live Telemetry</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Visualizing the linguistic stylistic breakdown across your generated candidate pool.
          </p>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  allowDecimals={false} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E121E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Naming Sessions (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0C0F1D] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <History className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-display text-white">
                Recent Naming Sessions
              </h3>
            </div>
            <NavLink to="/history" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
              View All History →
            </NavLink>
          </div>

          <div className="space-y-3">
            {historySessions.slice(0, 4).map((session, idx) => (
              <div
                key={session.id || idx}
                onClick={() => {
                  restoreSession(session);
                  navigate('/generate');
                }}
                className="p-4 rounded-xl bg-[#131728] hover:bg-[#181E33] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-semibold">
                      {session.type || 'Startup'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(session.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate mt-1">
                    "{session.idea}"
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-slate-400">
                    {session.candidates?.length || 0} names
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-purple-600 text-slate-400 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

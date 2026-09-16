import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Heart, 
  Trash2, 
  Share2, 
  Wand2, 
  Search, 
  Sparkles, 
  ArrowRight, 
  ArrowUpDown 
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useNaming } from '../context/NamingContext';
import { NameCard } from '../components/results/NameCard';

export function FavoritesPage() {
  const { favorites, clearAllFavorites } = useFavorites();
  const { 
    setDetailsCandidate, 
    setRemixCandidate, 
    setBrandPreviewCandidate, 
    setIsExportOpen 
  } = useNaming();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStyle, setFilterStyle] = useState('All');

  const stylesList = ['All', ...Array.from(new Set(favorites.map(f => f.style).filter(Boolean)))];

  const filteredFavorites = favorites.filter((f) => {
    const matchesSearch = !searchQuery || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (f.meaning && f.meaning.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStyle = filterStyle === 'All' || f.style === filterStyle;
    return matchesSearch && matchesStyle;
  });

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-glow-purple">
          <Heart className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            No Saved Favorites Yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Click the heart icon on any generated name card to save it to your curated shortlist for export, comparison, and brand preview.
          </p>
        </div>

        <div className="pt-2">
          <NavLink
            to="/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            <span>Generate Names Now</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
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
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Curated Favorites Shortlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {favorites.length} shortlisted candidates stored locally in your private studio workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearAllFavorites}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export Shortlist</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0C0F1D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved favorites by name or concept..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {stylesList.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {stylesList.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStyle(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterStyle === st
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Favorites Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFavorites.map((fav) => (
          <NameCard
            key={fav.id}
            candidate={fav}
            onOpenDetails={(cand) => setDetailsCandidate(cand)}
            onOpenRemix={(cand) => setRemixCandidate(cand)}
            onOpenBrandPreview={(cand) => setBrandPreviewCandidate(cand)}
          />
        ))}
      </div>
    </div>
  );
}

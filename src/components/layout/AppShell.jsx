import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  Wand2, 
  Scale, 
  Heart, 
  History, 
  Palette, 
  Settings, 
  Share2, 
  Bot, 
  Menu, 
  X, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useNaming } from '../../context/NamingContext';
import { DetailsModal } from '../results/DetailsModal';
import { RemixPanel } from '../remix/RemixPanel';
import { BrandPreview } from '../brand/BrandPreview';
import { CopilotDrawer } from '../copilot/CopilotDrawer';
import { ExportDialog } from '../export/ExportDialog';

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, comparisonList } = useFavorites();
  const { 
    detailsCandidate, 
    setDetailsCandidate, 
    remixCandidate, 
    setRemixCandidate, 
    brandPreviewCandidate, 
    setBrandPreviewCandidate,
    isCopilotOpen,
    setIsCopilotOpen,
    isExportOpen,
    setIsExportOpen,
    surpriseMe,
    currentSession
  } = useNaming();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/generate', label: 'Generate', icon: Wand2 },
    { to: '/lab', label: 'Name Lab', icon: Scale, count: comparisonList.length },
    { to: '/favorites', label: 'Favorites', icon: Heart, count: favorites.length },
    { to: '/history', label: 'History', icon: History },
    { to: '/brand-preview', label: 'Brand Preview', icon: Palette },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#080A10] text-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0B0E18] border-r border-white/5 shrink-0 z-30 justify-between">
        {/* Top Logo */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-white/5">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-[#0E121E] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <div>
                <span className="text-base font-extrabold font-display tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  NOVA
                </span>
                <span className="block text-[10px] font-mono tracking-wider uppercase text-purple-400">
                  AI Name Studio
                </span>
              </div>
            </NavLink>
          </div>

          {/* Quick Action: Surprise Me button */}
          <div className="p-3">
            <button
              type="button"
              onClick={() => {
                surpriseMe();
                navigate('/generate');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 hover:border-purple-400 text-xs font-semibold text-purple-200 hover:text-white flex items-center justify-center gap-2 transition-all hover:shadow-glow-purple"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Surprise Me
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button
            type="button"
            onClick={() => setIsCopilotOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>NOVA Copilot</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>Export Shortlist</span>
          </button>

          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors
              ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
            `}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>

          {/* Mode Indicator */}
          <div className="pt-2 px-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Engine: Demo & LLM
            </span>
            <span>v1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header Bar for Mobile & Quick Actions */}
        <header className="h-16 px-4 sm:px-8 border-b border-white/5 bg-[#0A0D18]/80 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Current route title / breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-300 hidden sm:inline">NOVA Studio</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-sm font-bold text-white capitalize">
                {location.pathname.replace('/', '') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Copilot button */}
            <button
              type="button"
              onClick={() => setIsCopilotOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Copilot</span>
            </button>

            {/* Export button */}
            <button
              type="button"
              onClick={() => setIsExportOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        {/* Mobile Flyout Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#0B0E18]/95 backdrop-blur-2xl z-40 p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold
                      ${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-white/5'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {typeof item.count === 'number' && item.count > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/20 text-white">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCopilotOpen(true);
                }}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-950/30 border border-cyan-500/20"
              >
                <Bot className="w-5 h-5" />
                <span>Open NOVA Copilot</span>
              </button>

              <NavLink
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

      {/* Global Application Modals & Drawers */}
      <DetailsModal
        candidate={detailsCandidate}
        isOpen={Boolean(detailsCandidate)}
        onClose={() => setDetailsCandidate(null)}
        onOpenRemix={(cand) => setRemixCandidate(cand)}
        onOpenBrandPreview={(cand) => setBrandPreviewCandidate(cand)}
      />

      <RemixPanel
        candidate={remixCandidate}
        isOpen={Boolean(remixCandidate)}
        onClose={() => setRemixCandidate(null)}
      />

      <BrandPreview
        candidate={brandPreviewCandidate}
        isOpen={Boolean(brandPreviewCandidate)}
        onClose={() => setBrandPreviewCandidate(null)}
      />

      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        items={favorites.length > 0 ? favorites : (currentSession?.candidates || [])}
        sessionMeta={currentSession}
      />
    </div>
  );
}

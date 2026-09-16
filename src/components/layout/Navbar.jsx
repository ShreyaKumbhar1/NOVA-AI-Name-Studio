import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#080A10]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-[#0E121E] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold font-display tracking-tight text-white group-hover:text-purple-300 transition-colors">
              NOVA
            </span>
            <span className="block text-[10px] font-mono tracking-wider uppercase text-purple-400">
              AI Name Studio
            </span>
          </div>
        </NavLink>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#use-cases" className="hover:text-white transition-colors">
            Use Cases
          </a>
          <NavLink to="/lab" className="hover:text-white transition-colors">
            Name Lab
          </NavLink>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/dashboard"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-colors hidden sm:inline"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/generate"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-950/50 hover:scale-105 transition-all"
          >
            <Wand2 className="w-4 h-4" />
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

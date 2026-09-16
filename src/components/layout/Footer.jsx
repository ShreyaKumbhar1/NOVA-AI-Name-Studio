import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Shield, FileText, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';

export function Footer() {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="w-full border-t border-white/5 bg-[#070912] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] bg-[#0E121E] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="text-lg font-bold font-display text-white">NOVA</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              "Turn ideas into names people remember." An AI-powered naming intelligence studio engineered for founders, creators, and visionary product teams.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Designed with 3D depth, phonetic intelligence, and creative precision.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink to="/generate" className="hover:text-white transition-colors">
                  Name Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/lab" className="hover:text-white transition-colors">
                  Name Lab (Comparison)
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className="hover:text-white transition-colors">
                  Favorites Shortlist
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className="hover:text-white transition-colors">
                  Generation History
                </NavLink>
              </li>
              <li>
                <NavLink to="/brand-preview" className="hover:text-white transition-colors">
                  Brand Preview Studio
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How NOVA Works
                </a>
              </li>
              <li>
                <a href="#scoring" className="hover:text-white transition-colors">
                  Scoring Methodology
                </a>
              </li>
              <li>
                <a href="#collision" className="hover:text-white transition-colors">
                  Collision Radar Guidance
                </a>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-white transition-colors">
                  Studio Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy (Fictional)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service (Fictional)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('disclaimer')}
                  className="hover:text-white transition-colors text-left text-purple-400"
                >
                  Trademark Advisory Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NOVA AI Name Studio. All creative rights reserved.</p>
          <p className="text-[11px] font-mono">
            Scores are creative guidance, not legal or trademark clearance.
          </p>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      <Modal
        isOpen={Boolean(legalModal)}
        onClose={() => setLegalModal(null)}
        title={
          legalModal === 'privacy'
            ? 'Privacy Policy (Demo Notice)'
            : legalModal === 'terms'
            ? 'Terms of Service (Demo Notice)'
            : 'Advisory Trademark Disclaimer'
        }
        subtitle="NOVA AI Name Studio legal disclosures and guidelines."
      >
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[350px] overflow-y-auto pr-2">
          {legalModal === 'privacy' && (
            <>
              <p>
                <strong>Data Privacy Commitment:</strong> NOVA operates with privacy by design. All session data, candidate shortlists, and favorite collections generated in this application are preserved locally in your browser’s localStorage.
              </p>
              <p>
                No user generation prompts or proprietary brand ideas are harvested, sold, or shared with third-party advertisers. When using live AI integrations, prompts are dispatched solely for the ephemeral generation session.
              </p>
            </>
          )}

          {legalModal === 'terms' && (
            <>
              <p>
                <strong>Demo Product Usage:</strong> This software is an AI creative workstation developed to assist founders, brand designers, and naming strategists in exploring lexical possibilities.
              </p>
              <p>
                Names and explanations generated by NOVA are for inspirational and conceptual direction. Users retain full rights to pursue registration of candidate names they adopt.
              </p>
            </>
          )}

          {legalModal === 'disclaimer' && (
            <>
              <p className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200">
                <strong>CRITICAL LEGAL NOTICE:</strong> All scores, brandability metrics, and "Collision Radar" indicators are algorithmically generated creative heuristics. They DO NOT constitute formal trademark search, legal clearance, or intellectual property verification.
              </p>
              <p>
                Always consult an intellectual property attorney or conduct formal trademark register searches (USPTO, WIPO, EUIPO) prior to commercial trademark adoption.
              </p>
            </>
          )}
        </div>
      </Modal>
    </footer>
  );
}

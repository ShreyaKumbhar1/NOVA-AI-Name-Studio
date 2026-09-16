import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Lightbulb, 
  ChevronRight, 
  User, 
  Layers 
} from 'lucide-react';
import { novaApi } from '../../services/apiClient';
import { useNaming } from '../../context/NamingContext';
import { useToast } from '../../context/ToastContext';

const QUICK_PROMPTS = [
  'Make these names shorter.',
  'Give me more premium options.',
  'Remove anything that sounds too technical.',
  'Create names inspired by nature.',
  'Which names are easiest to pronounce?',
  'Give me 10 alternatives to this style.',
];

export function CopilotDrawer({ isOpen, onClose }) {
  const { currentSession, candidates, setCandidates } = useNaming();
  const { addToast } = useToast();

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'copilot',
      text: `Welcome to **NOVA Copilot**. I am attuned to your current session${currentSession?.idea ? ` ("${currentSession.idea.slice(0, 45)}...")` : ''}. Ask me to refine phonetics, suggest style pivots, or filter your generated names.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    try {
      const res = await novaApi.copilotChat(text, currentSession, candidates);
      
      const copilotMsg = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: res.reply || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, copilotMsg]);

      // If action returned filtered candidates, offer to apply
      if (res.filteredCandidates && res.filteredCandidates.length > 0) {
        addToast({
          type: 'info',
          title: 'Copilot Filter',
          message: `Found ${res.filteredCandidates.length} candidate matches for "${text}".`
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `copilot-err-${Date.now()}`,
          sender: 'copilot',
          text: 'I encountered an unexpected issue connecting with the naming model. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#0E111E] border-l border-white/10 shadow-2xl z-50 flex flex-col backdrop-blur-2xl animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121626]/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-display text-white tracking-tight flex items-center gap-1.5">
              NOVA Copilot
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Contextual Naming Intelligence</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Copilot"
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#181D30] border border-white/10 text-cyan-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-[#151929] border border-white/5 text-slate-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className={`block text-[9px] mt-1.5 opacity-60 ${isUser ? 'text-right' : ''}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#181D30] border border-white/10 text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#151929] border border-white/5 text-xs text-slate-400 rounded-tl-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#0B0D18]/90">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
          Suggested Refinements
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-white/10 bg-[#0E111E]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Copilot (e.g. 'Make names punchier')..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#161B2E] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isThinking}
            aria-label="Send message to Copilot"
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

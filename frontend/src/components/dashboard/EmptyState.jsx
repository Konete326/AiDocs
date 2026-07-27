import { Sparkles, Plus, Layers, Bot, Code, ArrowRight, Zap, Shield, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();

  const QUICK_TEMPLATES = [
    { title: 'SaaS Platform', type: 'saas', desc: 'Auth, Subscriptions, Dashboard & Multi-tenant API' },
    { title: 'E-Commerce Marketplace', type: 'ecommerce', desc: 'Cart, Stripe Checkout, Products & Vendor Portal' },
    { title: 'AI Assistant App', type: 'ai', desc: 'LLM Streaming, Vector Search & Chat UI' },
    { title: 'Mobile Application', type: 'mobile', desc: 'Cross-platform React Native / Flutter Architecture' }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-4">
      <div className="liquid-glass rounded-[32px] p-8 md:p-12 text-center w-full max-w-3xl border border-white/60 shadow-[12px_12px_24px_rgba(163,177,198,0.6),-12px_-12px_24px_rgba(255,255,255,0.7)] animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#6C63FF]/20 to-[#38B2AC]/20 flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#6C63FF]/30">
          <Sparkles className="w-10 h-10 text-[#6C63FF] animate-pulse" />
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-[#3D4852] tracking-tight">
          Welcome to ClarifyAI — Build Anything with AI
        </h2>

        <p className="text-xs md:text-sm text-[#6B7280] mt-3 max-w-xl mx-auto leading-relaxed font-medium">
          Transform your idea into complete production-ready technical architecture, PRDs, SRDs, database schemas, and live autonomous AI coding workspace in minutes.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/projects/new')}
            className="w-full sm:w-auto rounded-2xl px-8 py-4 bg-[#6C63FF] hover:bg-[#8B84FF] text-white text-xs md:text-sm font-extrabold transition-all cursor-pointer shadow-[6px_6px_12px_rgba(108,99,255,0.4)] hover:scale-105 flex items-center justify-center gap-2.5"
          >
            <Plus className="w-5 h-5 text-white" />
            <span>Create Your First Project</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/5">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-slate-200/60">
            <div className="w-8 h-8 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-[#6C63FF]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#3D4852]">10+ Tech Docs</h4>
              <p className="text-[10px] text-[#6B7280]">PRD, SRD, DB & Flows</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-slate-200/60">
            <div className="w-8 h-8 rounded-xl bg-[#38B2AC]/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#38B2AC]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#3D4852]">MCP Agents</h4>
              <p className="text-[10px] text-[#6B7280]">Antigravity & Claude</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-slate-200/60">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#3D4852]">Live Sandbox</h4>
              <p className="text-[10px] text-[#6B7280]">Realtime Dev Preview</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-3 text-center">
          Or Quick Start from a Blueprint Template:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.type}
              onClick={() => navigate(`/projects/new?template=${tmpl.type}`)}
              className="neumorphic-card rounded-2xl p-5 text-left bg-[#E0E5EC] hover:scale-[1.02] transition-all cursor-pointer border border-black/5 flex flex-col justify-between group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3D4852] group-hover:text-[#6C63FF] transition-colors">
                  {tmpl.title}
                </span>
                <span className="text-[10px] bg-[#6C63FF]/10 text-[#6C63FF] px-2 py-0.5 rounded-full font-bold">
                  {tmpl.type.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                {tmpl.desc}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#6C63FF] pt-1">
                <span>Start Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();

  const QUICK_TEMPLATES = [
    { title: 'SaaS Platform', type: 'saas', desc: 'Auth, Billing, Dashboard & Multi-tenant API' },
    { title: 'E-Commerce Marketplace', type: 'ecommerce', desc: 'Cart, Stripe Checkout & Vendor Portal' },
    { title: 'AI Assistant App', type: 'ai', desc: 'LLM Streaming, Vector Search & Chat UI' },
    { title: 'Mobile Application', type: 'mobile', desc: 'React Native & Cross-platform Specs' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-2">
      <div className="liquid-glass rounded-[28px] p-6 md:px-8 md:py-6 w-full flex flex-col md:flex-row items-center justify-between gap-6 border border-white/60 shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)]">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-[11px] font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Project Workspace</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-[#3D4852] tracking-tight pt-1">
            Build Your Next Product Architecture
          </h2>
          <p className="text-xs text-[#6B7280] font-medium max-w-xl">
            Generate production-ready PRDs, SRDs, database schemas, and AI coding agent specifications in minutes.
          </p>
        </div>

        <button
          onClick={() => navigate('/projects/new')}
          className="w-full md:w-auto shrink-0 rounded-2xl px-6 py-3 bg-[#6C63FF] hover:bg-[#8B84FF] text-white text-xs md:text-sm font-extrabold transition-all cursor-pointer shadow-[5px_5px_10px_rgba(108,99,255,0.35)] hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>Create Project</span>
          <ArrowRight className="w-4 h-4 text-white/80" />
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#6B7280] tracking-wide px-1">
          Quick Blueprints
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {QUICK_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.type}
              onClick={() => navigate(`/projects/new?template=${tmpl.type}`)}
              className="neumorphic-card rounded-2xl p-4 text-left bg-[#E0E5EC] hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div>
                <span className="text-xs font-bold text-[#3D4852] group-hover:text-[#6C63FF] transition-colors block">
                  {tmpl.title}
                </span>
                <p className="text-[11px] text-[#6B7280] leading-relaxed mt-1">
                  {tmpl.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#6C63FF] pt-1">
                <span>Start</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

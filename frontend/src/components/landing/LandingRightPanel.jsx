import { Twitter, Linkedin, Instagram, ArrowRight, Sparkles, Wand2, BookOpen, Plus } from 'lucide-react';

export default function LandingRightPanel() {
  return (
    <div className="hidden lg:flex relative z-10 w-[48%] min-h-screen flex-col p-6 gap-5">
      <div className="flex items-center justify-end gap-3">
        <div className="liquid-glass rounded-full flex items-center gap-1 px-3 py-2">
          {[Twitter, Linkedin, Instagram].map((Icon, i) => (
            <button key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform">
              <Icon className="w-3.5 h-3.5 text-white/70" />
            </button>
          ))}
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 transition-transform">
            <ArrowRight className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
        <button className="liquid-glass rounded-full flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-white/70" />
          <span className="text-xs text-white/70 font-light">Account</span>
        </button>
      </div>

      <div className="liquid-glass rounded-2xl p-5 w-56">
        <p className="text-sm font-medium text-white leading-snug mb-2">
          Enter the developer ecosystem
        </p>
        <p className="text-xs text-white/60 font-light leading-relaxed">
          Join builders shipping faster with AI-generated docs.
        </p>
      </div>

      <div className="mt-auto">
        <div className="liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
          <div className="flex gap-3">
            {[
              { Icon: Wand2, title: 'AI Processing', desc: '4-level fallback cascade' },
              { Icon: BookOpen, title: 'Doc Archive', desc: '9-document tech suite' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="liquid-glass rounded-3xl flex-1 p-5 flex flex-col gap-3 hover:scale-105 transition-transform cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-white/50 font-light mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="liquid-glass rounded-3xl p-5 flex items-start gap-4 hover:scale-105 transition-transform cursor-default">
            <div className="w-24 h-16 rounded-xl bg-white/5 flex-shrink-0 overflow-hidden">
              <svg viewBox="0 0 96 64" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="96" height="64" fill="rgba(255,255,255,0.03)" />
                <line x1="0" y1="32" x2="96" y2="32" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <line x1="48" y1="0" x2="48" y2="64" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-snug">Advanced Document Architecture</p>
              <p className="text-xs text-white/50 font-light mt-1 leading-relaxed">Structured outputs ready for AI coding agents.</p>
            </div>
            <button className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform">
              <Plus className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

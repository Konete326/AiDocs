import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const LinearHero = () => {
  return (
    <section className="relative bg-[#050506] py-24 md:py-32 font-['Inter'] overflow-hidden border-b border-white/[0.06]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5E6AD2]/15 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/[0.05] border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#8A8F98] mb-8 shadow-[0_0_15px_rgba(94,106,210,0.1)]">
          <Sparkles size={14} className="text-[#5E6AD2]" />
          <span>Linear Modern System 3.0</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-none mb-8">
          Crafted for Precision & Depth
        </h1>
        <p className="text-lg md:text-xl text-[#8A8F98] max-w-2xl mx-auto leading-relaxed mb-10">
          Cinematic dark interface with layered translucency, ambient indigo glows, and responsive glassmorphic components.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm font-medium">
          <button className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#6872D9] text-white rounded-lg shadow-[0_0_25px_rgba(94,106,210,0.4)] transition-all flex items-center space-x-2">
            <span>Explore Design System</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-6 py-3 bg-white/[0.05] hover:bg-white/[0.08] text-[#EDEDEF] border border-white/10 rounded-lg transition-all">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

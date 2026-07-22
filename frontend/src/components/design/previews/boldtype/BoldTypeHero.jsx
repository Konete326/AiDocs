import React from "react";
import { ArrowRight } from "lucide-react";

export const BoldTypeHero = () => {
  return (
    <section className="bg-[#0A0A0A] border-b border-[#262626] py-28 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest mb-6 font-semibold">
          // TYPE IS THE HERO
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#FAFAFA] leading-[0.9] mb-8">
          POSTER DESIGN <span className="text-[#FF3D00]">TRANSLATED.</span>
        </h1>
        <p className="text-lg md:text-xl font-normal text-[#737373] max-w-xl leading-relaxed mb-10">
          Typography isn't decoration—it's the entire visual language. Vermillion red-orange (#FF3D00) accents, extreme scale contrast, and 0px sharp edges.
        </p>
        <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider">
          <button className="relative group text-[#FF3D00] py-2 flex items-center space-x-2 font-bold">
            <span>READ MANIFESTO</span>
            <ArrowRight size={16} />
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3D00] group-hover:scale-x-110 transition-transform"></span>
          </button>
          <button className="px-6 py-3 border border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
            VIEW SPECIFICATIONS
          </button>
        </div>
      </div>
    </section>
  );
};

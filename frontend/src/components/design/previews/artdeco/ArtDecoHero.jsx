import React from "react";
import { Sparkles } from "lucide-react";

export const ArtDecoHero = () => {
  return (
    <section className="bg-[#0A0A0A] border-b-2 border-[#D4AF37]/30 py-24 md:py-32 font-['Marcellus'] text-[#F2F0E4] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-3 border-b border-[#D4AF37] pb-2 mb-8">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.3em] text-[#D4AF37]">MCMXXV // GRAND OPULENCE</span>
          <Sparkles size={14} className="text-[#D4AF37]" />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-[0.2em] text-[#F2F0E4] leading-tight mb-8">
          ARCHITECTURAL <span className="text-[#D4AF37] italic">GRANDEUR</span>
        </h1>
        <p className="font-['Josefin_Sans'] text-base md:text-lg text-[#888888] max-w-2xl mx-auto leading-relaxed mb-12">
          Obsidian Black (#0A0A0A) & Metallic Gold (#D4AF37) precision. Stepped ziggurats, rotated 45° diamonds, and Roman numeral geometry.
        </p>
        <div className="flex justify-center gap-6 font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em]">
          <button className="px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-[#F2F0E4] transition-colors">
            RESERVE SUITE
          </button>
          <button className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#1E3D59] transition-colors">
            EXPLORE FACADE
          </button>
        </div>
      </div>
    </section>
  );
};

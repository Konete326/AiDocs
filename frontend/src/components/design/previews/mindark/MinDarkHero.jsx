import React from "react";
import { ArrowRight, Moon } from "lucide-react";

export const MinDarkHero = () => {
  return (
    <section className="bg-[#0A0A0F] border-b border-white/10 py-24 md:py-36 font-['Space_Grotesk'] text-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#1A1A24] border border-[#F59E0B]/30 px-4 py-1.5 rounded-full text-xs font-['Inter'] font-medium text-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-8">
          <Moon size={14} className="animate-pulse" />
          <span>ATMOSPHERIC DEPTH // WARM AMBER GLOW</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
          Carefully orchestrated <span className="text-[#F59E0B] drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">layers of slate.</span>
        </h1>
        <p className="font-['Inter'] text-base md:text-lg text-[#71717A] max-w-xl leading-relaxed mb-10 font-normal">
          Deep slate base (#0A0A0F), glass cards (backdrop-blur-md), warm amber accents (#F59E0B), and ambient light fields.
        </p>
        <div className="flex flex-wrap gap-4 font-['Inter'] text-xs font-medium">
          <button className="px-8 py-4 bg-[#F59E0B] text-[#0A0A0F] rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center space-x-2">
            <span>GET STARTED</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/15 text-[#FAFAFA] rounded-lg hover:bg-white/5 active:scale-[0.98] transition-all">
            VIEW AMBER TOKENS
          </button>
        </div>
      </div>
    </section>
  );
};

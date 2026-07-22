import React from "react";
import { ArrowRight } from "lucide-react";

export const AcademiaHero = () => {
  return (
    <section className="bg-[#1C1714] border-b border-[#4A3F35] py-24 md:py-32 font-['Cormorant_Garamond',serif] text-[#E8DFD4] relative">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#C9A962] block mb-4">
            VOLUME I // SCHOLARLY GRAVITAS
          </span>
          <h1 className="text-5xl md:text-7xl font-normal text-[#E8DFD4] leading-[1.1] mb-8">
            Centuries of knowledge, <span className="italic text-[#C9A962]">bound</span> in brass & parchment.
          </h1>
          <p className="font-['Crimson_Pro'] text-lg text-[#9C8B7A] max-w-xl leading-relaxed mb-10">
            Rich mahogany wood tones (#1C1714), antique parchment text (#E8DFD4), polished brass accents (#C9A962), and cathedral arch-top imagery.
          </p>
          <div className="flex flex-wrap gap-4 font-['Cinzel'] text-xs uppercase tracking-[0.2em]">
            <button className="px-8 py-4 bg-gradient-to-b from-[#D4B872] via-[#C9A962] to-[#B8953F] text-[#1C1714] font-bold rounded-[4px] shadow-md hover:brightness-110 transition-all flex items-center space-x-2">
              <span>EXPLORE ARCHIVES</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 border-2 border-[#C9A962] text-[#C9A962] rounded-[4px] hover:bg-[#8B2635] hover:border-[#8B2635] hover:text-[#E8DFD4] transition-all">
              VIEW MANUSCRIPT
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[3/4] bg-[#251E19] border border-[#C9A962]/40 p-6 rounded-[40%_40%_0_0_/_20%_20%_0_0] shadow-xl relative group">
            <div className="w-full h-full border border-[#4A3F35] rounded-[40%_40%_0_0_/_20%_20%_0_0] p-6 flex flex-col justify-end">
              <span className="font-['Cinzel'] text-xs text-[#C9A962] uppercase tracking-widest mb-1">CATHEDRAL ARCH</span>
              <span className="text-3xl italic text-[#E8DFD4]">Victorian Library</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

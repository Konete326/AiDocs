import React from "react";
import { ArrowRight } from "lucide-react";

export const SerifHero = () => {
  return (
    <section className="bg-[#FAFAF8] border-b border-[#E8E4DF] py-28 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-3 mb-6 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium">
          <span className="h-px w-8 bg-[#E8E4DF]"></span>
          <span>EDITORIAL GRAVITAS & RESTRAINT</span>
          <span className="h-px w-8 bg-[#E8E4DF]"></span>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-[#1A1A1A] leading-[1.1] mb-8">
          The art of <span className="italic text-[#B8860B]">considered</span> typography.
        </h1>
        <p className="font-['Source_Sans_3',sans-serif] text-lg text-[#6B6B6B] max-w-xl mx-auto leading-relaxed mb-10 font-normal">
          Ivory canvas (#FAFAF8), Playfair Display headlines, Burnished Gold accents (#B8860B), 1px rule lines, and IBM Plex Mono small caps.
        </p>
        <div className="flex justify-center gap-6 font-['Source_Sans_3'] text-xs font-medium uppercase tracking-wider">
          <button className="px-8 py-3.5 bg-[#B8860B] text-white rounded-md shadow-sm hover:bg-[#D4A84B] transition-all flex items-center space-x-2">
            <span>READ THE JOURNAL</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] rounded-md hover:bg-[#F5F3F0] transition-colors">
            SPECIFICATION FOLIO
          </button>
        </div>
      </div>
    </section>
  );
};

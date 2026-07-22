import React from "react";
import { ArrowRight } from "lucide-react";

export const LuxuryHero = () => {
  return (
    <section className="bg-[#F9F8F6] border-b border-[#1A1A1A]/20 py-24 md:py-32 font-['Inter'] relative">
      <div className="max-w-[1600px] mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-12 h-px bg-[#D4AF37]"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6C6863] font-medium">Vol. 01 / Refined Elegance</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[0.95] mb-8 font-normal">
            Elegance through <span className="italic text-[#D4AF37]">restraint</span> & precision.
          </h1>
          <p className="text-base md:text-lg text-[#6C6863] leading-relaxed max-w-xl mb-10 font-normal">
            High-fashion editorial aesthetic combining Warm Alabaster canvas, Playfair Display serif typography, and subtle metallic gold accents.
          </p>
          <div className="flex flex-wrap gap-5">
            <button className="relative group overflow-hidden px-9 py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-500">
              <span className="relative z-10 flex items-center space-x-3">
                <span>View Collection</span>
                <ArrowRight size={16} />
              </span>
              <span className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative group">
          <div className="aspect-[3/4] bg-[#EBE5DE] border border-[#1A1A1A]/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="w-full h-full border border-[#1A1A1A]/30 p-6 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Editorial Archive</div>
              <div>
                <span className="font-['Playfair_Display'] text-4xl italic text-[#1A1A1A] block mb-2">Haute Couture</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#6C6863]">Digital Craftsmanship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { ArrowRight } from "lucide-react";

export const MaterialHero = () => {
  return (
    <section className="bg-[#FFFBFE] py-20 md:py-28 font-['Roboto'] border-b border-[#E7E0EC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#E8DEF8] text-[#1D192B] px-4 py-1.5 rounded-full text-xs font-medium mb-8">
          <span>Material Design 3 // Personal & Adaptive</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium text-[#1C1B1F] leading-tight mb-8">
          Personal, adaptive & organic design system.
        </h1>
        <p className="text-lg md:text-xl text-[#49454F] max-w-2xl leading-relaxed mb-10 font-normal">
          Soft rounded surfaces, Purple/Violet tonal seed palette (#6750A4), pill-shaped buttons, and organic 24px/32px/48px container curves.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <button className="px-8 py-4 bg-[#6750A4] text-white rounded-full shadow-md hover:bg-[#6750A4]/90 active:scale-95 transition-all flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-[#E8DEF8] text-[#1D192B] rounded-full hover:bg-[#E8DEF8]/80 active:scale-95 transition-all">
            View Tonal Surfaces
          </button>
        </div>
      </div>
    </section>
  );
};

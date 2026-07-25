import React from "react";
import { ArrowRight } from "lucide-react";

export const FlatHero = () => {
  return (
    <section className="bg-[#3B82F6] text-white py-20 md:py-28 font-['Outfit'] shadow-none">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-block bg-white text-[#3B82F6] font-bold text-xs px-3.5 py-1.5 rounded-md uppercase tracking-wider mb-6">
          Zero Shadow // Flat Reduction
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-8">
          Hierarchy through size, color & form.
        </h1>
        <p className="text-lg md:text-xl font-normal text-blue-100 max-w-2xl leading-relaxed mb-10">
          Bold digital-native print aesthetic. Crisp edges, solid blocks of color (#3B82F6 Blue, #10B981 Emerald), zero box shadows.
        </p>
        <div className="flex flex-wrap gap-4 font-semibold text-xs">
          <button className="px-8 py-4 bg-white text-[#3B82F6] hover:bg-gray-100 rounded-md shadow-none hover:scale-105 transition-all flex items-center space-x-2">
            <span>Explore Flat Design</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-[#10B981] text-white hover:bg-emerald-600 rounded-md shadow-none hover:scale-105 transition-all">
            View Palette
          </button>
        </div>
      </div>
    </section>
  );
};

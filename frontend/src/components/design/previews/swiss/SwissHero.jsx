import React from "react";
import { ArrowRight } from "lucide-react";

export const SwissHero = () => {
  return (
    <section className="bg-white border-b-4 border-black py-20 md:py-28 font-['Inter'] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-[#FF3000] font-black mb-6">
          01. OBJECTIVE COMMUNICATION
        </div>
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-black leading-none mb-8">
          TYPOGRAPHY IS THE INTERFACE
        </h1>
        <p className="text-lg font-medium text-black max-w-2xl leading-relaxed mb-10 border-l-4 border-[#FF3000] pl-4">
          International Typographic Style born in 1950s Switzerland. Universal clarity, mathematical grids, grotesque sans-serif type, and Swiss Red (#FF3000) signal accents.
        </p>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase tracking-widest">
          <button className="px-8 py-4 bg-black text-white border-4 border-black hover:bg-[#FF3000] transition-colors flex items-center space-x-3">
            <span>EXPLORE SYSTEM</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-white text-black border-4 border-black hover:bg-black hover:text-white transition-colors">
            VIEW MANIFESTO
          </button>
        </div>
      </div>
    </section>
  );
};

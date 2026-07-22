import React from "react";
import { ArrowRight } from "lucide-react";

export const KineticHero = () => {
  return (
    <section className="bg-[#09090B] border-b-2 border-[#3F3F46] py-20 font-['Space_Grotesk'] text-[#FAFAFA] overflow-hidden">
      <div className="max-w-[95vw] mx-auto px-6">
        <div className="inline-block bg-[#DFE104] text-black font-extrabold text-xs px-3 py-1 uppercase tracking-widest mb-6">
          NEVER STILL // ALWAYS MOVING
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-[#FAFAFA] leading-none mb-8">
          TYPOGRAPHY IS THE <span className="text-[#DFE104]">STRUCTURE</span>
        </h1>
        <p className="text-xl font-medium text-[#A1A1AA] max-w-2xl leading-tight mb-10">
          High-energy brutalism meets poster design. Acid Yellow (#DFE104) contrast, fluid clamp typography, and hard hover floods.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-extrabold uppercase tracking-tighter">
          <button className="px-8 py-4 bg-[#DFE104] text-black hover:scale-105 transition-transform flex items-center space-x-2">
            <span>EXPLORE KINETIC</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 border-2 border-[#3F3F46] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-black transition-colors">
            SYSTEM RULES
          </button>
        </div>
      </div>
    </section>
  );
};

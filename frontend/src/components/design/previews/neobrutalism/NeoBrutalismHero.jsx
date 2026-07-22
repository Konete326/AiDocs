import React from "react";
import { ArrowRight, Star } from "lucide-react";

export const NeoBrutalismHero = () => {
  return (
    <section className="bg-[#FFFDF5] border-b-4 border-black py-20 font-['Space_Grotesk'] text-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#FFD93D] border-4 border-black px-4 py-1.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_#000] rotate-1 mb-8">
          <Star size={16} className="fill-black animate-spin-slow" />
          <span>UNAPOLOGETIC VISIBILITY // NO BLUR</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-tight mb-8">
          ANTI-SUBTLE <span className="bg-[#FF6B6B] text-white px-3 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block -rotate-1">DIGITAL</span> REBELLION.
        </h1>
        <p className="text-xl font-bold text-black max-w-2xl leading-snug mb-10 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
          Thick 4px black borders, 45° offset hard block shadows, cream canvas (#FFFDF5), and mechanical press feedback.
        </p>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase tracking-wide">
          <button className="px-8 py-4 bg-[#FF6B6B] text-white border-4 border-black shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-2">
            <span>GET STARTED NOW</span>
            <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 bg-[#C4B5FD] text-black border-4 border-black shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            VIEW STICKER PACK
          </button>
        </div>
      </div>
    </section>
  );
};

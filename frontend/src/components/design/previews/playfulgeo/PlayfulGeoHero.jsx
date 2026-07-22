import React from "react";
import { ArrowRight, Smile } from "lucide-react";

export const PlayfulGeoHero = () => {
  return (
    <section className="bg-[#FFFDF5] border-b-2 border-[#1E293B] py-20 font-['Outfit',sans-serif] text-[#1E293B] relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-[#FBBF24] border-2 border-[#1E293B] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase shadow-[3px_3px_0px_0px_#1E293B] mb-8">
            <Smile size={16} />
            <span>STABLE GRID, WILD DECORATION</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            STORYBOOK <span className="bg-[#F472B6] text-white px-3 border-2 border-[#1E293B] rounded-2xl shadow-[4px_4px_0px_0px_#1E293B] inline-block -rotate-2">GEOMETRY</span> FOR THE WEB.
          </h1>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-[#64748B] max-w-xl leading-relaxed mb-10 font-medium">
            Warm Cream canvas (#FFFDF5), Candy Pill buttons (rounded-full), hard solid offset shadows (4px 4px 0px #1E293B), and Memphis Group pop colors.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-extrabold uppercase tracking-wider">
            <button className="px-8 py-4 bg-[#8B5CF6] text-white rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B] transition-all flex items-center space-x-2">
              <span>EXPLORE PLAYGROUND</span>
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#FBBF24] transition-colors">
              VIEW PATTERNS
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-72 h-72 bg-[#34D399] border-2 border-[#1E293B] rounded-[40px] shadow-[8px_8px_0px_0px_#1E293B] p-8 flex flex-col justify-between rotate-3 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-[#1E293B] flex items-center justify-center font-black text-xl text-[#8B5CF6] shadow-[2px_2px_0px_0px_#1E293B]">
              ★
            </div>
            <div>
              <span className="font-extrabold text-2xl text-[#1E293B]">MEMPHIS POP</span>
              <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#1E293B]/80 mt-1">Tactile fun for digital screens.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

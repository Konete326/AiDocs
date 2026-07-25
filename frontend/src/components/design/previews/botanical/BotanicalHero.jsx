import React from "react";
import { ArrowRight, Leaf } from "lucide-react";

export const BotanicalHero = () => {
  return (
    <section className="bg-[#F9F8F4] border-b border-[#E6E2DA] py-24 font-['Playfair_Display',serif] text-[#2D3A31] relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-[#DCCFC2]/40 border border-[#E6E2DA] px-4 py-1.5 rounded-full text-xs font-['Source_Sans_3'] font-semibold uppercase tracking-widest text-[#2D3A31] mb-8">
            <Leaf size={14} className="text-[#8C9A84]" />
            <span>DIGITAL ODE TO NATURE // EARTHBOUND</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-normal tracking-tight leading-[1.15] text-[#2D3A31] mb-8">
            Soft, sun-warmed & <span className="italic text-[#8C9A84]">naturally</span> crafted.
          </h1>
          <p className="font-['Source_Sans_3',sans-serif] text-lg text-[#2D3A31]/80 max-w-xl leading-relaxed mb-10 font-normal">
            Warm Alabaster canvas (#F9F8F4), Deep Forest Green typography (#2D3A31), Sage Green accents (#8C9A84), and Roman cathedral arch masks.
          </p>
          <div className="flex flex-wrap gap-4 font-['Source_Sans_3'] text-xs font-semibold uppercase tracking-widest">
            <button className="px-8 py-4 bg-[#2D3A31] text-white rounded-full hover:bg-[#C27B66] transition-colors shadow-sm flex items-center space-x-2">
              <span>EXPLORE GARDEN</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 border border-[#8C9A84] text-[#2D3A31] rounded-full hover:bg-[#DCCFC2]/40 transition-colors">
              VIEW HERBARIUM
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-72 h-96 bg-[#DCCFC2]/50 border border-[#E6E2DA] rounded-t-full p-6 shadow-md flex flex-col justify-end relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#8C9A84] text-white flex items-center justify-center font-serif italic text-xl mb-4">
              ❀
            </div>
            <span className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#2D3A31]/70 mb-1">ROMAN ARCH MASK</span>
            <span className="text-2xl italic text-[#2D3A31]">Botanical Oasis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

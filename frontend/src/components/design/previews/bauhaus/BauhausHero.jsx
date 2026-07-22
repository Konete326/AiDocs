import React from "react";
import { ArrowRight } from "lucide-react";

export const BauhausHero = () => {
  return (
    <section className="bg-[#F0F0F0] border-b-4 border-[#121212] py-20 font-['Outfit'] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-block bg-[#F0C020] border-2 border-[#121212] px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_#121212]">
            CONSTRUCTIVIST SYSTEM 2.0
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#121212] leading-[0.9] mb-8">
            FORM FOLLOWS FUNCTION
          </h1>
          <p className="text-lg font-medium text-neutral-800 leading-relaxed mb-10 max-w-xl">
            A radical synthesis of pure geometry, primary colors, and structural clarity. Built for modern digital products with bold architectural rhythm.
          </p>
          <div className="flex flex-wrap gap-4 font-bold text-xs uppercase tracking-wider">
            <button className="px-8 py-4 bg-[#D02020] text-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-2">
              <span>EXPLORE TEMPLATE</span>
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-[#1040C0] text-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              SEE MANIFESTO
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#1040C0] border-4 border-[#121212] p-8 shadow-[8px_8px_0px_0px_#121212] relative min-h-[340px] flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-[#D02020] border-4 border-[#121212] absolute -top-6 -left-6 opacity-90"></div>
          <div className="w-40 h-40 bg-[#F0C020] border-4 border-[#121212] rotate-12 relative z-10 p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_#121212]">
            <span className="font-black text-3xl text-[#121212]">1925</span>
            <span className="font-bold text-xs uppercase tracking-widest text-[#121212]">DESSAU DESIGN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

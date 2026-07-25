import React from "react";
import { ArrowRight, Trees } from "lucide-react";

export const OrganicNaturalHero = () => {
  const blobShape = { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" };

  return (
    <section className="bg-[#FDFCF8] py-24 font-['Fraunces',serif] text-[#2C2C24] relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-[#E6DCCD]/40 border border-[#DED8CF] px-4 py-2 rounded-full text-xs font-['Nunito'] font-bold text-[#5D7052] mb-8">
            <Trees size={16} />
            <span>WABI-SABI // IMPERFECTION & TRANSIENCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] text-[#2C2C24] mb-8">
            Eroded by wind & <span className="italic text-[#C18C5D]">shaped</span> by hand.
          </h1>
          <p className="font-['Nunito',sans-serif] text-base md:text-lg text-[#78786C] max-w-xl leading-relaxed mb-10 font-medium">
            Off-white Rice Paper canvas (#FDFCF8), Deep Loam charcoal (#2C2C24), Moss Green (#5D7052), Terracotta clay (#C18C5D), and 3% paper grain noise texture.
          </p>
          <div className="flex flex-wrap gap-4 font-['Nunito'] text-xs font-bold uppercase tracking-wider">
            <button className="px-8 py-4 bg-[#5D7052] text-[#F3F4F1] rounded-full shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2">
              <span>ROOTED ESSENCE</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 border-2 border-[#C18C5D] text-[#C18C5D] rounded-full hover:bg-[#C18C5D]/10 transition-colors">
              VIEW CLAY POTTERY
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div style={blobShape} className="w-80 h-80 bg-[#FEFEFA] border border-[#DED8CF]/50 shadow-[0_10px_40px_-10px_rgba(193,140,93,0.2)] p-8 flex flex-col justify-between -rotate-2 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#5D7052]/10 text-[#5D7052] flex items-center justify-center font-serif text-xl">
              🌿
            </div>
            <div>
              <span className="font-bold text-2xl text-[#2C2C24]">AMORPHOUS BLOB</span>
              <p className="font-['Nunito'] text-xs text-[#78786C] mt-1">Fraunces Variable Soft Serif</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

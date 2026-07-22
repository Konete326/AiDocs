import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const ClaymorphismHero = () => {
  return (
    <section className="bg-[#F4F1FA] border-b border-[#332F3A]/10 py-20 md:py-28 font-['Nunito',sans-serif] text-[#332F3A] relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-white px-4 py-2 rounded-full text-xs font-bold text-[#7C3AED] shadow-[8px_8px_16px_rgba(160,150,180,0.2),-6px_-6px_12px_rgba(255,255,255,0.9)] mb-8">
            <Sparkles size={16} />
            <span>HIGH-FIDELITY DIGITAL CLAY // 3D SOFT SILICONE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-[#332F3A] mb-8">
            Volumetric <span className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] bg-clip-text text-transparent">3D tactile</span> marshmallow world.
          </h1>
          <p className="font-['DM_Sans',sans-serif] text-lg text-[#635F69] max-w-xl leading-relaxed mb-10 font-medium">
            Pale lavender-white canvas (#F4F1FA), soft charcoal text (#332F3A), Nunito 900 typography, super-rounded 32px corners, and 4-layer shadow stacks.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-wider">
            <button className="px-8 py-4 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white rounded-[20px] shadow-[12px_12px_24px_rgba(124,58,237,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:-translate-y-1 active:scale-[0.92] transition-all flex items-center space-x-2">
              <span>EXPLORE CLAY WORLD</span>
              <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white text-[#332F3A] rounded-[20px] shadow-[12px_12px_24px_rgba(160,150,180,0.2),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:-translate-y-1 active:scale-[0.92] transition-all">
              VIEW SHADOW STACK
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-72 h-72 bg-white/70 backdrop-blur-xl border border-white rounded-[48px] shadow-[20px_20px_40px_rgba(160,150,180,0.25),-16px_-16px_32px_rgba(255,255,255,1)] p-8 flex flex-col justify-between hover:-translate-y-2 transition-all">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white flex items-center justify-center font-black text-2xl shadow-[8px_8px_16px_rgba(219,39,119,0.3)]">
              ★
            </div>
            <div>
              <span className="font-black text-3xl text-[#332F3A]">CLAY 3D</span>
              <p className="font-['DM_Sans'] text-xs font-bold text-[#635F69] mt-1">4-Layer Lighting Simulation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

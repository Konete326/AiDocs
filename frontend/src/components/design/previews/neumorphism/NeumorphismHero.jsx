import React from "react";
import { ArrowRight, Layers } from "lucide-react";

export const NeumorphismHero = () => {
  return (
    <section className="bg-[#E0E5EC] py-24 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852] relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-[#E0E5EC] px-4 py-2 rounded-full text-xs font-['DM_Sans'] font-bold text-[#6C63FF] shadow-[inset_4px_4px_8px_rgb(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] mb-8">
            <Layers size={16} />
            <span>MOLDED FROM THE SAME MATERIAL // NO BORDERS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#3D4852] mb-8">
            Molded soft clay <span className="text-[#6C63FF]">dual shadow</span> depth.
          </h1>
          <p className="font-['DM_Sans',sans-serif] text-base md:text-lg text-[#6B7280] max-w-xl leading-relaxed mb-10 font-medium">
            Cool clay surface (#E0E5EC), dark slate text (#3D4852), soft violet highlights (#6C63FF), extruded rest states, and inset deep wells.
          </p>
          <div className="flex flex-wrap gap-4 font-['DM_Sans'] text-xs font-bold uppercase tracking-wider">
            <button className="px-8 py-4 bg-[#6C63FF] text-white rounded-2xl shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] transition-all flex items-center space-x-2">
              <span>EXPLORE SOFT SURFACE</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 bg-[#E0E5EC] text-[#3D4852] rounded-2xl shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:text-[#6C63FF] transition-all">
              VIEW SHADOW PHYSICS
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-80 h-80 bg-[#E0E5EC] rounded-[32px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#E0E5EC] shadow-[inset_10px_10px_20px_rgb(163,177,198,0.7),inset_-10px_-10px_20px_rgba(255,255,255,0.6)] flex items-center justify-center text-[#6C63FF] font-bold text-xl">
              ★
            </div>
            <div>
              <span className="font-extrabold text-2xl text-[#3D4852]">NEUMORPHIC WELL</span>
              <p className="font-['DM_Sans'] text-xs font-medium text-[#6B7280] mt-1">Nested Extruded $\rightarrow$ Inset Deep Depth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { ArrowRight, Cpu } from "lucide-react";

export const IndustrialSkeuoHero = () => {
  return (
    <section className="bg-[#e0e5ec] border-b border-[#a3b1c6] py-24 font-['Inter',sans-serif] text-[#2d3436] relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-[#e0e5ec] border border-white/60 px-4 py-2 rounded-full text-xs font-mono text-[#ff4757] shadow-[ inset_2px_2px_5px_#babecc,inset_-2px_-2px_5px_#ffffff] mb-8 font-bold">
            <Cpu size={16} className="text-[#ff4757]" />
            <span>TACTILE PRECISION // 45° TOP-LEFT LIGHTING</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#2d3436] mb-8 drop-shadow-[0_1px_0_#ffffff]">
            PHYSICAL REALISM <span className="text-[#ff4757]">TACTILE</span> SYNTHESIZER.
          </h1>
          <p className="text-base md:text-lg text-[#4a5568] max-w-xl leading-relaxed mb-10 font-medium">
            Cool Industrial Gray chassis (#e0e5ec), Safety Orange accents (#ff4757), dual neumorphic shadows (8px 8px 16px #babecc, -8px -8px 16px #ffffff), and corner screw heads.
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-widest">
            <button className="px-8 py-4 bg-[#ff4757] text-white rounded-xl shadow-[6px_6px_12px_rgba(166,50,60,0.4),-6px_-6px_12px_rgba(255,100,110,0.4)] active:translate-y-[2px] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] transition-all flex items-center space-x-2">
              <span>TEST SWITCHES</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 bg-[#e0e5ec] text-[#2d3436] rounded-xl shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] hover:text-[#ff4757] transition-all">
              SCHEMATIC DIAGRAM
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-72 h-80 bg-[#e0e5ec] border border-white/60 rounded-2xl shadow-[12px_12px_24px_#babecc,-12px_-12px_24px_#ffffff] p-6 flex flex-col justify-between relative">
            <div className="flex justify-between items-center">
              <div className="w-3 h-3 rounded-full bg-[#ff4757] shadow-[0_0_10px_2px_rgba(255,71,87,0.6)] animate-pulse" />
              <div className="flex space-x-1">
                <div className="h-4 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]" />
                <div className="h-4 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]" />
                <div className="h-4 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]" />
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff4757] font-bold uppercase block mb-1">// DIETER RAMS HERITAGE</span>
              <span className="font-extrabold text-2xl text-[#2d3436]">NEUMORPHIC CHASSIS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const BitcoinDeFiHero = () => {
  return (
    <section className="bg-[#08080C] border-b border-[#F7931A]/20 py-24 font-['Space_Grotesk'] text-[#F4F4F6] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#F7931A]/10 border border-[#F7931A]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#F7931A] mb-8">
          <ShieldCheck size={14} />
          <span>CRYPTOGRAPHIC TRUST // DIGITAL GOLD</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight mb-8">
          Luminescent <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD700] bg-clip-text text-transparent">Bitcoin</span> DeFi Energy.
        </h1>
        <p className="font-mono text-base md:text-lg text-[#A0A0B0] max-w-xl leading-relaxed mb-10">
          Bitcoin Orange (#F7931A) energy, Digital Gold (#FFD700) highlights, glassmorphism cards, and precision circuit network grid overlays.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider">
          <button className="px-8 py-4 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] font-bold rounded-xl shadow-[0_0_20px_rgba(247,147,26,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2">
            <span>STAKE BITCOIN NOW</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-[#12121A] text-[#F7931A] border border-[#F7931A]/40 rounded-xl hover:bg-[#F7931A]/10 active:scale-95 transition-all">
            EXPLORE CIRCUIT PROTOCAL
          </button>
        </div>
      </div>
    </section>
  );
};

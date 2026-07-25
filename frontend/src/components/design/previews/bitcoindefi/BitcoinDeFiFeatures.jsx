import React from "react";
import { Lock, Zap, Coins } from "lucide-react";

export const BitcoinDeFiFeatures = () => {
  const cards = [
    { icon: Lock, title: "Luminescent Energy", desc: "Interactive components emanate orange and gold warmth against true cosmic void depth.", color: "text-[#F7931A]" },
    { icon: Zap, title: "Mathematical Precision", desc: "Ultra-thin 1px borders, monospace data headers, and grid network infrastructure.", color: "text-[#FFD700]" },
    { icon: Coins, title: "Layered Glassmorphic Depth", desc: "Transparency stacking, colored glow shadows, and backdrop blur effects.", color: "text-[#F7931A]" }
  ];

  return (
    <section id="features" className="bg-[#08080C] border-b border-[#F7931A]/20 py-20 font-['Space_Grotesk'] text-[#F4F4F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-[#F7931A] uppercase tracking-widest">// DEFI ARCHITECTURE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-1">BITCOIN PROTOCOL DNA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-[#12121A]/70 border border-[#F7931A]/30 p-8 rounded-2xl backdrop-blur-md shadow-lg hover:border-[#F7931A] transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-[#F7931A]/10 border border-[#F7931A]/30 flex items-center justify-center mb-6 ${c.color} group-hover:scale-105 transition-transform`}>
                  <IconComp size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="font-mono text-sm text-[#A0A0B0] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

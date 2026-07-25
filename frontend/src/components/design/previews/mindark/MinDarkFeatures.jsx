import React from "react";
import { Zap, Shield, Sun } from "lucide-react";

export const MinDarkFeatures = () => {
  const cards = [
    { icon: Sun, title: "Warm Amber Glow", desc: "A single glowing amber accent (#F59E0B) creates warmth and focal points against nocturnal slate tones." },
    { icon: Shield, title: "Glass-Effect Cards", desc: "Semi-transparent backgrounds (0.6 opacity) with backdrop blur and low opacity 8% borders." },
    { icon: Zap, title: "Layered Slate Palette", desc: "Stacking three distinct dark tones (#0A0A0F → #12121A → #1A1A24) for atmospheric depth." }
  ];

  return (
    <section id="features" className="bg-[#0A0A0F] border-b border-white/10 py-24 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium">ATMOSPHERE</span>
          <h2 className="text-4xl font-bold tracking-tight text-[#FAFAFA] mt-1">NOCTURNE DNA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-[#1A1A24]/60 border border-white/10 p-8 rounded-xl backdrop-blur-md hover:border-[#F59E0B]/30 hover:scale-[1.02] transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <IconComp size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#FAFAFA] mb-3">{c.title}</h3>
                <p className="font-['Inter'] text-sm text-[#71717A] leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

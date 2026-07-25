import React from "react";
import { Palette, Layers, Heart } from "lucide-react";

export const MaterialFeatures = () => {
  const cards = [
    { icon: Palette, title: "Tonal Surface System", desc: "Background tones (#F3EDF7, #E8DEF8) create depth and hierarchy without stark white contrast.", bg: "bg-[#F3EDF7]" },
    { icon: Layers, title: "Pill-Shaped Action Buttons", desc: "Fully rounded pill buttons (rounded-full) provide approachable, friendly touch targets.", bg: "bg-[#E8DEF8]" },
    { icon: Heart, title: "Organic Container Curves", desc: "Generous 24px, 32px, and 48px rounded corners bring warmth and personality to cards.", bg: "bg-[#F3EDF7]" }
  ];

  return (
    <section id="features" className="bg-[#FFFBFE] py-20 font-['Roboto'] border-b border-[#E7E0EC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold">FEATURES</span>
          <h2 className="text-4xl font-medium text-[#1C1B1F] mt-1">Material You Principles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className={`${c.bg} rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow group`}>
                <div className="w-12 h-12 rounded-full bg-[#6750A4] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <IconComp size={22} />
                </div>
                <h3 className="text-xl font-medium text-[#1C1B1F] mb-3">{c.title}</h3>
                <p className="text-sm text-[#49454F] leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

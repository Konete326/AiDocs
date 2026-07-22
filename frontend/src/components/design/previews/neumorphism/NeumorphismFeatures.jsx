import React from "react";
import { Sun, Shield, Layers } from "lucide-react";

export const NeumorphismFeatures = () => {
  const cards = [
    { icon: Sun, title: "DUAL RGBA SHADOWS", desc: "Top-left pure white light source paired with bottom-right cool blue-grey dark shadow." },
    { icon: Layers, title: "EXTRUDED VS INSET WELLS", desc: "Resting cards extrude out; input wells and drilled icon housings curve deep into the surface." },
    { icon: Shield, title: "SAME-SURFACE ILLUSION", desc: "Monochromatic discipline where elements feel molded from the same cool clay material." }
  ];

  return (
    <section id="features" className="bg-[#E0E5EC] py-20 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider">PHYSICS</span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1">SOFT UI CANON</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-[#E0E5EC] p-8 rounded-[32px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#E0E5EC] shadow-[inset_6px_6px_10px_rgb(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] text-[#6C63FF] flex items-center justify-center mb-6">
                  <IconComp size={22} />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                <p className="font-['DM_Sans'] text-sm text-[#6B7280] leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

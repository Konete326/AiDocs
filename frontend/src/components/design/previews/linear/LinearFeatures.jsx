import React from "react";
import { Zap, Layers, Eye } from "lucide-react";

export const LinearFeatures = () => {
  const cards = [
    { icon: Zap, title: "Ambient Lighting Pools", desc: "Layered gradient blurs floating dynamically to emulate cinematic software surfaces." },
    { icon: Layers, title: "Multi-Layer Glass Cards", desc: "Translucent containers with 1px hairline highlights and ambient background shadows." },
    { icon: Eye, title: "Micro-Precision Motion", desc: "Tiny 4px translation steps tuned to 200ms expo-out easing for instant tactile feedback." }
  ];

  return (
    <section id="features" className="bg-[#050506] py-20 border-b border-white/[0.06] font-['Inter']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-mono text-[#5E6AD2] uppercase tracking-widest">ARCHITECTURE</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mt-1">Design Tokens in Action</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] p-8 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#5E6AD2]/10 border border-[#5E6AD2]/30 flex items-center justify-center text-[#5E6AD2] mb-6 group-hover:scale-105 transition-transform">
                  <IconComp size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{c.title}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

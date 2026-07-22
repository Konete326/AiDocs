import React from "react";
import { Sparkles, Layers, Zap } from "lucide-react";

export const MinimalistModernFeatures = () => {
  const cards = [
    { icon: Sparkles, title: "Electric Gradient Signature", desc: "Concentrated blue gradient (#0052FF → #4D7CFF) used for maximum interactive impact." },
    { icon: Layers, title: "Dual-Font Typography System", desc: "Calistoga display serif paired with Inter body text and JetBrains Mono badges." },
    { icon: Zap, title: "Asymmetric Visual Tension", desc: "Intentional grid offsets and layered textures bringing rhythm to scrolling." }
  ];

  return (
    <section id="features" className="bg-[#FAFAFA] py-20 font-['Inter'] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/30 bg-[#0052FF]/5 px-4 py-1.5 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0052FF] font-semibold">FEATURES</span>
          </div>
          <h2 className="font-['Calistoga'] text-4xl text-[#0F172A]">Minimalism with a Pulse</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <IconComp size={22} />
                </div>
                <h3 className="font-semibold text-xl text-[#0F172A] mb-3">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

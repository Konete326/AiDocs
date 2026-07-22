import React from "react";

export const BoldTypeFeatures = () => {
  const cards = [
    { num: "01", title: "TYPE AS HERO", desc: "Headlines aren't labels—they are the centerpiece. A well-set 80pt headline beats any stock photo." },
    { num: "02", title: "DELIBERATE NEGATIVE SPACE", desc: "Space frames letterforms. Generous margins make headlines feel intentional." },
    { num: "03", title: "RED ANIMATED UNDERLINES", desc: "Underlines act as primary interactive affordance without bulky button fills." }
  ];

  return (
    <section id="features" className="bg-[#0A0A0A] border-b border-[#262626] py-24 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold">// PRINCIPLES</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#FAFAFA] mt-1">THE TYPOGRAPHIC CANON</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="border border-[#262626] p-8 bg-[#0F0F0F] relative group hover:border-[#FF3D00] transition-colors">
              <div className="h-1 w-12 bg-[#FF3D00] mb-6"></div>
              <span className="font-mono text-xs text-[#FF3D00] font-bold block mb-2">{c.num}</span>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{c.title}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

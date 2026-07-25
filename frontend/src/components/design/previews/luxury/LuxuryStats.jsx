import React from "react";

export const LuxuryStats = () => {
  const metrics = [
    { num: "0px", label: "Rectangular Radius", sub: "Architectural Lines" },
    { num: "1500ms", label: "Cinematic Transitions", sub: "Deliberate Motion" },
    { num: "#D4AF37", label: "Metallic Gold Accent", sub: "Restrained Highlights" },
    { num: "AAA", label: "Contrast Ratio", sub: "Alabaster & Charcoal" }
  ];

  return (
    <section className="bg-[#1A1A1A] text-[#F9F8F6] py-20 border-b border-[#1A1A1A] font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="border-l border-[#D4AF37]/40 pl-6">
            <div className="font-['Playfair_Display'] text-3xl md:text-5xl text-[#F9F8F6] mb-2">{m.num}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium">{m.label}</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#EBE5DE]/60 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from "react";

export const ArtDecoFeatures = () => {
  const cards = [
    { num: "I.", title: "STEPPED ZIGGURAT CUTS", desc: "Corner embellishments and multi-layered frames inspired by Chrysler & Empire State spires." },
    { num: "II.", title: "METALLIC GOLD ACCENTS", desc: "Champagne Cream typography bathed in soft 15px gold halos on Obsidian Black." },
    { num: "III.", title: "ROMAN NUMERAL ORDER", desc: "Symmetrical layouts, 45° diamond icons, and wide tracking all-caps headers." }
  ];

  return (
    <section id="features" className="bg-[#0A0A0A] border-b-2 border-[#D4AF37]/30 py-24 font-['Marcellus'] text-[#F2F0E4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.3em] text-[#D4AF37]">ARCHITECTURAL CANON</span>
          <h2 className="text-4xl md:text-5xl uppercase tracking-[0.2em] text-[#F2F0E4] mt-2">OPULENCE & GEOMETRY</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#141414] border border-[#D4AF37]/40 p-8 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-500 group">
              <span className="font-['Josefin_Sans'] text-xl text-[#D4AF37] block mb-4">{c.num}</span>
              <h3 className="text-xl uppercase tracking-wider text-[#F2F0E4] mb-3">{c.title}</h3>
              <p className="font-['Josefin_Sans'] text-sm text-[#888888] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

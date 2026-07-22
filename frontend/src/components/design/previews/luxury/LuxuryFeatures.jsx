import React from "react";

export const LuxuryFeatures = () => {
  const cards = [
    { num: "01", title: "Warm Alabaster Canvas", desc: "Off-white paper texture (#F9F8F6) offering rich tactile warmth over clinical whites." },
    { num: "02", title: "Playfair & Inter Typography", desc: "High-contrast serif headings paired with humanist sans-serif for editorial weight." },
    { num: "03", title: "Gold Sliding Overlay", desc: "Primary actions featuring gold layer slide-in transitions with shadow evolution." }
  ];

  return (
    <section id="features" className="bg-[#F9F8F6] border-b border-[#1A1A1A]/20 py-24 font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">ELEMENTS</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-[#1A1A1A] mt-2">Editorial Principles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="border-t border-[#1A1A1A] pt-8 group hover:bg-[#EBE5DE]/30 p-6 transition-colors duration-500">
              <span className="font-['Playfair_Display'] text-2xl italic text-[#D4AF37] block mb-4">{c.num}</span>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-3">{c.title}</h3>
              <p className="text-sm text-[#6C6863] leading-relaxed font-normal">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

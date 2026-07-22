import React from "react";

export const BotanicalFeatures = () => {
  const cards = [
    { title: "ITALIC HEADLINE EMPHASIS", desc: "Playfair Display italicized single-word callouts adding handwritten personal elegance.", stagger: "translate-y-0" },
    { title: "PAPER GRAIN NOISE OVERLAY", desc: "Subtle SVG fractal noise filter overlay giving cold digital pixels a sun-warmed paper grain feel.", stagger: "md:translate-y-8" },
    { title: "EARTHBOUND WELLNESS COLOR", desc: "Sage green, terracotta clay, deep forest floor, and alabaster rice paper tones.", stagger: "translate-y-0" }
  ];

  return (
    <section id="features" className="bg-[#F9F8F4] border-b border-[#E6E2DA] py-24 font-['Playfair_Display',serif] text-[#2D3A31]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold">ELEMENTS</span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#2D3A31] mt-1">ORGANIC ESSENCE</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`bg-white border border-[#E6E2DA] p-8 rounded-3xl shadow-sm hover:-translate-y-1 transition-all ${c.stagger}`}>
              <span className="font-serif italic text-2xl text-[#8C9A84] block mb-3">0{i + 1}.</span>
              <h3 className="text-2xl font-normal mb-3">{c.title}</h3>
              <p className="font-['Source_Sans_3'] text-sm text-[#2D3A31]/70 leading-relaxed font-normal">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

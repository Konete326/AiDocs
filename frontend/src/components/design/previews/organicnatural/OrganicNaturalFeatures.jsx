import React from "react";

export const OrganicNaturalFeatures = () => {
  const cards = [
    { title: "AMORPHOUS BLOB RADII", desc: "Complex organic border-radius percentages (60% 40% 30% 70%) avoiding rigid 90-degree corners.", shape: "rounded-[3rem_1.5rem_3rem_1.5rem]" },
    { title: "PAPER GRAIN NOISE TEXTURE", desc: "Global SVG noise pattern layer at 3% opacity with multiply blend mode for tactile paper quality.", shape: "rounded-[1.5rem_3rem_1.5rem_3rem]" },
    { title: "MOSS & CLAY COLORED SHADOWS", desc: "Soft diffused shadows tinted with forest moss (rgba(93,112,82)) and terracotta clay rather than pure black.", shape: "rounded-[3rem]" }
  ];

  return (
    <section id="features" className="bg-[#FDFCF8] py-20 font-['Fraunces',serif] text-[#2C2C24]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider">HERITAGE</span>
          <h2 className="text-4xl font-bold tracking-tight text-[#2C2C24] mt-1">NATURAL PHILOSOPHY</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`bg-[#FEFEFA] border border-[#DED8CF]/50 p-8 ${c.shape} shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(93,112,82,0.2)] hover:-translate-y-1 transition-all`}>
              <span className="font-serif italic text-2xl text-[#C18C5D] block mb-3">0{i + 1}.</span>
              <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
              <p className="font-['Nunito'] text-sm text-[#78786C] leading-relaxed font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

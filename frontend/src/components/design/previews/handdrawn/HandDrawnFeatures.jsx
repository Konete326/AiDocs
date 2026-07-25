import React from "react";

export const HandDrawnFeatures = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };
  const cards = [
    { title: "IRREGULAR WOBBLY BORDERS", desc: "Explicitly rejecting straight geometric perfection with multi-radius elliptical wobbly style values.", bg: "bg-white", rot: "-rotate-1" },
    { title: "HARD OFFSET CUT-PAPER SHADOWS", desc: "Zero blur shadows! Solid 4px 4px offset box shadows creating a layered paper collage look.", bg: "bg-[#fff9c4]", rot: "rotate-2" },
    { title: "HANDWRITTEN MARKER FONTS", desc: "Kalam for thick felt-tip marker headings and Patrick Hand for readable body copy.", bg: "bg-white", rot: "-rotate-2" }
  ];

  return (
    <section id="features" className="bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] py-20 font-['Patrick_Hand',cursive] text-[#2d2d2d]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['Kalam'] text-xl text-[#ff4d4d] font-bold">[ RULE BOOK ]</span>
          <h2 className="font-['Kalam'] text-4xl md:text-5xl font-bold mt-1">HAND-DRAWN ESSENCE</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} style={wobbly} className={`${c.bg} border-[3px] border-[#2d2d2d] p-8 shadow-[5px_5px_0px_0px_#2d2d2d] ${c.rot} hover:rotate-0 transition-transform`}>
              <span className="font-['Kalam'] text-2xl font-bold text-[#ff4d4d] block mb-2">0{i + 1}.</span>
              <h3 className="font-['Kalam'] text-2xl font-bold mb-3">{c.title}</h3>
              <p className="text-lg text-[#2d2d2d]/80 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

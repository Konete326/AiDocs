import React from "react";

export const NeoBrutalismFeatures = () => {
  const cards = [
    { title: "UNAPOLOGETIC BORDERS", desc: "Solid 4px black strokes enforce structure. If it has no border, it does not exist.", bg: "bg-[#FF6B6B] text-white" },
    { title: "DIGITAL TACTILITY", desc: "Elements feel like laptop stickers layered on newsprint canvas with 45° block shadows.", bg: "bg-[#FFD93D] text-black" },
    { title: "MECHANICAL CLICK DOWN", desc: "Buttons press down on active states (active:translate-x-[2px] active:translate-y-[2px]).", bg: "bg-[#C4B5FD] text-black" }
  ];

  return (
    <section id="features" className="bg-[#FFFDF5] border-b-4 border-black py-20 font-['Space_Grotesk'] text-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase font-black bg-[#FFD93D] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_#000]">FEATURES</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">ANTI-CORPORATE DNA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`border-4 border-black p-8 ${c.bg} shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all`}>
              <h3 className="text-2xl font-black uppercase mb-3">{c.title}</h3>
              <p className="text-sm font-bold leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

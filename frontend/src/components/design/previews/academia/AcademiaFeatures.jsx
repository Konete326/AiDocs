import React from "react";

export const AcademiaFeatures = () => {
  const cards = [
    { num: "I.", title: "CATHEDRAL ARCH TOPS", desc: "Classic arch border-radius (40% 40% 0 0) reminiscent of Gothic university windows." },
    { num: "II.", title: "POLISHED BRASS HARDWARE", desc: "Metallic brass gradient buttons and engraved text shadow effects for pressed-metal feel." },
    { num: "III.", title: "ROMAN NUMERAL SYSTEM", desc: "Section headings structured as Volume I, II, III using classical Cinzel typography." }
  ];

  return (
    <section id="features" className="bg-[#1C1714] border-b border-[#4A3F35] py-24 font-['Cormorant_Garamond',serif] text-[#E8DFD4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#C9A962]">VOLUME II // DISCIPLINE</span>
          <h2 className="text-4xl md:text-5xl text-[#E8DFD4] mt-1">ACADEMIC PILLARS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#251E19] border border-[#4A3F35] p-8 rounded-[4px] relative group hover:border-[#C9A962]/50 transition-colors">
              <span className="font-['Cinzel'] text-xl text-[#C9A962] block mb-4">{c.num}</span>
              <h3 className="text-2xl text-[#E8DFD4] mb-3">{c.title}</h3>
              <p className="font-['Crimson_Pro'] text-sm text-[#9C8B7A] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

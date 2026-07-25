import React from "react";

export const KineticFeatures = () => {
  const cards = [
    { num: "01", title: "VIEWPORT-WIDTH TYPOGRAPHY", desc: "Text scaled dynamically via clamp() to fill available screen space with maximum weight." },
    { num: "02", title: "HARD COLOR FLOODS", desc: "Cards completely invert from rich dark tones to high-energy acid yellow on hover." },
    { num: "03", title: "RELENTLESS MOTION", desc: "Continuous marquees and snappy transitions ensuring layout feels interactive." }
  ];

  return (
    <section id="features" className="bg-[#09090B] border-b-2 border-[#3F3F46] py-20 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-[95vw] mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs text-[#DFE104] font-extrabold uppercase tracking-widest">[ SYSTEM DNA ]</span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-[#FAFAFA] mt-1">SIGNATURE KINETICS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="border-2 border-[#3F3F46] p-8 bg-[#09090B] group hover:bg-[#DFE104] hover:text-black transition-colors duration-300">
              <span className="text-3xl font-extrabold text-[#DFE104] group-hover:text-black block mb-4">{c.num}</span>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-3">{c.title}</h3>
              <p className="text-sm font-medium text-[#A1A1AA] group-hover:text-black leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

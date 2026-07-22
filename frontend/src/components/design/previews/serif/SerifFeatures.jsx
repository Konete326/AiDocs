import React from "react";

export const SerifFeatures = () => {
  const cards = [
    { num: "01.", title: "PLAYFAIR DISPLAY SERIF", desc: "High-contrast strokes and ball terminals establishing classical editorial gravitas." },
    { num: "02.", title: "EDITORIAL whitespace", desc: "Generous vertical padding (py-32) giving typography ample breathing room." },
    { num: "03.", title: "BURNISHED GOLD ACCENTS", desc: "Single warm accent color inspired by gold leaf in illuminated manuscripts." }
  ];

  return (
    <section id="features" className="bg-[#FAFAF8] border-b border-[#E8E4DF] py-24 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-3">
            <span className="h-px w-8 bg-[#B8860B]"></span>
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium">CHAPTER I</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A1A]">EDITORIAL CANON</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-white border border-[#E8E4DF] border-t-2 border-t-[#B8860B] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="font-['IBM_Plex_Mono'] text-xs text-[#B8860B] font-semibold block mb-3">{c.num}</span>
              <h3 className="text-2xl font-normal mb-3">{c.title}</h3>
              <p className="font-['Source_Sans_3'] text-sm text-[#6B6B6B] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

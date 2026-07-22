import React from "react";

export const PlayfulGeoFeatures = () => {
  const cards = [
    { title: "CANDY PILL BUTTONS", desc: "Rounded-full buttons framed by 2px dark slate borders and 4px solid drop shadows.", bg: "bg-white", border: "border-[#8B5CF6]" },
    { title: "STICKER CARDS", desc: "Cards with hard offset shadows that wiggle (-1deg rotate) on hover for sticker book energy.", bg: "bg-white", border: "border-[#F472B6]" },
    { title: "POP PALETTE ROTATION", desc: "Rotational use of Violet, Pink, Yellow, and Mint colors creating a confetti visual rhythm.", bg: "bg-white", border: "border-[#34D399]" }
  ];

  return (
    <section id="features" className="bg-[#FFFDF5] border-b-2 border-[#1E293B] py-20 font-['Outfit',sans-serif] text-[#1E293B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase font-extrabold bg-[#FBBF24] border-2 border-[#1E293B] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E293B]">CANVAS CANON</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">PLAYFUL RULES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`${c.bg} border-2 border-[#1E293B] p-8 rounded-2xl shadow-[6px_6px_0px_0px_#1E293B] hover:-rotate-1 hover:scale-[1.02] transition-all`}>
              <div className={`w-10 h-10 rounded-full bg-[#FFFDF5] border-2 border-[#1E293B] flex items-center justify-center font-extrabold text-sm mb-4 shadow-[2px_2px_0px_0px_#1E293B]`}>
                0{i + 1}
              </div>
              <h3 className="text-2xl font-extrabold mb-3">{c.title}</h3>
              <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#64748B] leading-relaxed font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";

export const ArtDecoStats = () => {
  const metrics = [
    { num: "I", val: "#D4AF37", label: "METALLIC GOLD", sub: "Luminous Accent" },
    { num: "II", val: "45°", label: "ROTATED DIAMONDS", sub: "Geometric Frames" },
    { num: "III", val: "ZIGGURAT", label: "STEPPED CORNERS", sub: "Skyscraper Cuts" },
    { num: "IV", val: "MCMXXV", label: "ROMAN NUMERALS", sub: "Classical Order" }
  ];

  return (
    <section className="bg-[#141414] border-b-2 border-[#D4AF37]/30 py-16 font-['Marcellus'] text-[#F2F0E4]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="border border-[#D4AF37]/40 p-6 bg-[#0A0A0A] shadow-[0_0_15px_rgba(212,175,55,0.15)] relative">
            <div className="text-xs text-[#D4AF37] font-['Josefin_Sans'] tracking-widest mb-2">{m.num}. CANON</div>
            <div className="text-3xl md:text-4xl text-[#F2F0E4] mb-1">{m.val}</div>
            <div className="font-['Josefin_Sans'] text-xs uppercase tracking-widest text-[#D4AF37]">{m.label}</div>
            <div className="font-['Josefin_Sans'] text-[10px] text-[#888888] uppercase mt-1">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

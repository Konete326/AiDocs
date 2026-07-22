import React from "react";

export const SerifStats = () => {
  const stats = [
    { val: "#FAFAF8", label: "IVORY CANVAS", sub: "Warm Paper Base" },
    { val: "#B8860B", label: "BURNISHED GOLD", sub: "Manuscript Accent" },
    { val: "1px Rule", label: "FINE LINE SYSTEM", sub: "Editorial Divider" },
    { val: "Small Caps", label: "IBM PLEX MONO", sub: "Refined Metadata" }
  ];

  return (
    <section className="bg-[#F5F3F0] border-b border-[#E8E4DF] py-16 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l border-[#B8860B] pl-6">
            <div className="text-4xl md:text-5xl font-normal text-[#1A1A1A] mb-1">{s.val}</div>
            <div className="font-['IBM_Plex_Mono'] text-xs text-[#B8860B] font-medium uppercase tracking-[0.15em]">{s.label}</div>
            <div className="font-['Source_Sans_3'] text-xs text-[#6B6B6B] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

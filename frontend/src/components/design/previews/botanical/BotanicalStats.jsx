import React from "react";

export const BotanicalStats = () => {
  const stats = [
    { val: "#2D3A31", label: "FOREST GREEN", sub: "Primary Text" },
    { val: "#8C9A84", label: "SAGE GREEN", sub: "Natural Accent" },
    { val: "#C27B66", label: "TERRACOTTA", sub: "Warm CTA Pop" },
    { val: "ARCH", label: "ROMAN ARCHES", sub: "Cathedral Geometry" }
  ];

  return (
    <section className="bg-[#DCCFC2]/30 border-b border-[#E6E2DA] py-12 font-['Playfair_Display',serif] text-[#2D3A31]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#F9F8F4] border border-[#E6E2DA] p-6 rounded-3xl shadow-sm">
            <div className="text-3xl font-normal text-[#2D3A31] mb-1">{s.val}</div>
            <div className="font-['Source_Sans_3'] text-xs font-semibold text-[#8C9A84] uppercase tracking-widest">{s.label}</div>
            <div className="font-['Source_Sans_3'] text-xs text-[#2D3A31]/60 italic mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

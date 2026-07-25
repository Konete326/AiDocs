import React from "react";

export const AcademiaStats = () => {
  const stats = [
    { num: "I", val: "#C9A962", label: "POLISHED BRASS", sub: "Metallic Accent" },
    { num: "II", val: "#1C1714", label: "DEEP MAHOGANY", sub: "Wood Foundation" },
    { num: "III", val: "ARCH", label: "CATHEDRAL TOPS", sub: "Gothic Geometry" },
    { num: "IV", val: "SEPIA", label: "AGED HOVER REVEAL", sub: "Vintage Transition" }
  ];

  return (
    <section className="bg-[#251E19] border-b border-[#4A3F35] py-16 font-['Cormorant_Garamond',serif] text-[#E8DFD4]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l-2 border-[#C9A962] pl-6">
            <span className="font-['Cinzel'] text-[10px] text-[#C9A962] uppercase tracking-[0.25em] block mb-1">CANON {s.num}</span>
            <div className="text-4xl md:text-5xl text-[#E8DFD4] mb-1">{s.val}</div>
            <div className="font-['Cinzel'] text-xs text-[#C9A962] uppercase tracking-widest">{s.label}</div>
            <div className="font-['Crimson_Pro'] text-xs text-[#9C8B7A] italic mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

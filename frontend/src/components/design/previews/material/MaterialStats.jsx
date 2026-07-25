import React from "react";

export const MaterialStats = () => {
  const stats = [
    { val: "#6750A4", label: "PURPLE SEED COLOR", sub: "Tonal Palette", bg: "bg-[#F3EDF7] text-[#6750A4]" },
    { val: "Pill Shape", label: "ROUNDED-FULL CTAS", sub: "Friendly Geometry", bg: "bg-[#E8DEF8] text-[#1D192B]" },
    { val: "24-48px", label: "ORGANIC RADII", sub: "Soft Containers", bg: "bg-[#F3EDF7] text-[#1C1B1F]" },
    { val: "MD3", label: "MATERIAL DESIGN 3", sub: "Personal & Adaptive", bg: "bg-[#E7E0EC] text-[#1C1B1F]" }
  ];

  return (
    <section className="bg-[#FFFBFE] py-12 font-['Roboto'] border-b border-[#E7E0EC]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} p-6 rounded-[24px] font-medium shadow-sm`}>
            <div className="text-3xl md:text-4xl font-bold mb-1">{s.val}</div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{s.label}</div>
            <div className="text-[10px] opacity-60 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

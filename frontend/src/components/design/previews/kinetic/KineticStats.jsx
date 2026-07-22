import React from "react";

export const KineticStats = () => {
  const stats = [
    { num: "01", val: "10X", label: "SCALE RATIO", sub: "Aggressive Contrast" },
    { num: "02", val: "#DFE104", label: "ACID YELLOW", sub: "High Vis Accent" },
    { num: "03", val: "0PX", label: "BRUTAL RADIUS", sub: "Sharp Geometry" },
    { num: "04", val: "95VW", label: "FULL BLEED", sub: "Viewport Dominance" }
  ];

  return (
    <section className="bg-[#DFE104] text-black py-12 font-['Space_Grotesk'] border-b-2 border-[#3F3F46]">
      <div className="max-w-[95vw] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="border-l-4 border-black pl-4">
            <div className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-1">{s.val}</div>
            <div className="text-xs font-extrabold uppercase tracking-widest">{s.label}</div>
            <div className="text-[10px] uppercase opacity-80">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

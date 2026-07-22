import React from "react";

export const NeumorphismStats = () => {
  const stats = [
    { val: "#E0E5EC", label: "COOL CLAY CANVAS", sub: "Base Monochromatic Surface" },
    { val: "#6C63FF", label: "SOFT VIOLET", sub: "Interactive Highlight" },
    { val: "32px Radius", label: "PILLOWED CORNERS", sub: "Organic Rounding" },
    { val: "RGBA Dual", label: "OPPOSING SHADOWS", sub: "Smooth Alpha Blending" }
  ];

  return (
    <section className="bg-[#E0E5EC] py-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#E0E5EC] p-6 rounded-[24px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
            <div className="text-3xl font-extrabold text-[#6C63FF] mb-1">{s.val}</div>
            <div className="font-['DM_Sans'] text-xs font-bold text-[#3D4852] uppercase tracking-wider">{s.label}</div>
            <div className="font-['DM_Sans'] text-[10px] text-[#6B7280] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

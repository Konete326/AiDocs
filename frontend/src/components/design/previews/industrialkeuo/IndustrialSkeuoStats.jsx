import React from "react";

export const IndustrialSkeuoStats = () => {
  const stats = [
    { val: "#E0E5EC", label: "CHASSIS GREY", sub: "Base Surface Level 0" },
    { val: "#FF4757", label: "SAFETY ORANGE", sub: "Braun Accent Trigger" },
    { val: "Dual 8px", label: "NEUMORPHIC LIGHT", sub: "45° Top-Left Source" },
    { val: "Inter/Mono", label: "TYPE DUALITY", sub: "Humanist + Monospace" }
  ];

  return (
    <section className="bg-[#2d3436] border-b border-[#a3b1c6] py-12 font-mono text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#252a2c] border border-white/10 p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-[#ff4757] mb-1">{s.val}</div>
            <div className="text-xs font-bold text-white uppercase tracking-widest">{s.label}</div>
            <div className="text-[10px] text-[#a8b2d1] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

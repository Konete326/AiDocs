import React from "react";

export const CyberpunkStats = () => {
  const stats = [
    { val: "#00FF88", label: "MATRIX GREEN", sub: "Primary Neon", glow: "border-[#00ff88] text-[#00ff88]" },
    { val: "#FF00FF", label: "HOT MAGENTA", sub: "Secondary Glitch", glow: "border-[#ff00ff] text-[#ff00ff]" },
    { val: "#00D4FF", label: "CYAN RAY", sub: "HUD Blue", glow: "border-[#00d4ff] text-[#00d4ff]" },
    { val: "SCANLINES", label: "CRT MONITOR", sub: "Visual Noise", glow: "border-white text-white" }
  ];

  return (
    <section className="bg-[#12121a] border-b border-[#2a2a3a] py-12 font-mono">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`bg-[#0a0a0f] border ${s.glow} p-6 shadow-md`}>
            <div className="font-['Orbitron'] text-3xl font-black mb-1">{s.val}</div>
            <div className="text-xs font-bold uppercase tracking-wider">{s.label}</div>
            <div className="text-[10px] text-[#6b7280] uppercase mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

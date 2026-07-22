import React from "react";

export const VaporwaveStats = () => {
  const stats = [
    { val: "#FF00FF", label: "HOT MAGENTA", sub: "Hero Neon", glow: "border-[#FF00FF] text-[#FF00FF] shadow-[0_0_10px_#FF00FF]" },
    { val: "#00FFFF", label: "ELECTRIC CYAN", sub: "Secondary Glow", glow: "border-[#00FFFF] text-[#00FFFF] shadow-[0_0_10px_#00FFFF]" },
    { val: "-SKEW-12", label: "DYNAMIC SKEW", sub: "Kinetic Geometry", glow: "border-[#FF9900] text-[#FF9900] shadow-[0_0_10px_#FF9900]" },
    { val: "CRT 240P", label: "SCANLINE GRID", sub: "CRT Monitor Noise", glow: "border-white text-white shadow-[0_0_10px_white]" }
  ];

  return (
    <section className="bg-[#1a103c]/90 border-b border-[#2D1B4E] py-12 font-mono">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`bg-[#090014] border-2 ${s.glow} p-6 shadow-md`}>
            <div className="font-['Orbitron'] text-3xl font-black mb-1">{s.val}</div>
            <div className="text-xs font-bold uppercase tracking-widest">{s.label}</div>
            <div className="text-[10px] text-[#E0E0E0]/60 uppercase mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

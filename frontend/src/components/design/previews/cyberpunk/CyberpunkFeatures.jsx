import React from "react";

export const CyberpunkFeatures = () => {
  const cards = [
    { code: "01//", title: "CHROMATIC ABERRATION", desc: "RGB color splitting (red/cyan offsets) simulating lens distortion and raw terminal signals.", color: "border-[#00ff88] text-[#00ff88]" },
    { code: "02//", title: "CRT SCANLINES OVERLAY", desc: "Subtle horizontal scanline texture mimicking CRT screen refresh rates across the dark void.", color: "border-[#ff00ff] text-[#ff00ff]" },
    { code: "03//", title: "CHAMFERED CORNER CUTS", desc: "Hard 45° corner cuts via clip-path polygons creating a militaristic tech panel aesthetic.", color: "border-[#00d4ff] text-[#00d4ff]" }
  ];

  return (
    <section id="features" className="bg-[#0a0a0f] border-b border-[#2a2a3a] py-20 font-['Orbitron',sans-serif] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-widest">// ARCHITECTURE</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0] mt-1">CYBERNETIC NODES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`bg-[#12121a] border ${c.color} p-8 relative shadow-lg hover:shadow-xl transition-all`}>
              <span className="font-mono text-xs font-bold block mb-3">{c.code}</span>
              <h3 className="text-xl font-black uppercase mb-3 text-[#e0e0e0]">{c.title}</h3>
              <p className="font-['JetBrains_Mono',monospace] text-sm text-[#6b7280] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

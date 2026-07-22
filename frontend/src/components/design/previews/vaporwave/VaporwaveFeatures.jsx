import React from "react";

export const VaporwaveFeatures = () => {
  const cards = [
    { title: "PERSPECTIVE GRID FLOOR", desc: "Receding 3D wireframe grid floors fading into the neon horizon gradient.", border: "border-t-2 border-t-[#00FFFF] border-b border-b-[#FF00FF]/30", text: "text-[#00FFFF]" },
    { title: "SKEWED KINETIC CONTAINERS", desc: "Buttons and badges transform from -skew-x-12 to normal alignment on hover.", border: "border-t-2 border-t-[#FF00FF] border-b border-b-[#00FFFF]/30", text: "text-[#FF00FF]" },
    { title: "GLOBAL CRT SCANLINE OVERLAY", desc: "Horizontal scanlines overlay with subtle RGB chromatic aberration distortion.", border: "border-t-2 border-t-[#FF9900] border-b border-b-[#FF00FF]/30", text: "text-[#FF9900]" }
  ];

  return (
    <section id="features" className="bg-[#090014] border-b border-[#2D1B4E] py-20 font-['Orbitron',sans-serif] text-[#E0E0E0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs text-[#00FFFF] uppercase tracking-widest">// SYNTHESIZER</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#E0E0E0] mt-1">OUTRUN PROTOCOLS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`bg-[#1a103c]/80 border ${c.border} p-8 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all`}>
              <span className={`font-mono text-xs font-bold block mb-3 ${c.text}`}>SYS_NODE 0{i + 1}</span>
              <h3 className={`text-xl font-bold uppercase mb-3 ${c.text}`}>{c.title}</h3>
              <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

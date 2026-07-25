import React from "react";

export const MaximalismFeatures = () => {
  const cards = [
    { title: "TRIPLE STACK TEXT SHADOWS", desc: "Text shadow offset stacks (2px 2px #7B2FFF, 4px 4px #FF3AF2, 6px 6px #00F5D4) for 3D comic energy.", border: "border-[#FF3AF2]", shadow: "shadow-[8px_8px_0_#FFE600,16px_16px_0_#00F5D4]", rot: "-rotate-1" },
    { title: "5-ACCENT COLOR ROTATION", desc: "Systematic rotation across Magenta (#FF3AF2), Cyan (#00F5D4), Yellow (#FFE600), Orange (#FF6B35), Purple (#7B2FFF).", border: "border-[#00F5D4]", shadow: "shadow-[8px_8px_0_#FF3AF2,16px_16px_0_#FFE600]", rot: "rotate-2" },
    { title: "PATTERN-ON-PATTERN OVERLAY", desc: "Layering dot grid radial patterns, 45° diagonal stripes, and floating decorative sparkles.", border: "border-[#FFE600]", shadow: "shadow-[8px_8px_0_#7B2FFF,16px_16px_0_#FF3AF2]", rot: "-rotate-2" }
  ];

  return (
    <section id="features" className="bg-[#0D0D1A] border-b-4 border-[#00F5D4] py-20 font-['Outfit',sans-serif] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase font-black text-[#FFE600] tracking-widest">// SENSORY OVERLOAD</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 [text-shadow:3px_3px_0_#FF3AF2]">MAXIMALIST LAWS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className={`bg-[#2D1B4E]/80 border-4 ${c.border} p-8 rounded-3xl ${c.shadow} ${c.rot} hover:rotate-0 hover:scale-105 transition-all`}>
              <span className="font-mono text-xs font-black text-[#00F5D4] block mb-3">OVERLOAD 0{i + 1}</span>
              <h3 className="text-2xl font-black uppercase mb-3 text-white">{c.title}</h3>
              <p className="font-['DM_Sans'] text-sm text-white/80 leading-relaxed font-bold">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

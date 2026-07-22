import React from "react";

export const IndustrialSkeuoFeatures = () => {
  const cards = [
    { title: "DUAL NEUMORPHIC SHADOWS", desc: "Dual dark below right (#babecc) and white highlight top left (#ffffff) simulating 3D mass." },
    { title: "INTERACTION SHADOW INVERSION", desc: "Buttons physically depress into the chassis surface with inset shadows on click active states." },
    { title: "MANUFACTURING SCREWS & SLOTS", desc: "Corner screw head indents and ventilation slot recesses providing authentic hardware polish." }
  ];

  return (
    <section id="features" className="bg-[#e0e5ec] border-b border-[#a3b1c6] py-20 font-['Inter',sans-serif] text-[#2d3436]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase font-bold text-[#ff4757] tracking-widest">// SPECIFICATION</span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1 drop-shadow-[0_1px_0_#ffffff]">HARDWARE DNA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#e0e5ec] border border-white/60 p-8 rounded-2xl shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] hover:-translate-y-1 transition-all">
              <span className="font-mono text-xs font-bold text-[#ff4757] block mb-3">MODULE 0{i + 1}</span>
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-sm text-[#4a5568] leading-relaxed font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

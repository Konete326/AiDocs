import React from "react";

export const ClaymorphismFeatures = () => {
  const cards = [
    { title: "4-LAYER SHADOW STACK", desc: "Outer ambient occlusion, top-left highlight, inner bounce light, and specimen rim light for 3D realism." },
    { title: "SUPER-ROUNDED GEOMETRY", desc: "Aggressive rounded corners (32px to 60px) signaling safety, warmth, and approachability." },
    { title: "CONVEX VS CONCAVE PHYSICS", desc: "Interactive cards bulge out convexly; inputs and active clicks compress concave into the surface." }
  ];

  return (
    <section id="features" className="bg-[#F4F1FA] border-b border-[#332F3A]/10 py-20 font-['Nunito',sans-serif] text-[#332F3A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase font-black bg-white/80 border border-white px-4 py-1.5 rounded-full text-[#7C3AED] shadow-[4px_4px_8px_rgba(160,150,180,0.2)]">DIGITAL CLAY</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">TACTILE PHYSICS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-[16px_16px_32px_rgba(160,150,180,0.2),-10px_-10px_24px_rgba(255,255,255,0.9)] hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white flex items-center justify-center font-black text-lg mb-4 shadow-[6px_6px_12px_rgba(124,58,237,0.3)]">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-black mb-3">{c.title}</h3>
              <p className="font-['DM_Sans'] text-sm text-[#635F69] leading-relaxed font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

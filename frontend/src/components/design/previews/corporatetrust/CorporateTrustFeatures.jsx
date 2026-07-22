import React from "react";
import { Shield, Palette, Layers } from "lucide-react";

export const CorporateTrustFeatures = () => {
  const cards = [
    { icon: Shield, title: "Colored Soft Shadows", desc: "Blue and purple tinted shadows (0 4px 20px rgba(79,70,229,0.1)) replacing flat monochrome grays." },
    { icon: Palette, title: "Purposeful Gradients", desc: "Indigo-to-violet gradient signature utilized for key interactive triggers and headlines." },
    { icon: Layers, title: "Elevated Card Dynamics", desc: "White surface cards lifting smoothly on hover with enhanced elevation shadows." }
  ];

  return (
    <section id="features" className="bg-slate-50 border-b border-slate-200 py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase font-semibold text-indigo-600 tracking-wider">FOUNDATION</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mt-1">CORPORATE TRUST DNA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.1)] hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.15)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  <IconComp size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

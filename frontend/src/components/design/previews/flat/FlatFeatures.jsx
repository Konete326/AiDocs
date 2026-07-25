import React from "react";
import { CheckCircle2, Zap, Layers } from "lucide-react";

export const FlatFeatures = () => {
  const cards = [
    { icon: CheckCircle2, title: "Zero Artificial Depth", desc: "No drop shadows, bevels, or realistic gradients. Relies purely on size, color, and form.", color: "bg-blue-50 text-[#3B82F6]" },
    { icon: Zap, title: "Color as Structure", desc: "Solid background color blocks define grouping cleanly without thin lines or shadows.", color: "bg-emerald-50 text-[#10B981]" },
    { icon: Layers, title: "Snappy Scale Feedback", desc: "Hover states offer instantaneous tactile feedback through scale (hover:scale-105).", color: "bg-amber-50 text-[#F59E0B]" }
  ];

  return (
    <section id="features" className="bg-[#F3F4F6] py-20 font-['Outfit']">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold">FEATURES</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-1">Flat Design Principles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-white rounded-lg p-8 shadow-none hover:scale-[1.02] transition-transform duration-200 cursor-pointer group">
                <div className={`w-12 h-12 rounded-md ${c.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComp size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Circle, Square, Triangle } from "lucide-react";

export const BauhausFeatures = () => {
  const cards = [
    { icon: Circle, title: "CIRCULAR HARMONY", desc: "Pure rounded forms combined with stark primary tones to ground interface structure.", color: "bg-[#D02020]", shape: "rounded-full" },
    { icon: Square, title: "SQUARE STABILITY", desc: "90-degree architectural precision ensuring solid layout hierarchy across all screens.", color: "bg-[#1040C0]", shape: "rounded-none" },
    { icon: Triangle, title: "DYNAMIC ANGLES", desc: "Constructivist geometric angles breaking horizontal flow with bold visual tension.", color: "bg-[#F0C020]", shape: "rotate-45" }
  ];

  return (
    <section id="features" className="bg-[#F0F0F0] border-b-4 border-[#121212] py-20 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-bold text-xs uppercase tracking-widest text-[#1040C0]">CORE ARCHITECTURE</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-[#121212] tracking-tighter mt-1">GEOMETRIC PRIMITIVES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div key={i} className="bg-white border-4 border-[#121212] p-8 shadow-[8px_8px_0px_0px_#121212] relative group hover:-translate-y-2 transition-transform">
                <div className={`w-12 h-12 ${c.color} border-2 border-[#121212] flex items-center justify-center text-white mb-6 shadow-[3px_3px_0px_0px_#121212] ${c.shape}`}>
                  <IconComp size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase text-[#121212] mb-3">{c.title}</h3>
                <p className="text-sm font-medium text-neutral-700 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

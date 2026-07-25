import React from "react";
import { Check } from "lucide-react";

export const KineticPricing = () => {
  const tiers = [
    { name: "STATIC", price: "$29", popular: false },
    { name: "KINETIC PRO", price: "$79", popular: true },
    { name: "MAXIMAL", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#09090B] border-b-2 border-[#3F3F46] py-20 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-[95vw] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs text-[#DFE104] font-extrabold uppercase tracking-widest">[ TIERS ]</span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-[#FAFAFA] mt-1">SELECT INTENSITY</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border-2 flex flex-col justify-between ${t.popular ? "border-[#DFE104] bg-[#DFE104] text-black" : "border-[#3F3F46] bg-[#09090B] text-[#FAFAFA]"}`}>
              <div>
                {t.popular && <span className="text-[10px] bg-black text-[#DFE104] font-extrabold px-3 py-1 uppercase tracking-widest mb-4 inline-block">MOST INTENSE</span>}
                <h3 className="text-3xl font-extrabold uppercase mb-2">{t.name}</h3>
                <div className="text-5xl font-extrabold mb-6">{t.price}<span className="text-xs uppercase">/mo</span></div>
                <ul className="space-y-3 font-bold text-xs uppercase mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Space Grotesk Clamp Engine</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Acid Yellow Color Flood</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 text-xs font-extrabold uppercase tracking-tight ${t.popular ? "bg-black text-[#DFE104] hover:bg-white hover:text-black" : "bg-[#DFE104] text-black hover:scale-105"} transition-all`}>
                GET {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

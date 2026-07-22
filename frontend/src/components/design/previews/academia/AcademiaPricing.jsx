import React from "react";
import { Check } from "lucide-react";

export const AcademiaPricing = () => {
  const tiers = [
    { num: "I", name: "SCHOLAR", price: "$1,200", popular: false },
    { num: "II", name: "FELLOWSHIP", price: "$3,600", popular: true },
    { num: "III", name: "PROFESSORATE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#1C1714] border-b border-[#4A3F35] py-24 font-['Cormorant_Garamond',serif] text-[#E8DFD4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#C9A962]">VOLUME III // ENDOWMENT</span>
          <h2 className="text-4xl md:text-5xl text-[#E8DFD4] mt-1">FELLOWSHIP RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-[4px] border ${t.popular ? "border-[#C9A962] bg-[#251E19] shadow-xl" : "border-[#4A3F35] bg-[#1C1714]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#8B2635] text-[#E8DFD4] font-['Cinzel'] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-[#C9A962]">WAX SEAL ENDORSED</span>}
                <span className="font-['Cinzel'] text-xs text-[#C9A962] tracking-widest block mb-1">CANON {t.num}</span>
                <h3 className="font-['Cinzel'] text-2xl mb-2">{t.name}</h3>
                <div className="text-4xl text-[#C9A962] mb-6">{t.price}</div>
                <ul className="space-y-3 font-['Crimson_Pro'] text-sm text-[#9C8B7A] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#C9A962]" /><span>Cormorant Serif Typography</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#C9A962]" /><span>Polished Brass Accent Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 font-['Cinzel'] text-xs uppercase tracking-[0.2em] rounded-[4px] ${t.popular ? "bg-gradient-to-b from-[#D4B872] via-[#C9A962] to-[#B8953F] text-[#1C1714] font-bold" : "border border-[#C9A962] text-[#C9A962] hover:bg-[#8B2635] hover:border-[#8B2635] hover:text-[#E8DFD4]"} transition-all`}>
                INITIATE SUITE
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

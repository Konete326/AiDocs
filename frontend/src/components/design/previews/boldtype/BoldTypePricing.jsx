import React from "react";
import { Check } from "lucide-react";

export const BoldTypePricing = () => {
  const tiers = [
    { name: "EDITORIAL", price: "$39", popular: false },
    { name: "VERMILLION PRO", price: "$99", popular: true },
    { name: "MANIFESTO", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#0A0A0A] border-b border-[#262626] py-24 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold">// MEMBERSHIP</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#FAFAFA] mt-1">RESTRAINED RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border ${t.popular ? "border-2 border-[#FF3D00] bg-[#0F0F0F]" : "border-[#262626] bg-[#0A0A0A]"} flex flex-col justify-between`}>
              <div>
                {t.popular && <span className="font-mono text-[10px] bg-[#FF3D00] text-[#0A0A0A] font-bold px-3 py-1 uppercase tracking-widest mb-4 inline-block">RECOMMENDED</span>}
                <h3 className="text-2xl font-black uppercase mb-2">{t.name}</h3>
                <div className="text-5xl font-black text-[#FF3D00] mb-6">{t.price}<span className="text-xs text-[#737373] uppercase font-normal">/mo</span></div>
                <ul className="space-y-3 text-xs uppercase tracking-wider text-[#737373] mb-8 font-medium">
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#FF3D00]" /><span>Inter Tight Display Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#FF3D00]" /><span>Vermillion Red Underlines</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 text-xs font-bold uppercase tracking-wider border ${t.popular ? "bg-[#FF3D00] text-[#0A0A0A] border-[#FF3D00]" : "border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"} transition-colors`}>
                SUBSCRIBE {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Check } from "lucide-react";

export const MaximalismPricing = () => {
  const tiers = [
    { name: "SKITTLES", price: "$39", popular: false, border: "border-[#00F5D4]", shadow: "shadow-[8px_8px_0_#FF3AF2]" },
    { name: "HYPERPOP PRO", price: "$99", popular: true, border: "border-[#FFE600]", shadow: "shadow-[12px_12px_0_#FF3AF2,24px_24px_0_#00F5D4]" },
    { name: "DOPAMINE KING", price: "Custom", popular: false, border: "border-[#FF6B35]", shadow: "shadow-[8px_8px_0_#7B2FFF]" }
  ];

  return (
    <section id="pricing" className="bg-[#0D0D1A] border-b-4 border-[#FF3AF2] py-20 font-['Outfit',sans-serif] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase font-black text-[#FF3AF2] tracking-widest">// EUPHORIA PASS</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 [text-shadow:3px_3px_0_#7B2FFF]">BOOM RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 bg-[#2D1B4E]/90 border-4 ${t.border} rounded-3xl ${t.shadow} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-4 right-6 bg-[#FF3AF2] text-[#0D0D1A] font-black text-[10px] uppercase px-4 py-1.5 rounded-full border-2 border-[#FFE600] shadow-[3px_3px_0_#00F5D4] rotate-3">HYPERPOP KING</span>}
                <h3 className="text-3xl font-black uppercase mb-2 text-white">{t.name}</h3>
                <div className="text-5xl font-black text-[#FFE600] mb-6 [text-shadow:2px_2px_0_#FF3AF2]">{t.price}<span className="text-xs font-normal text-white/70">/mo</span></div>
                <ul className="space-y-3 font-['DM_Sans'] text-xs font-bold uppercase text-white/90 mb-8">
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#00F5D4]" /><span>Outfit & DM Sans Hyper Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#00F5D4]" /><span>5 Electric Accent Rotation System</span></li>
                </ul>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[#FF3AF2] via-[#7B2FFF] to-[#00F5D4] border-4 border-[#FFE600] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-[4px_4px_0_#00F5D4] hover:scale-105 transition-all">
                CLAIM {t.name} ⚡
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

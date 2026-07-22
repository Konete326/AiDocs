import React from "react";
import { Check } from "lucide-react";

export const IndustrialSkeuoPricing = () => {
  const tiers = [
    { name: "TACTILE", price: "$39", popular: false },
    { name: "CHASSIS PRO", price: "$119", popular: true },
    { name: "TEENAGE TECH", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#e0e5ec] border-b border-[#a3b1c6] py-20 font-['Inter',sans-serif] text-[#2d3436]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase font-bold text-[#ff4757] tracking-widest">// MODULE RATES</span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1 drop-shadow-[0_1px_0_#ffffff]">HARDWARE TIERS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-2xl bg-[#e0e5ec] border border-white/60 ${t.popular ? "shadow-[12px_12px_24px_#babecc,-12px_-12px_24px_#ffffff] border-l-4 border-l-[#ff4757]" : "shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#ff4757] text-white font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-[0_0_10px_2px_rgba(255,71,87,0.4)]">RECOMMENDED SWITCH</span>}
                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <div className="text-4xl font-mono font-bold text-[#ff4757] mb-6">{t.price}<span className="text-xs text-[#4a5568] font-normal">/mo</span></div>
                <ul className="space-y-3 text-xs font-semibold text-[#4a5568] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#ff4757]" /><span>Inter & JetBrains Mono Fonts</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#ff4757]" /><span>Neumorphic Dual Shadow Engine</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-widest ${t.popular ? "bg-[#ff4757] text-white shadow-[4px_4px_8px_rgba(166,50,60,0.4)]" : "bg-[#e0e5ec] text-[#2d3436] shadow-[6px_6px_12px_#babecc,-6px_-6px_12px_#ffffff]"} active:translate-y-[2px] transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

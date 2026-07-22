import React from "react";
import { Check } from "lucide-react";

export const MinDarkPricing = () => {
  const tiers = [
    { name: "NOCTURNE", price: "$29", popular: false },
    { name: "AMBER PRO", price: "$89", popular: true },
    { name: "ENTERPRISE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#0A0A0F] border-b border-white/10 py-24 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium">PRICING</span>
          <h2 className="text-4xl font-bold tracking-tight mt-1">ATMOSPHERIC RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-xl border ${t.popular ? "border-[#F59E0B]/40 bg-[#1A1A24]/90 shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "border-white/10 bg-[#1A1A24]/50"} backdrop-blur-md flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#F59E0B] text-[#0A0A0F] font-['Inter'] text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]">RECOMMENDED</span>}
                <h3 className="text-2xl font-bold text-[#FAFAFA] mb-2">{t.name}</h3>
                <div className="text-4xl font-bold text-[#F59E0B] mb-6">{t.price}<span className="text-xs text-[#71717A] font-normal">/mo</span></div>
                <ul className="space-y-3 font-['Inter'] text-xs text-[#71717A] mb-8 font-normal">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#F59E0B]" /><span>Space Grotesk & Inter Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#F59E0B]" /><span>Warm Amber Ember Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 rounded-lg font-['Inter'] font-medium text-xs ${t.popular ? "bg-[#F59E0B] text-[#0A0A0F] shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "border border-white/15 text-[#FAFAFA] hover:bg-white/5"} active:scale-[0.98] transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Check } from "lucide-react";

export const MinimalistModernPricing = () => {
  const tiers = [
    { name: "Starter", price: "$29", popular: false },
    { name: "Pro Pulse", price: "$79", popular: true },
    { name: "Enterprise", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FAFAFA] py-20 font-['Inter'] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0052FF] font-semibold">PRICING</span>
          <h2 className="font-['Calistoga'] text-4xl text-[#0F172A] mt-2">Transparent Plans</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-2xl border flex flex-col justify-between ${t.popular ? "bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white p-[2px] shadow-xl shadow-blue-500/20" : "bg-white border-slate-200"}`}>
              <div className={t.popular ? "bg-white text-[#0F172A] p-7 rounded-[calc(16px-2px)] h-full flex flex-col justify-between" : ""}>
                <div>
                  {t.popular && <span className="text-[10px] font-mono uppercase bg-[#0052FF] text-white px-3 py-1 rounded-full mb-4 inline-block">Popular Choice</span>}
                  <h3 className="font-['Calistoga'] text-2xl mb-2">{t.name}</h3>
                  <div className="text-4xl font-bold mb-6">{t.price}<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                  <ul className="space-y-3 text-xs text-slate-600 mb-8 font-medium">
                    <li className="flex items-center space-x-2"><Check size={14} className="text-[#0052FF]" /><span>Calistoga Serif Token Suite</span></li>
                    <li className="flex items-center space-x-2"><Check size={14} className="text-[#0052FF]" /><span>Electric Blue Gradient</span></li>
                  </ul>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl font-medium text-xs shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
                  Select {t.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

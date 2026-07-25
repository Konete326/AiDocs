import React from "react";
import { Check } from "lucide-react";

export const MaterialPricing = () => {
  const tiers = [
    { name: "Personal", price: "$15", bg: "bg-[#F3EDF7] text-[#1C1B1F]", btn: "bg-[#6750A4] text-white", popular: false },
    { name: "Adaptive Pro", price: "$49", bg: "bg-[#E8DEF8] text-[#1D192B]", btn: "bg-[#6750A4] text-white", popular: true },
    { name: "Enterprise", price: "Custom", bg: "bg-[#F3EDF7] text-[#1C1B1F]", btn: "bg-[#6750A4] text-white", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FFFBFE] py-20 font-['Roboto'] border-b border-[#E7E0EC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold">PRICING</span>
          <h2 className="text-4xl font-medium text-[#1C1B1F] mt-1">Adaptive Tonal Plans</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-[32px] ${t.bg} shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow`}>
              <div>
                {t.popular && <span className="text-[10px] bg-[#6750A4] text-white font-medium px-3 py-1 rounded-full mb-4 inline-block">RECOMMENDED</span>}
                <h3 className="text-2xl font-medium mb-2">{t.name}</h3>
                <div className="text-4xl font-bold mb-6">{t.price}<span className="text-xs text-[#49454F] font-normal">/mo</span></div>
                <ul className="space-y-3 text-xs text-[#49454F] mb-8 font-normal">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#6750A4]" /><span>Roboto Canonical Font Suite</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#6750A4]" /><span>Purple Tonal Surface Hierarchy</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 ${t.btn} font-medium text-xs rounded-full shadow-sm active:scale-95 transition-all`}>
                Select {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

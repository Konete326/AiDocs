import React from "react";
import { Check } from "lucide-react";

export const CorporateTrustPricing = () => {
  const tiers = [
    { name: "GROWTH", price: "$49", popular: false },
    { name: "BUSINESS PRO", price: "$149", popular: true },
    { name: "ENTERPRISE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-slate-50 border-b border-slate-200 py-20 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold text-indigo-600 tracking-wider">PRICING</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mt-1">TRANSPARENT PLANS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-xl bg-white border ${t.popular ? "border-indigo-500 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.2)] md:scale-105" : "border-slate-200 shadow-[0_4px_20px_-2px_rgba(79,70,229,0.08)]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">MOST POPULAR</span>}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.name}</h3>
                <div className="text-4xl font-extrabold text-indigo-600 mb-6">{t.price}<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8 font-medium">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-emerald-500" /><span>Plus Jakarta Sans Type Scale</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-emerald-500" /><span>Indigo Colored Soft Shadows</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 rounded-full font-semibold text-xs ${t.popular ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"} hover:-translate-y-0.5 transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

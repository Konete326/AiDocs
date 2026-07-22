import React from "react";
import { Check } from "lucide-react";

export const NeumorphismPricing = () => {
  const tiers = [
    { name: "CLAY REST", price: "$29", popular: false },
    { name: "SOFT PRO", price: "$89", popular: true },
    { name: "MOLDED SUITE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#E0E5EC] py-20 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider">SUBSCRIPTION</span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-1">TACTILE TIERS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-[32px] bg-[#E0E5EC] ${t.popular ? "shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)] md:scale-105" : "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#6C63FF] text-white font-['DM_Sans'] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-[5px_5px_10px_rgb(163,177,198,0.6)]">MOST TACTILE</span>}
                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <div className="text-4xl font-extrabold text-[#6C63FF] mb-6">{t.price}<span className="text-xs text-[#6B7280] font-normal font-['DM_Sans']">/mo</span></div>
                <ul className="space-y-3 font-['DM_Sans'] text-xs font-semibold text-[#6B7280] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#38B2AC]" /><span>Plus Jakarta Sans & DM Sans Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#38B2AC]" /><span>Dual Opposing RGBA Shadows</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 rounded-2xl font-['DM_Sans'] font-bold text-xs uppercase tracking-wider ${t.popular ? "bg-[#6C63FF] text-white shadow-[9px_9px_16px_rgb(163,177,198,0.6)]" : "bg-[#E0E5EC] text-[#3D4852] shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)]"} active:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6)] transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

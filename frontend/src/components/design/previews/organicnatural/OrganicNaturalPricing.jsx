import React from "react";
import { Check } from "lucide-react";

export const OrganicNaturalPricing = () => {
  const tiers = [
    { name: "SEEDLING", price: "$25", popular: false },
    { name: "MOSS PRO", price: "$75", popular: true },
    { name: "FOREST SUITE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FDFCF8] py-20 font-['Fraunces',serif] text-[#2C2C24]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider">HARVEST</span>
          <h2 className="text-4xl font-bold tracking-tight text-[#2C2C24] mt-1">EARTHBOUND RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] bg-[#FEFEFA] border ${t.popular ? "border-[#5D7052] shadow-[0_10px_40px_-10px_rgba(193,140,93,0.2)] md:scale-105" : "border-[#DED8CF]/50 shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#C18C5D] text-white font-['Nunito'] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-xs">ORGANIC CHOICE</span>}
                <h3 className="text-2xl font-bold text-[#2C2C24] mb-2">{t.name}</h3>
                <div className="text-4xl font-bold text-[#5D7052] mb-6">{t.price}<span className="text-xs text-[#78786C] font-normal font-['Nunito']">/mo</span></div>
                <ul className="space-y-3 font-['Nunito'] text-xs font-bold text-[#78786C] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#5D7052]" /><span>Fraunces & Nunito Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#5D7052]" /><span>3% Global Grain Texture Overlay</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 rounded-full font-['Nunito'] font-bold text-xs uppercase tracking-wider ${t.popular ? "bg-[#5D7052] text-[#F3F4F1] shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)]" : "border-2 border-[#C18C5D] text-[#C18C5D] hover:bg-[#C18C5D]/10"} hover:scale-105 active:scale-95 transition-all`}>
                INITIATE {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

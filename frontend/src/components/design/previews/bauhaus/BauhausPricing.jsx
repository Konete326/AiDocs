import React from "react";
import { Check } from "lucide-react";

export const BauhausPricing = () => {
  const tiers = [
    { name: "STUDENT", price: "$19", color: "bg-white", buttonBg: "bg-[#1040C0]", buttonText: "text-white" },
    { name: "MASTER", price: "$49", color: "bg-[#D02020] text-white", buttonBg: "bg-[#F0C020]", buttonText: "text-black", popular: true },
    { name: "WORKSHOP", price: "$99", color: "bg-white", buttonBg: "bg-[#121212]", buttonText: "text-white" }
  ];

  return (
    <section id="pricing" className="bg-[#F0F0F0] border-b-4 border-[#121212] py-20 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-bold text-xs uppercase tracking-widest text-[#D02020]">MEMBERSHIP</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-[#121212] tracking-tighter mt-1">SELECT YOUR TIER</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`${t.color} border-4 border-[#121212] p-8 shadow-[8px_8px_0px_0px_#121212] flex flex-col justify-between relative`}>
              {t.popular && (
                <div className="absolute -top-5 right-6 bg-[#F0C020] text-black border-2 border-[#121212] font-black text-[10px] uppercase tracking-widest px-3 py-1 shadow-[2px_2px_0px_0px_#121212]">
                  MOST POPULAR
                </div>
              )}
              <div>
                <h3 className="text-2xl font-black uppercase mb-4">{t.name}</h3>
                <div className="text-5xl font-black mb-6">{t.price}<span className="text-xs font-bold uppercase">/mo</span></div>
                <ul className="space-y-3 font-bold text-xs uppercase tracking-wider mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Full vector access</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Primary color tokens</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Constructivist layouts</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 ${t.buttonBg} ${t.buttonText} font-black text-xs uppercase tracking-wider border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

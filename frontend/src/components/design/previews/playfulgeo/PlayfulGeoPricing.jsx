import React from "react";
import { Check } from "lucide-react";

export const PlayfulGeoPricing = () => {
  const tiers = [
    { name: "STICKER", price: "$19", bg: "bg-white", popular: false },
    { name: "CONFETTI PRO", price: "$49", bg: "bg-[#F472B6] text-white scale-105", popular: true },
    { name: "PLAYGROUND", price: "Custom", bg: "bg-white", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FFFDF5] border-b-2 border-[#1E293B] py-20 font-['Outfit',sans-serif] text-[#1E293B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold bg-[#34D399] border-2 border-[#1E293B] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E293B]">SUBSCRIPTION</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">OPTIMISTIC RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border-2 border-[#1E293B] rounded-2xl ${t.bg} shadow-[6px_6px_0px_0px_#1E293B] flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-4 right-6 bg-[#FBBF24] text-[#1E293B] font-extrabold text-[10px] uppercase px-3 py-1 rounded-full border-2 border-[#1E293B] rotate-3 shadow-[2px_2px_0px_0px_#1E293B]">MOST POPULAR</span>}
                <h3 className="text-3xl font-extrabold mb-2">{t.name}</h3>
                <div className="text-5xl font-extrabold mb-6">{t.price}<span className="text-xs font-normal">/mo</span></div>
                <ul className="space-y-3 font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase mb-8">
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#8B5CF6]" /><span>Outfit Display Typography</span></li>
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#8B5CF6]" /><span>Hard 4px Offset Drop Shadows</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 rounded-full font-extrabold text-xs uppercase border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] ${t.popular ? "bg-[#8B5CF6] text-white" : "bg-[#FBBF24] text-[#1E293B]"} hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Check } from "lucide-react";

export const NeoBrutalismPricing = () => {
  const tiers = [
    { name: "PUNK", price: "$25", bg: "bg-white text-black", popular: false },
    { name: "REBEL PRO", price: "$65", bg: "bg-[#FFD93D] text-black -rotate-1", popular: true },
    { name: "MAINFRAME", price: "Custom", bg: "bg-[#C4B5FD] text-black", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FFFDF5] border-b-4 border-black py-20 font-['Space_Grotesk'] text-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-black bg-[#FF6B6B] text-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_#000]">PLANS</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter mt-2">NO-BS PRICING</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border-4 border-black ${t.bg} shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between`}>
              <div>
                {t.popular && <span className="text-[10px] bg-[#FF6B6B] text-white font-black px-3 py-1 border-2 border-black uppercase tracking-widest mb-4 inline-block">HOT CHOICE</span>}
                <h3 className="text-3xl font-black uppercase mb-2">{t.name}</h3>
                <div className="text-5xl font-black mb-6">{t.price}<span className="text-xs">/mo</span></div>
                <ul className="space-y-3 text-xs font-bold uppercase mb-8">
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} /><span>Space Grotesk 900 Token</span></li>
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} /><span>45° Block Shadow Suite</span></li>
                </ul>
              </div>
              <button className="w-full py-4 bg-[#FF6B6B] text-white font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

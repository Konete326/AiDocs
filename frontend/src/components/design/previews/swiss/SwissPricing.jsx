import React from "react";
import { Check } from "lucide-react";

export const SwissPricing = () => {
  const tiers = [
    { name: "STANDARD", price: "$29", popular: false },
    { name: "INTERNATIONAL", price: "$89", popular: true },
    { name: "ARCHITECTURAL", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-white border-b-4 border-black py-20 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF3000] font-black">03. PRICING</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mt-1">MATHEMATICAL RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border-4 border-black flex flex-col justify-between ${t.popular ? "bg-[#FF3000] text-white" : "bg-white text-black"}`}>
              <div>
                {t.popular && <span className="text-[10px] font-black uppercase bg-black text-white px-3 py-1 mb-4 inline-block tracking-widest">OFFICIAL CANON</span>}
                <h3 className="text-2xl font-black uppercase mb-2">{t.name}</h3>
                <div className="text-5xl font-black mb-6">{t.price}<span className="text-xs uppercase font-bold">/mo</span></div>
                <ul className="space-y-3 font-bold text-xs uppercase tracking-wider mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Inter Black 900 Hierarchy</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Swiss Red Signal Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 text-xs font-black uppercase tracking-widest border-4 border-black ${t.popular ? "bg-black text-white hover:bg-white hover:text-black" : "bg-black text-white hover:bg-[#FF3000]"} transition-colors`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

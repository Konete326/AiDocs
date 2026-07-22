import React from "react";
import { Check } from "lucide-react";

export const BitcoinDeFiPricing = () => {
  const tiers = [
    { name: "SATOSHI", price: "0.01 BTC", popular: false },
    { name: "GOLD VAULT PRO", price: "0.05 BTC", popular: true },
    { name: "CITADEL INSTITUTIONAL", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#08080C] border-b border-[#F7931A]/20 py-20 font-['Space_Grotesk'] text-[#F4F4F6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#FFD700] uppercase tracking-widest">// DEPOSIT TIERS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-1">NON-CUSTODIAL VAULTS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${t.popular ? "border-[#F7931A] bg-[#12121A] shadow-[0_0_25px_rgba(247,147,26,0.25)]" : "border-[#F7931A]/20 bg-[#08080C]"} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">MOST VALUABLE</span>}
                <h3 className="text-2xl font-bold text-white mb-2">{t.name}</h3>
                <div className="text-4xl font-mono font-bold text-[#F7931A] mb-6">{t.price}</div>
                <ul className="space-y-3 font-mono text-xs text-[#A0A0B0] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#FFD700]" /><span>JetBrains Monospace Data Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#FFD700]" /><span>Bitcoin Orange Fire Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 font-mono font-bold text-xs uppercase tracking-wider rounded-xl ${t.popular ? "bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] shadow-[0_0_15px_rgba(247,147,26,0.4)]" : "bg-[#12121A] text-[#F7931A] border border-[#F7931A]/40 hover:bg-[#F7931A]/10"} transition-all`}>
                OPEN {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

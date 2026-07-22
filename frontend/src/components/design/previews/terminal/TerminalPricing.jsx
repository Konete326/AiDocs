import React from "react";
import { Check } from "lucide-react";

export const TerminalPricing = () => {
  const tiers = [
    { name: "GUEST_USER", price: "$0", popular: false },
    { name: "ROOT_ACCESS", price: "$49", popular: true },
    { name: "MAINFRAME", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#0a0a0a] border-b-2 border-[#1f521f] py-20 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs text-[#ffb000] font-bold">[ SUBSCRIPTION_PLANS ]</span>
          <h2 className="text-3xl font-bold text-[#33ff00] mt-1">Select Access Tier</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-6 border-2 flex flex-col justify-between ${t.popular ? "border-[#33ff00] bg-[#1f521f]/20" : "border-[#1f521f] bg-[#0a0a0a]"}`}>
              <div>
                {t.popular && <span className="text-[10px] bg-[#33ff00] text-black font-bold px-2 py-0.5 mb-4 inline-block">[ RECOMMENDED ]</span>}
                <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                <div className="text-3xl font-bold mb-6 text-[#ffb000]">{t.price}<span className="text-xs text-[#33ff00]/60">/mo</span></div>
                <ul className="space-y-3 text-xs mb-8">
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#33ff00]" /><span>VT323 Monospace Engine</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#33ff00]" /><span>Phoshor CRT Glow Token</span></li>
                </ul>
              </div>
              <button className={`w-full py-3 text-xs font-bold uppercase ${t.popular ? "bg-[#33ff00] text-black hover:bg-[#ffb000]" : "border border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00] hover:text-black"}`}>
                [ GRANT_ACCESS ]
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

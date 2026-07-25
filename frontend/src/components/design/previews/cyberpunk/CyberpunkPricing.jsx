import React from "react";
import { Check } from "lucide-react";

export const CyberpunkPricing = () => {
  const tiers = [
    { name: "NETRUNNER", price: "0x39", glow: "border-[#00ff88]", btn: "bg-[#00ff88] text-[#0a0a0f]", popular: false },
    { name: "CYBERDECK PRO", price: "0x99", glow: "border-[#ff00ff] shadow-[0_0_15px_#ff00ff40]", btn: "bg-[#ff00ff] text-white", popular: true },
    { name: "BLACK ICE", price: "0xFF", glow: "border-[#00d4ff]", btn: "bg-[#00d4ff] text-[#0a0a0f]", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#0a0a0f] border-b border-[#2a2a3a] py-20 font-['Orbitron',sans-serif] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#ff00ff] uppercase tracking-widest">// ACCESS CODE</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#e0e0e0] mt-1">SUBSCRIPTION PROTOCOL</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 bg-[#12121a] border ${t.glow} flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#ff00ff] text-white font-mono text-[10px] uppercase font-bold px-3 py-1 border border-[#0a0a0f]">HACKER CHOICE</span>}
                <h3 className="text-2xl font-black uppercase mb-2">{t.name}</h3>
                <div className="text-4xl font-mono font-bold text-[#00ff88] mb-6">{t.price}<span className="text-xs text-[#6b7280]">/ETH</span></div>
                <ul className="space-y-3 font-mono text-xs text-[#6b7280] mb-8 uppercase">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#00ff88]" /><span>Orbitron Display Font</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#00ff88]" /><span>Neon Glitch Stacking</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 font-mono font-bold text-xs uppercase tracking-widest ${t.btn} transition-all`}>
                DECRYPT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

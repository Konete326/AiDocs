import React from "react";
import { Check } from "lucide-react";

export const VaporwavePricing = () => {
  const tiers = [
    { name: "SYNTH", price: "$28", popular: false },
    { name: "OUTRUN PRO", price: "$88", popular: true },
    { name: "CYBER CITY", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#090014] border-b border-[#2D1B4E] py-20 font-['Orbitron',sans-serif] text-[#E0E0E0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#FF00FF] uppercase tracking-widest">// ACCESS PASS</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#E0E0E0] mt-1">SYNTHETIC TIERS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 bg-[#1a103c]/90 border-2 ${t.popular ? "border-[#FF00FF] shadow-[0_0_25px_#FF00FF]" : "border-[#00FFFF]/40"} backdrop-blur-md flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span className="absolute -top-3 right-6 bg-[#FF00FF] text-white font-mono text-[10px] uppercase font-bold px-3 py-1 border border-[#00FFFF] shadow-[0_0_10px_#FF00FF]">SYNTH HERO</span>}
                <h3 className="text-2xl font-black uppercase mb-2">{t.name}</h3>
                <div className="text-4xl font-mono font-bold text-[#00FFFF] mb-6">{t.price}<span className="text-xs text-[#E0E0E0]/60">/mo</span></div>
                <ul className="space-y-3 font-mono text-xs text-[#E0E0E0]/80 mb-8 uppercase">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#FF00FF]" /><span>Orbitron 900 Typography</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#FF00FF]" /><span>Perspective Grid Floor Lines</span></li>
                </ul>
              </div>
              <button className="-skew-x-12 transform border-2 border-[#00FFFF] bg-[#00FFFF] text-black font-mono font-bold text-xs uppercase tracking-widest py-4 hover:skew-x-0 hover:bg-[#FF00FF] hover:border-[#FF00FF] hover:text-white hover:shadow-[0_0_20px_#FF00FF] transition-all">
                <span className="inline-block skew-x-12 transform">ACQUIRE {t.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Check } from "lucide-react";

export const ClaymorphismPricing = () => {
  const tiers = [
    { name: "SILICONE", price: "$29", popular: false },
    { name: "CANDY PRO", price: "$79", popular: true },
    { name: "MATTE WORLD", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#F4F1FA] border-b border-[#332F3A]/10 py-20 font-['Nunito',sans-serif] text-[#332F3A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-black bg-white/80 border border-white px-4 py-1.5 rounded-full text-[#DB2777] shadow-[4px_4px_8px_rgba(160,150,180,0.2)]">SUBSCRIPTION</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">TACTILE TIERS</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-[36px] bg-white/70 backdrop-blur-xl border border-white shadow-[16px_16px_32px_rgba(160,150,180,0.2),-10px_-10px_24px_rgba(255,255,255,0.9)] flex flex-col justify-between relative hover:-translate-y-2 transition-all ${t.popular ? "border-[#7C3AED]/40 shadow-[20px_20px_40px_rgba(124,58,237,0.25)]" : ""}`}>
              <div>
                {t.popular && <span className="absolute -top-4 right-6 bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white font-black text-[10px] uppercase px-4 py-1 rounded-full shadow-[4px_4px_8px_rgba(219,39,119,0.3)]">SWEET CHOICE</span>}
                <h3 className="text-3xl font-black mb-2">{t.name}</h3>
                <div className="text-5xl font-black text-[#7C3AED] mb-6">{t.price}<span className="text-xs font-normal text-[#635F69]">/mo</span></div>
                <ul className="space-y-3 font-['DM_Sans'] text-xs font-bold text-[#635F69] uppercase mb-8">
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#10B981]" /><span>Nunito 900 Black Typography</span></li>
                  <li className="flex items-center space-x-2"><Check size={18} strokeWidth={3} className="text-[#10B981]" /><span>4-Layer Shadow Lighting Engine</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 rounded-[20px] font-black text-xs uppercase tracking-wider ${t.popular ? "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-[8px_8px_16px_rgba(124,58,237,0.3)]" : "bg-white text-[#332F3A] shadow-[8px_8px_16px_rgba(160,150,180,0.2)]"} hover:-translate-y-1 active:scale-[0.92] transition-all`}>
                SELECT {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

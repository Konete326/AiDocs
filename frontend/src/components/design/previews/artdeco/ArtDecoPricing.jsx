import React from "react";
import { Check } from "lucide-react";

export const ArtDecoPricing = () => {
  const tiers = [
    { num: "TIER I", name: "CHAMPAGNE", price: "$1,500", popular: false },
    { num: "TIER II", name: "MAJESTIC GOLD", price: "$4,500", popular: true },
    { num: "TIER III", name: "IMPERIAL ESTATE", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#0A0A0A] border-b-2 border-[#D4AF37]/30 py-24 font-['Marcellus'] text-[#F2F0E4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.3em] text-[#D4AF37]">RESERVED ACCESS</span>
          <h2 className="text-4xl uppercase tracking-[0.2em] text-[#F2F0E4] mt-2">MEMBERSHIP PRIVILEGE</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border ${t.popular ? "border-[#D4AF37] bg-[#141414] shadow-[0_0_25px_rgba(212,175,55,0.3)]" : "border-[#D4AF37]/30 bg-[#0A0A0A]"} flex flex-col justify-between`}>
              <div>
                <div className="font-['Josefin_Sans'] text-xs text-[#D4AF37] tracking-widest mb-1">{t.num}</div>
                <h3 className="text-2xl uppercase tracking-wider mb-2">{t.name}</h3>
                <div className="text-4xl text-[#D4AF37] mb-6">{t.price}</div>
                <ul className="space-y-3 font-['Josefin_Sans'] text-xs text-[#888888] uppercase mb-8">
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#D4AF37]" /><span>Marcellus Display Serif</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#D4AF37]" /><span>Metallic Gold Glow Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] border ${t.popular ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37] font-bold" : "bg-transparent text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A]"} transition-colors`}>
                INITIATE SUITE
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

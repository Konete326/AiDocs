import React from "react";
import { Check } from "lucide-react";

export const SerifPricing = () => {
  const tiers = [
    { name: "FOLIO", price: "$45", popular: false },
    { name: "COLLECTOR", price: "$120", popular: true },
    { name: "PATRON", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#FAFAF8] border-b border-[#E8E4DF] py-24 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium">CHAPTER II</span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] mt-1">EDITIONS & RATES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-lg border ${t.popular ? "border-[#B8860B] bg-[#FAFAF8] border-t-4 border-t-[#B8860B] shadow-md" : "border-[#E8E4DF] bg-white"} flex flex-col justify-between`}>
              <div>
                {t.popular && <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#B8860B] font-semibold uppercase tracking-[0.15em] mb-4 block">RECOMMENDED EDITION</span>}
                <h3 className="text-2xl font-normal mb-2">{t.name}</h3>
                <div className="text-4xl font-normal text-[#B8860B] mb-6">{t.price}<span className="text-xs text-[#6B6B6B] font-['Source_Sans_3']">/mo</span></div>
                <ul className="space-y-3 font-['Source_Sans_3'] text-sm text-[#6B6B6B] mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#B8860B]" /><span>Playfair Display Serif Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#B8860B]" /><span>Burnished Gold Accent Tokens</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 font-['Source_Sans_3'] text-xs font-medium uppercase tracking-wider rounded-md ${t.popular ? "bg-[#B8860B] text-white hover:bg-[#D4A84B]" : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F5F3F0]"} transition-all`}>
                SUBSCRIBE {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

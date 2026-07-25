import React from "react";
import { Check } from "lucide-react";

export const BotanicalPricing = () => {
  const tiers = [
    { name: "SAGE", price: "$35", popular: false },
    { name: "HERBARIUM PRO", price: "$95", popular: true },
    { name: "BOTANIST", price: "Custom", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#F9F8F4] border-b border-[#E6E2DA] py-24 font-['Playfair_Display',serif] text-[#2D3A31]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold">SUBSCRIBE</span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#2D3A31] mt-1">CURATED RITES</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${t.popular ? "border-[#8C9A84] bg-white shadow-md" : "border-[#E6E2DA] bg-[#F2F0EB]"} flex flex-col justify-between`}>
              <div>
                {t.popular && <span className="font-['Source_Sans_3'] text-[10px] bg-[#8C9A84] text-white font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">CURATED FAVORITE</span>}
                <h3 className="text-2xl font-normal mb-2">{t.name}</h3>
                <div className="text-4xl font-normal text-[#8C9A84] mb-6">{t.price}<span className="text-xs text-[#2D3A31]/60 font-['Source_Sans_3']">/mo</span></div>
                <ul className="space-y-3 font-['Source_Sans_3'] text-sm text-[#2D3A31]/70 mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#8C9A84]" /><span>Playfair Display Italic Stack</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} className="text-[#8C9A84]" /><span>Paper Grain Texture Noise</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 font-['Source_Sans_3'] text-xs font-semibold uppercase tracking-widest rounded-full ${t.popular ? "bg-[#2D3A31] text-white hover:bg-[#C27B66]" : "border border-[#8C9A84] text-[#2D3A31] hover:bg-[#DCCFC2]/40"} transition-colors`}>
                INITIATE {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

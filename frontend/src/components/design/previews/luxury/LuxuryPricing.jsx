import React from "react";
import { Check } from "lucide-react";

export const LuxuryPricing = () => {
  const tiers = [
    { name: "ATELIER", price: "$1,200", isFeatured: false },
    { name: "HAUTE COUTURE", price: "$3,500", isFeatured: true },
    { name: "MAISON PRIVATE", price: "Custom", isFeatured: false }
  ];

  return (
    <section id="pricing" className="bg-[#F9F8F6] border-b border-[#1A1A1A]/20 py-24 font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">MEMBERSHIP</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1A1A1A] mt-2">Curated Privilege</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 border-t-4 ${t.isFeatured ? "border-t-[#D4AF37] bg-[#1A1A1A] text-[#F9F8F6]" : "border-t-[#1A1A1A] bg-[#F9F8F6] text-[#1A1A1A]"} flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)]`}>
              <div>
                <h3 className="font-['Playfair_Display'] text-2xl mb-2">{t.name}</h3>
                <div className="font-['Playfair_Display'] text-4xl mb-6">{t.price}</div>
                <ul className="space-y-3 text-xs uppercase tracking-[0.15em] mb-8 opacity-80">
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#D4AF37]" /><span>Bespoke Typography Suite</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#D4AF37]" /><span>Gold Slide Overlay Buttons</span></li>
                </ul>
              </div>
              <button className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium border ${t.isFeatured ? "bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37]" : "bg-transparent text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"} transition-colors duration-500`}>
                Reserve Membership
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

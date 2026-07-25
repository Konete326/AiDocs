import React from "react";
import { Check } from "lucide-react";

export const HandDrawnPricing = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };
  const tiers = [
    { name: "DOODLE", price: "$15", popular: false, bg: "bg-white" },
    { name: "POST-IT PRO", price: "$45", popular: true, bg: "bg-[#fff9c4]" },
    { name: "SKETCHBOOK", price: "Custom", popular: false, bg: "bg-white" }
  ];

  return (
    <section id="pricing" className="bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] py-20 font-['Patrick_Hand',cursive] text-[#2d2d2d]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-['Kalam'] text-xl text-[#2d5da1] font-bold">[ SUBSCRIPTION ]</span>
          <h2 className="font-['Kalam'] text-4xl md:text-5xl font-bold mt-1">HUMAN PRICING</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} style={wobbly} className={`p-8 border-[3px] border-[#2d2d2d] ${t.bg} shadow-[6px_6px_0px_0px_#2d2d2d] flex flex-col justify-between relative`}>
              <div>
                {t.popular && <span style={wobbly} className="absolute -top-4 right-6 bg-[#ff4d4d] text-white font-['Kalam'] font-bold text-xs uppercase px-3 py-1 border-2 border-[#2d2d2d] shadow-[2px_2px_0px_0px_#2d2d2d] rotate-3">FAVORITE STICKY</span>}
                <h3 className="font-['Kalam'] text-3xl font-bold mb-2">{t.name}</h3>
                <div className="font-['Kalam'] text-5xl font-bold text-[#ff4d4d] mb-6">{t.price}<span className="text-sm font-normal text-[#2d2d2d]">/mo</span></div>
                <ul className="space-y-3 text-lg font-bold mb-8">
                  <li className="flex items-center space-x-2"><Check size={20} strokeWidth={3} className="text-[#ff4d4d]" /><span>Kalam & Patrick Hand Fonts</span></li>
                  <li className="flex items-center space-x-2"><Check size={20} strokeWidth={3} className="text-[#ff4d4d]" /><span>Hard Offset Box Shadows</span></li>
                </ul>
              </div>
              <button style={wobbly} className={`w-full py-4 font-['Kalam'] font-bold text-xl ${t.popular ? "bg-[#ff4d4d] text-white" : "bg-white text-[#2d2d2d]"} border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all`}>
                PICK {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

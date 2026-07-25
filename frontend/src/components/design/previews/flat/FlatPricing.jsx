import React from "react";
import { Check } from "lucide-react";

export const FlatPricing = () => {
  const tiers = [
    { name: "Starter", price: "$19", color: "bg-white text-gray-900", btn: "bg-gray-900 text-white" },
    { name: "Flat Pro", price: "$59", color: "bg-[#3B82F6] text-white scale-105", btn: "bg-white text-[#3B82F6]" },
    { name: "Scale", price: "Custom", color: "bg-[#10B981] text-white", btn: "bg-white text-[#10B981]" }
  ];

  return (
    <section id="pricing" className="bg-white py-20 font-['Outfit'] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold">PRICING</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-1">Simple Color Block Plans</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <div key={i} className={`p-8 rounded-lg ${t.color} flex flex-col justify-between shadow-none hover:scale-105 transition-transform`}>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <div className="text-4xl font-extrabold mb-6">{t.price}<span className="text-xs font-normal">/mo</span></div>
                <ul className="space-y-3 text-xs font-medium mb-8">
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Outfit Geometric Font Tokens</span></li>
                  <li className="flex items-center space-x-2"><Check size={16} /><span>Zero Shadow Flat Styling</span></li>
                </ul>
              </div>
              <button className={`w-full py-3.5 ${t.btn} font-semibold text-xs rounded-md shadow-none hover:opacity-95 transition-opacity`}>
                Select {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

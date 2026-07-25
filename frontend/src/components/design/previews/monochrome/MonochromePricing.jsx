import React from "react";
import { Check } from "lucide-react";

export const MonochromePricing = () => {
  const plans = [
    { name: "Starter", price: "$29", period: "/month", desc: "For small teams", popular: false },
    { name: "Professional", price: "$79", period: "/month", desc: "For growing teams", popular: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "Dedicated scale", popular: false }
  ];

  return (
    <section id="pricing" className="bg-white py-20 border-b-4 border-black font-serif">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 font-semibold">Pricing</div>
          <h2 className="text-4xl font-bold text-black mb-2">Simple Transparent Pricing</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <div key={i} className={`border-2 border-black p-8 flex flex-col justify-between ${p.popular ? "bg-black text-white" : "bg-white text-black"}`}>
              <div>
                {p.popular && <span className="inline-block bg-white text-black font-mono text-[10px] uppercase font-bold px-3 py-1 mb-4">Most Popular</span>}
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className={`text-xs mb-6 ${p.popular ? "text-neutral-300" : "text-neutral-600"}`}>{p.desc}</p>
                <div className="mb-6"><span className="text-4xl font-bold">{p.price}</span><span className="font-mono text-xs">{p.period}</span></div>
                <ul className="space-y-3 font-serif text-xs mb-8">
                  <li className="flex items-center space-x-2"><Check size={14} /><span>Playfair Serif Specs</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} /><span>0px Sharp Corners</span></li>
                </ul>
              </div>
              <button className={`w-full py-3 font-mono text-xs uppercase font-bold border-2 ${p.popular ? "bg-white text-black border-white hover:bg-black hover:text-white" : "bg-black text-white border-black hover:bg-white hover:text-black"} transition-colors`}>
                Start free trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

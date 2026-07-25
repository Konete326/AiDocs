import React from "react";
import { Check } from "lucide-react";

export const LinearPricing = () => {
  const plans = [
    { name: "Developer", price: "$20", period: "/month", desc: "For individual builders", popular: false },
    { name: "Team Pro", price: "$60", period: "/month", desc: "For high-velocity product teams", popular: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "Dedicated security & scale", popular: false }
  ];

  return (
    <section id="pricing" className="bg-[#050506] py-20 border-b border-white/[0.06] font-['Inter']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#5E6AD2] uppercase tracking-widest">PRICING</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mt-1">Predictable Scale</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <div key={i} className={`p-8 rounded-2xl border flex flex-col justify-between ${p.popular ? "bg-gradient-to-b from-[#5E6AD2]/20 to-[#0a0a0c] border-[#5E6AD2]/40 shadow-[0_0_40px_rgba(94,106,210,0.15)]" : "bg-white/[0.03] border-white/[0.06]"}`}>
              <div>
                {p.popular && <span className="text-[10px] font-mono uppercase bg-[#5E6AD2] text-white px-2.5 py-0.5 rounded-full mb-4 inline-block">Popular</span>}
                <h3 className="text-2xl font-semibold text-white mb-1 tracking-tight">{p.name}</h3>
                <p className="text-xs text-[#8A8F98] mb-6">{p.desc}</p>
                <div className="text-4xl font-semibold text-white mb-6 tracking-tight">{p.price}<span className="text-xs text-[#8A8F98]">{p.period}</span></div>
                <ul className="space-y-3 text-xs text-[#EDEDEF] mb-8">
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#5E6AD2]" /><span>Full Linear Token Suite</span></li>
                  <li className="flex items-center space-x-2"><Check size={14} className="text-[#5E6AD2]" /><span>Spotlight Cursor System</span></li>
                </ul>
              </div>
              <button className={`w-full py-3 rounded-lg text-xs font-medium ${p.popular ? "bg-[#5E6AD2] hover:bg-[#6872D9] text-white shadow-[0_0_20px_rgba(94,106,210,0.3)]" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"} transition-all`}>
                Select {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const SwissFeatures = () => {
  const items = [
    { num: "01.", title: "OBJECTIVITY OVER SUBJECTIVITY", desc: "Design recedes to let pure content speak. No personal ornamentation." },
    { num: "02.", title: "THE GRID AS ABSOLUTE LAW", desc: "Visible skeleton defining boundaries, asymmetric tension, and rhythm." },
    { num: "03.", title: "ACTIVE NEGATIVE SPACE", desc: "Generous white space giving structural weight to massive typography." }
  ];

  return (
    <section id="features" className="bg-[#F2F2F2] border-b-4 border-black py-20 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF3000] font-black">02. TENETS</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mt-1">THE SWISS CANON</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((f, i) => (
            <div key={i} className="bg-white border-4 border-black p-8 group hover:bg-[#FF3000] hover:text-white transition-colors duration-200">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs uppercase font-black text-[#FF3000] group-hover:text-white">{f.num}</span>
                <ArrowUpRight size={20} className="text-black group-hover:text-white" />
              </div>
              <h3 className="text-xl font-black uppercase mb-3 leading-tight">{f.title}</h3>
              <p className="text-sm font-medium text-neutral-700 group-hover:text-white leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

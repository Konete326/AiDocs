import React from "react";

export const MonochromeFeatures = () => {
  const items = [
    { num: "01", title: "Real-time Collaboration", desc: "Work together seamlessly with your team. Share updates instantly." },
    { num: "02", title: "Smart Automation", desc: "Automate repetitive tasks and workflows to save hours every week." },
    { num: "03", title: "Enterprise Security", desc: "Bank-level encryption and security protocols protecting your data." }
  ];

  return (
    <section id="features" className="bg-white py-20 border-b-4 border-black font-serif">
      <div className="max-w-6xl mx-auto px-6">
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 font-semibold">Features</div>
        <h2 className="text-4xl font-bold text-black mb-16">Everything you need to succeed</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((f, i) => (
            <div key={i} className="border-2 border-black p-8 bg-white group hover:bg-black hover:text-white transition-colors">
              <div className="font-mono text-xl font-bold border-b-2 border-black group-hover:border-white pb-3 mb-6">{f.num}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-neutral-600 group-hover:text-neutral-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

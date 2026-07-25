import React from "react";

export const MonochromeStats = () => {
  const stats = [
    { value: "500k+", label: "Active Users", sub: "+12% this month" },
    { value: "99.99%", label: "Uptime SLA", sub: "Enterprise grade" },
    { value: "24/7", label: "Support Access", sub: "Global coverage" },
    { value: "$10M+", label: "Customer Savings", sub: "Annual total" }
  ];

  return (
    <section className="bg-black text-white py-16 border-b-4 border-black font-serif">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l-2 border-white/20 pl-6">
            <div className="text-3xl md:text-5xl font-bold mb-1">{s.value}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">{s.label}</div>
            <div className="font-mono text-[10px] text-neutral-500 uppercase mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

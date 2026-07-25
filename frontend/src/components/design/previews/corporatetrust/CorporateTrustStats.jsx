import React from "react";

export const CorporateTrustStats = () => {
  const stats = [
    { val: "99.99%", label: "UPTIME SLA", sub: "Enterprise Grade" },
    { val: "#4F46E5", label: "INDIGO BRAND", sub: "Primary Anchor" },
    { val: "#7C3AED", label: "VIOLET ACCENT", sub: "Gradient Spectrum" },
    { val: "Slate 50", label: "NEUTRAL CANVAS", sub: "Clean SaaS Base" }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-12 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.08)]">
            <div className="text-3xl font-extrabold text-indigo-600 mb-1">{s.val}</div>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{s.label}</div>
            <div className="text-[10px] text-slate-500 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

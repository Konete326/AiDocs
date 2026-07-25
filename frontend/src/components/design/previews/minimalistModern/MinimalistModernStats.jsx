import React from "react";

export const MinimalistModernStats = () => {
  const stats = [
    { value: "#0052FF", label: "Electric Blue Accent", sub: "Signature Gradient" },
    { value: "Calistoga", label: "Serif Headline Font", sub: "Approachful Character" },
    { value: "Slate 900", label: "Inverted Sections", sub: "Dramatic Contrast" },
    { value: "12-16px", label: "Rounded Surfaces", sub: "Tactile Elevation" }
  ];

  return (
    <section className="bg-[#0F172A] text-white py-16 font-['Inter'] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l-2 border-[#0052FF] pl-6">
            <div className="font-['Calistoga'] text-3xl md:text-4xl text-white mb-1">{s.value}</div>
            <div className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">{s.label}</div>
            <div className="text-[10px] text-slate-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

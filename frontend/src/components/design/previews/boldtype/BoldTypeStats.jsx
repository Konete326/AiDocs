import React from "react";

export const BoldTypeStats = () => {
  const stats = [
    { val: "6:1", label: "SCALE CONTRAST", sub: "Headline to Body" },
    { val: "#FF3D00", label: "VERMILLION RED", sub: "Urgent Accent" },
    { val: "-0.06em", label: "TIGHT TRACKING", sub: "Display Type" },
    { val: "0px", label: "BORDER RADIUS", sub: "Sharp Edges" }
  ];

  return (
    <section className="bg-[#0A0A0A] border-b border-[#262626] py-16 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l-2 border-[#FF3D00] pl-6">
            <div className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-1">{s.val}</div>
            <div className="font-mono text-xs text-[#FF3D00] font-semibold uppercase tracking-wider">{s.label}</div>
            <div className="text-[10px] text-[#737373] uppercase mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from "react";

export const MinDarkStats = () => {
  const stats = [
    { val: "#0A0A0F", label: "DEEP SLATE CANVAS", sub: "Warm Darkness" },
    { val: "#F59E0B", label: "AMBER ACCENT", sub: "Glowing Ember" },
    { val: "8% Opacity", label: "SUBTLE BORDERS", sub: "Low Contrast Lines" },
    { val: "Space Grotesk", label: "GEOMETRIC SANS", sub: "Clean Typography" }
  ];

  return (
    <section className="bg-[#12121A] border-b border-white/10 py-12 font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#1A1A24]/60 border border-white/10 p-6 rounded-xl backdrop-blur-md">
            <div className="font-['Space_Grotesk'] text-3xl font-bold text-[#FAFAFA] mb-1">{s.val}</div>
            <div className="text-xs text-[#F59E0B] font-medium tracking-wide uppercase">{s.label}</div>
            <div className="text-[10px] text-[#71717A] mt-1 font-mono">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

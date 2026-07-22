import React from "react";

export const ClaymorphismStats = () => {
  const stats = [
    { val: "#7C3AED", label: "VIVID VIOLET", bg: "from-[#A78BFA] to-[#7C3AED] text-white" },
    { val: "32-48px", label: "SUPER-ROUNDED RADII", bg: "from-white to-white text-[#332F3A]" },
    { val: "4-Layer", label: "SHADOW LIGHT STACK", bg: "from-[#F472B6] to-[#DB2777] text-white" },
    { val: "0.92x", label: "CLICK SQUISH PRESS", bg: "from-[#38BDF8] to-[#0EA5E9] text-white" }
  ];

  return (
    <section className="bg-[#F4F1FA] border-b border-[#332F3A]/10 py-12 font-['Nunito',sans-serif]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.bg} p-6 rounded-[32px] shadow-[12px_12px_24px_rgba(160,150,180,0.2),-8px_-8px_16px_rgba(255,255,255,0.9)] font-black hover:-translate-y-1 transition-all`}>
            <div className="text-3xl font-black mb-1">{s.val}</div>
            <div className="text-xs uppercase tracking-wider opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

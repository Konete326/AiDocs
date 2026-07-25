import React from "react";

export const LinearStats = () => {
  const metrics = [
    { value: "< 10ms", label: "Interaction Latency" },
    { value: "3 Layers", label: "Multi-Shadow System" },
    { value: "200ms", label: "Expo-Out Easing" },
    { value: "0.06", label: "Hairline Border Opacity" }
  ];

  return (
    <section className="bg-[#020203] py-16 border-b border-white/[0.06] font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0a0a0c] border border-white/[0.06] p-6 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            <div className="text-3xl md:text-4xl font-semibold text-white mb-1 tracking-tight">{m.value}</div>
            <div className="text-xs text-[#8A8F98] font-mono">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

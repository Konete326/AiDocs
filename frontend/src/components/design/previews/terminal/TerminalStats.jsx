import React from "react";

export const TerminalStats = () => {
  const metrics = [
    { label: "CPU_LOAD", val: "[||||||||||.....]", status: "42%" },
    { label: "MEMORY", val: "[||||||||||||||.]", status: "88%" },
    { label: "NETWORK", val: "[|||||||||||||||]", status: "100%" },
    { label: "LATENCY", val: "[||.............]", status: "0.2ms" }
  ];

  return (
    <section className="bg-[#0a0a0a] border-b-2 border-[#1f521f] py-12 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="border border-[#1f521f] p-4 bg-[#0a0a0a]">
            <div className="text-xs text-[#ffb000] font-bold mb-2">{m.label}</div>
            <div className="text-xs font-mono mb-1">{m.val}</div>
            <div className="text-[10px] text-[#33ff00]/60 font-bold">{m.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from "react";

export const NeoBrutalismStats = () => {
  const items = [
    { val: "4PX", label: "SOLID STROKE", bg: "bg-[#FF6B6B] text-white" },
    { val: "8PX", label: "HARD OFFSET SHADOW", bg: "bg-[#FFD93D] text-black" },
    { val: "#FFFDF5", label: "CREAM CANVAS", bg: "bg-[#C4B5FD] text-black" },
    { val: "100%", label: "MECHANICAL PRESS", bg: "bg-white text-black" }
  ];

  return (
    <section className="bg-[#FFFDF5] border-b-4 border-black py-12 font-['Space_Grotesk']">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className={`${it.bg} border-4 border-black p-6 font-black shadow-[6px_6px_0px_0px_#000] rotate-1`}>
            <div className="text-4xl font-black mb-1">{it.val}</div>
            <div className="text-xs uppercase tracking-widest">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

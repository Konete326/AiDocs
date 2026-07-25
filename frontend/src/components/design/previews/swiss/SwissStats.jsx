import React from "react";

export const SwissStats = () => {
  const metrics = [
    { num: "01", val: "24px", label: "MATHEMATICAL GRID", bg: "bg-white text-black" },
    { num: "02", val: "#FF3000", label: "SWISS RED SIGNAL", bg: "bg-[#FF3000] text-white" },
    { num: "03", val: "0px", label: "STRICT RADIUS", bg: "bg-[#F2F2F2] text-black" },
    { num: "04", val: "900", label: "INTER BLACK WEIGHT", bg: "bg-black text-white" }
  ];

  return (
    <section className="bg-white border-b-4 border-black py-12 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className={`${m.bg} border-4 border-black p-6 font-black`}>
            <div className="text-xs uppercase tracking-widest text-[#FF3000] mb-2">{m.num}. METRIC</div>
            <div className="text-4xl md:text-5xl font-black mb-1">{m.val}</div>
            <div className="text-xs uppercase tracking-widest">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

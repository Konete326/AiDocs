import React from "react";

export const HandDrawnStats = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };
  const stats = [
    { val: "#fdfbf7", label: "WARM PAPER", bg: "bg-[#fdfbf7]" },
    { val: "#ff4d4d", label: "RED MARKER", bg: "bg-[#ff4d4d] text-white" },
    { val: "#fff9c4", label: "POST-IT YELLOW", bg: "bg-[#fff9c4]" },
    { val: "WOBBLY", label: "NO STRAIGHT LINES", bg: "bg-white" }
  ];

  return (
    <section className="bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] py-12 font-['Patrick_Hand',cursive]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} style={wobbly} className={`${s.bg} border-[3px] border-[#2d2d2d] p-6 shadow-[4px_4px_0px_0px_#2d2d2d]`}>
            <div className="font-['Kalam'] text-3xl font-bold mb-1">{s.val}</div>
            <div className="text-base font-bold uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

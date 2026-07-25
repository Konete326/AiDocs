import React from "react";

export const BauhausStats = () => {
  const stats = [
    { num: "100%", label: "PURE GEOMETRY", bg: "bg-[#D02020]", text: "text-white" },
    { num: "0px", label: "NO SOFT GRADIENTS", bg: "bg-[#F0C020]", text: "text-black" },
    { num: "4px", label: "HARD OFFSETS", bg: "bg-[#1040C0]", text: "text-white" },
    { num: "3x", label: "PRIMARY COLORS", bg: "bg-[#121212]", text: "text-white" }
  ];

  return (
    <section className="bg-[#F0C020] border-b-4 border-[#121212] py-12 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} ${s.text} border-4 border-[#121212] p-6 shadow-[6px_6px_0px_0px_#121212]`}>
            <div className="text-4xl lg:text-5xl font-black mb-1">{s.num}</div>
            <div className="font-bold text-xs uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

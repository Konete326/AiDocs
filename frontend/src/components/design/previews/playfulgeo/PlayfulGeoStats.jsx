import React from "react";

export const PlayfulGeoStats = () => {
  const stats = [
    { val: "#8B5CF6", label: "VIVID VIOLET", bg: "bg-[#8B5CF6] text-white" },
    { val: "#F472B6", label: "HOT PINK POP", bg: "bg-[#F472B6] text-white" },
    { val: "#FBBF24", label: "AMBER YELLOW", bg: "bg-[#FBBF24] text-[#1E293B]" },
    { val: "#34D399", label: "MINT GREEN", bg: "bg-[#34D399] text-[#1E293B]" }
  ];

  return (
    <section className="bg-[#FFFDF5] border-b-2 border-[#1E293B] py-12 font-['Outfit',sans-serif]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border-2 border-[#1E293B] p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1E293B] font-extrabold`}>
            <div className="text-3xl font-extrabold mb-1">{s.val}</div>
            <div className="text-xs uppercase tracking-wider opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

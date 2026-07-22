import React from "react";

export const FlatStats = () => {
  const items = [
    { val: "#3B82F6", label: "PRIMARY ACTION BLUE", bg: "bg-blue-50 text-[#3B82F6]" },
    { val: "#10B981", label: "EMERALD SECONDARY", bg: "bg-emerald-50 text-[#10B981]" },
    { val: "#F59E0B", label: "AMBER ACCENT", bg: "bg-amber-50 text-[#F59E0B]" },
    { val: "0px", label: "ZERO BOX SHADOW", bg: "bg-gray-100 text-gray-900" }
  ];

  return (
    <section className="bg-white py-12 font-['Outfit'] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className={`${it.bg} p-6 rounded-lg font-bold shadow-none`}>
            <div className="text-3xl md:text-4xl font-extrabold mb-1">{it.val}</div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-90">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

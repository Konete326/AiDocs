import React from "react";

export const OrganicNaturalStats = () => {
  const stats = [
    { val: "#FDFCF8", label: "RICE PAPER BASE", sub: "Warm Off-White Canvas" },
    { val: "#5D7052", label: "MOSS GREEN", sub: "Forest Floor Primary" },
    { val: "#C18C5D", label: "TERRACOTTA", sub: "Warm Clay Secondary" },
    { val: "Wabi-Sabi", label: "TRANSIENT HARMONY", sub: "Acceptance of Imperfection" }
  ];

  return (
    <section className="bg-[#F0EBE5]/40 border-y border-[#DED8CF]/50 py-12 font-['Fraunces',serif]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#FEFEFA] border border-[#DED8CF]/50 p-6 rounded-3xl shadow-[0_4px_20px_-2px_rgba(93,112,82,0.1)]">
            <div className="text-3xl font-bold text-[#5D7052] mb-1">{s.val}</div>
            <div className="font-['Nunito'] text-xs font-bold text-[#2C2C24] uppercase tracking-wider">{s.label}</div>
            <div className="font-['Nunito'] text-[10px] text-[#78786C] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

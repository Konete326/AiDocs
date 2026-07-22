import React from "react";

export const MaximalismStats = () => {
  const stats = [
    { val: "#FF3AF2", label: "HOT MAGENTA", bg: "bg-[#FF3AF2] text-[#0D0D1A] border-[#FFE600] shadow-[6px_6px_0_#00F5D4]" },
    { val: "#00F5D4", label: "ELECTRIC CYAN", bg: "bg-[#00F5D4] text-[#0D0D1A] border-[#FF3AF2] shadow-[6px_6px_0_#FFE600]" },
    { val: "#FFE600", label: "SCREAMING YELLOW", bg: "bg-[#FFE600] text-[#0D0D1A] border-[#7B2FFF] shadow-[6px_6px_0_#FF3AF2]" },
    { val: "#FF6B35", label: "ELECTRIC ORANGE", bg: "bg-[#FF6B35] text-white border-[#00F5D4] shadow-[6px_6px_0_#7B2FFF]" }
  ];

  return (
    <section className="bg-[#0D0D1A] border-b-4 border-[#FF3AF2] py-12 font-['Outfit',sans-serif]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border-4 p-6 rounded-3xl font-black`}>
            <div className="text-3xl font-black mb-1">{s.val}</div>
            <div className="text-xs uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

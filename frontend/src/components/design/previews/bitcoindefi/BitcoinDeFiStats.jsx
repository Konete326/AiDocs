import React from "react";

export const BitcoinDeFiStats = () => {
  const stats = [
    { val: "$2.4B+", label: "TOTAL VALUE LOCKED", sub: "Bitcoin Liquidity", glow: "text-[#F7931A]" },
    { val: "12.8%", label: "NATIVE BTC APY", sub: "Non-Custodial Yield", glow: "text-[#FFD700]" },
    { val: "100%", label: "ON-CHAIN PROOF", sub: "Cryptographic Audit", glow: "text-white" },
    { val: "0.001s", label: "BLOCK FINALITY", sub: "Layer 2 Speed", glow: "text-[#F7931A]" }
  ];

  return (
    <section className="bg-[#08080C] border-b border-[#F7931A]/20 py-12 font-mono">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#12121A]/80 border border-[#F7931A]/20 p-6 rounded-2xl shadow-md">
            <div className={`font-['Space_Grotesk'] text-3xl font-bold mb-1 ${s.glow}`}>{s.val}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A0A0B0]">{s.label}</div>
            <div className="text-[10px] text-[#A0A0B0]/60 uppercase mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

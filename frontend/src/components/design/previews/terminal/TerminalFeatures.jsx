import React from "react";

export const TerminalFeatures = () => {
  const modules = [
    { code: "MOD_01", name: "RAW MONOSPACE SYSTEM", desc: "Every character monospaced for terminal precision." },
    { code: "MOD_02", name: "PHOSPHOR CRT PERSISTENCE", desc: "Classic green text glow mimicking early CRT monitors." },
    { code: "MOD_03", name: "SHELL COMMAND METAPHORS", desc: "Interactive prompt symbols and inverted video buttons." }
  ];

  return (
    <section id="features" className="bg-[#0a0a0a] border-b-2 border-[#1f521f] py-20 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs text-[#ffb000] font-bold">[ SYSTEM_MODULES ]</span>
          <h2 className="text-3xl font-bold text-[#33ff00] mt-1">+--- MODULE ARCHITECTURE ---+</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div key={i} className="border-2 border-[#1f521f] p-6 bg-[#0a0a0a] hover:border-[#33ff00] transition-colors">
              <div className="text-xs font-bold text-[#ffb000] mb-3">{m.code}</div>
              <h3 className="text-lg font-bold text-[#33ff00] mb-2">{m.name}</h3>
              <p className="text-xs text-[#33ff00]/70 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

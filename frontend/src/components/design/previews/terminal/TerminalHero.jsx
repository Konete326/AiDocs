import React from "react";
import { Terminal } from "lucide-react";

export const TerminalHero = () => {
  return (
    <section className="bg-[#0a0a0a] border-b-2 border-[#1f521f] py-20 font-['JetBrains_Mono',monospace] text-[#33ff00]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 border border-[#1f521f] bg-[#0a0a0a] px-3 py-1 text-xs text-[#ffb000] mb-8">
          <Terminal size={14} />
          <span>SYS_BOOT: OK // VER 6.0</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#33ff00] leading-tight mb-8">
          &gt; SYSTEM_READY --EXECUTE PROMPT_
        </h1>
        <p className="text-sm text-[#33ff00]/80 max-w-2xl leading-relaxed mb-10">
          Raw cyber-industrial command line interface. High-contrast phosphor green, blinking block cursors, and ASCII frame elements.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase">
          <button className="px-6 py-3 bg-[#33ff00] text-black hover:bg-white transition-colors">
            $ execute --run
          </button>
          <button className="px-6 py-3 border border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors">
            [ VIEW_RAW_DATA ]
          </button>
        </div>
      </div>
    </section>
  );
};

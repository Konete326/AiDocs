import React from "react";

export const MaximalismFooter = () => {
  return (
    <footer className="bg-[#0D0D1A] border-t-8 border-[#FF3AF2] py-16 font-['Outfit',sans-serif] text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase tracking-tighter text-[#FF3AF2] mb-4 [text-shadow:2px_2px_0_#00F5D4]">MAX_BOOM</div>
          <p className="font-['DM_Sans'] text-xs font-bold text-white/80 leading-relaxed">
            Unapologetic visual excess, Y2K hyperpop, 5-accent color rotation, and sensory overload.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-black text-[#00F5D4] mb-4">// HYPER</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs font-bold uppercase text-white/80">
            <li><a href="#features" className="hover:text-[#FFE600]">Overload</a></li>
            <li><a href="#pricing" className="hover:text-[#FFE600]">Dopamine</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-black text-[#FFE600] mb-4">// ACCENTS</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs font-bold uppercase text-white/80">
            <li><a href="#showcase" className="hover:text-[#FF3AF2]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#FF3AF2]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-black text-[#FF3AF2] mb-4">// VOID</div>
          <p className="font-mono text-xs text-[#00F5D4]">COSMIC VOID #0D0D1A</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t-4 border-dashed border-[#00F5D4] font-mono text-[10px] uppercase font-black text-white/60 flex justify-between">
        <span>© 2026 MAXIMALISM DOPAMINE SYSTEM</span>
        <span>5-ACCENT HYPERPOP ROTATION</span>
      </div>
    </footer>
  );
};

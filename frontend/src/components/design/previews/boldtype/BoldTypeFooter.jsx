import React from "react";

export const BoldTypeFooter = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#262626] py-16 font-['Inter_Tight',sans-serif] text-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase tracking-tighter mb-4 text-[#FAFAFA]">TYPE_HERO</div>
          <p className="text-xs text-[#737373] leading-relaxed font-normal">
            Poster design translated to web. Every decision serves the type.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold mb-4">// MANIFESTO</div>
          <ul className="space-y-2 text-xs text-[#737373] font-medium uppercase">
            <li><a href="#features" className="hover:text-[#FAFAFA]">Principles</a></li>
            <li><a href="#pricing" className="hover:text-[#FAFAFA]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold mb-4">// CANON</div>
          <ul className="space-y-2 text-xs text-[#737373] font-medium uppercase">
            <li><a href="#showcase" className="hover:text-[#FAFAFA]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#FAFAFA]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold mb-4">// VERMILLION</div>
          <p className="text-xs text-[#737373] uppercase font-medium">#FF3D00 ACCENT</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pt-6 border-t border-[#262626] font-mono text-[10px] uppercase text-[#737373] flex justify-between">
        <span>© 2026 BOLD TYPOGRAPHY DESIGN SYSTEM</span>
        <span>EXACT TYPE HERO</span>
      </div>
    </footer>
  );
};

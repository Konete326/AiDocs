import React from "react";

export const PlayfulGeoFooter = () => {
  return (
    <footer className="bg-[#FFFDF5] border-t-2 border-[#1E293B] py-16 font-['Outfit',sans-serif] text-[#1E293B]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-extrabold text-2xl uppercase tracking-tight text-[#8B5CF6] mb-4">POP_GEO</div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#64748B] leading-relaxed">
            Friendly, tactile, pop design system with Memphis group optimism and hard drop shadows.
          </p>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 text-[#1E293B]">[ PATTERNS ]</div>
          <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase text-[#64748B]">
            <li><a href="#features" className="hover:text-[#8B5CF6]">Pillars</a></li>
            <li><a href="#pricing" className="hover:text-[#8B5CF6]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 text-[#1E293B]">[ SYSTEM ]</div>
          <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase text-[#64748B]">
            <li><a href="#showcase" className="hover:text-[#8B5CF6]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#8B5CF6]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 text-[#1E293B]">[ CANVAS ]</div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase text-[#64748B]">WARM CREAM #FFFDF5</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t-2 border-[#1E293B] font-extrabold text-[10px] uppercase text-[#64748B] flex justify-between">
        <span>© 2026 PLAYFUL GEOMETRIC SYSTEM</span>
        <span>HARD OFFSET DROP SHADOWS</span>
      </div>
    </footer>
  );
};

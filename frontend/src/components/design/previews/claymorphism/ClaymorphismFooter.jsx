import React from "react";

export const ClaymorphismFooter = () => {
  return (
    <footer className="bg-[#F4F1FA] border-t border-[#332F3A]/10 py-16 font-['Nunito',sans-serif] text-[#332F3A]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl tracking-tight text-[#7C3AED] mb-4">ClayCraft</div>
          <p className="font-['DM_Sans'] text-xs font-medium text-[#635F69] leading-relaxed">
            High-Fidelity Claymorphism simulation of volumetric 3D vinyl and soft silicone objects.
          </p>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-[#7C3AED]">CANVAS</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs font-bold text-[#635F69]">
            <li><a href="#features" className="hover:text-[#7C3AED]">Physics</a></li>
            <li><a href="#pricing" className="hover:text-[#7C3AED]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-[#7C3AED]">SYSTEM</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs font-bold text-[#635F69]">
            <li><a href="#showcase" className="hover:text-[#7C3AED]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#7C3AED]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-[#7C3AED]">PALETTE</div>
          <p className="font-['DM_Sans'] text-xs font-bold text-[#635F69]">PALE LAVENDER #F4F1FA</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#332F3A]/10 font-['DM_Sans'] text-[10px] uppercase font-bold text-[#635F69] flex justify-between">
        <span>© 2026 CLAYMORPHISM DESIGN SYSTEM</span>
        <span>4-LAYER LIGHTING STACK</span>
      </div>
    </footer>
  );
};

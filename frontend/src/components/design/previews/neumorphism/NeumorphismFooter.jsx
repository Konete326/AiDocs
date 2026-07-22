import React from "react";

export const NeumorphismFooter = () => {
  return (
    <footer className="bg-[#E0E5EC] py-16 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-extrabold text-2xl tracking-tight text-[#6C63FF] mb-4">SOFT_UI</div>
          <p className="font-['DM_Sans'] text-xs text-[#6B7280] leading-relaxed">
            Tactile, calm, and physically grounded Neumorphic Soft UI design system.
          </p>
        </div>
        <div>
          <div className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider mb-4">PHYSICS</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs text-[#6B7280]">
            <li><a href="#features" className="hover:text-[#6C63FF]">Extruded</a></li>
            <li><a href="#pricing" className="hover:text-[#6C63FF]">Inset Wells</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider mb-4">SYSTEM</div>
          <ul className="space-y-2 font-['DM_Sans'] text-xs text-[#6B7280]">
            <li><a href="#showcase" className="hover:text-[#6C63FF]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#6C63FF]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider mb-4">SURFACE</div>
          <p className="font-['DM_Sans'] text-xs text-[#6B7280]">COOL CLAY #E0E5EC</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-[#A3B1C6]/30 font-['DM_Sans'] text-[10px] uppercase font-bold text-[#6B7280] flex justify-between">
        <span>© 2026 NEUMORPHISM SOFT UI SYSTEM</span>
        <span>DUAL RGBA SHADOWS</span>
      </div>
    </footer>
  );
};

import React from "react";

export const IndustrialSkeuoFooter = () => {
  return (
    <footer className="bg-[#e0e5ec] border-t border-[#a3b1c6] py-16 font-['Inter',sans-serif] text-[#2d3436]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-extrabold text-2xl tracking-tight text-[#ff4757] mb-4">BRAUN_SYS</div>
          <p className="text-xs text-[#4a5568] leading-relaxed font-medium">
            Industrial realism, physical tactile precision, and Teen-Engineering hardware.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-bold text-[#ff4757] tracking-widest mb-4">// MODULES</div>
          <ul className="space-y-2 text-xs text-[#4a5568] font-medium">
            <li><a href="#features" className="hover:text-[#ff4757]">Panels</a></li>
            <li><a href="#pricing" className="hover:text-[#ff4757]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-bold text-[#ff4757] tracking-widest mb-4">// REGISTRY</div>
          <ul className="space-y-2 text-xs text-[#4a5568] font-medium">
            <li><a href="#showcase" className="hover:text-[#ff4757]">Hardware</a></li>
            <li><a href="#pricing" className="hover:text-[#ff4757]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase font-bold text-[#ff4757] tracking-widest mb-4">// LIGHTING</div>
          <p className="font-mono text-xs text-[#4a5568]">45° TOP-LEFT SOURCE</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#a3b1c6]/40 font-mono text-[10px] uppercase font-bold text-[#4a5568] flex justify-between">
        <span>© 2026 INDUSTRIAL SKEUOMORPHISM SYSTEM</span>
        <span>CHASSIS GREY #E0E5EC</span>
      </div>
    </footer>
  );
};

import React from "react";

export const MaterialFooter = () => {
  return (
    <footer className="bg-[#F3EDF7] text-[#1C1B1F] py-16 font-['Roboto'] border-t border-[#E7E0EC]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <span className="font-medium text-2xl text-[#6750A4] block mb-4">Material You</span>
          <p className="text-xs text-[#49454F] leading-relaxed font-normal">
            Personal, adaptive, and spirited design system built on organic rounded surfaces.
          </p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold block mb-4">PRODUCT</span>
          <ul className="space-y-2 text-xs text-[#49454F]">
            <li><a href="#features" className="hover:text-[#6750A4] transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-[#6750A4] transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold block mb-4">SYSTEM</span>
          <ul className="space-y-2 text-xs text-[#49454F]">
            <li><a href="#showcase" className="hover:text-[#6750A4] transition-colors">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#6750A4] transition-colors">Tokens</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold block mb-4">PALETTE</span>
          <p className="text-xs text-[#49454F]">Purple Seed #6750A4</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#E7E0EC] text-[10px] uppercase font-medium text-[#49454F] flex justify-between">
        <span>© 2026 MATERIAL DESIGN 3</span>
        <span>TONAL SURFACES</span>
      </div>
    </footer>
  );
};

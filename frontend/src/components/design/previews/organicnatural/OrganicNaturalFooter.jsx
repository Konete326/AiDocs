import React from "react";

export const OrganicNaturalFooter = () => {
  return (
    <footer className="bg-[#FDFCF8] border-t border-[#DED8CF]/50 py-16 font-['Fraunces',serif] text-[#2C2C24]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-bold text-2xl tracking-tight text-[#5D7052] mb-4">WabiSabi</div>
          <p className="font-['Nunito'] text-xs text-[#78786C] leading-relaxed font-medium">
            Embracing imperfection, transience, and natural connection.
          </p>
        </div>
        <div>
          <div className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider mb-4">HERITAGE</div>
          <ul className="space-y-2 font-['Nunito'] text-xs text-[#78786C] font-medium">
            <li><a href="#features" className="hover:text-[#5D7052]">Philosophy</a></li>
            <li><a href="#pricing" className="hover:text-[#5D7052]">Harvest</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider mb-4">ATELIER</div>
          <ul className="space-y-2 font-['Nunito'] text-xs text-[#78786C] font-medium">
            <li><a href="#showcase" className="hover:text-[#5D7052]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#5D7052]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider mb-4">PALETTE</div>
          <p className="font-['Nunito'] text-xs text-[#78786C]">MOSS GREEN #5D7052</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-[#DED8CF]/50 font-['Nunito'] text-[10px] uppercase font-bold text-[#78786C] flex justify-between">
        <span>© 2026 ORGANIC NATURAL SYSTEM</span>
        <span>PAPER GRAIN 3% TEXTURE</span>
      </div>
    </footer>
  );
};

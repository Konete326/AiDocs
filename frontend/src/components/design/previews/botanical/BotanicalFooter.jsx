import React from "react";

export const BotanicalFooter = () => {
  return (
    <footer className="bg-[#F9F8F4] border-t border-[#E6E2DA] py-16 font-['Playfair_Display',serif] text-[#2D3A31]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-normal text-2xl tracking-tight text-[#2D3A31] mb-4">BotanICA</div>
          <p className="font-['Source_Sans_3'] text-xs text-[#2D3A31]/70 leading-relaxed">
            A digital ode to nature—soft, sun-warmed, and grounded in earthbound beauty.
          </p>
        </div>
        <div>
          <div className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold mb-4">HERBARIUM</div>
          <ul className="space-y-2 font-['Source_Sans_3'] text-xs text-[#2D3A31]/70">
            <li><a href="#features" className="hover:text-[#2D3A31]">Essence</a></li>
            <li><a href="#pricing" className="hover:text-[#2D3A31]">Rites</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold mb-4">ATELIER</div>
          <ul className="space-y-2 font-['Source_Sans_3'] text-xs text-[#2D3A31]/70">
            <li><a href="#showcase" className="hover:text-[#2D3A31]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#2D3A31]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold mb-4">PALETTE</div>
          <p className="font-['Source_Sans_3'] text-xs text-[#2D3A31]/70">FOREST GREEN #2D3A31</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#E6E2DA] font-['Source_Sans_3'] text-[10px] uppercase tracking-widest text-[#2D3A31]/60 flex justify-between">
        <span>© 2026 BOTANICAL ORGANIC SYSTEM</span>
        <span>PAPER GRAIN NOISE</span>
      </div>
    </footer>
  );
};

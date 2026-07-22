import React from "react";

export const SerifFooter = () => {
  return (
    <footer className="bg-[#FAFAF8] border-t border-[#E8E4DF] py-16 font-['Playfair_Display',serif] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-normal text-2xl tracking-tight text-[#1A1A1A] mb-4">VERITAS</div>
          <p className="font-['Source_Sans_3'] text-xs text-[#6B6B6B] leading-relaxed">
            Typographic elegance through classical restraint and editorial heritage.
          </p>
        </div>
        <div>
          <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium mb-4">CHAPTERS</div>
          <ul className="space-y-2 font-['Source_Sans_3'] text-xs text-[#6B6B6B]">
            <li><a href="#features" className="hover:text-[#1A1A1A]">Essays</a></li>
            <li><a href="#pricing" className="hover:text-[#1A1A1A]">Editions</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium mb-4">FOLIO</div>
          <ul className="space-y-2 font-['Source_Sans_3'] text-xs text-[#6B6B6B]">
            <li><a href="#showcase" className="hover:text-[#1A1A1A]">Library</a></li>
            <li><a href="#pricing" className="hover:text-[#1A1A1A]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium mb-4">ACCENT</div>
          <p className="font-['Source_Sans_3'] text-xs text-[#6B6B6B]">BURNISHED GOLD #B8860B</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pt-6 border-t border-[#E8E4DF] font-['IBM_Plex_Mono'] text-[10px] uppercase text-[#6B6B6B] tracking-[0.15em] flex justify-between">
        <span>© 2026 VERITAS EDITORIAL SERIF SYSTEM</span>
        <span>IVORY CANVAS #FAFAF8</span>
      </div>
    </footer>
  );
};

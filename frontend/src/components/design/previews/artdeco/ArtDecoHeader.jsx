import React from "react";

export const ArtDecoHeader = () => {
  return (
    <header className="w-full bg-[#0A0A0A] border-b-2 border-[#D4AF37] sticky top-0 z-40 font-['Marcellus'] text-[#F2F0E4]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rotate-45 border-2 border-[#D4AF37] flex items-center justify-center bg-[#141414]">
            <span className="-rotate-45 font-bold text-xs text-[#D4AF37]">AD</span>
          </div>
          <span className="font-bold text-2xl uppercase tracking-[0.25em] text-[#D4AF37]">THE GATSBY</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-['Josefin_Sans'] uppercase tracking-[0.2em] text-[#F2F0E4]">
          <a href="#features" className="hover:text-[#D4AF37] transition-colors">I. FACADE</a>
          <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">II. RESERVES</a>
          <a href="#showcase" className="hover:text-[#D4AF37] transition-colors">III. ATELIER</a>
        </nav>
        <button className="px-6 py-3 border-2 border-[#D4AF37] bg-transparent text-[#D4AF37] font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0A0A0A] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all">
          INVITATION
        </button>
      </div>
    </header>
  );
};

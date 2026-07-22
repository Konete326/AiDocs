import React from "react";

export const ArtDecoFooter = () => {
  return (
    <footer className="bg-[#0A0A0A] text-[#F2F0E4] py-16 font-['Marcellus']">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-bold text-2xl uppercase tracking-[0.2em] text-[#D4AF37] mb-4">THE GATSBY</div>
          <p className="font-['Josefin_Sans'] text-xs text-[#888888] leading-relaxed">
            Opulence, mathematical precision, and architectural grandeur from the Roaring Twenties.
          </p>
        </div>
        <div>
          <div className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-4">I. FACADE</div>
          <ul className="space-y-2 font-['Josefin_Sans'] text-xs text-[#888888]">
            <li><a href="#features" className="hover:text-[#D4AF37]">Grand Canon</a></li>
            <li><a href="#pricing" className="hover:text-[#D4AF37]">Ziggurat Spires</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-4">II. SUITE</div>
          <ul className="space-y-2 font-['Josefin_Sans'] text-xs text-[#888888]">
            <li><a href="#showcase" className="hover:text-[#D4AF37]">Atelier Library</a></li>
            <li><a href="#pricing" className="hover:text-[#D4AF37]">Gold Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-4">III. PALACE</div>
          <p className="font-['Josefin_Sans'] text-xs text-[#888888]">NEW YORK • PARIS • METROPOLIS</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#D4AF37]/30 font-['Josefin_Sans'] text-[10px] uppercase text-[#888888] flex justify-between">
        <span>© 1925-2026 THE GATSBY ART DECO SUITE</span>
        <span>METALLIC GOLD #D4AF37</span>
      </div>
    </footer>
  );
};

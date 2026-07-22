import React from "react";

export const LuxuryFooter = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#F9F8F6] py-20 font-['Inter']">
      <div className="max-w-[1600px] mx-auto px-8 grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <span className="font-['Playfair_Display'] text-3xl font-bold tracking-tight text-[#F9F8F6] block mb-4">Maison & Co.</span>
          <p className="text-xs text-[#EBE5DE]/70 leading-relaxed font-normal">
            Refined digital craftsmanship for luxury visual brand identities.
          </p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">COLLECTION</span>
          <ul className="space-y-2 text-xs text-[#EBE5DE]/80">
            <li><a href="#features" className="hover:text-white transition-colors">Haute Couture</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Atelier Membership</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">DISCIPLINE</span>
          <ul className="space-y-2 text-xs text-[#EBE5DE]/80">
            <li><a href="#showcase" className="hover:text-white transition-colors">Editorial Specs</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Gold Tokens</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">MAISON</span>
          <p className="text-xs text-[#EBE5DE]/70">Paris • Milan • New York</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-8 pt-8 border-t border-[#EBE5DE]/20 text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/50 flex justify-between">
        <span>© 2026 MAISON & CO. EDITORIAL LUXURY</span>
        <span>ELEGANCE THROUGH RESTRAINT</span>
      </div>
    </footer>
  );
};

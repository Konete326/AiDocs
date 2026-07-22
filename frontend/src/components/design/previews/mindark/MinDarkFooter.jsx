import React from "react";

export const MinDarkFooter = () => {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10 py-16 font-['Space_Grotesk'] text-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-bold text-2xl tracking-tight text-[#F59E0B] mb-4">NOCTURNE</div>
          <p className="font-['Inter'] text-xs text-[#71717A] leading-relaxed">
            Atmospheric depth through layered darkness and glowing warm amber embers.
          </p>
        </div>
        <div>
          <div className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium mb-4">SYSTEM</div>
          <ul className="space-y-2 font-['Inter'] text-xs text-[#71717A]">
            <li><a href="#features" className="hover:text-[#FAFAFA]">Atmosphere</a></li>
            <li><a href="#pricing" className="hover:text-[#FAFAFA]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium mb-4">COMPONENTS</div>
          <ul className="space-y-2 font-['Inter'] text-xs text-[#71717A]">
            <li><a href="#showcase" className="hover:text-[#FAFAFA]">Library</a></li>
            <li><a href="#pricing" className="hover:text-[#FAFAFA]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium mb-4">ACCENT</div>
          <p className="font-['Inter'] text-xs text-[#71717A]">WARM AMBER #F59E0B</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-white/10 font-['Inter'] text-[10px] uppercase text-[#71717A] flex justify-between">
        <span>© 2026 MINIMALIST DARK SYSTEM</span>
        <span>LAYERED SLATE #0A0A0F</span>
      </div>
    </footer>
  );
};

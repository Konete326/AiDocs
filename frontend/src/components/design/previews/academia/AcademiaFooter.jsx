import React from "react";

export const AcademiaFooter = () => {
  return (
    <footer className="bg-[#1C1714] text-[#E8DFD4] py-16 font-['Cormorant_Garamond',serif]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-['Cinzel'] font-bold text-2xl uppercase tracking-[0.25em] text-[#C9A962] mb-4">ATHENAEUM</div>
          <p className="font-['Crimson_Pro'] text-sm text-[#9C8B7A] leading-relaxed">
            Scholarly gravitas and timeless elegance from Renaissance manuscripts to modern web.
          </p>
        </div>
        <div>
          <div className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#C9A962] mb-4">VOLUME I</div>
          <ul className="space-y-2 font-['Crimson_Pro'] text-sm text-[#9C8B7A]">
            <li><a href="#features" className="hover:text-[#C9A962]">Pillars</a></li>
            <li><a href="#pricing" className="hover:text-[#C9A962]">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#C9A962] mb-4">VOLUME II</div>
          <ul className="space-y-2 font-['Crimson_Pro'] text-sm text-[#9C8B7A]">
            <li><a href="#showcase" className="hover:text-[#C9A962]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#C9A962]">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#C9A962] mb-4">LOCATION</div>
          <p className="font-['Crimson_Pro'] text-sm text-[#9C8B7A]">OXFORD • CAMBRIDGE • HEIDELBERG</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#4A3F35] font-['Cinzel'] text-[10px] uppercase text-[#9C8B7A] flex justify-between">
        <span>© 2026 ATHENAEUM ACADEMIA SYSTEM</span>
        <span>POLISHED BRASS #C9A962</span>
      </div>
    </footer>
  );
};

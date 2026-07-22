import React from "react";

export const SwissFooter = () => {
  return (
    <footer className="bg-black text-white py-16 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase mb-4 text-[#FF3000]">SWISS STYLE</div>
          <p className="font-bold text-xs text-neutral-400 leading-relaxed uppercase">
            Objective communication born in 1950s Switzerland.
          </p>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#FF3000] mb-4">01. CANON</div>
          <ul className="space-y-2 font-bold text-xs uppercase text-neutral-300">
            <li><a href="#features" className="hover:text-[#FF3000]">Manifesto</a></li>
            <li><a href="#pricing" className="hover:text-[#FF3000]">Grids</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#FF3000] mb-4">02. TOKENS</div>
          <ul className="space-y-2 font-bold text-xs uppercase text-neutral-300">
            <li><a href="#showcase" className="hover:text-[#FF3000]">Components</a></li>
            <li><a href="#pricing" className="hover:text-[#FF3000]">Swiss Red</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#FF3000] mb-4">03. LOCATION</div>
          <p className="font-bold text-xs text-neutral-400 uppercase">Zurich • Basel • Geneva</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t-2 border-neutral-800 font-black text-[10px] uppercase text-neutral-500 flex justify-between">
        <span>© 2026 SWISS INTERNATIONAL STYLE</span>
        <span>UNIVERSAL CLARITY</span>
      </div>
    </footer>
  );
};

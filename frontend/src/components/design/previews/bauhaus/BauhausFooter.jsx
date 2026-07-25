import React from "react";

export const BauhausFooter = () => {
  return (
    <footer className="bg-[#121212] text-white border-t-4 border-[#121212] py-16 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase mb-4 text-[#F0C020]">BAUHAUS</div>
          <p className="font-bold text-xs text-neutral-400 leading-relaxed uppercase">
            Synthesizing art and tech into pure geometric composition.
          </p>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#D02020] mb-4">ARCHIVE</div>
          <ul className="space-y-2 font-bold text-xs uppercase text-neutral-300">
            <li><a href="#features" className="hover:text-white">Manifesto</a></li>
            <li><a href="#pricing" className="hover:text-white">Workshops</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#1040C0] mb-4">COLLECTION</div>
          <ul className="space-y-2 font-bold text-xs uppercase text-neutral-300">
            <li><a href="#showcase" className="hover:text-white">Components</a></li>
            <li><a href="#pricing" className="hover:text-white">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase text-[#F0C020] mb-4">STUDIO</div>
          <p className="font-bold text-xs text-neutral-400 uppercase">Weimar - Dessau - Berlin</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t-2 border-neutral-800 font-bold text-[10px] uppercase text-neutral-500 flex justify-between">
        <span>© 2026 BAUHAUS DESIGN SYSTEM</span>
        <span>FORM FOLLOWS FUNCTION</span>
      </div>
    </footer>
  );
};

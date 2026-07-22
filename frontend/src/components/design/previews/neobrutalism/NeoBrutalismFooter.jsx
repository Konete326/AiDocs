import React from "react";

export const NeoBrutalismFooter = () => {
  return (
    <footer className="bg-[#FFD93D] border-t-4 border-black py-16 font-['Space_Grotesk'] text-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-black text-2xl uppercase mb-4 bg-white border-4 border-black px-3 py-1 inline-block shadow-[4px_4px_0px_0px_#000] -rotate-1">
            PUNK_WEB
          </div>
          <p className="font-bold text-xs leading-relaxed uppercase">
            Digital punk rebellion against corporate SaaS aesthetics.
          </p>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-black">[ MANIFESTO ]</div>
          <ul className="space-y-2 font-bold text-xs uppercase">
            <li><a href="#features" className="hover:underline">Sticker DNA</a></li>
            <li><a href="#pricing" className="hover:underline">No-BS Plans</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-black">[ SYSTEM ]</div>
          <ul className="space-y-2 font-bold text-xs uppercase">
            <li><a href="#showcase" className="hover:underline">Components</a></li>
            <li><a href="#pricing" className="hover:underline">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-black text-xs uppercase mb-4 text-black">[ STATUS ]</div>
          <p className="font-bold text-xs uppercase">NEO ENGINE ACTIVE</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t-4 border-black font-black text-[10px] uppercase flex justify-between">
        <span>© 2026 NEO-BRUTALISM DESIGN SYSTEM</span>
        <span>CREAM & POP COLORED</span>
      </div>
    </footer>
  );
};

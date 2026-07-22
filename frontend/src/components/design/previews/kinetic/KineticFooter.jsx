import React from "react";

export const KineticFooter = () => {
  return (
    <footer className="bg-[#DFE104] text-black py-16 font-['Space_Grotesk']">
      <div className="max-w-[95vw] mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-extrabold text-3xl uppercase mb-4 tracking-tighter">KINETIC_TYPE</div>
          <p className="font-medium text-xs leading-relaxed uppercase">
            Typography is the visual structure. Text becomes image, headline becomes hero.
          </p>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 tracking-widest">[ LINKS ]</div>
          <ul className="space-y-2 font-bold text-xs uppercase">
            <li><a href="#features" className="hover:underline">Motion System</a></li>
            <li><a href="#pricing" className="hover:underline">Pricing Tiers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 tracking-widest">[ SYSTEM ]</div>
          <ul className="space-y-2 font-bold text-xs uppercase">
            <li><a href="#showcase" className="hover:underline">Components</a></li>
            <li><a href="#pricing" className="hover:underline">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-extrabold text-xs uppercase mb-4 tracking-widest">[ STATUS ]</div>
          <p className="font-bold text-xs uppercase">KINETIC ENGINE ONLINE</p>
        </div>
      </div>
      <div className="max-w-[95vw] mx-auto px-6 pt-6 border-t-2 border-black font-extrabold text-[10px] uppercase flex justify-between">
        <span>© 2026 KINETIC TYPOGRAPHY POSTER SYSTEM</span>
        <span>ACID YELLOW #DFE104</span>
      </div>
    </footer>
  );
};

import React from "react";

export const MinimalistModernFooter = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-16 font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <span className="font-['Calistoga'] text-2xl text-white block mb-4">Pulse Modern</span>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Clarity through structure, character through bold detail.
          </p>
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold block mb-4">PRODUCT</span>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold block mb-4">DESIGN</span>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><a href="#showcase" className="hover:text-white transition-colors">Components</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Tokens</a></li>
          </ul>
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold block mb-4">SYSTEM</span>
          <p className="text-xs text-slate-400">Minimalism with a Pulse</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-slate-800 font-mono text-[10px] uppercase text-slate-500 flex justify-between">
        <span>© 2026 PULSE MINIMALIST MODERN</span>
        <span>ELECTRIC BLUE GRADIENT</span>
      </div>
    </footer>
  );
};

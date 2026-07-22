import React from "react";

export const FlatFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 font-['Outfit'] shadow-none">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <span className="font-extrabold text-2xl text-white block mb-4">FlatStudio</span>
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            Digital-native print-inspired design built on zero shadows and pure color blocks.
          </p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold block mb-4">PRODUCT</span>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#10B981] font-bold block mb-4">DESIGN</span>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><a href="#showcase" className="hover:text-white transition-colors">Components</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Tokens</a></li>
          </ul>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-[#F59E0B] font-bold block mb-4">SYSTEM</span>
          <p className="text-xs text-gray-400">Zero Depth Reduction</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-gray-800 text-[10px] uppercase font-bold text-gray-500 flex justify-between">
        <span>© 2026 FLAT DESIGN SYSTEM</span>
        <span>ZERO BOX SHADOW</span>
      </div>
    </footer>
  );
};

import React from "react";

export const LinearFooter = () => {
  return (
    <footer className="bg-[#020203] text-white border-t border-white/[0.06] py-16 font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-[#5E6AD2] flex items-center justify-center font-bold text-xs">L</div>
            <span className="font-semibold text-sm tracking-tight">Linear OS</span>
          </div>
          <p className="text-xs text-[#8A8F98] max-w-xs leading-relaxed">
            Precision engineering for modern web applications.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono text-[#8A8F98] uppercase mb-4">Product</div>
          <ul className="space-y-2 text-xs text-[#EDEDEF]">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono text-[#8A8F98] uppercase mb-4">System</div>
          <ul className="space-y-2 text-xs text-[#EDEDEF]">
            <li><a href="#showcase" className="hover:text-white transition-colors">Components</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono text-[#8A8F98] uppercase mb-4">Company</div>
          <p className="text-xs text-[#8A8F98]">San Francisco • Remote</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/[0.06] text-[11px] font-mono text-[#8A8F98] flex justify-between">
        <span>© 2026 LINEAR MODERN DESIGN SYSTEM</span>
        <span>PRECISION & DEPTH</span>
      </div>
    </footer>
  );
};

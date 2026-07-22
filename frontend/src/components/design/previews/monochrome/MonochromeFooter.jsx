import React from "react";

export const MonochromeFooter = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 font-serif">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 border-2 border-white flex items-center justify-center font-bold text-lg font-mono">A</div>
            <span className="font-bold text-xl font-serif">Acme Inc.</span>
          </div>
          <p className="font-serif text-sm text-neutral-400 max-w-sm">Empowering teams to work smarter with an intelligent, unified platform.</p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">Product</div>
          <ul className="space-y-2 font-serif text-xs text-neutral-300">
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#pricing" className="hover:underline">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">System</div>
          <ul className="space-y-2 font-serif text-xs text-neutral-300">
            <li><a href="#showcase" className="hover:underline">Components</a></li>
            <li><a href="#pricing" className="hover:underline">Tokens</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-neutral-800 font-mono text-xs text-neutral-500 flex justify-between">
        <div>© 2026 Acme Inc. All rights reserved.</div>
        <div>MINIMALIST MONOCHROME</div>
      </div>
    </footer>
  );
};

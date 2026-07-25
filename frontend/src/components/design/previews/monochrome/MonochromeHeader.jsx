import React from "react";

export const MonochromeHeader = () => {
  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-40 font-serif">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-bold text-lg font-mono">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-black">Acme Inc.</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-mono font-semibold">
          <a href="#features" className="hover:underline text-black">Features</a>
          <a href="#pricing" className="hover:underline text-black">Pricing</a>
          <a href="#showcase" className="hover:underline text-black font-bold">Components</a>
        </nav>
        <div className="flex items-center space-x-4 font-mono text-xs uppercase tracking-widest">
          <button className="px-4 py-2 text-black hover:underline font-semibold">Log in</button>
          <button className="px-5 py-2.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors font-semibold">Sign up</button>
        </div>
      </div>
    </header>
  );
};

import React from "react";

export const CorporateTrustHeader = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold flex items-center justify-center text-lg shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]">
            C
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Nexus<span className="text-indigo-600">SaaS</span></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Enterprise</a>
          <a href="#showcase" className="hover:text-indigo-600 transition-colors">Solutions</a>
        </nav>
        <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-full shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all">
          Start Free Trial
        </button>
      </div>
    </header>
  );
};

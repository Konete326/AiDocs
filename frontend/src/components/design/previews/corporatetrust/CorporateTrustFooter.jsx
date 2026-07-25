import React from "react";

export const CorporateTrustFooter = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-extrabold text-2xl tracking-tight text-indigo-600 mb-4">NexusSaaS</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The modern enterprise SaaS aesthetic—vibrant, trustworthy, and dimensional.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase font-semibold text-indigo-600 tracking-wider mb-4">PLATFORM</div>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li><a href="#features" className="hover:text-indigo-600">Foundation</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600">Plans</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase font-semibold text-indigo-600 tracking-wider mb-4">SOLUTIONS</div>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li><a href="#showcase" className="hover:text-indigo-600">Components</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase font-semibold text-indigo-600 tracking-wider mb-4">GRADIENT</div>
          <p className="text-xs text-slate-600 font-medium">INDIGO #4F46E5 $\rightarrow$ VIOLET #7C3AED</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-200 text-[10px] uppercase font-semibold text-slate-500 flex justify-between">
        <span>© 2026 CORPORATE TRUST SYSTEM</span>
        <span>SLATE 50 BASE #F8FAFC</span>
      </div>
    </footer>
  );
};

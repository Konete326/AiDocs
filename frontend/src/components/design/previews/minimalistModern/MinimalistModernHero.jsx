import React from "react";
import { ArrowRight } from "lucide-react";

export const MinimalistModernHero = () => {
  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 font-['Inter'] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#0052FF]/30 bg-[#0052FF]/5 px-5 py-2 mb-8">
          <span className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#0052FF] font-semibold">
            MINIMALIST MODERN 4.0
          </span>
        </div>
        <h1 className="font-['Calistoga'] text-5xl md:text-7xl text-[#0F172A] leading-tight mb-8">
          Clarity through structure, character through <span className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] bg-clip-text text-transparent">bold detail.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-10 font-normal">
          Dual-font typography with Calistoga serif headlines and Inter body text, powered by an electrifying Electric Blue gradient.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 font-medium text-xs">
          <button className="px-8 py-4 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2">
            <span>Explore Design System</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-white text-[#0F172A] border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

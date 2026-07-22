import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const CorporateTrustHero = () => {
  return (
    <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 relative overflow-hidden">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-600 mb-8 shadow-xs">
            <ShieldCheck size={16} />
            <span>ENTERPRISE-GRADE TRUST & PERFORMANCE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-8">
            Empower your team with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">intelligent clarity.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-10 font-normal">
            Indigo-to-violet gradients, Slate 50 canvas, colored soft shadows, isometric 3D tilt cards, and atmospheric background blur orbs.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all flex items-center space-x-2">
              <span>EXPLORE PLATFORM</span>
              <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full shadow-xs hover:bg-slate-50 transition-colors">
              BOOK ENTERPRISE DEMO
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-80 h-80 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_25px_-5px_rgba(79,70,229,0.15)] p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
              ★
            </div>
            <div>
              <span className="font-extrabold text-2xl text-slate-900">ISOMETRIC TILT</span>
              <p className="text-xs text-slate-500 mt-1">Soft Indigo Colored Shadows & Micro Depth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

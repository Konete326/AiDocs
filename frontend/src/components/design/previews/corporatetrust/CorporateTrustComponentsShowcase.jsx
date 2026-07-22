import React, { useState } from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";

export const CorporateTrustComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-slate-50 border-b border-slate-200 py-16 px-6 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-white text-indigo-600 border border-slate-200 px-6 py-4 rounded-xl font-semibold text-xs flex items-center space-x-3 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.2)]">
          <ShieldCheck size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase font-semibold text-indigo-600 tracking-wider">LIBRARY</span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">CORPORATE TRUST COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase text-slate-500 font-semibold">1. GRADIENT BUTTONS & LIFTS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          <button onClick={() => triggerToast("Gradient Button Clicked!")} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer">PRIMARY GRADIENT</button>
          <button onClick={() => triggerToast("Secondary Button Clicked!")} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-colors cursor-pointer">SECONDARY WHITE</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 text-indigo-600 hover:underline cursor-pointer">TRIGGER ENTERPRISE DIALOG</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase text-slate-500 font-semibold">2. RECESSED FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Enterprise Name..." className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400" />
          <input type="email" placeholder="Work Email..." className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs uppercase text-slate-500 font-semibold">3. ELEVATED ACCORDION</h3>
        <div className="border border-slate-200 bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.08)] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-sm text-slate-900 cursor-pointer">
            <span>What defines colored soft shadows?</span>
            <ChevronDown size={18} className={`text-indigo-600 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
              Replacing flat monochrome gray drop shadows with subtle indigo-to-violet tinted shadows (rgba(79,70,229,0.1)) for enterprise warmth.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 p-8 rounded-2xl max-w-md w-full font-['Plus_Jakarta_Sans'] space-y-6 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.25)]">
            <div className="flex items-center space-x-3 text-indigo-600">
              <ShieldCheck size={24} />
              <h4 className="text-2xl font-extrabold text-slate-900">ENTERPRISE DIALOG</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">Corporate Trust popup dialog framed with Slate 50 background and indigo gradient highlights.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs rounded-full shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

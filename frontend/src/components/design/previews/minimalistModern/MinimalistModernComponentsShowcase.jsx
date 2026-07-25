import React, { useState } from "react";
import { ChevronDown, Zap, Bell } from "lucide-react";

export const MinimalistModernComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FAFAFA] border-b border-slate-200 py-16 px-6 font-['Inter'] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#0F172A] text-white border-2 border-[#0052FF] px-6 py-4 rounded-xl shadow-xl font-mono text-xs flex items-center space-x-3">
          <Bell size={18} className="text-[#0052FF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#0052FF] font-semibold">LIBRARY</span>
        <h2 className="font-['Calistoga'] text-3xl text-[#0F172A] mt-1">Minimalist Modern Components</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-slate-500 uppercase">1. Electric Blue Buttons (12px Radius)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <button onClick={() => triggerToast("Electric Gradient Button Clicked!")} className="px-6 py-3 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl shadow-md shadow-blue-500/25 hover:-translate-y-0.5 transition-all cursor-pointer">PRIMARY GRADIENT</button>
          <button onClick={() => triggerToast("Secondary Outline Button Clicked!")} className="px-6 py-3 bg-white text-[#0F172A] border border-slate-200 hover:border-[#0052FF]/40 rounded-xl transition-all cursor-pointer">SECONDARY OUTLINE</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 text-[#0052FF] hover:bg-blue-50 rounded-xl transition-all cursor-pointer">TRIGGER CUSTOM ALERT</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-slate-500 uppercase">2. Form Inputs (Focus Ring)</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Project Name..." className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] outline-none focus:ring-2 focus:ring-[#0052FF]" />
          <input type="email" placeholder="user@company.com" className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] outline-none focus:ring-2 focus:ring-[#0052FF]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-mono text-xs text-slate-500 uppercase">3. Accordion & Cards</h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-semibold text-sm text-[#0F172A] cursor-pointer">
            <span>What makes Calistoga serif headlines unique?</span>
            <ChevronDown size={18} className={`text-[#0052FF] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              Warmth, character, and approachable personality paired with clean Inter body text.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-md w-full font-['Inter'] space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-[#0052FF]">
              <Zap size={24} />
              <h4 className="font-['Calistoga'] text-2xl text-[#0F172A]">Modern Alert</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">Custom theme dialog featuring Electric Blue gradient accents and 16px rounded borders.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl font-medium text-xs shadow-md shadow-blue-500/20 cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

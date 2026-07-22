import React, { useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

export const SwissComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-white border-b-4 border-black py-16 px-6 font-['Inter'] text-black space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FF3000] text-white border-4 border-black px-6 py-4 text-xs font-black uppercase tracking-widest flex items-center space-x-3 shadow-2xl">
          <AlertCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#FF3000] font-black">04. SYSTEM LIBRARY</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">SWISS INTERNATIONAL COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase">1. BUTTON VARIANTS (STRICT 0PX RADIUS)</h3>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase tracking-widest">
          <button onClick={() => triggerToast("Swiss Red Action Button Clicked!")} className="px-6 py-3.5 bg-[#FF3000] text-white border-2 border-black hover:bg-black transition-colors cursor-pointer">SWISS RED ACTION</button>
          <button onClick={() => triggerToast("Black Secondary Button Clicked!")} className="px-6 py-3.5 bg-black text-white border-2 border-black hover:bg-[#FF3000] transition-colors cursor-pointer">BLACK SECONDARY</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3.5 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer">TRIGGER SWISS MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase">2. RECTANGULAR FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="ENTER SUBJECT..." className="p-4 bg-white border-4 border-black text-xs font-black uppercase text-black outline-none focus:border-[#FF3000]" />
          <input type="email" placeholder="ENTER EMAIL..." className="p-4 bg-white border-4 border-black text-xs font-black uppercase text-black outline-none focus:border-[#FF3000]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-black text-xs uppercase">3. ACCORDION & GRID STRUCTURE</h3>
        <div className="border-4 border-black">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-black text-xs uppercase bg-[#F2F2F2] cursor-pointer">
            <span>01. WHAT IS UNIVERSAL CLARITY?</span>
            <ChevronDown size={18} className={`text-[#FF3000] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t-4 border-black bg-white font-medium text-xs leading-relaxed text-black">
              The reduction of personal ornamentation to let objective content speak through 4px borders and mathematical grids.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-8 max-w-md w-full font-['Inter'] space-y-6">
            <div className="flex items-center space-x-3 text-[#FF3000]">
              <AlertCircle size={28} />
              <h4 className="text-2xl font-black uppercase text-black">SWISS DIALOG</h4>
            </div>
            <p className="font-bold text-xs uppercase text-neutral-700 leading-relaxed">This custom dialog demonstrates ultra-high contrast pure black and white with Swiss Red accents.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-[#FF3000] cursor-pointer">DISMISS DIALOG</button>
          </div>
        </div>
      )}
    </div>
  );
};

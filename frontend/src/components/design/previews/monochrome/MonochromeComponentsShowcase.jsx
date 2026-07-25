import React, { useState } from "react";
import { ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";

export const MonochromeComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-white border-b-4 border-black py-16 px-6 font-serif space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-black text-white border-2 border-black px-6 py-4 font-mono text-xs uppercase tracking-widest flex items-center space-x-3">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">System Library</span>
        <h2 className="text-3xl font-bold text-black mt-1">Monochrome Component Showcase</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase text-neutral-500 font-bold">1. Button Styles (0px Radius)</h3>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
          <button onClick={() => triggerToast("Primary Button Clicked!")} className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors font-bold cursor-pointer">PRIMARY BUTTON</button>
          <button onClick={() => triggerToast("Outline Button Clicked!")} className="px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-bold cursor-pointer">OUTLINE BUTTON</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 border-b-2 border-black hover:bg-black hover:text-white transition-colors font-bold cursor-pointer">TRIGGER ALERT MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase text-neutral-500 font-bold">2. Inputs & Forms</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="FULL NAME..." className="p-4 bg-white border-2 border-black font-mono text-xs uppercase text-black outline-none focus:border-b-4" />
          <input type="email" placeholder="EMAIL ADDRESS..." className="p-4 bg-white border-2 border-black font-mono text-xs uppercase text-black outline-none focus:border-b-4" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-mono text-xs uppercase text-neutral-500 font-bold">3. Accordions & Cards</h3>
        <div className="border-2 border-black">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-sm bg-neutral-100 cursor-pointer">
            <span>EDITORIAL ACCORDION QUESTION</span>
            <ChevronDown size={18} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t-2 border-black bg-white font-serif text-sm leading-relaxed text-neutral-700">
              Minimalist Monochrome strips design down to its most fundamental elements.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-8 max-w-md w-full font-serif space-y-6">
            <div className="flex items-center space-x-3 text-black">
              <AlertCircle size={28} />
              <h4 className="text-2xl font-bold">EDITORIAL ALERT</h4>
            </div>
            <p className="font-serif text-sm text-neutral-700 leading-relaxed">This custom dialog demonstrates sharp rectangular borders without soft drop shadows.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-black text-white font-mono text-xs uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black cursor-pointer">CLOSE ALERT</button>
          </div>
        </div>
      )}
    </div>
  );
};

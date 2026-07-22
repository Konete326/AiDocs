import React, { useState } from "react";
import { Zap, AlertTriangle } from "lucide-react";

export const NeoBrutalismComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FFFDF5] border-b-4 border-black py-16 px-6 font-['Space_Grotesk'] text-black space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FFD93D] text-black border-4 border-black px-6 py-4 font-black text-xs uppercase tracking-wide flex items-center space-x-3 shadow-[8px_8px_0px_0px_#000]">
          <Zap size={20} strokeWidth={3} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase font-black bg-[#C4B5FD] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_#000]">LIBRARY</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-2">NEO-BRUTALIST COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase">1. PUSH-DOWN BUTTONS (SHADOW CLICK)</h3>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase">
          <button onClick={() => triggerToast("Hot Red Button Clicked!")} className="px-6 py-3 bg-[#FF6B6B] text-white border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">PRIMARY HOT RED</button>
          <button onClick={() => triggerToast("Yellow Button Clicked!")} className="px-6 py-3 bg-[#FFD93D] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">SECONDARY YELLOW</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">TRIGGER NEO MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase">2. YELLOW FOCUS INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="STICKER TITLE..." className="p-4 bg-white border-4 border-black text-xs font-black uppercase text-black outline-none focus:bg-[#FFD93D] focus:shadow-[4px_4px_0px_0px_#000]" />
          <input type="email" placeholder="USER EMAIL..." className="p-4 bg-white border-4 border-black text-xs font-black uppercase text-black outline-none focus:bg-[#FFD93D] focus:shadow-[4px_4px_0px_0px_#000]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-black text-xs uppercase">3. ACCORDION & BLOCK SHADOW</h3>
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-black text-xs uppercase bg-[#C4B5FD] border-b-4 border-black cursor-pointer">
            <span>WHAT IS UNAPOLOGETIC VISIBILITY?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 text-xs font-bold leading-relaxed text-black">
              Enforcing structure with solid 4px black strokes, 45° offset block shadows, and bright pop accent colors.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] border-4 border-black p-8 max-w-md w-full font-['Space_Grotesk'] text-black space-y-6 shadow-[12px_12px_0px_0px_#000]">
            <div className="flex items-center space-x-3 text-[#FF6B6B]">
              <AlertTriangle size={28} strokeWidth={3} />
              <h4 className="text-2xl font-black uppercase text-black">NEO DIALOG</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed">Custom popup dialog framed with solid 4px black borders and a massive 12px block shadow.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-4 bg-[#FF6B6B] text-white font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

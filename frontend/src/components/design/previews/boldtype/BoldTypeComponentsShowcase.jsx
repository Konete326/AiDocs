import React, { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";

export const BoldTypeComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0A0A0A] border-b border-[#262626] py-16 px-6 font-['Inter_Tight',sans-serif] text-[#FAFAFA] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FF3D00] text-[#0A0A0A] px-6 py-4 text-xs font-bold uppercase tracking-wider flex items-center space-x-3 shadow-2xl">
          <Sparkles size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs text-[#FF3D00] uppercase tracking-widest font-semibold">// LIBRARY</span>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">BOLD TYPOGRAPHY COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-[#737373] uppercase">1. ANIMATED RED UNDERLINE BUTTONS</h3>
        <div className="flex flex-wrap gap-6 font-bold text-xs uppercase tracking-wider">
          <button onClick={() => triggerToast("Primary Red Underline Clicked!")} className="relative group text-[#FF3D00] py-2 cursor-pointer">
            <span>PRIMARY VERMILLION</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3D00] group-hover:scale-x-110 transition-transform"></span>
          </button>
          <button onClick={() => triggerToast("Full Inversion Clicked!")} className="px-6 py-3 border border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors cursor-pointer">FULL INVERSION</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 border border-[#FF3D00] text-[#FF3D00] cursor-pointer">TRIGGER DIALOG</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-[#737373] uppercase">2. SHARP FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="PROJECT TITLE..." className="p-4 bg-[#1A1A1A] border border-[#262626] text-xs text-[#FAFAFA] outline-none focus:border-[#FF3D00]" />
          <input type="email" placeholder="USER EMAIL..." className="p-4 bg-[#1A1A1A] border border-[#262626] text-xs text-[#FAFAFA] outline-none focus:border-[#FF3D00]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-mono text-xs text-[#737373] uppercase">3. ACCORDION & SHARP EDGES</h3>
        <div className="border border-[#262626] bg-[#0F0F0F]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-xs uppercase text-[#FAFAFA] cursor-pointer">
            <span>WHAT DEFINES EXTREME SCALE CONTRAST?</span>
            <span className="text-[#FF3D00]">{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#262626] text-xs text-[#737373] leading-relaxed font-normal">
              A 6:1 or greater ratio between headline and paragraph text framing letterforms with generous negative space.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] border-2 border-[#FF3D00] p-8 max-w-md w-full font-['Inter_Tight',sans-serif] space-y-6">
            <div className="flex items-center space-x-3 text-[#FF3D00]">
              <AlertCircle size={28} />
              <h4 className="text-2xl font-black uppercase text-[#FAFAFA]">EDITORIAL DIALOG</h4>
            </div>
            <p className="text-xs text-[#737373] leading-relaxed font-medium">Custom dark dialog framed by 2px vermillion borders and sharp 0px corners.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#FF3D00] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

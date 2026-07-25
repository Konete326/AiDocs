import React, { useState } from "react";
import { Zap, AlertOctagon } from "lucide-react";

export const KineticComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#09090B] border-b-2 border-[#3F3F46] py-16 px-6 font-['Space_Grotesk'] text-[#FAFAFA] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#DFE104] text-black border-2 border-black px-6 py-4 font-extrabold text-xs uppercase tracking-tight flex items-center space-x-3 shadow-2xl">
          <Zap size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs text-[#DFE104] font-extrabold uppercase tracking-widest">[ COMPONENT SYSTEM ]</span>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter mt-1">KINETIC UI ELEMENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-extrabold text-xs text-[#A1A1AA] uppercase">1. BUTTON VARIANTS (SHARP CORNERS)</h3>
        <div className="flex flex-wrap gap-4 font-extrabold text-xs uppercase tracking-tight">
          <button onClick={() => triggerToast("Primary Acid Yellow Button Triggered!")} className="px-8 py-4 bg-[#DFE104] text-black hover:scale-105 transition-transform cursor-pointer">PRIMARY ACID ACCENT</button>
          <button onClick={() => triggerToast("Outline Button Clicked!")} className="px-8 py-4 border-2 border-[#3F3F46] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-black transition-colors cursor-pointer">OUTLINE INVERT</button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-4 text-[#DFE104] underline hover:text-white transition-colors cursor-pointer">TRIGGER BRUTAL ALERT</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-extrabold text-xs text-[#A1A1AA] uppercase">2. OVERSIZED INPUT FIELDS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="ENTER PROJECT NAME..." className="p-4 bg-transparent border-b-2 border-[#3F3F46] text-xl font-extrabold uppercase text-[#FAFAFA] outline-none focus:border-[#DFE104] placeholder-[#27272A]" />
          <input type="email" placeholder="ENTER USER EMAIL..." className="p-4 bg-transparent border-b-2 border-[#3F3F46] text-xl font-extrabold uppercase text-[#FAFAFA] outline-none focus:border-[#DFE104] placeholder-[#27272A]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-extrabold text-xs text-[#A1A1AA] uppercase">3. ACCORDION & HARD EDGES</h3>
        <div className="border-2 border-[#3F3F46]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-extrabold text-sm uppercase bg-[#27272A] cursor-pointer">
            <span>WHAT DEFINES KINETIC BRUTALISM?</span>
            <span className="text-[#DFE104]">{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t-2 border-[#3F3F46] text-xs font-medium text-[#A1A1AA] leading-relaxed">
              Oversized Space Grotesk headlines, Acid Yellow highlights, infinite marquees, and sharp 0px corners.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#09090B] border-4 border-[#DFE104] p-8 max-w-md w-full font-['Space_Grotesk'] text-[#FAFAFA] space-y-6">
            <div className="flex items-center space-x-3 text-[#DFE104]">
              <AlertOctagon size={28} />
              <h4 className="text-2xl font-extrabold uppercase">BRUTAL DIALOG</h4>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Custom high-contrast alert dialog using rich black and acid yellow.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-4 bg-[#DFE104] text-black font-extrabold text-xs uppercase hover:bg-white cursor-pointer">DISMISS ALERT</button>
          </div>
        </div>
      )}
    </div>
  );
};

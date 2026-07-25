import React, { useState } from "react";
import { Layers, ChevronDown } from "lucide-react";

export const ClaymorphismComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#F4F1FA] border-b border-[#332F3A]/10 py-16 px-6 font-['Nunito',sans-serif] text-[#332F3A] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-white text-[#7C3AED] border border-white px-6 py-4 rounded-full font-black text-xs uppercase flex items-center space-x-3 shadow-[12px_12px_24px_rgba(160,150,180,0.3)]">
          <Layers size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase font-black bg-white/80 border border-white px-4 py-1.5 rounded-full text-[#0EA5E9] shadow-[4px_4px_8px_rgba(160,150,180,0.2)]">LIBRARY</span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">CLAYMORPHIC COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase text-[#635F69]">1. SQUISH BUTTONS (ACTIVE SCALE 0.92X)</h3>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase">
          <button onClick={() => triggerToast("Primary Clay Violet Squished!")} className="px-7 py-3.5 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white rounded-[20px] shadow-[8px_8px_16px_rgba(124,58,237,0.3)] hover:-translate-y-1 active:scale-[0.92] transition-all cursor-pointer">PRIMARY VIOLET</button>
          <button onClick={() => triggerToast("Pink Clay Button Squished!")} className="px-7 py-3.5 bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white rounded-[20px] shadow-[8px_8px_16px_rgba(219,39,119,0.3)] hover:-translate-y-1 active:scale-[0.92] transition-all cursor-pointer">HOT PINK</button>
          <button onClick={() => setModalOpen(true)} className="px-7 py-3.5 bg-white text-[#332F3A] rounded-[20px] shadow-[8px_8px_16px_rgba(160,150,180,0.2)] hover:-translate-y-1 active:scale-[0.92] transition-all cursor-pointer">TRIGGER CLAY DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['DM_Sans']">
        <h3 className="font-['Nunito'] font-black text-xs uppercase text-[#635F69]">2. RECESSED CONCAVE INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Marshmallow Name..." className="p-4 bg-[#EFEBF5] rounded-2xl text-sm font-medium text-[#332F3A] outline-none shadow-[inset_8px_8px_16px_#d9d4e3,inset_-8px_-8px_16px_#ffffff] focus:bg-white transition-all placeholder:text-[#635F69]" />
          <input type="email" placeholder="Silicone Email..." className="p-4 bg-[#EFEBF5] rounded-2xl text-sm font-medium text-[#332F3A] outline-none shadow-[inset_8px_8px_16px_#d9d4e3,inset_-8px_-8px_16px_#ffffff] focus:bg-white transition-all placeholder:text-[#635F69]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-black text-xs uppercase text-[#635F69]">3. GLASS-CLAY ACCORDION</h3>
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[28px] shadow-[12px_12px_24px_rgba(160,150,180,0.2)] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-black text-base text-[#332F3A] cursor-pointer">
            <span>What defines High-Fidelity 4-layer shadow stacks?</span>
            <ChevronDown size={20} className={`text-[#7C3AED] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 font-['DM_Sans'] text-xs font-medium text-[#635F69] leading-relaxed border-t border-white">
              Outer ambient occlusion, top-left highlight, inner color bounce light, and specimen rim light simulating volumetric vinyl and soft-touch silicone.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#332F3A]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[40px] max-w-md w-full font-['Nunito'] space-y-6 shadow-[24px_24px_48px_rgba(160,150,180,0.35),-16px_-16px_32px_rgba(255,255,255,1)]">
            <div className="flex items-center space-x-3 text-[#7C3AED]">
              <Layers size={28} />
              <h4 className="text-2xl font-black text-[#332F3A]">DIGITAL CLAY DIALOG</h4>
            </div>
            <p className="font-['DM_Sans'] text-xs font-medium text-[#635F69] leading-relaxed">Custom Claymorphism dialog framed with 40px super-rounded corners and multi-layer volumetric shadows.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-4 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-black text-xs uppercase rounded-[20px] shadow-[8px_8px_16px_rgba(124,58,237,0.3)] active:scale-[0.92] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

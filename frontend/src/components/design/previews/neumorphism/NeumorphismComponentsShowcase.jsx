import React, { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";

export const NeumorphismComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#E0E5EC] py-16 px-6 font-['Plus_Jakarta_Sans',sans-serif] text-[#3D4852] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#E0E5EC] text-[#6C63FF] px-6 py-4 rounded-2xl font-['DM_Sans'] font-bold text-xs uppercase shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex items-center space-x-3">
          <Layers size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['DM_Sans'] text-xs uppercase font-bold text-[#6C63FF] tracking-wider">LIBRARY</span>
        <h2 className="text-3xl font-extrabold tracking-tight mt-1">NEUMORPHIC COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['DM_Sans']">
        <h3 className="text-xs uppercase text-[#6B7280] font-bold">1. EXTRUDED BUTTONS & INSET PRESS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
          <button onClick={() => triggerToast("Primary Violet Clicked!")} className="px-6 py-3.5 bg-[#6C63FF] text-white rounded-2xl shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] transition-all cursor-pointer">PRIMARY VIOLET</button>
          <button onClick={() => triggerToast("Soft Clay Clicked!")} className="px-6 py-3.5 bg-[#E0E5EC] text-[#3D4852] rounded-2xl shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] active:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6)] transition-all cursor-pointer">SOFT CLAY</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3.5 bg-[#E0E5EC] text-[#6C63FF] rounded-2xl shadow-[inset_6px_6px_10px_rgb(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] cursor-pointer">TRIGGER SOFT DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['DM_Sans']">
        <h3 className="text-xs uppercase text-[#6B7280] font-bold">2. INSET DEEP WELL INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Clay Name..." className="p-3.5 bg-[#E0E5EC] rounded-2xl text-xs text-[#3D4852] outline-none shadow-[inset_10px_10px_20px_rgb(163,177,198,0.7),inset_-10px_-10px_20px_rgba(255,255,255,0.6)] focus:ring-2 focus:ring-[#6C63FF] placeholder:text-[#A0AEC0]" />
          <input type="email" placeholder="Soft Email..." className="p-3.5 bg-[#E0E5EC] rounded-2xl text-xs text-[#3D4852] outline-none shadow-[inset_10px_10px_20px_rgb(163,177,198,0.7),inset_-10px_-10px_20px_rgba(255,255,255,0.6)] focus:ring-2 focus:ring-[#6C63FF] placeholder:text-[#A0AEC0]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-['DM_Sans'] text-xs uppercase text-[#6B7280] font-bold">3. MOLDED ACCORDION</h3>
        <div className="bg-[#E0E5EC] rounded-[24px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-sm text-[#3D4852] cursor-pointer">
            <span>What defines RGBA alpha shadow blending?</span>
            <ChevronDown size={18} className={`text-[#6C63FF] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 font-['DM_Sans'] text-xs text-[#6B7280] leading-relaxed">
              Using alpha transparency (rgba(255,255,255,0.5) and rgb(163,177,198,0.6)) for smooth light-source blending instead of solid opaque hex shadow values.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#3D4852]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#E0E5EC] p-8 rounded-[32px] max-w-md w-full font-['Plus_Jakarta_Sans'] space-y-6 shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)]">
            <div className="flex items-center space-x-3 text-[#6C63FF]">
              <Layers size={24} />
              <h4 className="text-2xl font-extrabold text-[#3D4852]">SOFT UI DIALOG</h4>
            </div>
            <p className="font-['DM_Sans'] text-xs text-[#6B7280] leading-relaxed">Neumorphic popup dialog extruded from the same monochromatic cool clay canvas.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#6C63FF] text-white font-['DM_Sans'] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-[9px_9px_16px_rgb(163,177,198,0.6)] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { ChevronDown, AlertCircle, Bell } from "lucide-react";

export const BauhausComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#F0F0F0] border-b-4 border-[#121212] py-16 px-6 font-['Outfit'] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#F0C020] text-black border-4 border-[#121212] px-6 py-4 shadow-[6px_6px_0px_0px_#121212] font-black text-xs uppercase tracking-widest flex items-center space-x-3">
          <Bell size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-bold text-xs uppercase tracking-widest text-[#D02020]">LIBRARY</span>
        <h2 className="text-3xl font-black uppercase text-[#121212]">BAUHAUS UI COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase text-[#121212]">1. BUTTON VARIANTS</h3>
        <div className="flex flex-wrap gap-4 font-bold text-xs uppercase">
          <button onClick={() => triggerToast("Red Primary Button Clicked!")} className="px-6 py-3 bg-[#D02020] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">PRIMARY RED</button>
          <button onClick={() => triggerToast("Blue Secondary Button Clicked!")} className="px-6 py-3 bg-[#1040C0] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">SECONDARY BLUE</button>
          <button onClick={() => triggerToast("Yellow Accent Button Clicked!")} className="px-6 py-3 bg-[#F0C020] text-black border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">ACCENT YELLOW</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-white text-black border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer">TRIGGER MODAL ALERT</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-xs uppercase text-[#121212]">2. FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="ENTER YOUR NAME..." className="p-4 bg-white border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] font-bold text-xs uppercase text-[#121212] outline-none focus:bg-[#FFF9C4]" />
          <input type="email" placeholder="ENTER YOUR EMAIL..." className="p-4 bg-white border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] font-bold text-xs uppercase text-[#121212] outline-none focus:bg-[#FFF9C4]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-black text-xs uppercase text-[#121212]">3. ACCORDION (FAQ)</h3>
        <div className="border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className={`w-full p-4 flex items-center justify-between font-black text-xs uppercase cursor-pointer ${accordionOpen ? "bg-[#D02020] text-white" : "bg-white text-black"}`}>
            <span>WHAT IS THE BAUHAUS MANIFESTO?</span>
            <ChevronDown size={18} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 bg-[#FFF9C4] border-t-4 border-[#121212] font-bold text-xs leading-relaxed text-black">
              The Bauhaus manifesto unites art, craft, and technology into a single structural discipline.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#121212] p-8 shadow-[10px_10px_0px_0px_#121212] max-w-md w-full font-['Outfit'] space-y-6">
            <div className="flex items-center space-x-3 text-[#D02020]">
              <AlertCircle size={28} />
              <h4 className="text-2xl font-black uppercase text-[#121212]">BAUHAUS ALERT</h4>
            </div>
            <p className="font-bold text-xs uppercase text-neutral-700 leading-relaxed">This custom alert modal demonstrates the sharp 4px border offset and constructivist theme rules.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#D02020] text-white font-black text-xs uppercase border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] cursor-pointer">CLOSE ALERT</button>
          </div>
        </div>
      )}
    </div>
  );
};

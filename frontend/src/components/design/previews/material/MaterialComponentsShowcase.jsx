import React, { useState } from "react";
import { ChevronDown, Palette } from "lucide-react";

export const MaterialComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FFFBFE] border-b border-[#E7E0EC] py-16 px-6 font-['Roboto'] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#E8DEF8] text-[#1D192B] px-6 py-4 rounded-full text-xs font-medium flex items-center space-x-3 shadow-md border border-[#E7E0EC]">
          <Palette size={18} className="text-[#6750A4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase tracking-wider text-[#6750A4] font-semibold">LIBRARY</span>
        <h2 className="text-3xl font-medium text-[#1C1B1F] mt-1">Material Design 3 Components</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-[#49454F] uppercase">1. Pill-Shaped Buttons (Rounded Full)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <button onClick={() => triggerToast("Primary Pill Button Clicked!")} className="px-6 py-3 bg-[#6750A4] text-white rounded-full shadow-sm hover:bg-[#6750A4]/90 active:scale-95 transition-all cursor-pointer">PRIMARY PILL</button>
          <button onClick={() => triggerToast("Secondary Container Clicked!")} className="px-6 py-3 bg-[#E8DEF8] text-[#1D192B] rounded-full hover:bg-[#E8DEF8]/80 active:scale-95 transition-all cursor-pointer">SECONDARY CONTAINER</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-[#F3EDF7] text-[#6750A4] border border-[#79747E]/30 rounded-full active:scale-95 transition-all cursor-pointer">TRIGGER MD3 DIALOG</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-[#49454F] uppercase">2. Tonal Recessed Inputs</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Full Name..." className="p-3.5 bg-[#E7E0EC] rounded-t-xl rounded-b-none border-b-2 border-[#6750A4] text-xs text-[#1C1B1F] outline-none focus:bg-[#E8DEF8]" />
          <input type="email" placeholder="Email Address..." className="p-3.5 bg-[#E7E0EC] rounded-t-xl rounded-b-none border-b-2 border-[#6750A4] text-xs text-[#1C1B1F] outline-none focus:bg-[#E8DEF8]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs font-semibold text-[#49454F] uppercase">3. Soft Organic Accordion</h3>
        <div className="bg-[#F3EDF7] rounded-[24px] overflow-hidden shadow-sm">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-medium text-sm text-[#1C1B1F] cursor-pointer">
            <span>What defines Material Design 3 surface tones?</span>
            <ChevronDown size={18} className={`text-[#6750A4] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#E7E0EC] text-xs text-[#49454F] leading-relaxed font-normal">
              MD3 uses warm off-white surface tones (#FFFBFE, #F3EDF7, #E8DEF8) instead of clinical white backgrounds.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#1C1B1F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFBFE] p-8 rounded-[28px] max-w-md w-full font-['Roboto'] space-y-6 shadow-lg border border-[#E7E0EC]">
            <div className="flex items-center space-x-3 text-[#6750A4]">
              <Palette size={24} />
              <h4 className="text-2xl font-medium text-[#1C1B1F]">MD3 Surface Dialog</h4>
            </div>
            <p className="text-xs text-[#49454F] leading-relaxed">Custom Material Design 3 dialog with 28px organic rounded corners and soft tonal elevation.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#6750A4] text-white rounded-full font-medium text-xs shadow-sm cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { ChevronDown, Crown } from "lucide-react";

export const LuxuryComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div id="showcase" className="relative bg-[#F9F8F6] border-b border-[#1A1A1A]/20 py-20 px-8 font-['Inter'] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#1A1A1A] text-[#F9F8F6] border-l-4 border-[#D4AF37] px-6 py-4 text-xs uppercase tracking-[0.2em] shadow-xl flex items-center space-x-3">
          <Crown size={16} className="text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">ATELIER LIBRARY</span>
        <h2 className="font-['Playfair_Display'] text-3xl text-[#1A1A1A] mt-1">Luxury Component Suite</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#6C6863]">1. Gold Overlay & Outline Buttons</h3>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
          <button onClick={() => triggerToast("Gold Overlay Button Clicked!")} className="relative group overflow-hidden px-8 py-3.5 bg-[#1A1A1A] text-white font-medium cursor-pointer">
            <span className="relative z-10 text-white group-hover:text-[#1A1A1A] transition-colors duration-300">PRIMARY GOLD SLIDE</span>
            <span className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          </button>
          <button onClick={() => triggerToast("Secondary Outline Clicked!")} className="px-8 py-3.5 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-500 font-medium cursor-pointer">SECONDARY OUTLINE</button>
          <button onClick={handleOpenModal} className="px-8 py-3.5 text-[#1A1A1A] underline hover:text-[#D4AF37] transition-colors duration-500 font-medium cursor-pointer">TRIGGER EDITORIAL MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#6C6863]">2. Underline-Only Inputs (Italic Serif Placeholder)</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          <input type="text" placeholder="Enter Full Name..." className="p-3 bg-transparent border-b border-[#1A1A1A] text-sm text-[#1A1A1A] placeholder:font-['Playfair_Display'] placeholder:italic placeholder:text-[#6C6863] outline-none focus:border-[#D4AF37]" />
          <input type="email" placeholder="Enter Client Email..." className="p-3 bg-transparent border-b border-[#1A1A1A] text-sm text-[#1A1A1A] placeholder:font-['Playfair_Display'] placeholder:italic placeholder:text-[#6C6863] outline-none focus:border-[#D4AF37]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#6C6863]">3. Accordion & Border Detail</h3>
        <div className="border-t border-[#1A1A1A]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full py-4 flex items-center justify-between font-['Playfair_Display'] text-lg text-[#1A1A1A] cursor-pointer">
            <span>What defines editorial restrained luxury?</span>
            <ChevronDown size={18} className={`text-[#D4AF37] transition-transform duration-500 ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="pb-4 text-sm text-[#6C6863] leading-relaxed font-normal">
              Elegance through restraint, generous negative space, 0px border radius, and slow 1500ms transitions.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#F9F8F6] border-t-4 border-[#D4AF37] p-10 max-w-md w-full font-['Inter'] space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Crown size={24} />
              <h4 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A]">Editorial Dialog</h4>
            </div>
            <p className="text-sm text-[#6C6863] leading-relaxed">This custom dialog presents luxury typography with warm alabaster backgrounds.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-500 cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

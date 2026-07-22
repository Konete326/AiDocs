import React, { useState } from "react";
import { BookOpen, Scroll } from "lucide-react";

export const AcademiaComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#1C1714] border-b border-[#4A3F35] py-16 px-6 font-['Cormorant_Garamond',serif] text-[#E8DFD4] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#251E19] text-[#C9A962] border border-[#C9A962] px-6 py-4 font-['Cinzel'] text-xs uppercase tracking-[0.2em] shadow-xl flex items-center space-x-3">
          <BookOpen size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#C9A962]">ATELIER EXHIBITS</span>
        <h2 className="text-3xl md:text-4xl text-[#E8DFD4] mt-1">ACADEMIA COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['Cinzel']">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#9C8B7A]">1. BRASS & CRIMSON BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
          <button onClick={() => triggerToast("Brass Metallic Button Clicked!")} className="px-8 py-3.5 bg-gradient-to-b from-[#D4B872] via-[#C9A962] to-[#B8953F] text-[#1C1714] font-bold rounded-[4px] shadow-md hover:brightness-110 transition-all cursor-pointer">POLISHED BRASS</button>
          <button onClick={() => triggerToast("Crimson Outline Transform Clicked!")} className="px-8 py-3.5 border-2 border-[#C9A962] text-[#C9A962] rounded-[4px] hover:bg-[#8B2635] hover:border-[#8B2635] hover:text-[#E8DFD4] transition-all cursor-pointer">CRIMSON TRANSFORM</button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-3.5 text-[#C9A962] underline hover:text-[#D4B872] cursor-pointer">TRIGGER FORMAL PROCLAMATION</button>
        </div>
      </div>

      <div className="space-y-4 font-['Crimson_Pro']">
        <h3 className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#9C8B7A]">2. AGED OAK FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Scholar Name..." className="p-3.5 bg-[#251E19] border border-[#4A3F35] rounded-[4px] text-sm text-[#E8DFD4] outline-none focus:border-[#C9A962] placeholder:italic placeholder:text-[#9C8B7A]" />
          <input type="email" placeholder="Institutional Email..." className="p-3.5 bg-[#251E19] border border-[#4A3F35] rounded-[4px] text-sm text-[#E8DFD4] outline-none focus:border-[#C9A962] placeholder:italic placeholder:text-[#9C8B7A]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-['Crimson_Pro']">
        <h3 className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#9C8B7A]">3. AGED LEDGER ACCORDION</h3>
        <div className="border border-[#4A3F35] bg-[#251E19] rounded-[4px]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Cormorant_Garamond'] text-lg text-[#C9A962] cursor-pointer">
            <span>What defines cathedral arch-top rounding?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#4A3F35] text-sm text-[#9C8B7A] leading-relaxed">
              Cathedral arch rounding (40% 40% 0 0) evokes Renaissance windows and Gothic university libraries.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#1C1714]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#251E19] border-2 border-[#C9A962] p-8 max-w-md w-full font-['Cormorant_Garamond'] space-y-6 rounded-[4px] shadow-2xl">
            <div className="flex items-center space-x-3 text-[#C9A962]">
              <BookOpen size={24} />
              <h4 className="font-['Cinzel'] text-2xl text-[#E8DFD4]">PROCLAMATION</h4>
            </div>
            <p className="font-['Crimson_Pro'] text-sm text-[#9C8B7A] leading-relaxed">Formal proclamation modal framed by wood grain borders and polished brass highlights.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-gradient-to-b from-[#D4B872] via-[#C9A962] to-[#B8953F] text-[#1C1714] font-['Cinzel'] font-bold text-xs uppercase tracking-[0.2em] rounded-[4px] cursor-pointer">DISMISS PROCLAMATION</button>
          </div>
        </div>
      )}
    </div>
  );
};

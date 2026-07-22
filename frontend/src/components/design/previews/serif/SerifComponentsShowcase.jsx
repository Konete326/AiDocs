import React, { useState } from "react";
import { Sparkles, BookOpen } from "lucide-react";

export const SerifComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FAFAF8] border-b border-[#E8E4DF] py-16 px-6 font-['Playfair_Display',serif] text-[#1A1A1A] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#1A1A1A] text-[#FAFAF8] border border-[#B8860B] px-6 py-4 rounded-md font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] shadow-lg flex items-center space-x-3">
          <BookOpen size={18} className="text-[#B8860B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#B8860B] font-medium">CHAPTER III</span>
        <h2 className="text-3xl font-normal text-[#1A1A1A] mt-1">SERIF COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['Source_Sans_3']">
        <h3 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#6B6B6B] font-medium">1. BURNISHED GOLD BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wider font-medium">
          <button onClick={() => triggerToast("Gold Button Clicked!")} className="px-6 py-3 bg-[#B8860B] text-white rounded-md shadow-sm hover:bg-[#D4A84B] transition-all cursor-pointer">PRIMARY GOLD</button>
          <button onClick={() => triggerToast("Outline Button Clicked!")} className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] rounded-md hover:bg-[#F5F3F0] transition-colors cursor-pointer">OUTLINE MONO</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 text-[#B8860B] hover:underline underline-offset-4 cursor-pointer">TRIGGER FOLIO DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Source_Sans_3']">
        <h3 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#6B6B6B] font-medium">2. RULE-LINE FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Author Name..." className="p-3.5 bg-white border border-[#E8E4DF] rounded-md text-sm text-[#1A1A1A] outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 placeholder:text-[#6B6B6B]/60" />
          <input type="email" placeholder="Subscriber Email..." className="p-3.5 bg-white border border-[#E8E4DF] rounded-md text-sm text-[#1A1A1A] outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 placeholder:text-[#6B6B6B]/60" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-['Source_Sans_3']">
        <h3 className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] text-[#6B6B6B] font-medium">3. EDITORIAL RULE ACCORDION</h3>
        <div className="border border-[#E8E4DF] bg-white rounded-md overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Playfair_Display'] text-lg text-[#1A1A1A] cursor-pointer">
            <span>What defines classical restraint?</span>
            <span className="text-[#B8860B]">{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#E8E4DF] text-sm text-[#6B6B6B] leading-relaxed">
              Playfair Display headlines, warm ivory background (#FAFAF8), thin 1px rule dividers, and IBM Plex Mono small caps.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFAF8] border border-[#E8E4DF] border-t-4 border-t-[#B8860B] p-8 rounded-lg max-w-md w-full font-['Playfair_Display'] space-y-6 shadow-xl">
            <div className="flex items-center space-x-3 text-[#B8860B]">
              <Sparkles size={24} />
              <h4 className="text-2xl font-normal text-[#1A1A1A]">EDITORIAL DIALOG</h4>
            </div>
            <p className="font-['Source_Sans_3'] text-sm text-[#6B6B6B] leading-relaxed">Refined popup dialog framed by warm ivory, thin rule borders, and burnished gold accents.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#B8860B] text-white font-['Source_Sans_3'] font-medium text-xs uppercase tracking-wider rounded-md cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

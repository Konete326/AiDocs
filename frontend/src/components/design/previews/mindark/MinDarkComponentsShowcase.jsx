import React, { useState } from "react";
import { Moon, ChevronDown } from "lucide-react";

export const MinDarkComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0A0A0F] border-b border-white/10 py-16 px-6 font-['Space_Grotesk'] text-[#FAFAFA] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#1A1A24] text-[#F59E0B] border border-[#F59E0B]/40 px-6 py-4 rounded-lg text-xs font-['Inter'] font-medium shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center space-x-3">
          <Moon size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Inter'] text-xs uppercase tracking-wide text-[#F59E0B] font-medium">LIBRARY</span>
        <h2 className="text-3xl font-bold tracking-tight mt-1">MINIMALIST DARK COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['Inter']">
        <h3 className="text-xs uppercase text-[#71717A] font-medium">1. WARM AMBER GLOW BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <button onClick={() => triggerToast("Amber Glow Button Clicked!")} className="px-6 py-3 bg-[#F59E0B] text-[#0A0A0F] rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-[0.98] transition-all cursor-pointer">PRIMARY AMBER</button>
          <button onClick={() => triggerToast("Outline Button Clicked!")} className="px-6 py-3 bg-transparent border border-white/15 text-[#FAFAFA] rounded-lg hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer">OUTLINE SLATE</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 text-[#F59E0B] hover:underline cursor-pointer">TRIGGER NOCTURNE DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Inter']">
        <h3 className="text-xs uppercase text-[#71717A] font-medium">2. GLASS-EFFECT RECESSED INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Full Name..." className="p-3.5 bg-[#1A1A24]/60 border border-white/10 rounded-lg text-xs text-[#FAFAFA] outline-none focus:border-[#F59E0B]/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)] placeholder:text-[#71717A]" />
          <input type="email" placeholder="Email Address..." className="p-3.5 bg-[#1A1A24]/60 border border-white/10 rounded-lg text-xs text-[#FAFAFA] outline-none focus:border-[#F59E0B]/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)] placeholder:text-[#71717A]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-['Inter']">
        <h3 className="text-xs uppercase text-[#71717A] font-medium">3. SLATE GLASS ACCORDION</h3>
        <div className="border border-white/10 bg-[#1A1A24]/60 rounded-xl backdrop-blur-md">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Space_Grotesk'] text-sm font-bold text-[#FAFAFA] cursor-pointer">
            <span>What defines layered slate depth?</span>
            <ChevronDown size={18} className={`text-[#F59E0B] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-white/10 text-xs text-[#71717A] leading-relaxed">
              Stacking three distinct dark slate tones (#0A0A0F → #12121A → #1A1A24) creating quiet visual hierarchy without harsh contrast.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121A] border border-white/15 p-8 rounded-xl max-w-md w-full font-['Space_Grotesk'] space-y-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
            <div className="flex items-center space-x-3 text-[#F59E0B]">
              <Moon size={24} />
              <h4 className="text-2xl font-bold text-[#FAFAFA]">NOCTURNE DIALOG</h4>
            </div>
            <p className="font-['Inter'] text-xs text-[#71717A] leading-relaxed">Atmospheric dark dialog framed by low-opacity 8% borders and warm amber glows.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#F59E0B] text-[#0A0A0F] font-['Inter'] font-medium text-xs rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

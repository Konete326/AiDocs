import React, { useState } from "react";
import { Sparkles, Crown } from "lucide-react";

export const ArtDecoComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0A0A0A] border-b-2 border-[#D4AF37]/30 py-16 px-6 font-['Marcellus'] text-[#F2F0E4] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#141414] text-[#D4AF37] border-2 border-[#D4AF37] px-6 py-4 font-['Josefin_Sans'] text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center space-x-3">
          <Crown size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Josefin_Sans'] text-xs uppercase tracking-[0.3em] text-[#D4AF37]">ATELIER EXHIBITS</span>
        <h2 className="text-3xl md:text-4xl uppercase tracking-[0.2em] text-[#F2F0E4] mt-1">ART DECO SUITE</h2>
      </div>

      <div className="space-y-4 font-['Josefin_Sans']">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#888888]">1. METALLIC GOLD BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
          <button onClick={() => triggerToast("Gold Halo Button Clicked!")} className="px-8 py-3.5 bg-transparent text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer">PRIMARY GOLD HALO</button>
          <button onClick={() => triggerToast("Solid Gold Button Clicked!")} className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-bold hover:bg-[#F2F0E4] transition-colors cursor-pointer">SOLID CHAMPAGNE</button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-3.5 text-[#F2F0E4] border-b border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer">TRIGGER GATSBY DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Josefin_Sans']">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#888888]">2. GOLD UNDERLINE FORM INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="ENTER PATRON NAME..." className="p-3.5 bg-transparent border-b-2 border-[#D4AF37] text-xs text-[#F2F0E4] outline-none placeholder:text-[#888888]" />
          <input type="email" placeholder="ENTER RESERVATION EMAIL..." className="p-3.5 bg-transparent border-b-2 border-[#D4AF37] text-xs text-[#F2F0E4] outline-none placeholder:text-[#888888]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-['Josefin_Sans']">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#888888]">3. STEPPED ACCORDION DETAIL</h3>
        <div className="border border-[#D4AF37]/40 bg-[#141414]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Marcellus'] text-sm uppercase text-[#D4AF37] cursor-pointer">
            <span>WHAT DEFINES ART DECO ARCHITECTURE?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#D4AF37]/30 text-xs text-[#888888] leading-relaxed font-normal">
              Stepped ziggurat spires, rotated 45° diamond motifs, all-caps Marcellus serif typography, and soft gold halos.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border-2 border-[#D4AF37] p-8 max-w-md w-full font-['Marcellus'] space-y-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Sparkles size={24} />
              <h4 className="text-2xl uppercase tracking-wider text-[#F2F0E4]">GATSBY DIALOG</h4>
            </div>
            <p className="font-['Josefin_Sans'] text-xs text-[#888888] leading-relaxed">Opulent custom modal dialog surrounded by a 30px metallic gold glow frame.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-['Josefin_Sans'] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#F2F0E4] cursor-pointer">DISMISS SUITE</button>
          </div>
        </div>
      )}
    </div>
  );
};

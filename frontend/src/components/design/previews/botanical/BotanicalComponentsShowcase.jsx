import React, { useState } from "react";
import { Leaf, ChevronDown } from "lucide-react";

export const BotanicalComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#F9F8F4] border-b border-[#E6E2DA] py-16 px-6 font-['Playfair_Display',serif] text-[#2D3A31] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#2D3A31] text-[#F9F8F4] border border-[#8C9A84] px-6 py-4 rounded-full font-['Source_Sans_3'] text-xs uppercase tracking-widest shadow-md flex items-center space-x-3">
          <Leaf size={18} className="text-[#8C9A84]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Source_Sans_3'] text-xs uppercase tracking-widest text-[#8C9A84] font-semibold">ATELIER</span>
        <h2 className="text-3xl font-normal text-[#2D3A31] mt-1">BOTANICAL COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['Source_Sans_3']">
        <h3 className="text-xs uppercase tracking-widest text-[#2D3A31]/60 font-semibold">1. PILL-SHAPED ORGANIC BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest font-semibold">
          <button onClick={() => triggerToast("Forest Green Button Clicked!")} className="px-7 py-3 bg-[#2D3A31] text-white rounded-full hover:bg-[#C27B66] transition-colors shadow-sm cursor-pointer">FOREST GREEN</button>
          <button onClick={() => triggerToast("Sage Outline Clicked!")} className="px-7 py-3 border border-[#8C9A84] text-[#2D3A31] rounded-full hover:bg-[#DCCFC2]/40 transition-colors cursor-pointer">SAGE OUTLINE</button>
          <button onClick={() => setModalOpen(true)} className="px-7 py-3 text-[#C27B66] hover:underline underline-offset-4 cursor-pointer">TRIGGER HERBARIUM DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Source_Sans_3']">
        <h3 className="text-xs uppercase tracking-widest text-[#2D3A31]/60 font-semibold">2. SOFT CLAY RECESSED INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Botanist Name..." className="p-3.5 bg-[#F2F0EB] border-b border-[#8C9A84] rounded-t-xl text-xs text-[#2D3A31] outline-none focus:border-[#C27B66] placeholder:text-[#2D3A31]/50" />
          <input type="email" placeholder="Garden Email..." className="p-3.5 bg-[#F2F0EB] border-b border-[#8C9A84] rounded-t-xl text-xs text-[#2D3A31] outline-none focus:border-[#C27B66] placeholder:text-[#2D3A31]/50" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-['Source_Sans_3']">
        <h3 className="text-xs uppercase tracking-widest text-[#2D3A31]/60 font-semibold">3. SOFT ARCH ACCORDION</h3>
        <div className="border border-[#E6E2DA] bg-white rounded-3xl overflow-hidden shadow-sm">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Playfair_Display'] text-lg text-[#2D3A31] cursor-pointer">
            <span>What defines paper grain texture noise?</span>
            <ChevronDown size={18} className={`text-[#8C9A84] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#E6E2DA] text-xs text-[#2D3A31]/70 leading-relaxed font-normal">
              A subtle SVG fractal noise filter overlay given to the main background at low 0.015 opacity, giving digital screens a sun-warmed paper grain feel.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2D3A31]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F8F4] border border-[#E6E2DA] p-8 rounded-3xl max-w-md w-full font-['Playfair_Display'] space-y-6 shadow-xl">
            <div className="flex items-center space-x-3 text-[#8C9A84]">
              <Leaf size={24} />
              <h4 className="text-2xl font-normal text-[#2D3A31]">HERBARIUM DIALOG</h4>
            </div>
            <p className="font-['Source_Sans_3'] text-xs text-[#2D3A31]/70 leading-relaxed">Soft botanical dialog framed by warm alabaster rice paper tones and sage green accents.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#2D3A31] text-white font-['Source_Sans_3'] font-semibold text-xs uppercase tracking-widest rounded-full cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

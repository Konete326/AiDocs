import React, { useState } from "react";
import { Sparkles, Smile } from "lucide-react";

export const PlayfulGeoComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FFFDF5] border-b-2 border-[#1E293B] py-16 px-6 font-['Outfit',sans-serif] text-[#1E293B] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] px-6 py-4 rounded-full font-extrabold text-xs uppercase flex items-center space-x-3 shadow-[4px_4px_0px_0px_#1E293B]">
          <Smile size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase font-extrabold bg-[#F472B6] text-white border-2 border-[#1E293B] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E293B]">LIBRARY</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">PLAYFUL GEOMETRIC COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-extrabold text-xs uppercase">1. CANDY PILL BUTTONS (HARD SHADOW)</h3>
        <div className="flex flex-wrap gap-4 font-extrabold text-xs uppercase">
          <button onClick={() => triggerToast("Candy Violet Button Clicked!")} className="px-6 py-3 bg-[#8B5CF6] text-white rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">PRIMARY VIOLET</button>
          <button onClick={() => triggerToast("Hot Pink Button Clicked!")} className="px-6 py-3 bg-[#F472B6] text-white rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">HOT PINK</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-[#FBBF24] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] cursor-pointer">TRIGGER POP DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Plus_Jakarta_Sans']">
        <h3 className="font-['Outfit'] font-extrabold text-xs uppercase">2. RECESSED HARD INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="STICKER NAME..." className="p-4 bg-white border-2 border-[#1E293B] rounded-xl text-xs font-bold text-[#1E293B] outline-none focus:shadow-[4px_4px_0px_0px_#8B5CF6]" />
          <input type="email" placeholder="USER EMAIL..." className="p-4 bg-white border-2 border-[#1E293B] rounded-xl text-xs font-bold text-[#1E293B] outline-none focus:shadow-[4px_4px_0px_0px_#8B5CF6]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-extrabold text-xs uppercase">3. STICKER ACCORDION</h3>
        <div className="border-2 border-[#1E293B] bg-white rounded-2xl shadow-[4px_4px_0px_0px_#1E293B] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-extrabold text-sm uppercase bg-[#34D399] cursor-pointer">
            <span>WHAT IS THE STABLE GRID, WILD DECORATION RULE?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#64748B] leading-relaxed">
              Content lives in clean readable areas framed by high-energy geometric confetti elements and hard drop shadows.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#1E293B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] border-2 border-[#1E293B] p-8 rounded-3xl max-w-md w-full font-['Outfit'] space-y-6 shadow-[8px_8px_0px_0px_#1E293B]">
            <div className="flex items-center space-x-3 text-[#8B5CF6]">
              <Sparkles size={28} />
              <h4 className="text-2xl font-extrabold uppercase text-[#1E293B]">POP STICKER DIALOG</h4>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#64748B] leading-relaxed">Friendly geometric dialog framed by solid 2px borders and an 8px hard offset shadow.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#8B5CF6] text-white font-extrabold text-xs uppercase rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

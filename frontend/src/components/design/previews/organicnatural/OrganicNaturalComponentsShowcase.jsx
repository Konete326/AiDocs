import React, { useState } from "react";
import { Trees, ChevronDown } from "lucide-react";

export const OrganicNaturalComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#FDFCF8] py-16 px-6 font-['Fraunces',serif] text-[#2C2C24] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FEFEFA] text-[#5D7052] border border-[#DED8CF] px-6 py-4 rounded-full font-['Nunito'] font-bold text-xs uppercase shadow-[0_10px_40px_-10px_rgba(93,112,82,0.2)] flex items-center space-x-3">
          <Trees size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Nunito'] text-xs uppercase font-bold text-[#5D7052] tracking-wider">ATELIER</span>
        <h2 className="text-3xl font-bold tracking-tight text-[#2C2C24] mt-1">ORGANIC COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['Nunito']">
        <h3 className="text-xs uppercase text-[#78786C] font-bold">1. PILL BUTTONS (TOUCH SCALE)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
          <button onClick={() => triggerToast("Moss Green Clicked!")} className="px-8 py-3.5 bg-[#5D7052] text-[#F3F4F1] rounded-full shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:scale-105 active:scale-95 transition-all cursor-pointer">MOSS GREEN</button>
          <button onClick={() => triggerToast("Terracotta Clicked!")} className="px-8 py-3.5 border-2 border-[#C18C5D] text-[#C18C5D] rounded-full hover:bg-[#C18C5D]/10 transition-colors cursor-pointer">TERRACOTTA</button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-3.5 text-[#5D7052] hover:underline cursor-pointer">TRIGGER CLAY DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['Nunito']">
        <h3 className="text-xs uppercase text-[#78786C] font-bold">2. RECESSED PILL INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Organic Name..." className="p-3.5 bg-white/50 border border-[#DED8CF] rounded-full text-xs text-[#2C2C24] outline-none focus:ring-2 focus:ring-[#5D7052]/30 focus:ring-offset-2 placeholder:text-[#78786C]/60" />
          <input type="email" placeholder="Forest Email..." className="p-3.5 bg-white/50 border border-[#DED8CF] rounded-full text-xs text-[#2C2C24] outline-none focus:ring-2 focus:ring-[#5D7052]/30 focus:ring-offset-2 placeholder:text-[#78786C]/60" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-['Nunito'] text-xs uppercase text-[#78786C] font-bold">3. WABI-SABI ACCORDION</h3>
        <div className="bg-[#FEFEFA] border border-[#DED8CF]/50 rounded-[2rem] shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-base text-[#2C2C24] cursor-pointer">
            <span>What is the "no straight lines in nature" tenet?</span>
            <ChevronDown size={18} className={`text-[#5D7052] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 font-['Nunito'] text-xs text-[#78786C] leading-relaxed font-medium">
              Avoiding rigid 90-degree corners in favor of amorphous blob shapes, complex border radii percentages, paper grain noise, and moss/clay tinted soft shadows.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2C2C24]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#DED8CF] p-8 rounded-[3rem] max-w-md w-full font-['Fraunces'] space-y-6 shadow-[0_20px_40px_-10px_rgba(93,112,82,0.2)]">
            <div className="flex items-center space-x-3 text-[#5D7052]">
              <Trees size={24} />
              <h4 className="text-2xl font-bold text-[#2C2C24]">ORGANIC DIALOG</h4>
            </div>
            <p className="font-['Nunito'] text-xs text-[#78786C] leading-relaxed font-medium">Wabi-sabi popup dialog framed by off-white Rice Paper and soft moss green highlights.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#5D7052] text-[#F3F4F1] font-['Nunito'] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

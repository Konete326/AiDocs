import React, { useState } from "react";
import { Edit3, Smile } from "lucide-react";

export const HandDrawnComponentsShowcase = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] py-16 px-6 font-['Patrick_Hand',cursive] text-[#2d2d2d] space-y-12">
      {toastMessage && (
        <div style={wobbly} className="absolute top-4 right-4 z-50 bg-[#fff9c4] text-[#2d2d2d] border-[3px] border-[#2d2d2d] px-6 py-4 font-['Kalam'] font-bold text-lg flex items-center space-x-3 shadow-[4px_4px_0px_0px_#2d2d2d]">
          <Smile size={24} className="text-[#ff4d4d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-['Kalam'] text-xl text-[#ff4d4d] font-bold">[ LIBRARY ]</span>
        <h2 className="font-['Kalam'] text-3xl md:text-4xl font-bold mt-1">HAND-DRAWN COMPONENTS</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-['Kalam'] font-bold text-lg text-[#2d5da1]">1. WOBBLY BUTTONS (HARD SHADOW)</h3>
        <div className="flex flex-wrap gap-4 text-xl font-bold">
          <button onClick={() => triggerToast("Correction Red Clicked!")} style={wobbly} className="px-6 py-3 bg-[#ff4d4d] text-white border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all cursor-pointer">CORRECTION RED</button>
          <button onClick={() => triggerToast("Pen Blue Clicked!")} style={wobbly} className="px-6 py-3 bg-[#2d5da1] text-white border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all cursor-pointer">BALLPOINT BLUE</button>
          <button onClick={() => setModalOpen(true)} style={wobbly} className="px-6 py-3 bg-[#fff9c4] text-[#2d2d2d] border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] cursor-pointer">TRIGGER SKETCH DIALOG</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-['Kalam'] font-bold text-lg text-[#2d5da1]">2. WOBBLY INPUT BOXES</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Your Sketch Name..." style={wobbly} className="p-4 bg-white border-[3px] border-[#2d2d2d] text-lg text-[#2d2d2d] outline-none focus:border-[#2d5da1] placeholder:text-[#2d2d2d]/40" />
          <input type="email" placeholder="Sticky Note Email..." style={wobbly} className="p-4 bg-white border-[3px] border-[#2d2d2d] text-lg text-[#2d2d2d] outline-none focus:border-[#2d5da1] placeholder:text-[#2d2d2d]/40" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-['Kalam'] font-bold text-lg text-[#2d5da1]">3. STICKY NOTE ACCORDION</h3>
        <div style={wobbly} className="border-[3px] border-[#2d2d2d] bg-[#fff9c4] shadow-[4px_4px_0px_0px_#2d2d2d] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Kalam'] font-bold text-xl text-[#2d2d2d] cursor-pointer">
            <span>WHAT IS THE NO STRAIGHT LINES PRINCIPLE?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t-2 border-[#2d2d2d] text-lg text-[#2d2d2d]/90 leading-relaxed font-bold">
              Containers, buttons, and cards explicitly avoid rigid 0px or uniform rounded radii, using irregular wobbly elliptical border radius rules instead.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2d2d2d]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div style={wobbly} className="bg-[#fdfbf7] border-[4px] border-[#2d2d2d] p-8 max-w-md w-full font-['Patrick_Hand'] space-y-6 shadow-[8px_8px_0px_0px_#2d2d2d] -rotate-1">
            <div className="flex items-center space-x-3 text-[#ff4d4d]">
              <Edit3 size={28} />
              <h4 className="font-['Kalam'] text-3xl font-bold text-[#2d2d2d]">SKETCHBOOK DIALOG</h4>
            </div>
            <p className="text-xl text-[#2d2d2d]">Playful hand-drawn popup dialog framed with wobbly 4px borders and hard offset cut-paper shadows.</p>
            <button onClick={() => setModalOpen(false)} style={wobbly} className="w-full py-4 bg-[#ff4d4d] text-white font-['Kalam'] font-bold text-xl border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] cursor-pointer">DISMISS SKETCH</button>
          </div>
        </div>
      )}
    </div>
  );
};

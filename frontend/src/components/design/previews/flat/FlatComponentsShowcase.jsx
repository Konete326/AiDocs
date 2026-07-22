import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export const FlatComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#F3F4F6] py-16 px-6 font-['Outfit'] text-gray-900 space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#10B981] text-white px-6 py-4 rounded-md text-xs font-semibold shadow-none flex items-center space-x-3">
          <Sparkles size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs uppercase tracking-wider text-[#3B82F6] font-bold">LIBRARY</span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Flat UI Component Suite</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase">1. Color Block Buttons (No Shadow)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          <button onClick={() => triggerToast("Primary Blue Button Clicked!")} className="px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-md shadow-none hover:scale-105 transition-all cursor-pointer">PRIMARY BLUE</button>
          <button onClick={() => triggerToast("Emerald Accent Button Clicked!")} className="px-6 py-3 bg-[#10B981] hover:bg-emerald-600 text-white rounded-md shadow-none hover:scale-105 transition-all cursor-pointer">EMERALD ACCENT</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-md shadow-none hover:bg-gray-900 hover:text-white transition-all cursor-pointer">TRIGGER FLAT MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase">2. Flat Form Inputs (Solid Focus Border)</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Project Title..." className="p-3.5 bg-gray-100 rounded-md text-xs text-gray-900 outline-none focus:bg-white focus:border-2 focus:border-[#3B82F6]" />
          <input type="email" placeholder="email@company.com" className="p-3.5 bg-gray-100 rounded-md text-xs text-gray-900 outline-none focus:bg-white focus:border-2 focus:border-[#3B82F6]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs font-bold text-gray-500 uppercase">3. Thick Border Accordion</h3>
        <div className="bg-white border-2 border-gray-900 rounded-md overflow-hidden shadow-none">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-sm text-gray-900 cursor-pointer">
            <span>Why choose Flat Design reduction?</span>
            <ChevronDown size={18} className={`text-[#3B82F6] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t-2 border-gray-900 text-xs text-gray-600 leading-relaxed font-normal">
              Flat Design removes all artificial depth and relying entirely on vibrant color blocks, clean typography, and instant scaling feedback.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-gray-900/60 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full font-['Outfit'] space-y-6 shadow-none border-4 border-[#3B82F6]">
            <div className="flex items-center space-x-3 text-[#3B82F6]">
              <Sparkles size={24} />
              <h4 className="text-2xl font-extrabold text-gray-900">Flat Dialog</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Custom flat design modal using bold color outlines and zero box shadows.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#3B82F6] text-white rounded-md font-semibold text-xs shadow-none hover:bg-blue-600 cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { Cpu, ChevronDown } from "lucide-react";

export const IndustrialSkeuoComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#e0e5ec] border-b border-[#a3b1c6] py-16 px-6 font-['Inter',sans-serif] text-[#2d3436] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#e0e5ec] text-[#ff4757] border border-white/60 px-6 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] flex items-center space-x-3">
          <Cpu size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs font-bold text-[#ff4757] uppercase tracking-widest">// HARDWARE REGISTRY</span>
        <h2 className="text-3xl font-extrabold tracking-tight mt-1 drop-shadow-[0_1px_0_#ffffff]">INDUSTRIAL COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase text-[#4a5568] font-bold">1. PHYSICAL KEYS (INSET PRESS PHYSICS)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
          <button onClick={() => triggerToast("Safety Orange Key Clicked!")} className="px-6 py-3.5 bg-[#ff4757] text-white rounded-xl shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)] active:translate-y-[2px] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] transition-all cursor-pointer">SAFETY ORANGE</button>
          <button onClick={() => triggerToast("Chassis Secondary Key Clicked!")} className="px-6 py-3.5 bg-[#e0e5ec] text-[#2d3436] rounded-xl shadow-[6px_6px_12px_#babecc,-6px_-6px_12px_#ffffff] active:translate-y-[2px] active:shadow-[inset_4px_4px_8px_#babecc] transition-all cursor-pointer">CHASSIS GREY</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3.5 bg-[#e0e5ec] text-[#ff4757] rounded-xl shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] cursor-pointer">TRIGGER DIALOG PANEL</button>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase text-[#4a5568] font-bold">2. RECESSED DATA SLOTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="SYS_OPERATOR..." className="p-3.5 bg-[#e0e5ec] rounded-xl text-xs text-[#2d3436] outline-none shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff,0_0_0_2px_#ff4757] placeholder:text-[#4a5568]/60" />
          <input type="email" placeholder="COMM_SLOT..." className="p-3.5 bg-[#e0e5ec] rounded-xl text-xs text-[#2d3436] outline-none shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff,0_0_0_2px_#ff4757] placeholder:text-[#4a5568]/60" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-mono text-xs uppercase text-[#4a5568] font-bold">3. BOLTED PANEL ACCORDION</h3>
        <div className="border border-white/60 bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-bold text-sm text-[#2d3436] cursor-pointer">
            <span>What defines the 45° top-left lighting model?</span>
            <ChevronDown size={18} className={`text-[#ff4757] transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#a3b1c6]/30 text-xs text-[#4a5568] leading-relaxed font-medium">
              Every element's light source originates top-left at 45 degrees, determining dark dual shadows bottom-right (#babecc) and bright highlights top-left (#ffffff).
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2d3436]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#e0e5ec] border border-white/60 p-8 rounded-3xl max-w-md w-full font-['Inter'] space-y-6 shadow-[16px_16px_32px_#252a2c,-16px_-16px_32px_#353e40]">
            <div className="flex items-center space-x-3 text-[#ff4757]">
              <Cpu size={24} />
              <h4 className="font-extrabold text-2xl text-[#2d3436]">HARDWARE DIALOG</h4>
            </div>
            <p className="text-xs text-[#4a5568] leading-relaxed font-medium">Industrial Skeuomorphism dialog panel with corner screw heads and dual lighting depth.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#ff4757] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl shadow-[4px_4px_8px_rgba(166,50,60,0.4)] active:translate-y-[2px] cursor-pointer">DISMISS PANEL</button>
          </div>
        </div>
      )}
    </div>
  );
};

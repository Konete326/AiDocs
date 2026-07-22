import React, { useState } from "react";
import { Zap, Radio } from "lucide-react";

export const VaporwaveComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#090014] border-b border-[#2D1B4E] py-16 px-6 font-['Orbitron',sans-serif] text-[#E0E0E0] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#1a103c] text-[#00FFFF] border-2 border-[#00FFFF] px-6 py-4 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_#00FFFF] flex items-center space-x-3">
          <Zap size={18} className="text-[#FF00FF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs text-[#FF00FF] uppercase tracking-widest">// COMPONENT SUITE</span>
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#E0E0E0] mt-1">VAPORWAVE COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#E0E0E0]/60">1. SKEWED NEON BUTTONS (-SKEW-X-12)</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
          <button onClick={() => triggerToast("Electric Cyan Button Clicked!")} className="-skew-x-12 transform border-2 border-[#00FFFF] bg-[#00FFFF] text-black px-6 py-3 hover:skew-x-0 hover:shadow-[0_0_20px_#00FFFF] transition-all cursor-pointer">
            <span className="inline-block skew-x-12 transform">CYAN NEON</span>
          </button>
          <button onClick={() => triggerToast("Hot Magenta Button Clicked!")} className="-skew-x-12 transform border-2 border-[#FF00FF] bg-[#FF00FF] text-white px-6 py-3 hover:skew-x-0 hover:shadow-[0_0_20px_#FF00FF] transition-all cursor-pointer">
            <span className="inline-block skew-x-12 transform">HOT MAGENTA</span>
          </button>
          <button onClick={() => setModalOpen(true)} className="border-2 border-[#FF9900] bg-transparent text-[#FF9900] px-6 py-3 shadow-[0_0_10px_#FF9900] cursor-pointer">TRIGGER CRT DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#E0E0E0]/60">2. TERMINAL CHROME INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="> ENTER_HANDLE..." className="p-3.5 bg-black border-b-2 border-b-[#FF00FF] text-xs font-mono text-[#00FFFF] outline-none focus:border-b-[#00FFFF] focus:shadow-[0_0_15px_#00FFFF]" />
          <input type="email" placeholder="> ENTER_SYNTH_MAIL..." className="p-3.5 bg-black border-b-2 border-b-[#00FFFF] text-xs font-mono text-[#FF00FF] outline-none focus:border-b-[#FF00FF] focus:shadow-[0_0_15px_#FF00FF]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#E0E0E0]/60">3. CRT TERMINAL ACCORDION</h3>
        <div className="border-2 border-[#00FFFF] bg-black/90 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
          <div className="bg-[#00FFFF]/10 border-b border-[#00FFFF] px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-[#00FFFF] font-bold">TERMINAL_PROMPT.EXE</span>
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF00FF]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#00FFFF]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF9900]" />
            </div>
          </div>
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between text-xs font-bold text-[#00FFFF] cursor-pointer">
            <span>WHAT IS THE VAPORWAVE NEON SUITE?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#00FFFF]/30 text-xs text-[#E0E0E0]/70 leading-relaxed">
              Synthetic reality drenched in 1980s retro-futuristic excess, Hot Magenta (#FF00FF) and Electric Cyan (#00FFFF) neon glow tubes, perspective grid floors, and global CRT scanlines.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#090014]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1a103c] border-2 border-[#FF00FF] p-8 max-w-md w-full font-['Orbitron'] space-y-6 shadow-[0_0_30px_#FF00FF]">
            <div className="flex items-center space-x-3 text-[#FF00FF]">
              <Radio size={24} className="animate-pulse" />
              <h4 className="text-2xl font-black uppercase text-[#E0E0E0]">CRT TERMINAL</h4>
            </div>
            <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">Synthetic retro-futuristic popup dialog framed by 2px neon borders and CRT scanline overlays.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#FF00FF] text-white font-mono font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_#FF00FF] cursor-pointer">DISMISS TERMINAL</button>
          </div>
        </div>
      )}
    </div>
  );
};

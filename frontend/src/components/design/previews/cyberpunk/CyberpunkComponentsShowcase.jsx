import React, { useState } from "react";
import { Cpu, AlertCircle } from "lucide-react";

export const CyberpunkComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0a0a0f] border-b border-[#2a2a3a] py-16 px-6 font-['Orbitron',sans-serif] text-[#e0e0e0] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#12121a] text-[#00ff88] border border-[#00ff88] px-6 py-4 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_#00ff8840] flex items-center space-x-3">
          <Cpu size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs text-[#00d4ff] uppercase tracking-widest">// REPOSITORY</span>
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#e0e0e0] mt-1">CYBERPUNK COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#6b7280]">1. NEON GLOW BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
          <button onClick={() => triggerToast("Matrix Green Clicked!")} className="px-6 py-3 bg-[#00ff88] text-[#0a0a0f] shadow-[0_0_15px_#00ff88] hover:bg-[#ff00ff] hover:text-white transition-all cursor-pointer">MATRIX GREEN</button>
          <button onClick={() => triggerToast("Hot Magenta Clicked!")} className="px-6 py-3 bg-[#ff00ff] text-white shadow-[0_0_15px_#ff00ff] hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-all cursor-pointer">HOT MAGENTA</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-[#12121a] text-[#00d4ff] border border-[#00d4ff] shadow-[0_0_10px_#00d4ff40] cursor-pointer">TRIGGER HUD DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#6b7280]">2. TERMINAL INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="> ENTER_HANDLE..." className="p-3.5 bg-[#12121a] border border-[#00ff88]/50 text-xs font-mono text-[#00ff88] outline-none focus:shadow-[0_0_10px_#00ff88]" />
          <input type="email" placeholder="> ENTER_NODE_IP..." className="p-3.5 bg-[#12121a] border border-[#ff00ff]/50 text-xs font-mono text-[#ff00ff] outline-none focus:shadow-[0_0_10px_#ff00ff]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#6b7280]">3. GLITCH ACCORDION</h3>
        <div className="border border-[#00ff88]/40 bg-[#12121a]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Orbitron'] text-xs font-bold uppercase text-[#00ff88] cursor-pointer">
            <span>WHAT IS CHROMATIC ABERRATION?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#00ff88]/20 text-xs text-[#6b7280] leading-relaxed">
              Splitting RGB channels (red/cyan text shadow offsets) to simulate signal noise and distorted lens optics.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0a0a0f]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121a] border-2 border-[#00ff88] p-8 max-w-md w-full font-['Orbitron',sans-serif] space-y-6 shadow-[0_0_25px_#00ff88]">
            <div className="flex items-center space-x-3 text-[#00ff88]">
              <AlertCircle size={28} />
              <h4 className="text-2xl font-black uppercase text-[#e0e0e0]">HUD OVERRIDE</h4>
            </div>
            <p className="font-mono text-xs text-[#6b7280] leading-relaxed">System feed interrupted. Cyberpunk HUD panel active with 45° chamfer geometry.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-[#00ff88] text-[#0a0a0f] font-mono font-bold text-xs uppercase tracking-widest cursor-pointer">CLOSE HUD</button>
          </div>
        </div>
      )}
    </div>
  );
};

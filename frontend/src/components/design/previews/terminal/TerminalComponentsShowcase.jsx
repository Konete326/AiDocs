import React, { useState } from "react";
import { Terminal, AlertTriangle } from "lucide-react";

export const TerminalComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0a0a0a] border-b-2 border-[#1f521f] py-16 px-6 font-['JetBrains_Mono',monospace] text-[#33ff00] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#33ff00] text-black border-2 border-black px-6 py-4 text-xs font-bold uppercase flex items-center space-x-3 shadow-2xl">
          <Terminal size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs text-[#ffb000] font-bold">[ CLI_LIBRARIES ]</span>
        <h2 className="text-2xl font-bold text-[#33ff00] mt-1">+--- TERMINAL UI COMPONENT SUITE ---+</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs text-[#ffb000] font-bold">1. BRACKETED BUTTON VARIANTS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold">
          <button onClick={() => triggerToast("Inverted Video Button Executed!")} className="px-6 py-3 bg-[#33ff00] text-black hover:bg-[#ffb000] cursor-pointer">[ INITIATE_SESSION ]</button>
          <button onClick={() => triggerToast("Terminal Outline Clicked!")} className="px-6 py-3 border border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00] hover:text-black cursor-pointer">[ DISCONNECT ]</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333] hover:text-black cursor-pointer">[ TRIGGER_PANIC ]</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs text-[#ffb000] font-bold">2. SHELL INPUT PROMPT</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <div className="flex items-center space-x-2 border border-[#1f521f] p-3 bg-[#0a0a0a]">
            <span className="text-xs text-[#ffb000]">$</span>
            <input type="text" placeholder="command --name" className="bg-transparent border-none text-xs text-[#33ff00] outline-none font-mono w-full placeholder-[#1f521f]" />
          </div>
          <div className="flex items-center space-x-2 border border-[#1f521f] p-3 bg-[#0a0a0a]">
            <span className="text-xs text-[#ffb000]">#</span>
            <input type="text" placeholder="sudo auth --key" className="bg-transparent border-none text-xs text-[#33ff00] outline-none font-mono w-full placeholder-[#1f521f]" />
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs text-[#ffb000] font-bold">3. ASCII FRAME ACCORDION</h3>
        <div className="border border-[#1f521f]">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between text-xs font-bold bg-[#1f521f]/30 cursor-pointer">
            <span>+--- HELP: SHELL METAPHORS ---+</span>
            <span className="text-[#ffb000]">{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#1f521f] text-xs text-[#33ff00]/80 leading-relaxed bg-[#0a0a0a]">
              Terminal CLI relies strictly on monospace supremacy, blinking cursors, and ASCII window split borders.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#ff3333] p-8 max-w-md w-full font-['JetBrains_Mono',monospace] text-[#ff3333] space-y-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle size={24} />
              <h4 className="text-xl font-bold">[ SYSTEM_PANIC ]</h4>
            </div>
            <p className="text-xs leading-relaxed text-[#33ff00]">CRITICAL: Custom high-contrast terminal error frame triggered.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#ff3333] text-black font-bold text-xs uppercase hover:bg-white cursor-pointer">[ ACKNOWLEDGE_ERROR ]</button>
          </div>
        </div>
      )}
    </div>
  );
};

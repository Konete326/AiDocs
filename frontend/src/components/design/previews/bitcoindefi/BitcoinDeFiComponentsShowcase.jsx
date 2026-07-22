import React, { useState } from "react";
import { Coins, ShieldAlert } from "lucide-react";

export const BitcoinDeFiComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#08080C] border-b border-[#F7931A]/20 py-16 px-6 font-['Space_Grotesk'] text-[#F4F4F6] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#12121A] text-[#F7931A] border border-[#F7931A] px-6 py-4 rounded-xl font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(247,147,26,0.3)] flex items-center space-x-3">
          <Coins size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs text-[#F7931A] uppercase tracking-widest">// LIBRARY</span>
        <h2 className="text-3xl font-bold text-white mt-1">BITCOIN DEFI COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#A0A0B0]">1. LUMINESCENT ENERGY BUTTONS</h3>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
          <button onClick={() => triggerToast("Bitcoin Orange Gradient Clicked!")} className="px-6 py-3.5 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] rounded-xl shadow-[0_0_15px_rgba(247,147,26,0.4)] active:scale-95 transition-all cursor-pointer">BITCOIN FIRE</button>
          <button onClick={() => triggerToast("Glassmorphism Outline Clicked!")} className="px-6 py-3.5 bg-[#12121A] text-[#FFD700] border border-[#FFD700]/40 rounded-xl hover:bg-[#FFD700]/10 active:scale-95 transition-all cursor-pointer">DIGITAL GOLD</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3.5 text-[#F7931A] border border-[#F7931A]/40 rounded-xl hover:underline cursor-pointer">TRIGGER VAULT DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        <h3 className="text-xs uppercase tracking-widest text-[#A0A0B0]">2. RECESSED VAULT INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="bc1q... Bitcoin Address" className="p-3.5 bg-[#12121A] border border-[#F7931A]/30 rounded-xl text-xs font-mono text-white outline-none focus:border-[#F7931A] focus:shadow-[0_0_10px_rgba(247,147,26,0.3)]" />
          <input type="text" placeholder="0.00000000 BTC Amount" className="p-3.5 bg-[#12121A] border border-[#F7931A]/30 rounded-xl text-xs font-mono text-white outline-none focus:border-[#F7931A] focus:shadow-[0_0_10px_rgba(247,147,26,0.3)]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl font-mono">
        <h3 className="text-[#A0A0B0] text-xs uppercase tracking-widest">3. GLASSMORPHIC ACCORDION</h3>
        <div className="border border-[#F7931A]/30 bg-[#12121A]/70 rounded-2xl backdrop-blur-md">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-['Space_Grotesk'] text-sm font-bold text-white cursor-pointer">
            <span>How is Bitcoin DeFi proof non-custodial?</span>
            <span className="text-[#F7931A]">{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-[#F7931A]/20 text-xs text-[#A0A0B0] leading-relaxed">
              Cryptographic smart contracts lock Bitcoin liquidity on-chain directly via DLCs and Layer 2 proof protocols.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#08080C]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121A] border-2 border-[#F7931A] p-8 rounded-2xl max-w-md w-full font-['Space_Grotesk'] space-y-6 shadow-[0_0_30px_rgba(247,147,26,0.3)]">
            <div className="flex items-center space-x-3 text-[#F7931A]">
              <ShieldAlert size={28} />
              <h4 className="text-2xl font-bold text-white">BITCOIN VAULT</h4>
            </div>
            <p className="font-mono text-xs text-[#A0A0B0] leading-relaxed">Custom Bitcoin DeFi modal framed by 1px precision circuit borders and glowing orange fields.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3.5 bg-gradient-to-r from-[#F7931A] to-[#FFD700] text-[#08080C] font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(247,147,26,0.4)] cursor-pointer">CONFIRM TRANSACTION</button>
          </div>
        </div>
      )}
    </div>
  );
};

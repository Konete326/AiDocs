import React, { useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

export const MaximalismComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#0D0D1A] border-b-8 border-[#00F5D4] py-16 px-6 font-['Outfit',sans-serif] text-white space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#FF3AF2] text-[#0D0D1A] border-4 border-[#FFE600] px-6 py-4 rounded-full font-black text-xs uppercase shadow-[6px_6px_0_#00F5D4] flex items-center space-x-3">
          <Zap size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="font-mono text-xs uppercase font-black text-[#00F5D4] tracking-widest">// HYPER SUITE</span>
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-1 [text-shadow:3px_3px_0_#7B2FFF]">MAXIMALIST COMPONENTS</h2>
      </div>

      <div className="space-y-4 font-['DM_Sans']">
        <h3 className="font-['Outfit'] font-black text-xs uppercase text-[#FFE600]">1. CLASHING GRADIENT BUTTONS</h3>
        <div className="flex flex-wrap gap-4 font-black text-xs uppercase tracking-widest">
          <button onClick={() => triggerToast("Hyper Magenta Clicked!")} className="px-8 py-4 bg-gradient-to-r from-[#FF3AF2] to-[#7B2FFF] border-4 border-[#FFE600] text-white rounded-full shadow-[4px_4px_0_#00F5D4] hover:scale-110 transition-all cursor-pointer">HYPER MAGENTA</button>
          <button onClick={() => triggerToast("Electric Cyan Clicked!")} className="px-8 py-4 bg-gradient-to-r from-[#00F5D4] to-[#FFE600] border-4 border-[#FF3AF2] text-[#0D0D1A] rounded-full shadow-[4px_4px_0_#7B2FFF] hover:scale-110 transition-all cursor-pointer">ELECTRIC CYAN</button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-[#2D1B4E] border-4 border-dashed border-[#FF3AF2] text-[#FF3AF2] rounded-3xl shadow-[4px_4px_0_#FFE600] cursor-pointer">TRIGGER HYPER DIALOG</button>
        </div>
      </div>

      <div className="space-y-4 font-['DM_Sans']">
        <h3 className="font-['Outfit'] font-black text-xs uppercase text-[#FFE600]">2. CLASHING BORDER INPUTS</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="HYPER_HANDLE..." className="p-4 bg-[#2D1B4E]/80 border-4 border-[#FF3AF2] rounded-full text-xs font-bold text-white outline-none focus:border-[#00F5D4] focus:ring-4 focus:ring-[#FFE600]/40 placeholder:text-white/40" />
          <input type="email" placeholder="DOPAMINE_MAIL..." className="p-4 bg-[#2D1B4E]/80 border-4 border-[#00F5D4] rounded-full text-xs font-bold text-white outline-none focus:border-[#FF3AF2] focus:ring-4 focus:ring-[#FFE600]/40 placeholder:text-white/40" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="font-['Outfit'] font-black text-xs uppercase text-[#FFE600]">3. TRIPLE SHADOW ACCORDION</h3>
        <div className="border-4 border-[#FF3AF2] bg-[#2D1B4E]/90 rounded-3xl shadow-[6px_6px_0_#FFE600,12px_12px_0_#00F5D4] overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between font-black text-base text-white uppercase cursor-pointer">
            <span>WHAT IS THE MORE IS MORE PRINCIPLE?</span>
            <span>{accordionOpen ? "[-]" : "[+]"}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 font-['DM_Sans'] text-xs font-bold text-white/80 leading-relaxed border-t-4 border-dashed border-[#00F5D4]">
              Rejecting minimalist restraint in favor of sensory overload, 5 rotating electric accents, triple/mega text shadow stacks, pattern-on-pattern layering, and scattered floating emojis.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-[#0D0D1A]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2D1B4E] border-4 border-[#FFE600] p-8 rounded-3xl max-w-md w-full font-['Outfit'] space-y-6 shadow-[12px_12px_0_#FF3AF2,24px_24px_0_#00F5D4] rotate-1">
            <div className="flex items-center space-x-3 text-[#FF3AF2]">
              <Zap size={28} />
              <h4 className="text-2xl font-black uppercase text-white [text-shadow:2px_2px_0_#7B2FFF]">HYPERPOP DIALOG</h4>
            </div>
            <p className="font-['DM_Sans'] text-xs font-bold text-white/80 leading-relaxed">Maximalism popup dialog framed by clashing 4px borders, double hard offset shadows, and energetic Y2K vibes.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-4 bg-gradient-to-r from-[#FF3AF2] to-[#00F5D4] text-white font-black text-xs uppercase tracking-widest rounded-full border-4 border-[#FFE600] shadow-[4px_4px_0_#7B2FFF] cursor-pointer">DISMISS HYPER</button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { ChevronDown, Zap, CheckCircle } from "lucide-react";

export const LinearComponentsShowcase = () => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div id="showcase" className="relative bg-[#050506] border-b border-white/[0.06] py-16 px-6 font-['Inter'] space-y-12">
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#0a0a0c] text-white border border-[#5E6AD2]/50 px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(94,106,210,0.3)] text-xs font-mono flex items-center space-x-3">
          <CheckCircle size={18} className="text-[#5E6AD2]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <span className="text-xs font-mono text-[#7A88FF] font-bold uppercase tracking-widest">SHOWCASE</span>
        <h2 className="text-3xl font-semibold text-white tracking-tight mt-1">Linear Modern Component Library</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-mono text-white/90 font-semibold uppercase">1. Interactive Glass Buttons</h3>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <button onClick={() => triggerToast("Indigo Primary Glow Button!")} className="px-6 py-3 bg-[#5E6AD2] hover:bg-[#6872D9] text-white rounded-lg shadow-[0_0_20px_rgba(94,106,210,0.4)] transition-all cursor-pointer">PRIMARY ACCENT</button>
          <button onClick={() => triggerToast("Glass Secondary Button!")} className="px-6 py-3 bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/20 rounded-lg transition-all cursor-pointer">SECONDARY GLASS</button>
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 bg-transparent hover:bg-white/10 text-white/90 hover:text-white rounded-lg transition-all cursor-pointer">TRIGGER GLASS MODAL</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-mono text-white/90 font-semibold uppercase">2. Form Controls</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Workspace Title..." className="p-3.5 bg-[#0F0F12] border border-white/20 rounded-lg text-xs text-white placeholder:text-white/40 outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]" />
          <input type="email" placeholder="developer@company.com" className="p-3.5 bg-[#0F0F12] border border-white/20 rounded-lg text-xs text-white placeholder:text-white/40 outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]" />
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h3 className="text-xs font-mono text-white/90 font-semibold uppercase">3. Collapsible Glass Card</h3>
        <div className="bg-white/[0.05] border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full p-4 flex items-center justify-between text-sm font-semibold text-white cursor-pointer">
            <span>What defines Linear motion design?</span>
            <ChevronDown size={18} className={`text-white/80 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </button>
          {accordionOpen && (
            <div className="p-4 border-t border-white/10 text-xs text-white/80 leading-relaxed bg-[#0a0a0c]">
              Expo-out easing combined with 200ms transitions and 4px micro-translations.
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#0a0a0c] border border-white/10 p-8 rounded-2xl max-w-md w-full font-['Inter'] space-y-6 shadow-[0_0_50px_rgba(94,106,210,0.2)]">
            <div className="flex items-center space-x-3 text-[#5E6AD2]">
              <Zap size={24} />
              <h4 className="text-xl font-semibold text-white tracking-tight">Linear Modern Dialog</h4>
            </div>
            <p className="text-xs text-[#8A8F98] leading-relaxed">This custom dialog demonstrates soft ambient lighting blurs and 1px hairline border highlights.</p>
            <button onClick={() => setModalOpen(false)} className="w-full py-3 bg-[#5E6AD2] text-white font-medium text-xs rounded-lg shadow-[0_0_20px_rgba(94,106,210,0.4)] cursor-pointer">DISMISS</button>
          </div>
        </div>
      )}
    </div>
  );
};

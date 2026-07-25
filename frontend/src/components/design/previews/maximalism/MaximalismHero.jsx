import React from "react";
import { Zap } from "lucide-react";

export const MaximalismHero = () => {
  return (
    <section className="bg-[#0D0D1A] border-b-8 border-[#00F5D4] py-24 font-['Outfit',sans-serif] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 bg-[#FF3AF2] text-[#0D0D1A] border-4 border-[#FFE600] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#00F5D4] mb-8 rotate-1">
          <Zap size={16} />
          <span>MORE IS MORE // SENSORY OVERLOAD // Y2K HYPERPOP</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-white [text-shadow:4px_4px_0_#7B2FFF,8px_8px_0_#FF3AF2,12px_12px_0_#00F5D4]">
          UNAPOLOGETIC <span className="bg-gradient-to-r from-[#FFE600] via-[#FF3AF2] to-[#00F5D4] bg-clip-text text-transparent">DOPAMINE</span> EXCESS.
        </h1>
        <p className="font-['DM_Sans',sans-serif] text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-10 font-bold">
          Deep cosmic purple-black (#0D0D1A), 5 electric accents (#FF3AF2 Magenta, #00F5D4 Cyan, #FFE600 Yellow, #FF6B35 Orange, #7B2FFF Purple), and mega text shadows.
        </p>
        <div className="flex flex-wrap gap-6 font-black text-xs uppercase tracking-widest">
          <button className="px-10 py-5 bg-gradient-to-r from-[#FF3AF2] via-[#7B2FFF] to-[#00F5D4] border-4 border-[#FFE600] text-white rounded-full shadow-[8px_8px_0px_#FFE600,16px_16px_0px_#FF3AF2] hover:scale-105 transition-all flex items-center space-x-2">
            <Zap size={18} />
            <span>UNLEASH CHAOS</span>
          </button>
          <button className="px-10 py-5 bg-[#2D1B4E]/80 border-4 border-dashed border-[#00F5D4] text-[#00F5D4] rounded-3xl shadow-[6px_6px_0px_#FF3AF2] hover:bg-[#00F5D4] hover:text-[#0D0D1A] transition-all">
            SEE 5 ACCENT ROTATION
          </button>
        </div>
      </div>
    </section>
  );
};

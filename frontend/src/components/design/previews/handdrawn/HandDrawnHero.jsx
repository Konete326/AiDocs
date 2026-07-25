import React from "react";
import { ArrowRight, Edit3 } from "lucide-react";

export const HandDrawnHero = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };
  const wobblyCard = { borderRadius: "15px 225px 15px 255px/255px 15px 225px 15px" };

  return (
    <section className="bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] py-24 font-['Patrick_Hand',cursive] text-[#2d2d2d] relative">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div style={wobbly} className="inline-flex items-center space-x-2 bg-[#fff9c4] border-2 border-[#2d2d2d] px-4 py-1.5 text-base font-bold shadow-[3px_3px_0px_0px_#2d2d2d] mb-8 -rotate-2">
            <Edit3 size={16} className="text-[#ff4d4d]" />
            <span>AUTHENTIC HUMAN IMPERFECTION // NO STRAIGHT LINES</span>
          </div>
          <h1 className="font-['Kalam'] text-5xl md:text-7xl font-bold leading-tight mb-8">
            SKETCHED WITH <span className="bg-[#ff4d4d] text-white px-3 border-2 border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] inline-block rotate-2">MARKER PEN</span> AND PASSION.
          </h1>
          <p className="text-xl text-[#2d2d2d]/80 max-w-xl leading-relaxed mb-10">
            Warm Paper canvas (#fdfbf7), Soft Pencil Black (#2d2d2d), Correction Red marker (#ff4d4d), post-it yellow cards (#fff9c4), and hard 4px offset shadows.
          </p>
          <div className="flex flex-wrap gap-4 text-xl font-bold">
            <button style={wobbly} className="px-8 py-4 bg-white text-[#2d2d2d] border-[3px] border-[#2d2d2d] shadow-[5px_5px_0px_0px_#2d2d2d] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all flex items-center space-x-2">
              <span>START SKETCHING</span>
              <ArrowRight size={20} />
            </button>
            <button style={wobbly} className="px-8 py-4 bg-[#e5e0d8] text-[#2d2d2d] border-[3px] border-[#2d2d2d] shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-[#2d5da1] hover:text-white transition-colors">
              SEE STICKY NOTES
            </button>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div style={wobblyCard} className="w-72 h-80 bg-[#fff9c4] border-[3px] border-[#2d2d2d] shadow-[6px_6px_0px_0px_#2d2d2d] p-6 flex flex-col justify-between rotate-3 hover:rotate-0 transition-transform relative">
            <div className="w-12 h-4 bg-gray-400/40 border border-gray-500 absolute -top-2 left-1/2 -translate-x-1/2 rotate-2" />
            <div className="font-['Kalam'] text-3xl font-bold text-[#ff4d4d]">POST-IT NOTE</div>
            <p className="text-lg text-[#2d2d2d]">Irregular wobbly borders, napkin brainstorming sketches, and playful rotation.</p>
            <span className="text-sm font-bold text-[#2d5da1]">// TAP ME!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

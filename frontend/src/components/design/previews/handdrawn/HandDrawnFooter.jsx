import React from "react";

export const HandDrawnFooter = () => {
  return (
    <footer className="bg-[#fdfbf7] border-t-[3px] border-[#2d2d2d] py-16 font-['Patrick_Hand',cursive] text-[#2d2d2d]">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-['Kalam'] font-bold text-3xl tracking-tight text-[#ff4d4d] mb-4">SketchPad</div>
          <p className="text-lg text-[#2d2d2d]/80 leading-relaxed">
            Authentic human imperfection, playful sketch lines, and Post-It notebook aesthetic.
          </p>
        </div>
        <div>
          <div className="font-['Kalam'] font-bold text-lg text-[#2d5da1] mb-4">[ DOODLES ]</div>
          <ul className="space-y-2 text-lg">
            <li><a href="#features" className="hover:text-[#ff4d4d] hover:underline">Essence</a></li>
            <li><a href="#pricing" className="hover:text-[#ff4d4d] hover:underline">Rates</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Kalam'] font-bold text-lg text-[#2d5da1] mb-4">[ NOTEBOOK ]</div>
          <ul className="space-y-2 text-lg">
            <li><a href="#showcase" className="hover:text-[#ff4d4d] hover:underline">Library</a></li>
            <li><a href="#pricing" className="hover:text-[#ff4d4d] hover:underline">Tokens</a></li>
          </ul>
        </div>
        <div>
          <div className="font-['Kalam'] font-bold text-lg text-[#2d5da1] mb-4">[ PAPER ]</div>
          <p className="text-lg">WARM PAPER #fdfbf7</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pt-6 border-t-2 border-dashed border-[#2d2d2d] font-['Kalam'] text-sm uppercase text-[#2d2d2d]/70 flex justify-between">
        <span>© 2026 HAND-DRAWN DESIGN SYSTEM</span>
        <span>NO STRAIGHT LINES</span>
      </div>
    </footer>
  );
};

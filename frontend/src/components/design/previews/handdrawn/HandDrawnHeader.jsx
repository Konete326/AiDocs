import React from "react";

export const HandDrawnHeader = () => {
  const wobbly = { borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" };

  return (
    <header className="w-full bg-[#fdfbf7] border-b-[3px] border-[#2d2d2d] sticky top-0 z-40 font-['Patrick_Hand',cursive] text-[#2d2d2d]">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 -rotate-1">
          <div style={wobbly} className="w-10 h-10 bg-[#ff4d4d] border-2 border-[#2d2d2d] text-white font-['Kalam'] font-bold flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_#2d2d2d]">
            H
          </div>
          <span className="font-['Kalam'] font-bold text-2xl tracking-tight text-[#2d2d2d]">SketchPad</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-lg font-bold">
          <a href="#features" className="hover:text-[#ff4d4d] hover:underline underline-offset-4 transition-colors">Doodles</a>
          <a href="#pricing" className="hover:text-[#2d5da1] hover:underline underline-offset-4 transition-colors">Post-Its</a>
          <a href="#showcase" className="hover:text-[#ff4d4d] hover:underline underline-offset-4 transition-colors">Notebook</a>
        </nav>
        <button style={wobbly} className="px-6 py-2.5 bg-white border-[3px] border-[#2d2d2d] text-[#2d2d2d] text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all">
          Scribble Now!
        </button>
      </div>
    </header>
  );
};

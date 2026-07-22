import React from "react";
import { ArrowRight, Play } from "lucide-react";

export const MonochromeHero = () => {
  return (
    <section className="bg-white py-20 border-b-4 border-black font-serif">
      <div className="max-w-6xl mx-auto px-6">
        <div className="inline-flex items-center space-x-2 border-2 border-black px-3 py-1 text-xs font-mono uppercase tracking-widest mb-8">
          <span className="w-2 h-2 bg-black"></span>
          <span>Now Available</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-black leading-none mb-8 font-normal">
          Transform the way your team works
        </h1>
        <p className="text-lg font-serif text-neutral-700 max-w-2xl leading-relaxed mb-10">
          Acme Platform brings your team together with powerful tools designed to streamline workflows and boost productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-widest font-semibold">
          <button className="px-8 py-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors flex items-center justify-center space-x-2">
            <span>Start free trial</span>
            <ArrowRight size={16} />
          </button>
          <button className="px-8 py-4 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center space-x-2">
            <Play size={14} />
            <span>Watch demo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

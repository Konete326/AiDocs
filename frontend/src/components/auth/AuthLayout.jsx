import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const InfoPanel = () => (
  <div className="hidden md:flex w-[42%] p-6 flex-col justify-between relative overflow-hidden bg-[#E0E5EC] h-full self-stretch select-none">
    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full shadow-[inset_6px_6px_12px_rgba(163,177,198,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none">
      <div className="w-32 h-32 rounded-full shadow-[9px_9px_16px_rgba(163,177,198,0.5),-9px_-9px_16px_rgba(255,255,255,0.6)] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]" />
      </div>
    </div>

    <div className="relative z-10 flex flex-col justify-center h-full gap-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6C63FF]">
        Visionary Specs
      </span>
      <h2 className="text-xl font-bold tracking-tight leading-tight text-[#3D4852]">
        Docs that write themselves.
      </h2>
      <p className="text-[11px] text-[#6B7280] leading-relaxed">
        ClarifyAI compiles comprehensive, production-ready product requirement documents, system architecture, database schema layouts, and API definitions from your simple prompt.
      </p>

      <div className="space-y-2 mt-2">
        {[
          "9-Document Technical Suite",
          "Interactive Kanban Board",
          "Collaborative AI Chat Editor"
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#38B2AC]" />
            </div>
            <span className="text-[11px] font-semibold text-[#3D4852]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="relative min-h-screen flex items-center justify-center p-4 pt-24 pb-8">
    <div className="w-full max-w-5xl h-fit flex flex-col md:flex-row rounded-[32px] overflow-hidden liquid-glass-strong items-stretch">
      <div className="w-full md:w-[58%] p-5 sm:p-6 md:px-8 md:py-6 flex flex-col justify-center">
        <Link to="/" className="flex items-center gap-2 justify-center md:justify-start hover:opacity-80 transition-opacity cursor-pointer select-none">
          <img src={logo} alt="ClarifyAI" className="w-7 h-7 rounded-lg object-cover shadow-md" />
          <span className="text-base font-semibold tracking-tighter text-white">ClarifyAI</span>
        </Link>
        <div className="mt-4 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-medium text-white tracking-tight">{title}</h1>
          <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>
        </div>
        <div className="w-full mt-4">{children}</div>
      </div>
      <InfoPanel />
    </div>
  </div>
);

export default AuthLayout;

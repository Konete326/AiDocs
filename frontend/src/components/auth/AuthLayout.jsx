import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
const AuthLayout = ({ children, title, subtitle }) => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Video from PersistentBackground in App.jsx — no local video needed */}
    <div className="absolute inset-0 bg-black/55 z-[1]" />
    <div className="relative z-10 min-h-screen flex items-start justify-center px-4 pt-32 pb-12">
      <div className="liquid-glass-strong rounded-3xl p-6 md:p-12 w-full max-w-md my-auto flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2 justify-center hover:opacity-80 transition-opacity cursor-pointer select-none">
          <img src={logo} alt="SwiftDocs AI" className="w-10 h-10 rounded-xl object-cover shadow-lg" />
          <span className="text-xl font-semibold tracking-tighter text-white">SwiftDocs AI</span>
        </Link>
        <h1 className="text-3xl font-medium text-white tracking-tight mt-6 text-center">{title}</h1>
        <p className="text-sm text-white/60 mt-1 text-center">{subtitle}</p>
        <div className="w-full mt-8">{children}</div>
      </div>
    </div>
  </div>
);

export default AuthLayout;

import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="relative min-h-screen overflow-hidden">
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
      autoPlay loop muted playsInline
    />
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="liquid-glass-strong rounded-3xl p-6 md:p-12 w-full max-w-md my-auto flex flex-col items-center">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-10 h-10 bg-white/20 rounded-xl" />
          <span className="text-xl font-semibold tracking-tighter text-white">SwiftDocs AI</span>
        </div>
        <h1 className="text-3xl font-medium text-white tracking-tight mt-6 text-center">{title}</h1>
        <p className="text-sm text-white/60 mt-1 text-center">{subtitle}</p>
        <div className="w-full mt-8">{children}</div>
      </div>
    </div>
  </div>
);

export default AuthLayout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 w-full max-w-lg text-center">
          <h1 className="text-3xl font-medium text-white tracking-tight">Your Projects</h1>
          <p className="text-white/60 mt-2">Dashboard coming soon...</p>
          <div className="mt-8 liquid-glass rounded-xl p-4">
            <p className="text-white text-lg font-medium">Welcome, {user?.displayName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="liquid-glass border border-white/20 hover:bg-white/10 rounded-full px-6 py-2 mt-8 text-white text-sm transition-all hover:scale-105 inline-block"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

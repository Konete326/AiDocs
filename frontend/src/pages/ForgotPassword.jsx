import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { forgotPasswordApi } from '../services/authService';

export default function ForgotPassword() {
  const location = useLocation();
  const fromProfile = location.state?.fromProfile;
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError('Email is required');
    setError(''); setMessage(''); setIsLoading(true);
    try {
      const response = await forgotPasswordApi(email);
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset password" subtitle="We'll send you a recovery link">
      {message && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-[#38B2AC] font-bold mb-4">{message}</div>}
      {error && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-rose-600 font-bold mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 flex items-center gap-3">
          <Mail className="w-4 h-4 text-[#6B7280]" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-transparent text-[#3D4852] placeholder-[#9CA3AF] outline-none w-full text-sm font-medium" />
        </div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-2xl py-3 h-11 w-full mt-4 text-[#3D4852] font-extrabold text-sm hover:scale-105 disabled:hover:scale-100 transition-all flex justify-center items-center cursor-pointer disabled:cursor-not-allowed">
          {isLoading ? <LoadingSpinner size="sm" /> : "Send Reset Link"}
        </button>
      </form>
      <div className="mt-8 text-center">
        <Link 
          to={fromProfile ? "/profile" : "/login"} 
          className="text-xs text-[#6C63FF] font-bold hover:underline underline-offset-4 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#6C63FF]" /> {fromProfile ? "Back to profile" : "Back to sign in"}
        </Link>
      </div>
    </AuthLayout>
  );
}

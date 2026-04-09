import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError('Email is required');
    setError(''); setMessage(''); setIsLoading(true);
    setTimeout(() => {
      setMessage('If an account exists, a reset link has been sent.');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout title="Reset password" subtitle="We'll send you a recovery link">
      {message && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-green-300/80 mb-4 border border-green-500/20">{message}</div>}
      {error && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-red-300/80 mb-4 border border-red-500/20">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
          <Mail className="w-4 h-4 text-white/40" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-transparent text-white outline-none w-full text-sm" />
        </div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-full py-3 h-11 w-full mt-4 text-white font-medium text-sm hover:scale-105 transition-all flex justify-center items-center">
          {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
        </button>
      </form>
      <div className="mt-8 text-center">
        <Link to="/login" className="text-xs text-white/50 hover:text-white/80 flex items-center justify-center gap-2">
          <ArrowLeft className="w-3 h-3" /> Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}

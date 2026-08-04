import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { resetPasswordApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError('Reset token is missing from URL');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    setError(''); setIsLoading(true);
    try {
      await resetPasswordApi(token, password);
      setSuccess(true);
      const redirectTo = isAuthenticated ? '/profile' : '/login';
      setTimeout(() => navigate(redirectTo), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    const redirectTo = isAuthenticated ? '/profile' : '/login';
    return (
      <AuthLayout title="Success!" subtitle="Your password has been updated">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#38B2AC]/10 flex items-center justify-center border border-[#38B2AC]/20">
              <CheckCircle className="w-8 h-8 text-[#38B2AC]" />
            </div>
          </div>
          <p className="text-sm text-[#3D4852] font-semibold">
            Redirecting you in 3 seconds...
          </p>
          <Link to={redirectTo} className="block text-xs text-[#6C63FF] font-bold hover:underline">
            Click here if you aren't redirected
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="New password" subtitle="Enter your new secure password">
      {error && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-rose-600 font-bold mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 flex items-center gap-3">
          <Lock className="w-4 h-4 text-[#6B7280]" />
          <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-transparent text-[#3D4852] placeholder-[#9CA3AF] outline-none w-full text-sm font-medium" />
        </div>
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 flex items-center gap-3">
          <Lock className="w-4 h-4 text-[#6B7280]" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="bg-transparent text-[#3D4852] placeholder-[#9CA3AF] outline-none w-full text-sm font-medium" />
        </div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-2xl py-3 h-11 w-full mt-4 text-[#3D4852] font-extrabold text-sm hover:scale-105 disabled:hover:scale-100 transition-all flex justify-center items-center cursor-pointer disabled:cursor-not-allowed">
          {isLoading ? <LoadingSpinner size="sm" /> : "Reset Password"}
        </button>
      </form>
      <div className="mt-8 text-center">
        <Link to="/login" className="text-xs text-[#6C63FF] font-bold hover:underline underline-offset-4 flex items-center justify-center gap-2">
          <ArrowLeft className="w-3.5 h-3.5 text-[#6C63FF]" /> Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}

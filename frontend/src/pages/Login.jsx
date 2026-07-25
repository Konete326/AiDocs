import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      const emptyErr = 'Please fill in all fields.';
      toast.error(emptyErr);
      return setError(emptyErr);
    }
    setError(''); setIsLoading(true);
    try { await login(email, password); navigate('/dashboard'); }
    catch (err) { 
      const msg = err.response?.data?.error;
      const friendlyMsg = typeof msg === 'string' ? msg : msg?.message || 'Login failed.';
      toast.error(friendlyMsg);
      setError(friendlyMsg); 
    }
    finally { setIsLoading(false); }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue building">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-2.5 flex items-center gap-3">
          <Mail className="w-4 h-4 text-[#6B7280]" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-transparent text-white outline-none w-full text-sm" />
        </div>
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-2.5 flex items-center gap-3">
          <Lock className="w-4 h-4 text-[#6B7280]" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent text-white outline-none w-full text-sm" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="cursor-pointer">{showPassword ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}</button>
        </div>
        
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-[#6B7280] hover:text-[#3D4852] select-none">
            <input type="checkbox" className="rounded border-none shadow-[inset_1px_1px_2px_rgba(163,177,198,0.6)] bg-[#E0E5EC] text-[#6C63FF] focus:ring-0" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-[#6B7280] hover:text-[#3D4852] transition-colors">Forgot password?</Link>
        </div>

        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-2xl py-2.5 h-10 w-full mt-2 text-[#3D4852] font-semibold text-sm hover:scale-105 disabled:hover:scale-100 transition-all flex justify-center items-center cursor-pointer disabled:cursor-not-allowed">
          {isLoading ? <LoadingSpinner /> : "Sign In"}
        </button>
      </form>
      <div className="flex items-center gap-3 mt-6"><div className="h-px flex-1 bg-white/10" /><span className="text-xs text-white/40">or</span><div className="h-px flex-1 bg-white/10" /></div>
      <GoogleSignInButton onClick={async () => { try { setIsLoading(true); await loginGoogle(); navigate('/dashboard'); } catch (err) { setError('Google sign-in failed.'); } finally { setIsLoading(false); } }} isLoading={isLoading} />
      <div className="mt-6 text-center"><span className="text-xs text-white/50">New here? </span><Link to="/register" className="text-xs text-white/80 underline underline-offset-4">Create account</Link></div>
    </AuthLayout>
  );
}

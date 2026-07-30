import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ComingSoonModal from '../components/common/ComingSoonModal';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [show, setShow] = useState({ p: false, cp: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const score = usePasswordStrength(form.password);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Fill all fields.');
      return setError('Fill all fields.');
    }
    if (score < 3) {
      toast.error('Password is too weak.');
      return setError('Password is too weak.');
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords mismatch.');
      return setError('Passwords mismatch.');
    }
    setError(''); setIsLoading(true);
    try { await register(form.name, form.email, form.password); navigate('/dashboard'); }
    catch (err) { 
      const msg = err.response?.data?.error;
      const friendlyMsg = typeof msg === 'string' ? msg : msg?.message || 'Registration failed.';
      toast.error(friendlyMsg);
      setError(friendlyMsg); 
    }
    finally { setIsLoading(false); }
  };

  const inputCls = "bg-transparent text-[#3D4852] placeholder-[#9CA3AF] outline-none w-full text-sm font-medium";
  const rowCls = "neumorphic-input-wrapper rounded-xl px-4 py-2.5 flex items-center gap-3";

  return (
    <AuthLayout title="Create account" subtitle="Start generating docs in minutes">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className={rowCls}><User className="w-4 h-4 text-[#6B7280]" /><input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} required /></div>
          <div className={rowCls}><Mail className="w-4 h-4 text-[#6B7280]" /><input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} required /></div>
        </div>
        <div className="grid grid-cols-2 gap-3 items-start">
          <div>
            <div className={rowCls}><Lock className="w-4 h-4 text-[#6B7280]" /><input type={show.p ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className={inputCls} required /><button type="button" onClick={() => setShow({...show, p: !show.p})} aria-label="Toggle password visibility" className="cursor-pointer">{show.p ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}</button></div>
            {form.password && <PasswordStrengthMeter score={score} />}
          </div>
          <div className={rowCls}><ShieldCheck className="w-4 h-4 text-[#6B7280]" /><input type={show.cp ? 'text' : 'password'} placeholder="Confirm password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} className={inputCls} required /><button type="button" onClick={() => setShow({...show, cp: !show.cp})} aria-label="Toggle confirm password visibility" className="cursor-pointer">{show.cp ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}</button></div>
        </div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-2xl py-2.5 h-10 w-full mt-2 text-[#3D4852] font-extrabold text-sm hover:scale-105 disabled:hover:scale-100 transition-all flex justify-center items-center cursor-pointer disabled:cursor-not-allowed">{isLoading ? <LoadingSpinner /> : "Create Account"}</button>
      </form>
      <div className="flex items-center gap-3 mt-6"><div className="h-px flex-1 bg-black/10" /><span className="text-xs text-[#6B7280] font-semibold">or</span><div className="h-px flex-1 bg-black/10" /></div>
      <GoogleSignInButton onClick={() => setShowGoogleModal(true)} isLoading={false} />
      <div className="mt-6 text-center"><span className="text-xs text-[#6B7280] font-medium">Joined? </span><Link to="/login" className="text-xs text-[#6C63FF] font-extrabold hover:underline underline-offset-4">Sign in</Link></div>
      <ComingSoonModal 
        isOpen={showGoogleModal} 
        onClose={() => setShowGoogleModal(false)} 
        title="Google Sign-In Coming Soon" 
        description="Google Authentication is currently under maintenance and will be live shortly. Please register with your email and password." 
      />
    </AuthLayout>
  );
}

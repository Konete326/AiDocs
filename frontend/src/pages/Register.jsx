import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [show, setShow] = useState({ p: false, cp: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, loginGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const score = usePasswordStrength(form.password);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) return setError('Fill all fields.');
    if (score < 3) return setError('Password is too weak.');
    if (form.password !== form.confirmPassword) return setError('Passwords mismatch.');
    setError(''); setIsLoading(true);
    try { await register(form.name, form.email, form.password); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.error || 'Registration failed.'); }
    finally { setIsLoading(false); }
  };

  const inputCls = "bg-transparent text-white outline-none w-full text-sm";
  const rowCls = "liquid-glass rounded-xl px-4 py-3 flex items-center gap-3";

  return (
    <AuthLayout title="Create account" subtitle="Start generating docs in minutes">
      {error && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-white/80 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={rowCls}><User className="w-4 h-4 text-white/40" /><input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} required /></div>
        <div className={rowCls}><Mail className="w-4 h-4 text-white/40" /><input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} required /></div>
        <div>
          <div className={rowCls}><Lock className="w-4 h-4 text-white/40" /><input type={show.p ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className={inputCls} required /><button type="button" onClick={() => setShow({...show, p: !show.p})}>{show.p ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}</button></div>
          {form.password && <PasswordStrengthMeter score={score} />}
        </div>
        <div className={rowCls}><ShieldCheck className="w-4 h-4 text-white/40" /><input type={show.cp ? 'text' : 'password'} placeholder="Confirm password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} className={inputCls} required /><button type="button" onClick={() => setShow({...show, cp: !show.cp})}>{show.cp ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}</button></div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-full py-3 h-11 w-full mt-4 text-white font-medium text-sm hover:scale-105 transition-all flex justify-center items-center">{isLoading ? <LoadingSpinner /> : "Create Account"}</button>
      </form>
      <div className="flex items-center gap-3 mt-6"><div className="h-px flex-1 bg-white/10" /><span className="text-xs text-white/40">or</span><div className="h-px flex-1 bg-white/10" /></div>
      <GoogleSignInButton onClick={async () => { try { setIsLoading(true); await loginGoogle(); navigate('/dashboard'); } catch (err) { setError('Google failed.'); } finally { setIsLoading(false); } }} isLoading={isLoading} />
      <div className="mt-6 text-center"><span className="text-xs text-white/50">Joined? </span><Link to="/login" className="text-xs text-white/80 underline underline-offset-4">Sign in</Link></div>
    </AuthLayout>
  );
}

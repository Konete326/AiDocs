import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
    if (!email || !password) return setError('Please fill in all fields.');
    setError(''); setIsLoading(true);
    try { await login(email, password); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.error || 'Login failed.'); }
    finally { setIsLoading(false); }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue building">
      {error && <div className="liquid-glass rounded-xl px-4 py-3 text-sm text-white/80 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
          <Mail className="w-4 h-4 text-white/40" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-transparent text-white outline-none w-full text-sm" />
        </div>
        <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
          <Lock className="w-4 h-4 text-white/40" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent text-white outline-none w-full text-sm" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}</button>
        </div>
        <div className="flex justify-end"><Link to="/forgot-password" size="xs" className="text-xs text-white/50 hover:text-white/80">Forgot password?</Link></div>
        <button type="submit" disabled={isLoading} className="liquid-glass-strong rounded-full py-3 h-11 w-full mt-4 text-white font-medium text-sm hover:scale-105 transition-all outline-none flex justify-center items-center">{isLoading ? <LoadingSpinner /> : "Sign In"}</button>
      </form>
      <div className="flex items-center gap-3 mt-6"><div className="h-px flex-1 bg-white/10" /><span className="text-xs text-white/40">or</span><div className="h-px flex-1 bg-white/10" /></div>
      <GoogleSignInButton onClick={async () => { try { setIsLoading(true); await loginGoogle(); navigate('/dashboard'); } catch (err) { setError('Google sign-in failed.'); } finally { setIsLoading(false); } }} isLoading={isLoading} />
      <div className="mt-6 text-center"><span className="text-xs text-white/50">New here? </span><Link to="/register" className="text-xs text-white/80 underline underline-offset-4">Create account</Link></div>
    </AuthLayout>
  );
}

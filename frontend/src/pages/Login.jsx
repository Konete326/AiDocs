import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthLayout from '../components/layout/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({ email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md liquid-glass-strong rounded-3xl p-8 md:p-12">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 object-cover rounded-lg" />
          <span className="text-xl font-semibold tracking-tighter text-white mt-2">SwiftDocs AI</span>
          <h1 className="text-3xl font-medium text-white tracking-tight mt-6">Welcome back</h1>
          <p className="text-sm text-white/60 mt-1">Sign in to continue building</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
            <Mail className="w-4 h-4 text-white/40" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm" />
          </div>
          <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
            <Lock className="w-4 h-4 text-white/40" />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm" />
            <div onClick={() => setShowPassword(!showPassword)} className="liquid-glass rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="mt-6 w-full liquid-glass-strong rounded-full py-3 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </button>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <button type="button" className="liquid-glass rounded-full py-3 w-full flex items-center justify-center gap-3 mt-3 hover:scale-105 transition-transform cursor-pointer">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="text-sm text-white/80">Continue with Google</span>
          </button>
          <div className="mt-8 text-center pt-2">
            <span className="text-xs text-white/50">Don't have an account? </span>
            <Link to="/register" className="text-xs text-white/80 underline underline-offset-4">Register</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

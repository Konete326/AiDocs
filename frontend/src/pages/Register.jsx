import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/authService';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.register(formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <GlassCard strong className="w-full max-w-md p-8 lg:p-10 rounded-[2.5rem]">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight italic">Join the Fleet</h2>
            <p className="text-white/40 text-sm mt-2">Start generating visionary docs today.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 ml-1 uppercase tracking-widest italic">Name</label>
              <input
                type="text"
                placeholder="Venture Founder"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-white/30 transition-all font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 ml-1 uppercase tracking-widest italic">Email</label>
              <input
                type="email"
                placeholder="founder@ship.it"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-white/30 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 ml-1 uppercase tracking-widest italic">Password</label>
              <input
                type="password"
                placeholder="SecureVisionaryPassword"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-white/30 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="strong" className="mt-4 py-4 rounded-2xl text-base">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-white/40">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-white hover:underline cursor-pointer">
              Sign In
            </button>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;

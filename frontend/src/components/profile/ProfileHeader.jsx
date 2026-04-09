import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="liquid-glass inline-flex rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70">
        Your Profile
      </div>
      <h2 className="text-2xl lg:text-3xl font-medium tracking-tight text-white">
        {user?.displayName || 'Welcome'}, <em className="font-serif italic text-white/80">SwiftDocs AI</em>
      </h2>
      <p className="text-white/70 text-base leading-relaxed max-w-xl">
        Manage your account, view your subscription, and upload a photo.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="liquid-glass-strong rounded-full px-8 py-3 h-12 flex items-center gap-2 hover:scale-105 transition-transform text-white/90 hover:text-white cursor-pointer mt-4"
      >
        <span>View My Projects</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default ProfileHeader;

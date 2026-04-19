import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Calendar, CreditCard, FileText } from 'lucide-react';

const ProfileInfoLinks = ({ user, subscription, memberSince }) => {
  const plan = subscription?.plan || 'free';
  const limit = subscription?.projectLimit || (plan === 'free' ? 3 : plan === 'pro' ? 10 : 999999);
  const docsRemaining = limit > 1000 ? 'Unlimited' : `${limit} Projects`;

  const links = [
    { icon: Calendar, label: 'Member Since', value: memberSince },
    { icon: Mail, label: 'Email', value: user?.email },
  ];

  return (
    <div className="mt-8 w-full space-y-3">
      {links.map((link, i) => (
        <div key={i} className="liquid-glass rounded-2xl px-4 py-3 flex items-center justify-between transition-all hover:bg-white/[0.02] cursor-default group">
          <div className="flex items-center gap-4">
            <link.icon className="w-5 h-5 text-white/70" />
            <div className="flex flex-col text-left">
              <span className="text-xs text-white/50">{link.label}</span>
              <span className="text-sm font-medium text-white/90">{link.value || '—'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfoLinks;

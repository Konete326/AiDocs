import { motion } from 'framer-motion';
import { Mail, Calendar, CreditCard, FileText, ArrowUpRight } from 'lucide-react';

const ProfileCard = ({ user, isEditing, onSave, onCancel, onChange }) => {
  const infoLinks = [
    { icon: Calendar, label: "Member Since", value: user.memberSince },
    { icon: Mail, label: "Email", value: user.email },
    { icon: CreditCard, label: "Subscription", value: user.plan },
    { icon: FileText, label: "Docs Left", value: `${user.docsRemaining} remaining` },
  ];

  return (
    <div className="liquid-glass-strong rounded-[28px] p-8 flex flex-col items-center">
      <div className="relative group mt-2">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center text-4xl text-white font-medium">
            {user.displayName.charAt(0)}
          </div>
        )}
        {isEditing && (
          <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 liquid-glass rounded-full px-4 py-2 text-xs text-white/70 whitespace-nowrap cursor-pointer hover:text-white transition-colors shadow-lg">
            Upload Photo
          </button>
        )}
      </div>

      <div className="mt-10 w-full flex flex-col items-center text-center">
        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="liquid-glass rounded-xl px-4 py-2">
              <input 
                type="text" 
                value={user.displayName}
                onChange={(e) => onChange('displayName', e.target.value)}
                className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-center text-2xl font-medium"
              />
            </div>
            <div className="liquid-glass rounded-xl px-4 py-2">
              <textarea 
                value={user.bio}
                onChange={(e) => onChange('bio', e.target.value)}
                rows={3}
                className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-center text-sm resize-none pt-1"
              />
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button onClick={onSave} className="liquid-glass-strong rounded-full px-6 py-2 text-sm text-white hover:bg-white/10 cursor-pointer transition-colors">Save Changes</button>
              <button onClick={onCancel} className="liquid-glass rounded-full px-6 py-2 text-sm text-white/70 hover:text-white cursor-pointer transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-medium text-white">{user.displayName}</h3>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45 mt-1">SwiftDocs AI Member</p>
            <p className="text-sm text-white/70 mt-4 max-w-sm leading-relaxed">{user.bio}</p>
          </>
        )}
      </div>

      <div className="mt-8 w-full space-y-3">
        {infoLinks.map((link, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className="liquid-glass rounded-2xl px-4 py-3 flex items-center justify-between transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <link.icon className="w-5 h-5 text-white/70" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/50">{link.label}</span>
                <span className="text-sm font-medium text-white/90">{link.value}</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/30" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;

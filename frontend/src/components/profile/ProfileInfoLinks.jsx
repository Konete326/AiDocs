import { Mail, Calendar } from 'lucide-react';

const ProfileInfoLinks = ({ user, memberSince }) => {
  const links = [
    { icon: Calendar, label: 'Member Since', value: memberSince },
    { icon: Mail, label: 'Email', value: user?.email },
  ];

  return (
    <div className="mt-4 w-full grid grid-cols-2 gap-3">
      {links.map((link, i) => (
        <div key={i} className="neumorphic-inset rounded-2xl px-3 py-2.5 flex items-center gap-3 cursor-default">
          <link.icon className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wide">{link.label}</span>
            <span className="text-xs font-medium text-[#3D4852] truncate">{link.value || '—'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfoLinks;


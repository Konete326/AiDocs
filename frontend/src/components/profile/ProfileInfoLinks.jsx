import { Mail, Calendar } from 'lucide-react';

const ProfileInfoLinks = ({ user, subscription, memberSince }) => {
  const links = [
    { icon: Calendar, label: 'Member Since', value: memberSince },
    { icon: Mail, label: 'Email', value: user?.email },
  ];

  return (
    <div className="mt-8 w-full space-y-3">
      {links.map((link, i) => (
        <div key={i} className="neumorphic-inset rounded-2xl px-4 py-3 flex items-center gap-4 cursor-default">
          <link.icon className="w-5 h-5 text-[#6C63FF] flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs text-[#6B7280]">{link.label}</span>
            <span className="text-sm font-medium text-[#3D4852]">{link.value || '—'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfoLinks;

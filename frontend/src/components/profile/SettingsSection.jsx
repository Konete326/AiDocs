import React from 'react';
import { Bell, Lock, Eye, Globe, Moon, ShieldCheck } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const SettingsSection = () => {
  const settingsGroups = [
    {
      title: 'Account & Security',
      items: [
        { icon: Lock, label: 'Password & Authentication', desc: 'Secure your account with 2FA' },
        { icon: ShieldCheck, label: 'Data Privacy', desc: 'Manage your data and visibility' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', desc: 'Email and system alerts' },
        { icon: Moon, label: 'Display & Theme', desc: 'Dark mode and glass transparency' },
        { icon: Globe, label: 'Language', desc: 'Set your preferred language' }
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-px flex-1 bg-white/5" />
        <h2 className="text-xl font-serif italic text-white/40">App Settings</h2>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h3 className="text-xs font-semibold text-white/20 uppercase tracking-[0.2em] px-2">{group.title}</h3>
            <div className="space-y-3">
              {group.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  className="w-full text-left liquid-glass p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer border border-transparent hover:border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/80 group-hover:text-white">{item.label}</div>
                    <div className="text-[11px] text-white/30 group-hover:text-white/50">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 liquid-glass rounded-3xl border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
             <Eye className="w-5 h-5 text-blue-400" />
           </div>
           <div>
             <div className="text-sm font-medium text-white">Privacy Mode</div>
             <div className="text-xs text-white/40">Hide my profile from search results</div>
           </div>
        </div>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 cursor-pointer">
          <span className="inline-block h-4 w-4 transform rounded-full bg-white/40 transition translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;

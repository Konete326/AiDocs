import { useState, useEffect } from 'react';
import { FileText, Zap, ShieldAlert, Users, Save, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { showSuccess, showError } from '../../utils/toast';

export default function NotificationSettings() {
  const { user, setUser } = useAuth();
  const [prefs, setPrefs] = useState({
    docReady: true,
    planStatus: true,
    systemAlerts: true,
    teamInvites: true,
    ...(user?.notificationPreferences || {})
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user?.notificationPreferences) {
      setPrefs((prev) => ({ ...prev, ...user.notificationPreferences }));
    }
  }, [user]);

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.patch('/users/me', {
        notificationPreferences: prefs
      });
      if (res.data?.data) {
        setUser(res.data.data);
      }
      setSaveSuccess(true);
      showSuccess('Preferences Saved', 'Notification alert settings updated successfully.');
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      showError('Save Failed', 'Could not update notification preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    {
      id: 'docReady',
      title: 'Document Completion',
      description: 'Alerts when your 9-doc AI blueprint finishes generating.',
      icon: FileText
    },
    {
      id: 'planStatus',
      title: 'Plan & Usage Limits',
      description: 'Alerts regarding quota, renewals, and usage resets.',
      icon: Zap
    },
    {
      id: 'systemAlerts',
      title: 'System & Security Alerts',
      description: 'Platform updates, maintenance, and security notices.',
      icon: ShieldAlert
    },
    {
      id: 'teamInvites',
      title: 'Team Workspace Activity',
      description: 'Alerts when invited to workspace or role changes.',
      icon: Users
    }
  ];

  return (
    <div className="animate-in fade-in duration-300 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-[#3D4852] tracking-tight mb-0.5">Notification Preferences</h3>
        <p className="text-[#6B7280] text-xs font-medium">
          Customize alert categories received across platform and browser.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isEnabled = prefs[cat.id];
            return (
              <div
                key={cat.id}
                onClick={() => togglePref(cat.id)}
                className="p-3 rounded-2xl neumorphic-card bg-[#E0E5EC] border border-white/60 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/30 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isEnabled ? 'bg-[#2563EB]/15 text-[#2563EB]' : 'bg-black/5 text-[#6B7280]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-[#3D4852] truncate">{cat.title}</h4>
                    <p className="text-[10px] text-[#6B7280] font-medium leading-snug line-clamp-1">{cat.description}</p>
                  </div>
                </div>

                <div
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center shrink-0 ${
                    isEnabled ? 'bg-[#2563EB] justify-end' : 'bg-[#c4cdd8] justify-start'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-1 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] !text-white rounded-2xl px-5 py-2 text-xs font-extrabold flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer disabled:opacity-50 border-none"
          >
            {saveSuccess ? <Check className="w-3.5 h-3.5 !text-white stroke-white" /> : <Save className="w-3.5 h-3.5 !text-white stroke-white" />}
            <span className="!text-white">{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

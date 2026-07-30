import { useState, useEffect } from 'react';
import { Bell, FileText, Zap, ShieldAlert, Users, Save, Check } from 'lucide-react';
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
      title: 'Document Generation Completion',
      description: 'Receive real-time alerts when your 9-document AI blueprint finishes generating.',
      icon: FileText
    },
    {
      id: 'planStatus',
      title: 'Plan & Usage Limits',
      description: 'Get notified regarding generation quota, plan renewals, and usage resets.',
      icon: Zap
    },
    {
      id: 'systemAlerts',
      title: 'System & Security Alerts',
      description: 'Important platform updates, maintenance windows, and security login notices.',
      icon: ShieldAlert
    },
    {
      id: 'teamInvites',
      title: 'Team Workspace Activity',
      description: 'Alerts when invited to collaborative workspaces or when member roles change.',
      icon: Users
    }
  ];

  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#3D4852] tracking-tight mb-1">Granular Notification Preferences</h3>
        <p className="text-[#6B7280] text-xs font-medium">
          Customize which alert categories you want to receive across the platform and browser.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isEnabled = prefs[cat.id];
          return (
            <div
              key={cat.id}
              onClick={() => togglePref(cat.id)}
              className="p-4 rounded-3xl neumorphic-card bg-[#E0E5EC] border border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/30 transition-all shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.5)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${isEnabled ? 'bg-[#6C63FF]/15 text-[#6C63FF]' : 'bg-black/5 text-[#6B7280]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#3D4852]">{cat.title}</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium leading-relaxed">{cat.description}</p>
                </div>
              </div>

              <div
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center shrink-0 ${
                  isEnabled ? 'bg-[#6C63FF] justify-end' : 'bg-[#c4cdd8] justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform" />
              </div>
            </div>
          );
        })}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-6 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-[4px_4px_10px_rgba(108,99,255,0.35)] hover:scale-105 transition-transform cursor-pointer disabled:opacity-50 border-none"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4 text-white" />}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Notification Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

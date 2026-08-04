import { useState, useEffect } from 'react';
import { FileText, Image, Palette, Check, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { showSuccess, showError } from '../../utils/toast';

export default function BrandingSettings() {
  const { user, setUser } = useAuth();
  const [agencyName, setAgencyName] = useState(user?.branding?.agencyName || '');
  const [logoUrl, setLogoUrl] = useState(user?.branding?.logoUrl || '');
  const [primaryColor, setPrimaryColor] = useState(user?.branding?.primaryColor || '#2563EB');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user?.branding) {
      setAgencyName(user.branding.agencyName || '');
      setLogoUrl(user.branding.logoUrl || '');
      setPrimaryColor(user.branding.primaryColor || '#2563EB');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.patch('/users/me', {
        branding: { agencyName, logoUrl, primaryColor }
      });
      if (res.data?.data) {
        setUser(res.data.data);
      }
      setSaveSuccess(true);
      showSuccess('Branding Updated', 'Custom PDF header branding saved successfully.');
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      showError('Save Failed', 'Could not save branding settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300 space-y-3.5">
      <div>
        <h3 className="text-lg font-bold text-[#3D4852] tracking-tight mb-0.5">Custom PDF Branding & Logo</h3>
        <p className="text-[#6B7280] text-xs font-medium">
          Add agency branding, custom logo URL, and accent colors to exported PRDs and SRDs.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end w-full">
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-1.5 truncate">
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" /> Agency Name
          </label>
          <input
            type="text"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            placeholder="e.g. Acme Digital"
            className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] p-2.5 rounded-xl outline-none neumorphic-inset"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-1.5 truncate">
            <Image className="w-3.5 h-3.5 text-[#2563EB]" /> Logo URL
          </label>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] p-2.5 rounded-xl outline-none neumorphic-inset"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-1.5 truncate">
            <Palette className="w-3.5 h-3.5 text-[#2563EB]" /> PDF Accent
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent flex-shrink-0"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full bg-[#E0E5EC] text-xs font-mono font-bold text-[#3D4852] p-2 rounded-xl outline-none neumorphic-inset"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] !text-white rounded-xl py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-all cursor-pointer disabled:opacity-50 border-none h-[38px]"
          >
            {saveSuccess ? <Check className="w-3.5 h-3.5 !text-white stroke-white" /> : <Save className="w-3.5 h-3.5 !text-white stroke-white" />}
            <span className="!text-white whitespace-nowrap">{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Branding'}</span>
          </button>
        </div>
      </form>

      <div className="neumorphic-card no-hover p-3 rounded-2xl space-y-1.5 border border-white/60">
        <h4 className="text-[11px] font-extrabold text-[#3D4852] uppercase tracking-wider">PDF Cover Preview</h4>
        <div className="p-3 rounded-xl neumorphic-inset bg-[#E0E5EC] space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between items-center border-b pb-1 border-black/10">
            <span className="font-extrabold text-[#3D4852]">{agencyName || 'ClarifyAI Agency'}</span>
            <span className="text-[9px] text-[#6B7280]">CONFIDENTIAL SPECIFICATION</span>
          </div>
          <div className="text-[10px] font-bold text-[#3D4852]">PRODUCT REQUIREMENTS DOCUMENT</div>
          <div className="h-1 rounded-full w-full" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
    </div>
  );
}

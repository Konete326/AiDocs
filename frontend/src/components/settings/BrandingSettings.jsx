import { useState, useEffect } from 'react';
import { FileText, Image, Palette, Check, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { showSuccess, showError } from '../../utils/toast';

export default function BrandingSettings() {
  const { user, setUser } = useAuth();
  const [agencyName, setAgencyName] = useState(user?.branding?.agencyName || '');
  const [logoUrl, setLogoUrl] = useState(user?.branding?.logoUrl || '');
  const [primaryColor, setPrimaryColor] = useState(user?.branding?.primaryColor || '#6C63FF');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user?.branding) {
      setAgencyName(user.branding.agencyName || '');
      setLogoUrl(user.branding.logoUrl || '');
      setPrimaryColor(user.branding.primaryColor || '#6C63FF');
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
    <div className="animate-in fade-in duration-300 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#3D4852] tracking-tight mb-1">Custom PDF Branding & Logo</h3>
        <p className="text-[#6B7280] text-xs font-medium">
          Add your agency branding, custom header logo, and client colors to exported PRDs, SRDs, and technical documents.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5 max-w-xl">
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#6C63FF]" /> Agency / Company Name
          </label>
          <input
            type="text"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            placeholder="e.g. Acme Digital Solutions"
            className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] p-3 rounded-2xl outline-none neumorphic-inset"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
            <Image className="w-3.5 h-3.5 text-[#6C63FF]" /> Custom Header Logo URL
          </label>
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://youragency.com/logo.png"
            className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] p-3 rounded-2xl outline-none neumorphic-inset"
          />
          <p className="text-[10px] text-[#6B7280]">Provide a direct image URL (PNG/SVG/JPG) to render on PDF headers.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-[#6C63FF]" /> PDF Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer border-none bg-transparent"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-32 bg-[#E0E5EC] text-xs font-mono font-bold text-[#3D4852] p-2.5 rounded-2xl outline-none neumorphic-inset"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-6 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-[4px_4px_10px_rgba(108,99,255,0.35)] hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4 text-white" />}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Branding'}</span>
          </button>
        </div>
      </form>

      <div className="neumorphic-card no-hover p-5 rounded-3xl space-y-2 border border-white/60">
        <h4 className="text-xs font-extrabold text-[#3D4852] uppercase tracking-wider">PDF Cover Preview</h4>
        <div className="p-4 rounded-2xl neumorphic-inset bg-[#E0E5EC] space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center border-b pb-2 border-black/10">
            <span className="font-extrabold text-[#3D4852]">{agencyName || 'ClarifyAI Agency'}</span>
            <span className="text-[10px] text-[#6B7280]">CONFIDENTIAL SPECIFICATION</span>
          </div>
          <div className="text-[11px] font-bold text-[#3D4852]">PRODUCT REQUIREMENTS DOCUMENT</div>
          <div className="h-1 rounded-full w-full" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
    </div>
  );
}

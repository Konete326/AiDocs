import { useState } from 'react';
import { X, Copy, Check, Code2, Smartphone, Tablet, Monitor } from 'lucide-react';
import { toast } from 'react-hot-toast';

const presets = [
  { label: 'Mobile', width: '375px', height: '500px', icon: Smartphone },
  { label: 'Tablet', width: '768px', height: '450px', icon: Tablet },
  { label: 'Desktop', width: '100%', height: '400px', icon: Monitor }
];

const themes = [
  { id: 'neumorphic', name: 'Neumorphic' },
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' }
];

const EmbedSnippetModal = ({ componentId, onClose }) => {
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('400px');
  const [selectedTheme, setSelectedTheme] = useState('neumorphic');
  const [copied, setCopied] = useState(false);

  const getSnippet = () => {
    const embedUrl = `${window.location.origin}/embed/components/${componentId}?theme=${selectedTheme}`;
    return `<!-- From ClarifyAI -->\n<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border:none; overflow:hidden;"></iframe>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSnippet());
    setCopied(true);
    toast.success('Embed iframe snippet copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-lg p-6 md:p-8 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-2xl bg-[#E0E5EC] shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] hover:text-red-500 cursor-pointer">
          <X className="w-5 h-5 text-[#3D4852]" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-extrabold text-[#3D4852]">Embed Component</h2>
        </div>
        <p className="text-xs text-[#6B7280] mb-4">Choose preset dimensions and theme for external websites.</p>

        <div className="mb-4">
          <label className="text-[11px] font-bold text-[#3D4852] block mb-1.5 uppercase">Responsive Presets</label>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((p) => {
              const Icon = p.icon;
              return (
                <button key={p.label} onClick={() => { setWidth(p.width); setHeight(p.height); }} className="p-2 bg-[#E0E5EC] rounded-xl text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  <Icon className="w-3.5 h-3.5 text-blue-600" /><span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[11px] font-bold text-[#3D4852] block mb-1.5 uppercase">Canvas Theme</label>
          <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
            {themes.map((t) => (
              <button key={t.id} onClick={() => setSelectedTheme(t.id)} className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedTheme === t.id ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]' : 'text-[#6B7280]'}`}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-bold text-[#3D4852] block mb-1">Width</label>
            <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-2 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] font-mono shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#3D4852] block mb-1">Height</label>
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] font-mono shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none" />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-xs font-bold text-[#3D4852] block mb-1">HTML Embed Snippet</label>
          <textarea rows={3} readOnly value={getSnippet()} className="w-full p-2.5 bg-white/40 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] border border-white/40 resize-none" />
        </div>

        <button onClick={handleCopy} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Snippet Copied!' : 'Copy Embed Snippet'}
        </button>
      </div>
    </div>
  );
};

export default EmbedSnippetModal;

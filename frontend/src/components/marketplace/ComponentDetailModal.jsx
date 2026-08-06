import { useState } from 'react';
import { X, Copy, Sparkles, Check, Code, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ComponentDetailModal = ({ component, onClose }) => {
  const [activeTab, setActiveTab] = useState('react');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!component) return null;

  const getPreviewDoc = () => {
    const cssContent = component?.code?.css || '';
    const htmlContent = component?.code?.html || component?.code?.tailwind || '';
    return `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #E0E5EC; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
    ${cssContent}
  </style>
</head>
<body>${htmlContent}</body>
</html>`;
  };

  const getActiveCode = () => {
    return component?.code?.[activeTab] || 'No code provided for this tab.';
  };

  const handleCopyActiveCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopiedCode(true);
    toast.success(`${activeTab.toUpperCase()} code copied!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(component.aiPrompt);
    setCopiedPrompt(true);
    toast.success('AI Prompt copied for Coding Agent!');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-4xl p-6 md:p-8 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-[#E0E5EC] shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] hover:text-red-500 cursor-pointer transition-all"
        >
          <X className="w-5 h-5 text-[#3D4852]" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0E5EC] text-[#6C63FF] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]">
            {component.category}
          </span>
          <h2 className="text-2xl font-extrabold text-[#3D4852] mt-2">{component.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] h-72">
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-bold mb-2">
              <Eye className="w-4 h-4 text-[#6C63FF]" /> Live Preview
            </div>
            <iframe
              srcDoc={getPreviewDoc()}
              title="Preview"
              className="w-full h-60 border-0 rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-[#6C63FF] font-bold">
                  <Sparkles className="w-4 h-4" /> AI Prompt for Coding Agents
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="bg-[#6C63FF] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(108,99,255,0.3)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
              <p className="text-xs text-[#3D4852] bg-white/40 p-3 rounded-xl max-h-48 overflow-y-auto leading-relaxed border border-white/40 font-mono">
                {component.aiPrompt}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {['react', 'tailwind', 'html', 'css'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#E0E5EC] text-[#6C63FF] shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)]'
                      : 'text-[#6B7280]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopyActiveCode}
              className="bg-[#E0E5EC] text-[#3D4852] px-3 py-1.5 rounded-xl text-xs font-bold shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] cursor-pointer flex items-center gap-1"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Code className="w-3.5 h-3.5 text-[#6C63FF]" />}
              {copiedCode ? 'Copied' : `Copy ${activeTab.toUpperCase()}`}
            </button>
          </div>

          <pre className="bg-[#3D4852] text-white p-4 rounded-xl text-xs font-mono max-h-60 overflow-auto whitespace-pre-wrap">
            <code>{getActiveCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailModal;

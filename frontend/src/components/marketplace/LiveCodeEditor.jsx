import { useState } from 'react';
import { Code2, Copy, Check, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { attachAttributionToCode } from '../../utils/codeAttribution';
import { formatHtml, formatCss } from '../../utils/codeFormatter';

const LiveCodeEditor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, creatorName = 'Founder', componentId = '' }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const handleFormat = (e) => {
    e.stopPropagation();
    if (activeTab === 'html') {
      if (!htmlCode) return;
      setHtmlCode(formatHtml(htmlCode));
      toast.success('HTML code formatted cleanly!');
    } else {
      if (!cssCode) return;
      setCssCode(formatCss(cssCode));
      toast.success('CSS code formatted cleanly!');
    }
  };

  const handleCopyHtml = (e) => {
    e.stopPropagation();
    const formatted = attachAttributionToCode(htmlCode || '', creatorName, 'html', componentId);
    navigator.clipboard.writeText(formatted);
    setCopiedHtml(true);
    toast.success('HTML code snippet copied!');
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyCss = (e) => {
    e.stopPropagation();
    const formatted = attachAttributionToCode(cssCode || '', creatorName, 'css', componentId);
    navigator.clipboard.writeText(formatted);
    setCopiedCss(true);
    toast.success('CSS code snippet copied!');
    setTimeout(() => setCopiedCss(false), 2000);
  };

  return (
    <div className="bg-[#E0E5EC] rounded-2xl p-3 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] flex flex-col h-full min-h-0 overflow-hidden">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase">
          <Code2 className="w-4 h-4" /> Live Code Sandbox Editor
        </div>

        <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
          {['html', 'css'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                  : 'text-[#6B7280]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            onClick={handleFormat}
            className="p-1.5 rounded-lg bg-[#E0E5EC]/90 text-[#3D4852] hover:text-blue-600 shadow-[2px_2px_4px_rgba(163,177,198,0.6),-2px_-2px_4px_rgba(255,255,255,0.5)] active:scale-90 transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer border border-white/30"
            title={`Format ${activeTab.toUpperCase()} Code`}
          >
            <Wand2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Format</span>
          </button>

          <button
            onClick={activeTab === 'html' ? handleCopyHtml : handleCopyCss}
            className="p-1.5 rounded-lg bg-[#E0E5EC]/90 text-[#3D4852] hover:text-blue-600 shadow-[2px_2px_4px_rgba(163,177,198,0.6),-2px_-2px_4px_rgba(255,255,255,0.5)] active:scale-90 transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer border border-white/30"
            title={`Copy ${activeTab.toUpperCase()} Code`}
          >
            {(activeTab === 'html' ? copiedHtml : copiedCss) ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span>{(activeTab === 'html' ? copiedHtml : copiedCss) ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {activeTab === 'html' ? (
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            placeholder="Paste or edit HTML..."
            className="w-full flex-1 min-h-0 p-3 pt-9 bg-white/40 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] focus:outline-none resize-none border border-white/40"
          />
        ) : (
          <textarea
            value={cssCode}
            onChange={(e) => setCssCode(e.target.value)}
            placeholder="Paste or edit CSS..."
            className="w-full flex-1 min-h-0 p-3 pt-9 bg-white/40 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] focus:outline-none resize-none border border-white/40"
          />
        )}
      </div>
    </div>
  );
};

export default LiveCodeEditor;

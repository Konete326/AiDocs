import { useState } from 'react';
import { Code2 } from 'lucide-react';

const LiveCodeEditor = ({ htmlCode, setHtmlCode, cssCode, setCssCode }) => {
  const [activeTab, setActiveTab] = useState('html');

  return (
    <div className="bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] flex flex-col h-full min-h-[360px]">
      <div className="flex items-center justify-between mb-3">
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

      {activeTab === 'html' ? (
        <textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          placeholder="Paste or edit HTML..."
          className="w-full flex-1 p-3 bg-white/40 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] focus:outline-none resize-none border border-white/40 min-h-[280px]"
        />
      ) : (
        <textarea
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          placeholder="Paste or edit CSS..."
          className="w-full flex-1 p-3 bg-white/40 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] focus:outline-none resize-none border border-white/40 min-h-[280px]"
        />
      )}
    </div>
  );
};

export default LiveCodeEditor;

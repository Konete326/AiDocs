import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const agents = [
  { id: 'claude', name: 'Claude Code', prefix: 'SYSTEM DIRECTIVE (Claude 3.7 Sonnet / Claude Code):\nRecreate the following Neumorphic UI component with 100% production-ready React JSX and clean CSS styling:\n\n' },
  { id: 'cursor', name: 'Cursor', prefix: 'SYSTEM DIRECTIVE (Cursor Composer):\nUse strict Neumorphic Soft UI rules (#E0E5EC base, dual physics soft shadows) to construct this component:\n\n' },
  { id: 'antigravity', name: 'Antigravity', prefix: 'SYSTEM DIRECTIVE (Google Deepmind Antigravity Agent):\nFollow strict modular architecture (<120 lines per component, zero comments) to implement this UI element:\n\n' }
];

const PromptCustomizer = ({ rawPrompt }) => {
  const [selectedAgent, setSelectedAgent] = useState('claude');
  const [copied, setCopied] = useState(false);

  const getFormattedPrompt = () => {
    const agent = agents.find((a) => a.id === selectedAgent);
    return `${agent?.prefix || ''}${rawPrompt}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedPrompt());
    setCopied(true);
    toast.success(`Prompt formatted for ${agents.find((a) => a.id === selectedAgent)?.name} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase">
          <Sparkles className="w-4 h-4" /> Target Coding Agent
        </div>

        <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
          {agents.map((agent) => {
            const isActive = selectedAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                    : 'text-[#6B7280] hover:text-[#3D4852]'
                }`}
              >
                {agent.name}
              </button>
            );
          })}
        </div>
      </div>

      <pre className="text-xs text-[#3D4852] bg-white/40 p-3.5 rounded-xl max-h-44 overflow-y-auto font-mono border border-white/40 leading-relaxed whitespace-pre-wrap mb-3">
        {getFormattedPrompt()}
      </pre>

      <button
        onClick={handleCopy}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied to Clipboard!' : `Copy Prompt for ${agents.find((a) => a.id === selectedAgent)?.name}`}
      </button>
    </div>
  );
};

export default PromptCustomizer;

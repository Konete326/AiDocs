import { useState } from 'react';
import { X, Copy, Check, Sparkles, Bot, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { buildAgentPromptContext } from '../../utils/agentPromptBuilder';
import { attachAttributionToCode } from '../../utils/codeAttribution';

const PromptModal = ({ rawPrompt, component, onClose }) => {
  const [selectedTarget, setSelectedTarget] = useState('antigravity');
  const [copiedTarget, setCopiedTarget] = useState(null);

  const getPromptForTarget = (target) => {
    const basePrompt = component?.aiPrompt || rawPrompt || '';
    const html = component?.code?.html || component?.code?.tailwind || '';
    const css = component?.code?.css || '';
    const title = component?.title || 'UI Component';
    const category = component?.category || 'UI';
    const creatorName = component?.creator?.displayName || component?.creator?.username || 'Founder';

    const htmlWithComment = attachAttributionToCode(html, creatorName, 'html');
    const cssWithComment = css ? attachAttributionToCode(css, creatorName, 'css') : '';

    const fullCodeBlock = `\n\n### Exact Source Code References (Mandatory 1-to-1 Reproduction):\n\n#### HTML / Tailwind Markup:\n\`\`\`html\n${htmlWithComment}\n\`\`\`\n\n${cssWithComment ? `#### Custom CSS Styles:\n\`\`\`css\n${cssWithComment}\n\`\`\`\n` : ''}`;

    if (target === 'raw') {
      return `${basePrompt}${fullCodeBlock}`;
    }

    if (target === 'antigravity') {
      return `<!-- ANTIGRAVITY AI AGENT SPECIFICATION -->\n# Target Component: "${title}" (${category})\n\n## Design Intent & Prompt:\n${basePrompt}\n${fullCodeBlock}\n\n## Agent Instruction:\nImplement this exact UI component in the workspace preserving all HTML elements, Tailwind classes, and custom CSS rules with 100% visual fidelity.`;
    }

    if (target === 'cursor_claude') {
      return `<!-- CURSOR & CLAUDE AI AGENT SPECIFICATION -->\n# Task: Implement "${title}" (${category})\n\n## Specification:\n${basePrompt}\n${fullCodeBlock}\n\n## Grounding Instructions:\nGenerate the complete component code matching this exact HTML markup and CSS styling.`;
    }

    if (target === 'chatgpt') {
      return `Please implement this exact UI Component in my project:\n\nSpecification:\n${basePrompt}\n${fullCodeBlock}\n\nProvide the complete, self-contained component code with these exact HTML and CSS styles.`;
    }

    return `${basePrompt}${fullCodeBlock}`;
  };

  const handleCopy = (target) => {
    const textToCopy = getPromptForTarget(target);
    navigator.clipboard.writeText(textToCopy);
    setCopiedTarget(target);
    const labelMap = {
      antigravity: 'Antigravity AI',
      cursor_claude: 'Cursor / Claude AI',
      chatgpt: 'ChatGPT / Custom LLM',
      raw: 'Raw Specification'
    };
    toast.success(`Copied prompt for ${labelMap[target] || 'AI Agent'}!`);
    setTimeout(() => setCopiedTarget(null), 2000);
  };

  const currentText = getPromptForTarget(selectedTarget);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-xl p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] relative border border-white/40">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#E0E5EC] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:text-red-500 cursor-pointer"
        >
          <X className="w-4 h-4 text-[#3D4852]" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-[#3D4852]">Select Target AI Agent</h2>
        </div>
        <p className="text-xs text-[#6B7280] mb-4">Choose which AI agent format you want to copy for instant code generation.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { id: 'antigravity', label: 'Antigravity', icon: Zap, color: 'text-blue-600' },
            { id: 'cursor_claude', label: 'Cursor / Claude', icon: Bot, color: 'text-purple-600' },
            { id: 'chatgpt', label: 'ChatGPT', icon: Sparkles, color: 'text-amber-500' },
            { id: 'raw', label: 'All / Raw', icon: Copy, color: 'text-emerald-600' }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTarget === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTarget(t.id)}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#E0E5EC] text-blue-600 border-blue-400 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]'
                    : 'bg-[#E0E5EC] text-[#3D4852] border-[#A3B1C6]/20 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)]'
                }`}
              >
                <Icon className={`w-4 h-4 ${t.color}`} />
                <span className="text-[11px] truncate">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <textarea
            rows={6}
            readOnly
            value={currentText}
            className="w-full p-3 bg-white/50 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] border border-white/40 resize-none focus:outline-none leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCopy(selectedTarget)}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedTarget === selectedTarget ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedTarget === selectedTarget ? 'Prompt Copied!' : 'Copy Formatted Prompt'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#E0E5EC] text-[#6B7280] hover:text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;

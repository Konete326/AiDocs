import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Copy, HelpCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo.png';

export default function ClarifyationSetupGuidePage() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reactRootCode = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { Clarifyation } from 'clarifyation';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {import.meta.env.DEV && (
      <Clarifyation 
        endpoint={import.meta.env.VITE_CLARIFYAI_ENDPOINT || "http://localhost:5000/api/mcp"}
        projectId="your-project-id"
      />
    )}
  </React.StrictMode>
);`;

  const envCode = `VITE_CLARIFYAI_ENDPOINT=http://localhost:5000/api/mcp
VITE_CLARIFYAI_PROJECT_ID=your-project-id`;

  const agentCommand = `npx add-mcp "npx -y clarifyai-mcp server"`;

  const steps = [
    {
      num: 1,
      color: '#2563EB',
      title: 'Add Clarifyation Component to React Root',
      copyId: 'react',
      content: reactRootCode,
      type: 'pre',
    },
    {
      num: 2,
      color: '#38B2AC',
      title: 'Configure Environment Variables (.env)',
      copyId: 'env',
      content: envCode,
      type: 'pre',
    },
    {
      num: 3,
      color: '#2563EB',
      title: 'Connect Coding Agent Server via MCP',
      copyId: 'mcp',
      content: agentCommand,
      type: 'inline',
      note: 'Automatically links Antigravity, Claude Code, or Cursor to listen to feedback annotations.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] pt-20 pb-8 px-4 md:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4">

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => navigate('/settings')}
            className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 text-xs text-[#3D4852] font-bold cursor-pointer hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Settings</span>
          </button>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-600/10 px-3 py-1.5 rounded-full border border-blue-600/20">
            Clarifyation SDK v1.4.2
          </span>
        </div>

        <div className="neumorphic-card rounded-3xl p-5 flex items-center gap-4">
          <img src={logo} alt="ClarifyAI" className="w-12 h-12 rounded-2xl object-cover shadow-lg flex-shrink-0" />
          <div>
            <h1 className="text-xl font-extrabold text-[#3D4852] tracking-tight leading-tight">Clarifyation Visual SDK Setup Guide</h1>
            <p className="text-[#6B7280] text-xs font-medium mt-0.5">
              Integrate visual feedback annotations, element pin inspections, and auto-routed AI agent fixes into any React app.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'Visual Pinning', desc: 'Click any DOM element to attach numbered feedback pins with component stack tracing.', color: '#2563EB' },
            { label: 'AI Co-Founder Sync', desc: 'Feedback is parsed into Kanban tasks for your AI Co-founder agent automatically.', color: '#38B2AC' },
            { label: 'Dev-Only Guard', desc: 'Zero feedback overlay or overhead in production — strictly enforced via env check.', color: '#2563EB' },
          ].map(({ label, desc, color }) => (
            <div key={label} className="neumorphic-card rounded-2xl p-4 space-y-1">
              <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: color }} />
              <p className="text-sm font-bold text-[#3D4852]">{label}</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs font-extrabold text-[#3D4852] px-1">Step-by-Step Installation</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map(({ num, color, title, copyId, content, type, note }) => (
            <div key={num} className="neumorphic-card rounded-2xl p-4 space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: color }}>{num}</span>
                  <span className="text-xs font-bold text-[#3D4852] leading-tight">{title}</span>
                </div>
                <button
                  onClick={() => copy(content, copyId)}
                  className="flex items-center gap-1 text-[10px] font-bold font-mono cursor-pointer flex-shrink-0 ml-2"
                  style={{ color }}
                >
                  {copiedId === copyId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === copyId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              {type === 'pre' ? (
                <pre className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852] overflow-x-auto bg-[#E0E5EC] leading-relaxed flex-1">
                  {content}
                </pre>
              ) : (
                <div className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852] break-all">{content}</div>
              )}
              {note && <p className="text-[10px] text-[#6B7280] font-medium leading-relaxed">{note}</p>}
            </div>
          ))}
        </div>

        <div className="neumorphic-card rounded-2xl p-4 space-y-2">
          <p className="text-xs font-bold text-[#3D4852] flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> FAQs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#6B7280]">
            <div>
              <p className="font-semibold text-[#3D4852]">Why is the feedback button not appearing?</p>
              <p className="mt-0.5">Make sure <code className="font-mono bg-[#E0E5EC] px-1 py-0.5 rounded neumorphic-inset text-[#3D4852]">import.meta.env.DEV</code> is true and your dev server is running.</p>
            </div>
            <div>
              <p className="font-semibold text-[#3D4852]">Can I use this in production?</p>
              <p className="mt-0.5">No. Clarifyation is dev/staging only — zero overhead in production builds by design.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

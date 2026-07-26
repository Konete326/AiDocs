import { useState } from 'react';
import { X, Copy, Check, Terminal, Code2, Server, Webhook, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CustomAgentationSetupModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState('install');
  const [copiedKey, setCopiedKey] = useState('');
  const [customEndpoint, setCustomEndpoint] = useState('http://localhost:4747');
  const [customWebhookUrl, setCustomWebhookUrl] = useState('');

  if (!isOpen) return null;

  const copyCode = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success('Code snippet copied to clipboard!');
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const SNIPPET_INSTALL = `npm install agentation -D`;

  const SNIPPET_REACT_ROOT = `import { Agentation } from "agentation";

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === "development" && (
        <Agentation 
          endpoint="${customEndpoint}"
          ${customWebhookUrl ? `webhookUrl="${customWebhookUrl}"` : ''}
          onAnnotationAdd={(ann) => console.log("New Annotation:", ann)}
        />
      )}
    </>
  );
}`;

  const SNIPPET_MCP_SERVER = `npx add-mcp "npx -y agentation-mcp server"`;

  const SNIPPET_CLAUDE_SKILL = `npx skills add benjitaylor/agentation`;

  const SNIPPET_DOCTOR = `npx agentation-mcp doctor`;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="w-full max-w-3xl neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 px-7 border-b border-black/5 bg-[#E0E5EC]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#3D4852] flex items-center gap-2">
                <span>Agentation & MCP Integration Setup</span>
                <span className="text-[10px] bg-[#6C63FF] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">v2.0 / AFS v1.1</span>
              </h3>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                Setup guide for custom external React / Vite / Next.js projects not built inside ClarifyAI.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex border-b border-black/5 bg-[#E0E5EC] px-6 gap-2 pt-3">
          {[
            { id: 'install', label: '1. Package', icon: Terminal },
            { id: 'react', label: '2. React Integration', icon: Code2 },
            { id: 'mcp', label: '3. MCP Agent Server', icon: Server },
            { id: 'webhook', label: '4. Webhooks & API', icon: Webhook },
            { id: 'doctor', label: '5. Verify Setup', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStep(tab.id)}
                className={`px-4 py-2 rounded-t-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${isActive ? 'bg-[#6C63FF] text-white shadow-md' : 'text-[#6B7280] hover:text-[#3D4852]'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-4 font-mono">
          {activeStep === 'install' && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#3D4852]">Step 1: Install Agentation Package</h4>
              <p className="text-xs font-sans text-[#6B7280]">
                Install Agentation as a dev dependency in your React / Next.js / Vite project codebase.
              </p>

              <div className="neumorphic-inset rounded-2xl p-4 bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono">
                <code>{SNIPPET_INSTALL}</code>
                <button onClick={() => copyCode('install', SNIPPET_INSTALL)} className="text-slate-400 hover:text-white cursor-pointer">
                  {copiedKey === 'install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-2 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-sans text-[#3D4852] flex flex-col gap-1">
                <span className="font-bold text-[#6C63FF] flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Claude Code One-Line Setup
                </span>
                <p className="text-[11px] text-[#6B7280]">
                  If using Claude Code, install the official skill to auto-detect framework and inject code:
                </p>
                <div className="neumorphic-inset p-2 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] flex justify-between items-center mt-1">
                  <code>{SNIPPET_CLAUDE_SKILL}</code>
                  <button onClick={() => copyCode('skill', SNIPPET_CLAUDE_SKILL)} className="text-slate-400 hover:text-white cursor-pointer">
                    {copiedKey === 'skill' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeStep === 'react' && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#3D4852]">Step 2: Add Component to React Root Layout</h4>
              <p className="text-xs font-sans text-[#6B7280]">
                Add the <code>&lt;Agentation /&gt;</code> component to your app entry point (e.g. <code>App.jsx</code> or <code>layout.tsx</code>).
              </p>

              <div className="flex items-center gap-3 font-sans text-xs">
                <label className="font-bold text-[#6B7280]">MCP Endpoint:</label>
                <input
                  type="text"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  className="neumorphic-inset rounded-xl px-3 py-1 text-xs text-[#3D4852] font-mono outline-none w-64"
                />
              </div>

              <div className="neumorphic-inset rounded-2xl p-4 bg-slate-900 text-emerald-300 text-xs font-mono relative">
                <button onClick={() => copyCode('react', SNIPPET_REACT_ROOT)} className="absolute top-3 right-3 text-slate-400 hover:text-white cursor-pointer">
                  {copiedKey === 'react' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="whitespace-pre-wrap">{SNIPPET_REACT_ROOT}</pre>
              </div>
            </div>
          )}

          {activeStep === 'mcp' && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#3D4852]">Step 3: Connect MCP Server for Real-Time AI Agent Sync</h4>
              <p className="text-xs font-sans text-[#6B7280]">
                Auto-configure MCP for Cursor, Claude Code, Windsurf, Codex, and 9+ AI coding agents.
              </p>

              <div className="neumorphic-inset rounded-2xl p-4 bg-slate-900 text-amber-300 text-xs font-mono flex items-center justify-between">
                <code>{SNIPPET_MCP_SERVER}</code>
                <button onClick={() => copyCode('mcp', SNIPPET_MCP_SERVER)} className="text-slate-400 hover:text-white cursor-pointer">
                  {copiedKey === 'mcp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs font-sans text-[#6B7280] flex flex-col gap-1.5 mt-2">
                <span className="font-bold text-[#3D4852]">Exposed MCP Tools Available to AI Agents:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white/60 rounded-xl font-mono"><code>agentation_get_all_pending</code></div>
                  <div className="p-2 bg-white/60 rounded-xl font-mono"><code>agentation_acknowledge</code></div>
                  <div className="p-2 bg-white/60 rounded-xl font-mono"><code>agentation_resolve</code></div>
                  <div className="p-2 bg-white/60 rounded-xl font-mono"><code>agentation_reply</code></div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 'webhook' && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#3D4852]">Step 4: Configure Webhook Endpoint (Optional)</h4>
              <p className="text-xs font-sans text-[#6B7280]">
                Send real-time POST events (`annotation.add`, `submit`, `annotation.update`) to Slack, Discord, or custom backend services.
              </p>

              <div className="flex flex-col gap-1.5 font-sans text-xs">
                <label className="font-bold text-[#6B7280]">Your Webhook URL:</label>
                <input
                  type="text"
                  value={customWebhookUrl}
                  onChange={(e) => setCustomWebhookUrl(e.target.value)}
                  placeholder="https://your-server.com/webhook/agentation"
                  className="neumorphic-inset rounded-2xl px-4 py-2.5 text-xs text-[#3D4852] font-mono outline-none w-full"
                />
              </div>

              <div className="neumorphic-inset rounded-2xl p-4 bg-slate-900 text-cyan-300 text-[11px] font-mono">
                <pre>{`// Webhook Payload Structure
{
  "event": "annotation.add",
  "timestamp": ${Date.now()},
  "url": "http://localhost:3000/dashboard",
  "annotation": {
    "id": "ann_k8x2m",
    "comment": "Fix alignment",
    "elementPath": "button.submit-btn"
  }
}`}</pre>
              </div>
            </div>
          )}

          {activeStep === 'doctor' && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#3D4852]">Step 5: Verify Setup with Doctor Check</h4>
              <p className="text-xs font-sans text-[#6B7280]">
                Run the verification doctor command in your terminal to check Node.js version, agent MCP config, and port 4747 connectivity.
              </p>

              <div className="neumorphic-inset rounded-2xl p-4 bg-slate-900 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <code>{SNIPPET_DOCTOR}</code>
                <button onClick={() => copyCode('doctor', SNIPPET_DOCTOR)} className="text-slate-400 hover:text-white cursor-pointer">
                  {copiedKey === 'doctor' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs font-sans text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Once doctor check passes, your AI agent will automatically detect and resolve visual screen annotations in real time!</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 px-6 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
          <a
            href="https://agentation.dev"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#6C63FF] hover:underline font-bold flex items-center gap-1 font-sans"
          >
            <span>Agentation Docs & Specs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer font-sans"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAgentationSetupModal;

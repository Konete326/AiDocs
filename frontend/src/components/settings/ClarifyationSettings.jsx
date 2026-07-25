import { useState } from 'react';
import { Sparkles, Copy, Check, Terminal, Code, Cpu, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ClarifyationSettings() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copySnippet = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const reactSnippet = `import { Clarifyation } from "clarifyation";

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === "development" && <Clarifyation endpoint="http://localhost:5000/api/mcp" />}
    </>
  );
}`;

  const mcpCommand = `npx add-mcp "npx -y clarifyai-mcp server"`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 text-[#3D4852]">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#6C63FF] text-white flex items-center justify-center text-sm font-extrabold shadow-md">
            ⚡
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#3D4852]">Clarifyation Visual SDK & MCP</h3>
        </div>
        <p className="text-[#6B7280] text-sm font-medium">
          In-app visual feedback engine for React. Annotate elements on screen, drop comments, and auto-route structured fix instructions to the AI Co-founder & Antigravity agents.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-[#3D4852] grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neumorphic-inset rounded-2xl p-4 flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#6C63FF] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Visual Pin Annotations
          </span>
          <p className="text-[11px] text-[#6B7280] font-medium">Click and inspect any DOM element on screen to drop numbered comment pins.</p>
        </div>

        <div className="neumorphic-inset rounded-2xl p-4 flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#38B2AC] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" /> AI Co-founder Auto-Route
          </span>
          <p className="text-[11px] text-[#6B7280] font-medium">Feedback is synthesized by AI Co-founder into structured prompt tasks for agents.</p>
        </div>

        <div className="neumorphic-inset rounded-2xl p-4 flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#6C63FF] flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> Real-time MCP Sync
          </span>
          <p className="text-[11px] text-[#6B7280] font-medium">Connects with Antigravity and Claude Code for zero-reload task updates.</p>
        </div>
      </div>

      {/* Setup Guide Step 1 */}
      <div className="neumorphic-card rounded-3xl p-6 bg-[#E0E5EC] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-extrabold text-[#3D4852] flex items-center gap-2">
            <Code className="w-4 h-4 text-[#6C63FF]" /> Step 1: Add Component to React Root App
          </span>
          <button
            onClick={() => copySnippet(reactSnippet, 'react')}
            className="text-[#6C63FF] hover:text-[#8B84FF] text-xs font-bold font-mono flex items-center gap-1 cursor-pointer"
          >
            {copiedCode === 'react' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode === 'react' ? 'Copied' : 'Copy Snippet'}</span>
          </button>
        </div>
        <pre className="neumorphic-inset rounded-2xl p-4 font-mono text-xs text-[#3D4852] overflow-x-auto bg-[#E0E5EC]">
          {reactSnippet}
        </pre>
      </div>

      {/* Setup Guide Step 2 */}
      <div className="neumorphic-card rounded-3xl p-6 bg-[#E0E5EC] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-extrabold text-[#3D4852] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#38B2AC]" /> Step 2: Register MCP Agent Server
          </span>
          <button
            onClick={() => copySnippet(mcpCommand, 'mcp')}
            className="text-[#38B2AC] hover:text-[#4FD1C5] text-xs font-bold font-mono flex items-center gap-1 cursor-pointer"
          >
            {copiedCode === 'mcp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode === 'mcp' ? 'Copied' : 'Copy Command'}</span>
          </button>
        </div>
        <div className="neumorphic-inset rounded-2xl p-4 font-mono text-xs text-[#3D4852] flex items-center justify-between">
          <span>{mcpCommand}</span>
        </div>
        <p className="text-xs text-[#6B7280] font-medium">
          Automatically configures installed coding agents (Antigravity, Claude Code, Cursor) to listen to Clarifyation visual annotations.
        </p>
      </div>
    </div>
  );
}

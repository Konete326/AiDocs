import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Copy, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo.png';

export default function McpSetupGuidePage() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const claudeDesktopConfig = `{
  "mcpServers": {
    "clarifyai": {
      "command": "npx",
      "args": ["-y", "clarifyai-mcp", "server"],
      "env": {
        "CLARIFYAI_API_KEY": "YOUR_MCP_API_KEY",
        "CLARIFYAI_ENDPOINT": "http://localhost:5000/api/mcp"
      }
    }
  }
}`;

  const antigravityConfig = `{
  "servers": {
    "clarifyai": {
      "url": "http://localhost:5000/api/mcp/sse",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_API_KEY"
      }
    }
  }
}`;

  const cliCmd = `npx add-mcp "npx -y clarifyai-mcp server" --env CLARIFYAI_API_KEY="YOUR_MCP_API_KEY"`;

  const mcpTools = [
    { name: 'clarifyai_ask_cofounder', desc: 'Ask AI Co-founder questions grounded in project PRD/TRD docs.' },
    { name: 'clarifyai_get_next_step', desc: 'Fetch the next prioritized Kanban card assigned to AI agents.' },
    { name: 'clarifyai_report_agent_activity', desc: 'Report live dev server URL to trigger ClarifyAI Live Sandbox modal.' },
    { name: 'clarifyai_get_kanban_tasks', desc: 'Retrieve current Kanban board columns and task state.' },
    { name: 'clarifyai_complete_kanban_task', desc: 'Mark a Kanban task completed after build & verification checks.' },
    { name: 'clarifyai_get_project_context', desc: 'Fetch full project context, documents, and architecture specs.' },
  ];

  const configs = [
    { id: 'cli', label: 'CLI — One-line Registration', color: '#2563EB', content: cliCmd, type: 'inline' },
    { id: 'claude', label: 'Claude Desktop Config', color: '#38B2AC', content: claudeDesktopConfig, type: 'pre' },
    { id: 'antigravity', label: 'Antigravity / Cursor SSE', color: '#2563EB', content: antigravityConfig, type: 'pre' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] pt-20 pb-8 px-4 md:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4">

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/settings')}
            className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 text-xs text-[#3D4852] font-bold cursor-pointer hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Settings</span>
          </button>
          <span className="text-xs font-mono font-bold text-[#38B2AC] bg-[#38B2AC]/10 px-3 py-1.5 rounded-full border border-[#38B2AC]/20">
            MCP Protocol v1.0
          </span>
        </div>

        <div className="neumorphic-card rounded-3xl p-5 flex items-center gap-4">
          <img src={logo} alt="ClarifyAI Logo" className="h-12 w-auto object-contain neumorphic-card p-1 rounded-2xl flex-shrink-0" />
          <div>
            <h1 className="text-xl font-extrabold text-[#3D4852] tracking-tight leading-tight">Model Context Protocol (MCP) Setup Guide</h1>
            <p className="text-[#6B7280] text-xs font-medium mt-0.5">
              Connect Antigravity, Claude Code, or Cursor to your ClarifyAI workspace for continuous autonomous execution loops.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'Step 1 — Generate API Key', desc: 'Go to Settings → MCP Integration and click Generate Key to get your workspace key and endpoint URL.', color: '#2563EB' },
            { label: 'Step 2 — Register Agent', desc: 'Use the CLI command or paste the config JSON into your coding agent settings file.', color: '#38B2AC' },
            { label: 'Step 3 — Verify Connection', desc: 'Once connected, the MCP Settings header shows "Agent Connected" with a live pulse indicator.', color: '#2563EB' },
          ].map(({ label, desc, color }) => (
            <div key={label} className="neumorphic-card rounded-2xl p-4 space-y-1">
              <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: color }} />
              <p className="text-xs font-bold text-[#3D4852]">{label}</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs font-extrabold text-[#3D4852] px-1">Configuration Options</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {configs.map(({ id, label, color, content, type }) => (
            <div key={id} className="neumorphic-card rounded-2xl p-4 space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3D4852] leading-tight">{label}</span>
                <button
                  onClick={() => copy(content, id)}
                  className="flex items-center gap-1 text-[10px] font-bold font-mono cursor-pointer flex-shrink-0 ml-2"
                  style={{ color }}
                >
                  {copiedId === id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              {type === 'pre' ? (
                <pre className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852] overflow-x-auto bg-[#E0E5EC] leading-relaxed flex-1">
                  {content}
                </pre>
              ) : (
                <div className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852] break-all">{content}</div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs font-extrabold text-[#3D4852] px-1">Available MCP Tools</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mcpTools.map(({ name, desc }) => (
            <div key={name} className="neumorphic-card rounded-2xl p-4 space-y-1.5">
              <span className="inline-block text-[10px] font-mono font-bold text-blue-600 bg-blue-600/10 px-2 py-1 rounded-lg border border-blue-600/15">
                {name}
              </span>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="neumorphic-card rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#38B2AC] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-[#3D4852]">Security & Authorization</p>
            <p className="text-xs text-[#6B7280] font-medium mt-0.5 leading-relaxed">
              All MCP calls are authenticated via Bearer Token. Keys can be regenerated or revoked anytime from Settings without downtime.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

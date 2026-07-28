import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Terminal, Code, HelpCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo.png';

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3 text-[#3D4852]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ClarifyAI" className="w-8 h-8 rounded-xl object-cover shadow-md flex-shrink-0" />
          <div>
            <h3 className="text-base font-bold tracking-tight text-[#3D4852]">Clarifyation Visual SDK & MCP</h3>
            <p className="text-[#6B7280] text-xs font-medium">
              In-app visual feedback engine for React. Annotate elements, drop comments, auto-route fix instructions to the AI Co-founder.
            </p>
          </div>
        </div>
        <Link
          to="/docs/clarifyation-setup"
          className="neumorphic-btn rounded-2xl px-3.5 py-1.5 flex items-center gap-2 text-xs text-[#2563EB] font-bold cursor-pointer hover:bg-[#2563EB] hover:text-white transition-all shadow-sm flex-shrink-0 ml-4"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Setup Guide</span>
        </Link>
      </div>

      {/* Setup Guide Step 1 */}
      <div className="neumorphic-card rounded-2xl p-3 bg-[#E0E5EC] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-[#2563EB]" /> Step 1: Add Component to React Root App
          </span>
          <button
            onClick={() => copySnippet(reactSnippet, 'react')}
            className="text-[#2563EB] hover:text-[#60a5fa] text-[10px] font-bold font-mono flex items-center gap-1 cursor-pointer"
          >
            {copiedCode === 'react' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCode === 'react' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852] overflow-x-auto bg-[#E0E5EC] leading-relaxed">
          {reactSnippet}
        </pre>
      </div>

      {/* Setup Guide Step 2 */}
      <div className="neumorphic-card rounded-2xl p-3 bg-[#E0E5EC] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#38B2AC]" /> Step 2: Register MCP Agent Server
          </span>
          <button
            onClick={() => copySnippet(mcpCommand, 'mcp')}
            className="text-[#38B2AC] hover:text-[#4FD1C5] text-[10px] font-bold font-mono flex items-center gap-1 cursor-pointer"
          >
            {copiedCode === 'mcp' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCode === 'mcp' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className="neumorphic-inset rounded-xl p-3 font-mono text-[10px] text-[#3D4852]">
          {mcpCommand}
        </div>
        <p className="text-[10px] text-[#6B7280] font-medium">
          Automatically configures Antigravity, Claude Code, and Cursor to listen to Clarifyation visual annotations.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const McpConfigCard = ({ endpointUrl, apiKey }) => {
  const [selectedClient, setSelectedClient] = useState('antigravity');
  const [copied, setCopied] = useState(false);

  const configs = {
    antigravity: {
      label: 'Antigravity / Node CLI',
      json: JSON.stringify({
        mcpServers: {
          clarifyai: {
            command: 'node',
            args: ['d:/mern projects/Clarifyai/cli/bin/clarifyai-mcp.js', '--key', apiKey]
          }
        }
      }, null, 2)
    },
    remote: {
      label: 'Vercel HTTP SSE',
      json: JSON.stringify({
        mcpServers: {
          clarifyai: {
            url: endpointUrl
          }
        }
      }, null, 2)
    },
    cursor: {
      label: 'Cursor / Windsurf',
      json: JSON.stringify({ name: 'clarifyai', type: 'sse', url: endpointUrl }, null, 2)
    }
  };

  const current = configs[selectedClient];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.json);
    setCopied(true);
    toast.success('Copied config');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium text-white/60">Setup Snippets</span>
        <div className="flex flex-wrap gap-1 bg-white/10 p-1 rounded-xl border border-white/15">
          {Object.keys(configs).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedClient(key)}
              className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                selectedClient === key ? 'bg-white text-black font-semibold shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              {configs[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre className="bg-white/95 text-slate-900 text-xs font-mono p-4 rounded-xl overflow-x-auto border border-white/20 shadow-md">
          {current.json}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-slate-700 hover:text-slate-900 bg-black/5 hover:bg-black/10 border border-black/10 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default McpConfigCard;

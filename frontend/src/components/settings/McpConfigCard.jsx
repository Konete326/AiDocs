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
    <div className="liquid-glass rounded-3xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-[#3D4852]">Setup Snippets</span>
        <div className="flex flex-wrap gap-1 p-1">
          {Object.keys(configs).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedClient(key)}
              className={`px-3 py-1.5 text-xs rounded-2xl transition-all cursor-pointer font-bold ${
                selectedClient === key ? 'bg-[#6C63FF] text-white shadow-md' : 'neumorphic-btn text-[#3D4852]'
              }`}
            >
              {configs[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre className="bg-[#E0E5EC] text-[#3D4852] text-xs font-mono p-4 rounded-2xl overflow-x-auto font-bold neumorphic-inset">
          {current.json}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-xl neumorphic-btn text-[#3D4852] cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#3D4852]" />}
        </button>
      </div>
    </div>
  );
};

export default McpConfigCard;

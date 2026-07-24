import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const McpConfigCard = ({ endpointUrl, apiKey }) => {
  const [selectedClient, setSelectedClient] = useState('cli');
  const [copied, setCopied] = useState(false);

  const configs = {
    cli: { label: 'NPX CLI', json: `npx clarifyai-mcp --key ${apiKey}` },
    antigravity: {
      label: 'Antigravity',
      json: JSON.stringify({ mcpServers: { clarifyai: { command: 'npx', args: ['clarifyai-mcp', '--key', apiKey] } } }, null, 2)
    },
    claude: {
      label: 'Claude Code',
      json: JSON.stringify({ mcpServers: { clarifyai: { command: 'npx', args: ['clarifyai-mcp', '--key', apiKey] } } }, null, 2)
    },
    cursor: {
      label: 'Cursor',
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
        <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
          {Object.keys(configs).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedClient(key)}
              className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                selectedClient === key ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {configs[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <pre className="bg-black/50 text-white/80 text-xs font-mono p-4 rounded-xl overflow-x-auto border border-white/10">
          {current.json}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

export default McpConfigCard;

import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Copy, Check, Trash2, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getMcpConfig, regenerateMcpKey, deleteMcpKey } from '../../services/mcpService';
import McpConfigCard from './McpConfigCard';
import McpDeleteModal from './McpDeleteModal';

const McpSettings = () => {
  const [config, setConfig] = useState({ apiKey: '', mcpEndpoint: '' });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => { fetchConfig(); }, []);

  const fetchConfig = async () => {
    try { setLoading(true); const res = await getMcpConfig(); if (res.success) setConfig(res); }
    catch { toast.error('Failed to load MCP settings'); }
    finally { setLoading(false); }
  };

  const handleGenerate = async () => {
    try { setBusy(true); const res = await regenerateMcpKey(); if (res.success) { setConfig(res); toast.success('MCP Key updated'); } }
    catch { toast.error('Failed to generate key'); }
    finally { setBusy(false); }
  };

  const handleDelete = async () => {
    try { setBusy(true); const res = await deleteMcpKey(); if (res.success) { setConfig({ apiKey: '', mcpEndpoint: '' }); toast.success('MCP Key deleted'); setIsDeleteOpen(false); } }
    catch { toast.error('Failed to delete key'); }
    finally { setBusy(false); }
  };

  const copyUrl = () => { navigator.clipboard.writeText(config.mcpEndpoint); setCopied(true); toast.success('URL copied'); setTimeout(() => setCopied(false), 2000); };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-white/80" /> MCP Settings
        </h3>
        <p className="text-white/40 text-xs mt-1">Connect external AI tools directly to your workspace.</p>
      </div>

      {!config.apiKey ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 mx-auto">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">No active MCP API Key</h4>
            <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">Generate a key to connect Claude Code, Antigravity, or Cursor.</p>
          </div>
          <button onClick={handleGenerate} disabled={busy} className="bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all cursor-pointer">
            {busy ? 'Generating...' : 'Generate Key'}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/60">Server Endpoint URL</span>
              <div className="flex gap-4">
                <button onClick={handleGenerate} disabled={busy} className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                  <RefreshCw className={`w-3 h-3 ${busy ? 'animate-spin' : ''}`} /> Regenerate
                </button>
                <button onClick={() => setIsDeleteOpen(true)} className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer">
                  <Trash2 className="w-3 h-3" /> Delete Key
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" readOnly value={config.mcpEndpoint} className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white/90 focus:outline-none" />
              <button onClick={copyUrl} className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-white/10">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
          </div>
          <McpConfigCard endpointUrl={config.mcpEndpoint} apiKey={config.apiKey} />
        </>
      )}

      <McpDeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} deleting={busy} />
    </div>
  );
};

export default McpSettings;

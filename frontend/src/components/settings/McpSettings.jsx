import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Copy, Check, Trash2, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getMcpConfig, regenerateMcpKey, deleteMcpKey } from '../../services/mcpService';
import McpConfigCard from './McpConfigCard';
import McpDeleteModal from './McpDeleteModal';

const McpSettings = () => {
  const [config, setConfig] = useState({ apiKey: '', mcpEndpoint: '', isAgentActive: false });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchConfig();
    const interval = setInterval(() => fetchConfig(true), 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchConfig = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await getMcpConfig();
      if (res.success) setConfig(res);
    } catch {
      if (!silent) toast.error('Failed to load MCP settings');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try { setBusy(true); const res = await regenerateMcpKey(); if (res.success) { setConfig(res); toast.success('MCP Key updated'); } }
    catch { toast.error('Failed to generate key'); }
    finally { setBusy(false); }
  };

  const handleDelete = async () => {
    try { setBusy(true); const res = await deleteMcpKey(); if (res.success) { setConfig({ apiKey: '', mcpEndpoint: '', isAgentActive: false }); toast.success('MCP Key deleted'); setIsDeleteOpen(false); } }
    catch { toast.error('Failed to delete key'); }
    finally { setBusy(false); }
  };

  const copyUrl = () => { navigator.clipboard.writeText(config.mcpEndpoint); setCopied(true); toast.success('URL copied'); setTimeout(() => setCopied(false), 2000); };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="w-6 h-6 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#3D4852] tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#6C63FF]" /> MCP Settings
          </h3>
          <p className="text-[#6B7280] text-xs font-medium mt-1">Connect external AI tools directly to your workspace.</p>
        </div>
        {config.apiKey && (
          <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full neumorphic-inset ${config.isAgentActive ? 'text-[#38B2AC] font-bold' : 'text-[#6B7280] font-bold'}`}>
            <span className={`w-2 h-2 rounded-full ${config.isAgentActive ? 'bg-[#38B2AC] animate-pulse' : 'bg-[#6B7280]'}`} />
            <span>{config.isAgentActive ? 'Agent Connected' : 'Idle'}</span>
          </div>
        )}
      </div>

      {!config.apiKey ? (
        <div className="liquid-glass rounded-3xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl neumorphic-inset-deep flex items-center justify-center text-[#6C63FF] mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#3D4852]">No active MCP API Key</h4>
            <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto font-medium">Generate a key to connect Claude Code, Antigravity, or Cursor.</p>
          </div>
          <button onClick={handleGenerate} disabled={busy} className="bg-[#6C63FF] text-white text-xs font-bold px-5 py-2.5 rounded-2xl hover:bg-[#8B84FF] transition-all cursor-pointer shadow-md">
            {busy ? 'Generating...' : 'Generate Key'}
          </button>
        </div>
      ) : (
        <>
          <div className="liquid-glass rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3D4852]">Server Endpoint URL</span>
              <div className="flex gap-4">
                <button onClick={handleGenerate} disabled={busy} className="text-xs text-[#3D4852] font-bold hover:text-[#6C63FF] flex items-center gap-1 transition-colors cursor-pointer">
                  <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} /> Regenerate
                </button>
                <button onClick={() => setIsDeleteOpen(true)} className="text-xs text-rose-600 font-bold hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" /> Delete Key
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" readOnly value={config.mcpEndpoint} className="flex-1 bg-[#E0E5EC] rounded-2xl px-3.5 py-2 text-xs font-mono font-bold text-[#3D4852] outline-none neumorphic-inset" />
              <button onClick={copyUrl} className="neumorphic-btn text-[#3D4852] text-xs px-4 py-2 rounded-2xl font-bold flex items-center gap-1.5 transition-all cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#3D4852]" />} Copy
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

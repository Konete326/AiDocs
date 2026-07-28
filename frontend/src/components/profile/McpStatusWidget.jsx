import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ArrowRight, CheckCircle2, CircleOff, Sparkles } from 'lucide-react';
import { getMcpConfig } from '../../services/mcpService';

const McpStatusWidget = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({ apiKey: '', mcpEndpoint: '', isAgentActive: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const res = await getMcpConfig();
      if (res && res.success) {
        setConfig(res);
      }
    } catch {
      // Fallback silently if unauthenticated or error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neumorphic-inset rounded-2xl p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#3D4852] tracking-tight">MCP Integration Status</h4>
            <p className="text-[10px] text-[#6B7280]">AI Co-Founder & IDE Tools</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/settings')}
          className="text-[10px] font-bold text-[#6C63FF] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Configure</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-1 text-xs text-[#6B7280]">
          <div className="w-3 h-3 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
          <span>Checking connection...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-[#E0E5EC] rounded-xl p-2.5 border border-white/60 flex items-center gap-2">
            {config.apiKey ? (
              config.isAgentActive ? (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )
            ) : (
              <CircleOff className="w-4 h-4 text-amber-500 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-[#6B7280] block">MCP Server</span>
              <span className="text-xs font-bold text-[#3D4852] truncate block">
                {config.apiKey ? (config.isAgentActive ? 'Connected' : 'Active') : 'Not Setup'}
              </span>
            </div>
          </div>

          <div className="bg-[#E0E5EC] rounded-xl p-2.5 border border-white/60 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-[#6B7280] block">AI Engine</span>
              <span className="text-xs font-bold text-[#3D4852] truncate block">
                ClarifyAI v2.0
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default McpStatusWidget;

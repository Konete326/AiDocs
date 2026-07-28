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
    <div className="neumorphic-inset rounded-xl px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span className="text-[10px] font-bold text-[#3D4852] tracking-tight">MCP Status</span>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="text-[10px] font-bold text-[#6C63FF] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>Configure</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[#6B7280]">
          <div className="w-2.5 h-2.5 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
          <span>Checking...</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1.5">
            {config.apiKey ? (
              config.isAgentActive ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              )
            ) : (
              <CircleOff className="w-3 h-3 text-amber-500 flex-shrink-0" />
            )}
            <span className="text-[10px] font-semibold text-[#3D4852]">
              {config.apiKey ? (config.isAgentActive ? 'Connected' : 'Active') : 'Not Setup'}
            </span>
          </div>
          <span className="text-[#6B7280] text-[10px]">·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#6C63FF]" />
            <span className="text-[10px] font-semibold text-[#3D4852]">ClarifyAI v2.0</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default McpStatusWidget;

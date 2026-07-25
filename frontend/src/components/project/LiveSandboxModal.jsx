import { useState, useEffect } from 'react';
import { X, Play, RefreshCw, Smartphone, Monitor, Terminal, CheckCircle2, Globe, Activity, Trash2, Sparkles, Send, Loader2, Copy, Check } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const INITIAL_CONSOLE = [
  { id: 1, type: 'info', time: '11:44:01', text: '[Vite 8.0] dev server running at http://localhost:5173' },
  { id: 2, type: 'log', time: '11:44:02', text: '[React 18] Root component hydrated successfully with HMR' },
  { id: 3, type: 'warn', time: '11:44:05', text: '[HMR] Connected to WebContainer event stream' },
];

const INITIAL_NETWORK = [
  { id: 1, method: 'GET', url: '/api/projects/context', status: 200, time: '34ms' },
  { id: 2, method: 'GET', url: '/api/documents/prd', status: 200, time: '52ms' },
  { id: 3, method: 'POST', url: '/api/mcp/activity', status: 201, time: '98ms' },
  { id: 4, method: 'GET', url: '/api/kanban/tasks', status: 200, time: '41ms' },
];

const LiveSandboxModal = ({ isOpen, onClose, project }) => {
  const [device, setDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState(INITIAL_CONSOLE);
  const [networkLogs, setNetworkLogs] = useState(INITIAL_NETWORK);
  
  const [sandboxUrl, setSandboxUrl] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isSendingAi, setIsSendingAi] = useState(false);

  const [copyConsoleSuccess, setCopyConsoleSuccess] = useState(false);
  const [copyNetworkSuccess, setCopyNetworkSuccess] = useState(false);

  const getFormattedUrl = (url) => {
    if (!url || !url.trim()) return 'about:blank';
    let cleaned = url.trim();
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = 'https://' + cleaned;
    }

    if (cleaned.includes('youtube.com') || cleaned.includes('youtu.be')) {
      const videoIdMatch = cleaned.match(/(?:v=|\/live\/|\/shorts\/|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`;
      }
      if (!cleaned.includes('/embed')) {
        return 'https://www.youtube.com/embed';
      }
    }

    return cleaned;
  };

  const [activeIframeUrl, setActiveIframeUrl] = useState('https://example.com');

  useEffect(() => {
    if (project?._id) {
      const defaultUrl = `https://example.com`;
      setSandboxUrl(defaultUrl);
      setActiveIframeUrl(defaultUrl);
    }
  }, [project?._id]);

  if (!isOpen) return null;

  const refreshApp = () => {
    setIsRefreshing(true);
    const target = getFormattedUrl(sandboxUrl);
    setActiveIframeUrl(target);
    setConsoleLogs(prev => [...prev, { id: Date.now(), type: 'info', time: new Date().toLocaleTimeString(), text: `[Browser] Navigated to ${target}` }]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleCopyConsoleLogs = () => {
    const text = consoleLogs.map(l => `[${l.time}] [${l.type.toUpperCase()}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyConsoleSuccess(true);
    toast.success('Console logs copied!');
    setTimeout(() => setCopyConsoleSuccess(false), 2000);
  };

  const handleCopyNetworkLogs = () => {
    const text = networkLogs.map(n => `${n.method} ${n.url} - Status ${n.status} (${n.time})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyNetworkSuccess(true);
    toast.success('Network logs copied!');
    setTimeout(() => setCopyNetworkSuccess(false), 2000);
  };

  const handleSendAiInstruction = async () => {
    if (!aiPrompt.trim() || isSendingAi) return;
    setIsSendingAi(true);
    try {
      const consoleSummary = consoleLogs.map(l => `[${l.type.toUpperCase()}] ${l.text}`).join('\n');
      const networkSummary = networkLogs.map(n => `${n.method} ${n.url} (${n.status} - ${n.time})`).join('\n');
      
      const fullMessage = `[LIVE SANDBOX AI QUICK FIX REQUEST]
Page URL: ${sandboxUrl}

User Request / Instruction:
${aiPrompt.trim()}

=== CONSOLE LOG DIAGNOSTICS ===
${consoleSummary || 'No errors logged.'}

=== NETWORK DIAGNOSTICS ===
${networkSummary || 'No network activity logged.'}`;

      await api.post(`/projects/${project._id}/chat`, {
        messages: [{ role: 'user', content: fullMessage }]
      });

      toast.success('Instruction added to AI Chat! Redirecting to Chat...');
      setAiPrompt('');
      setIsAiModalOpen(false);
      onClose();
      window.location.href = `/projects/${project._id}/chat`;
    } catch (err) {
      console.error('Failed sending AI instruction:', err);
      toast.error('Failed sending instruction to AI agent');
    } finally {
      setIsSendingAi(false);
    }
  };

  const previewWidth = device === 'mobile' ? 'max-w-[375px]' : device === 'tablet' ? 'max-w-[768px]' : 'w-full';

  const RESTRICTED_DOMAINS = ['google.com', 'google.pk', 'google.co', 'facebook.com', 'github.com', 'twitter.com', 'x.com'];
  const isRestrictedDomain = RESTRICTED_DOMAINS.some(d => activeIframeUrl.toLowerCase().includes(d));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-[95vw] h-[84vh] neumorphic-card rounded-[2.5rem] flex flex-col overflow-hidden bg-[#E0E5EC] text-[#3D4852] relative">
        <div className="flex items-center justify-between p-4 px-6 border-b border-black/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl neumorphic-inset flex items-center justify-center text-[#6C63FF]">
              <Play className="w-4 h-4 text-[#6C63FF]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#3D4852]">{project?.title || 'Project'} — Live Sandbox</h3>
              <p className="text-[10px] text-[#6B7280] font-mono font-bold">Vite / React WebContainer Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Agent Fix</span>
            </button>

            <div className="flex gap-1 p-1 neumorphic-inset rounded-2xl">
              <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'desktop' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'mobile' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button onClick={onClose} className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-2 border-b border-black/5 flex-shrink-0 bg-[#E0E5EC]">
          <div className="flex items-center gap-2 flex-1 max-w-xl neumorphic-inset rounded-2xl px-4 py-1.5">
            <button onClick={refreshApp} title="Refresh / Load URL" className="cursor-pointer text-[#6B7280] hover:text-[#3D4852]">
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <input
              type="text"
              value={sandboxUrl}
              onChange={(e) => setSandboxUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && refreshApp()}
              className="w-full bg-transparent text-xs font-mono font-bold text-[#3D4852] outline-none"
              placeholder="https://preview.clarifyai.app/projects/..."
            />
            <button
              onClick={() => window.open(getFormattedUrl(sandboxUrl), '_blank')}
              title="Open URL in New Tab"
              className="text-[#6C63FF] hover:text-[#8B84FF] text-xs font-bold font-mono shrink-0 cursor-pointer px-1 flex items-center gap-1"
            >
              <span>Open ↗</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 p-1 neumorphic-inset rounded-2xl">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'preview' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>App Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'console' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console Logs ({consoleLogs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'network' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Network ({networkLogs.length})</span>
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-[#E0E5EC] p-6 flex justify-center items-center overflow-hidden">
          {activeTab === 'preview' ? (
            <div className={`${previewWidth} h-full neumorphic-inset rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative bg-white`}>
              {isRefreshing ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#6B7280] bg-[#E0E5EC]">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#6C63FF]" />
                  <span>Loading website preview...</span>
                </div>
              ) : isRestrictedDomain ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-[#E0E5EC] text-[#3D4852]">
                  <div className="w-16 h-16 rounded-3xl neumorphic-card flex items-center justify-center text-[#6C63FF]">
                    <Globe className="w-8 h-8 text-[#6C63FF]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#3D4852]">Security Restricted Domain</h4>
                    <p className="text-xs text-[#6B7280] font-medium max-w-md mt-1">
                      <strong>{sandboxUrl}</strong> uses security policies (X-Frame-Options: SAMEORIGIN) that prevent direct iframe embedding. Click below to open it in a new window!
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(getFormattedUrl(sandboxUrl), '_blank')}
                    className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-2 mt-1"
                  >
                    <span>Open {sandboxUrl} in New Tab ↗</span>
                  </button>
                </div>
              ) : (
                <iframe
                  key={activeIframeUrl}
                  src={activeIframeUrl}
                  className="w-full h-full border-none bg-white rounded-3xl"
                  title="Live Sandbox Website Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
                />
              )}
            </div>
          ) : activeTab === 'console' ? (
            <div className="w-full h-full neumorphic-inset rounded-3xl p-4 font-mono text-xs text-[#3D4852] overflow-y-auto flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-black/5">
                <span className="font-bold flex items-center gap-2 text-[#6C63FF]">
                  <Terminal className="w-4 h-4" /> DevTools Console Stream
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyConsoleLogs} title="Copy Console Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer flex items-center gap-1 text-xs font-bold">
                    {copyConsoleSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />}
                  </button>
                  <button onClick={() => setConsoleLogs([])} title="Clear Console" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {consoleLogs.map(log => (
                <div key={log.id} className="flex items-center gap-3 py-1 border-b border-black/5 text-xs">
                  <span className="text-[#6B7280]">{log.time}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.type === 'warn' ? 'bg-amber-500/20 text-amber-600' : log.type === 'info' ? 'bg-blue-500/20 text-blue-600' : 'bg-emerald-500/20 text-emerald-600'}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="font-semibold text-[#3D4852]">{log.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full neumorphic-inset rounded-3xl p-4 font-mono text-xs text-[#3D4852] overflow-y-auto flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-black/5">
                <span className="font-bold flex items-center gap-2 text-[#38B2AC]">
                  <Activity className="w-4 h-4" /> Network API Inspector
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyNetworkLogs} title="Copy Network Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer flex items-center gap-1 text-xs font-bold">
                    {copyNetworkSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#38B2AC]" />}
                  </button>
                  <button onClick={() => setNetworkLogs([])} title="Clear Network Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {networkLogs.map(net => (
                <div key={net.id} className="flex items-center justify-between py-1.5 border-b border-black/5 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#6C63FF] px-2 py-0.5 bg-[#6C63FF]/10 rounded">{net.method}</span>
                    <span className="font-semibold text-[#3D4852]">{net.url}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 font-bold px-2 py-0.5 bg-emerald-500/10 rounded">{net.status} OK</span>
                    <span className="text-[#6B7280] font-bold">{net.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAiModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg neumorphic-card rounded-3xl p-6 bg-[#E0E5EC] flex flex-col gap-4 text-[#3D4852]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#6C63FF]" />
                  <h4 className="text-sm font-extrabold">Ask AI Agent (Antigravity & Claude)</h4>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="text-[#6B7280] hover:text-[#3D4852]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#6B7280] font-medium">
                Describe what you want to change or fix. Current page URL, console error trace, and network logs will be automatically summarized and sent to AI Chat history.
              </p>

              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Example: Fix the layout alignment of the header button and update primary color to indigo..."
                className="w-full h-32 p-3 font-mono text-xs bg-[#E0E5EC] text-[#3D4852] rounded-2xl outline-none neumorphic-inset resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAiInstruction}
                  disabled={isSendingAi || !aiPrompt.trim()}
                  className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSendingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send to AI Agents</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSandboxModal;

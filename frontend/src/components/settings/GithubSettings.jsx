import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Key, ExternalLink, RefreshCw, Unlink } from 'lucide-react';
import GithubIcon from '../common/GithubIcon';
import axios from 'axios';

const GithubSettings = () => {
  const [status, setStatus] = useState({ isConnected: false, username: null, connectedAt: null });
  const [loading, setLoading] = useState(true);
  const [savingToken, setSavingToken] = useState(false);
  const [patInput, setPatInput] = useState('');
  const [showPatInput, setShowPatInput] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/github/status', { withCredentials: true });
      if (res.data.success) {
        setStatus(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleOAuthConnect = async () => {
    try {
      const res = await axios.get('/api/github/connect', { withCredentials: true });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to initiate GitHub OAuth' });
    }
  };

  const handleSavePat = async (e) => {
    e.preventDefault();
    if (!patInput.trim()) return;
    setSavingToken(true);
    setMessage(null);
    try {
      const res = await axios.post('/api/github/save-token', { token: patInput.trim() }, { withCredentials: true });
      if (res.data.success) {
        setStatus({ isConnected: true, username: res.data.username, connectedAt: res.data.connectedAt });
        setPatInput('');
        setShowPatInput(false);
        setMessage({ type: 'success', text: `Successfully connected as @${res.data.username}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Invalid Personal Access Token' });
    } finally {
      setSavingToken(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const res = await axios.post('/api/github/disconnect', {}, { withCredentials: true });
      if (res.data.success) {
        setStatus({ isConnected: false, username: null, connectedAt: null });
        setMessage({ type: 'success', text: 'GitHub account disconnected successfully' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to disconnect account' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="w-6 h-6 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-[#3D4852] tracking-tight">GitHub Integration</h3>
        <span className="neumorphic-card px-3 py-1 rounded-full text-xs font-semibold text-[#2563EB] flex items-center gap-1.5">
          <GithubIcon className="w-3.5 h-3.5 fill-current text-[#2563EB]" />
          <span>v1.0 Sync</span>
        </span>
      </div>
      <p className="text-[#6B7280] text-xs mb-6 font-medium">
        Link your GitHub account to push your 9-Document Technical Suite directly into public or private GitHub repositories.
      </p>

      {message && (
        <div className={`p-4 rounded-2xl mb-6 text-xs font-semibold flex items-center gap-2 ${
          message.type === 'error'
            ? 'bg-rose-50 text-rose-600 border border-rose-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {message.type === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="neumorphic-card no-hover p-6 rounded-3xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] !text-white flex items-center justify-center shadow-md flex-shrink-0">
              <GithubIcon className="w-6 h-6 !text-white fill-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#3D4852] flex items-center gap-2">
                <span>GitHub Connection</span>
                {status.isConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                    Connected
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600 uppercase tracking-wider">
                    Not Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5 font-medium">
                {status.isConnected
                  ? `Linked to @${status.username} on ${new Date(status.connectedAt).toLocaleDateString()}`
                  : 'Connect via OAuth 2.0 or Personal Access Token (PAT)'}
              </p>
            </div>
          </div>

          <div>
            {status.isConnected ? (
              <button
                onClick={handleDisconnect}
                className="neumorphic-btn rounded-2xl px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Unlink className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            ) : (
              <button
                onClick={handleOAuthConnect}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] !text-white font-bold text-xs px-5 py-2.5 rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 !text-white fill-white" />
                <span className="!text-white">Connect with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {!status.isConnected && (
        <div className="neumorphic-card no-hover p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3D4852]">
              <Key className="w-4 h-4 text-[#2563EB]" />
              <span>Alternative: Connect via Personal Access Token (PAT)</span>
            </div>
            <button
              onClick={() => setShowPatInput(!showPatInput)}
              className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
            >
              {showPatInput ? 'Hide' : 'Configure PAT'}
            </button>
          </div>

          {showPatInput && (
            <form onSubmit={handleSavePat} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] mb-1 uppercase tracking-wider">
                  GitHub Personal Access Token (repo scope)
                </label>
                <input
                  type="password"
                  value={patInput}
                  onChange={(e) => setPatInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-[#E0E5EC] text-[#3D4852] text-xs font-mono font-medium px-4 py-3 rounded-2xl shadow-inner border border-transparent focus:border-[#2563EB] outline-none"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=ClarifyAI%20Documentation%20Sync"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Generate token on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="submit"
                  disabled={savingToken || !patInput.trim()}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] !text-white font-bold text-xs px-5 py-2.5 rounded-2xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <span className="!text-white">{savingToken ? 'Validating...' : 'Save Token'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default GithubSettings;

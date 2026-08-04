import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react';
import GithubIcon from '../common/GithubIcon';
import axios from 'axios';

const GithubSyncStatusBadge = ({ project, onSyncComplete }) => {
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(project?.lastSyncedFromGithubAt || project?.lastPushedAt);

  if (!project || !project.githubRepoUrl) return null;

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const res = await axios.post(`/api/webhooks/sync/${project._id}`, {}, { withCredentials: true });
      if (res.data.success) {
        setLastSynced(res.data.syncedAt);
        if (onSyncComplete) onSyncComplete(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return 'Active';
    const date = new Date(dateStr);
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="neumorphic-inset px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-[#3D4852]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        <GithubIcon className="w-3.5 h-3.5 text-[#3D4852]" />
        <span className="hidden md:inline text-[11px] font-semibold text-[#6B7280]">
          GitHub Sync:
        </span>
        <span className="text-[11px] font-bold text-emerald-600">
          {formatTime(lastSynced)}
        </span>

        <a
          href={project.githubRepoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#6B7280] hover:text-[#6C63FF] transition-colors ml-0.5"
          title="Open Repository on GitHub"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <button
        onClick={handleManualSync}
        disabled={syncing}
        className="neumorphic-btn p-1.5 rounded-full text-[#3D4852] hover:text-[#6C63FF] transition-colors disabled:opacity-50"
        title="Force Manual Webhook Re-sync"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-[#6C63FF]' : ''}`} />
      </button>
    </div>
  );
};

export default GithubSyncStatusBadge;

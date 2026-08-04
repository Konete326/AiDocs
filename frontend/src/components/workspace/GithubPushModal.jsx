import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, ExternalLink, Lock, Globe, RefreshCw, Key } from 'lucide-react';
import GithubIcon from '../common/GithubIcon';
import axios from 'axios';

const GithubPushModal = ({ isOpen, onClose, project, onPushSuccess }) => {
  const [status, setStatus] = useState({ isConnected: false, username: null });
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [repoName, setRepoName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [commitMessage, setCommitMessage] = useState('Sync 9-Document Technical Suite via ClarifyAI');
  const [pushing, setPushing] = useState(false);
  const [error, setError] = useState(null);
  const [successResult, setSuccessResult] = useState(null);
  const [patInput, setPatInput] = useState('');
  const [savingPat, setSavingPat] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessResult(null);
      if (project?.title) {
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        setRepoName(project.githubRepoName || slug || 'my-clarifyai-project');
      }
      checkStatus();
    }
  }, [isOpen, project]);

  const checkStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await axios.get('/api/github/status', { withCredentials: true });
      if (res.data.success) {
        setStatus(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleSavePat = async (e) => {
    e.preventDefault();
    if (!patInput.trim()) return;
    setSavingPat(true);
    setError(null);
    try {
      const res = await axios.post('/api/github/save-token', { token: patInput.trim() }, { withCredentials: true });
      if (res.data.success) {
        setStatus({ isConnected: true, username: res.data.username });
        setPatInput('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid GitHub token');
    } finally {
      setSavingPat(false);
    }
  };

  const handlePush = async (e) => {
    e.preventDefault();
    if (!repoName.trim()) return;
    setPushing(true);
    setError(null);
    try {
      const res = await axios.post('/api/github/push-suite', {
        projectId: project._id,
        repoName: repoName.trim(),
        isPrivate,
        commitMessage: commitMessage.trim()
      }, { withCredentials: true });

      if (res.data.success) {
        setSuccessResult(res.data);
        if (onPushSuccess) {
          onPushSuccess(res.data);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to push documents to GitHub');
    } finally {
      setPushing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#E0E5EC] rounded-[32px] p-6 sm:p-8 neumorphic-card no-hover shadow-2xl relative border border-white/50 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 neumorphic-btn p-2 rounded-2xl text-[#3D4852] hover:text-rose-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md flex-shrink-0">
            <GithubIcon className="w-6 h-6 fill-current text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3D4852]">Push Suite to GitHub</h3>
            <p className="text-xs text-[#6B7280] font-medium">Sync all 9 generated docs into a repository</p>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {checkingStatus ? (
          <div className="py-12 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-[#2563EB] animate-spin" />
          </div>
        ) : !status.isConnected ? (
          <div className="neumorphic-card no-hover p-5 rounded-3xl text-center">
            <AlertCircle className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#3D4852] mb-1">GitHub Account Not Linked</h4>
            <p className="text-xs text-[#6B7280] mb-4 font-medium">
              You must connect your GitHub account to export your document suite.
            </p>
            <form onSubmit={handleSavePat} className="flex flex-col gap-3">
              <input
                type="password"
                value={patInput}
                onChange={(e) => setPatInput(e.target.value)}
                placeholder="Enter GitHub Personal Access Token (PAT)"
                className="w-full bg-[#E0E5EC] text-[#3D4852] text-xs font-mono px-4 py-3 rounded-2xl shadow-inner outline-none border border-transparent focus:border-[#2563EB]"
              />
              <button
                type="submit"
                disabled={savingPat || !patInput.trim()}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Key className="w-4 h-4" />
                <span>{savingPat ? 'Connecting...' : 'Connect PAT Token'}</span>
              </button>
            </form>
          </div>
        ) : successResult ? (
          <div className="neumorphic-card no-hover p-6 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#3D4852]">Sync Successful!</h4>
              <p className="text-xs text-[#6B7280] mt-1">
                All 9 generated technical documents have been committed to repository <strong>{successResult.repoName}</strong>.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={successResult.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="neumorphic-btn py-2.5 rounded-2xl text-xs font-bold text-[#3D4852] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePush} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Repository Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="e.g. my-app-docs"
                  className="w-full bg-[#E0E5EC] text-[#3D4852] text-xs font-bold px-4 py-3 rounded-2xl shadow-inner border border-transparent focus:border-[#2563EB] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Repository Privacy
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsPrivate(false)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !isPrivate
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'neumorphic-btn text-[#3D4852]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Public</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrivate(true)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPrivate
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'neumorphic-btn text-[#3D4852]'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Commit Message
              </label>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full bg-[#E0E5EC] text-[#3D4852] text-xs font-medium px-4 py-3 rounded-2xl shadow-inner border border-transparent focus:border-[#2563EB] outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="neumorphic-btn px-5 py-3 rounded-2xl text-xs font-bold text-[#3D4852] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pushing || !repoName.trim()}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {pushing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Pushing 9 Docs...</span>
                  </>
                ) : (
                  <>
                    <GithubIcon className="w-4 h-4 fill-current text-white" />
                    <span>Push to GitHub</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GithubPushModal;

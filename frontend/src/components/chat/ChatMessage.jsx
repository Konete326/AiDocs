import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Copy, Check, Download, FileSpreadsheet, FileText, Archive, Loader2 } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';
import { downloadZip, downloadDocAsWord, downloadDocAsExcel, downloadDocAsPdf } from '../../services/exportService';
import api from '../../services/api';

export default function ChatMessage({ message, projectId, projectTitle, onSkillAdded }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [addedSkills, setAddedSkills] = useState({});
  const [loadingSkill, setLoadingSkill] = useState({});

  const downloadMatch = message.content ? message.content.match(/\[DOWNLOAD_ACTION:([a-zA-Z]+):([a-zA-Z]+)\]/) : null;
  const initialFormat = downloadMatch ? downloadMatch[1].toLowerCase() : null;
  const docType = downloadMatch ? downloadMatch[2].toLowerCase() : null;

  const recommendMatch = message.content ? message.content.match(/\[RECOMMEND_SKILLS:([a-zA-Z0-9_,-]+)\]/) : null;
  const recommendedSkillIds = recommendMatch ? recommendMatch[1].split(',').map(s => s.trim()).filter(Boolean) : [];

  const [selectedFormat, setSelectedFormat] = useState(initialFormat || 'word');

  const cleanedContent = message.content
    ? message.content
        .replace(/\[DOWNLOAD_ACTION:[a-zA-Z]+:[a-zA-Z]+\]/g, '')
        .replace(/\[RECOMMEND_SKILLS:[a-zA-Z0-9_,-]+\]/g, '')
        .trim()
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (fmt, type) => {
    if (!projectId || isDownloading) return;
    try {
      setIsDownloading(true);
      const activeFmt = fmt || selectedFormat;
      if (activeFmt === 'zip' || type === 'all') {
        await downloadZip(projectId, projectTitle || 'Project');
      } else if (activeFmt === 'word') {
        await downloadDocAsWord(projectId, type);
      } else if (activeFmt === 'excel') {
        await downloadDocAsExcel(projectId, type);
      } else if (activeFmt === 'pdf') {
        await downloadDocAsPdf(projectId, type);
      } else {
        await downloadZip(projectId, projectTitle || 'Project');
      }
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddSkill = async (skillId) => {
    if (!projectId || loadingSkill[skillId]) return;
    try {
      setLoadingSkill(prev => ({ ...prev, [skillId]: true }));
      await api.post(`/projects/${projectId}/toggle`, { skillId });
      setAddedSkills(prev => ({ ...prev, [skillId]: true }));
      if (onSkillAdded) onSkillAdded();
    } catch (err) {
      console.error('Failed to add skill:', err);
    } finally {
      setLoadingSkill(prev => ({ ...prev, [skillId]: false }));
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="liquid-glass rounded-3xl rounded-tr-sm px-4 py-2.5 max-w-[70%] sm:max-w-[65%] border border-white/5 w-fit">
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">{message.content}</p>
        </div>
      </div>
    );
  }

  const getFormatIcon = (fmt) => {
    if (fmt === 'excel') return FileSpreadsheet;
    if (fmt === 'zip' || docType === 'all') return Archive;
    return FileText;
  };

  const FormatIcon = getFormatIcon(selectedFormat);

  return (
    <div className="flex justify-start gap-2.5 group">
      <div className="w-7 h-7 rounded-full liquid-glass flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
      </div>

      <div className="liquid-glass rounded-3xl rounded-tl-sm px-4 py-3 max-w-[75%] sm:max-w-[70%] relative border border-white/5 w-fit">
        {message.content === '...' ? (
          <div className="flex gap-1 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 pb-1.5 mb-1.5 border-b border-white/5">
              <span className="text-[9.5px] text-white/40 font-medium uppercase tracking-wider">AI Co-founder</span>
              <button
                onClick={handleCopy}
                className="liquid-glass rounded-full px-2 py-0.5 text-[9.5px] text-white/50 hover:text-white flex items-center gap-1 transition-all cursor-pointer border border-white/5"
                title="Copy AI response"
                aria-label="Copy AI response"
              >
                {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <div className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans prose-invert">
              <ReactMarkdown components={mdComponents}>{cleanedContent}</ReactMarkdown>
            </div>

            {/* Skill Suggestion Cards */}
            {recommendedSkillIds.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                <div className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider text-white/50 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#6C63FF]" />
                  <span>Recommended Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {recommendedSkillIds.map(skillId => {
                    const isAdded = addedSkills[skillId];
                    const isLoading = loadingSkill[skillId];
                    const formattedName = skillId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    return (
                      <button
                        key={skillId}
                        onClick={() => !isAdded && handleAddSkill(skillId)}
                        disabled={isAdded || isLoading}
                        style={{ color: '#ffffff' }}
                        className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shadow-sm ${
                          isAdded
                            ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 cursor-default'
                            : 'bg-blue-600/30 hover:bg-blue-600/50 text-white border-blue-500/40 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin text-white flex-shrink-0" />
                        ) : isAdded ? (
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span className="text-blue-300 font-bold flex-shrink-0">+</span>
                        )}
                        <span>{isAdded ? `Added ${formattedName}` : `Add ${formattedName}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Multi-Format Download Action Card */}
            {initialFormat && docType && (
              <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Select Format:</span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'word', label: 'DOCX' },
                      { id: 'excel', label: 'EXCEL' },
                      { id: 'pdf', label: 'PDF' },
                      { id: 'zip', label: 'ZIP' }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFormat(f.id)}
                        disabled={isDownloading}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-medium transition-all cursor-pointer border ${
                          selectedFormat === f.id
                            ? 'bg-[#6C63FF] text-white border-[#6C63FF] shadow-sm'
                            : 'liquid-glass text-white/60 hover:text-white border-white/10'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(selectedFormat, docType)}
                  disabled={isDownloading}
                  style={{ color: '#ffffff' }}
                  className={`w-full bg-[#6C63FF]/30 hover:bg-[#6C63FF]/50 border border-[#6C63FF]/50 rounded-2xl px-3.5 py-2 text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-md group/btn ${
                    isDownloading ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
                    ) : (
                      <FormatIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    <span className="truncate">
                      {isDownloading
                        ? 'Preparing file blob...'
                        : selectedFormat === 'zip' || docType === 'all'
                        ? 'Download All Files (.zip)'
                        : `Download ${docType.toUpperCase()} (${selectedFormat.toUpperCase()})`}
                    </span>
                  </div>
                  {isDownloading ? (
                    <span className="text-[10px] text-emerald-300/80 animate-pulse font-mono">Generating</span>
                  ) : (
                    <Download className="w-3.5 h-3.5 text-white/70 group-hover/btn:scale-110 transition-transform flex-shrink-0" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

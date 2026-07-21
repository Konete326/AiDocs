import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Download, FileSpreadsheet, FileText, Archive, Loader2, FileCode, Globe, ExternalLink, X, Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';
import { downloadZip, downloadDocAsWord, downloadDocAsExcel, downloadDocAsPdf, downloadDocAsMd } from '../../services/exportService';

export default function ChatMessage({ message, projectId, projectTitle }) {
  const navigate = useNavigate();
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [manualFormatToggle, setManualFormatToggle] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeArtifact, setActiveArtifact] = useState(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [viewportMode, setViewportMode] = useState('desktop');

  const downloadMatch = message.content ? message.content.match(/\[DOWNLOAD_ACTION:([a-zA-Z]+):([a-zA-Z]+)\]/) : null;
  const initialFormat = downloadMatch ? downloadMatch[1].toLowerCase() : null;
  const docType = downloadMatch ? downloadMatch[2].toLowerCase() : null;

  const [selectedFormat, setSelectedFormat] = useState(initialFormat || 'word');

  const cleanedContent = message.content ? message.content.replace(/\[DOWNLOAD_ACTION:[a-zA-Z]+:[a-zA-Z]+\]/g, '').trim() : '';

  const extractCleanUrl = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s<>"')\]]+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s<>"')\]]*)?)/gi;
    const matches = text.match(urlRegex);
    if (!matches || matches.length === 0) return null;
    
    let raw = matches[0].replace(/[.,;:!()\]]+$/, '');
    if (raw.includes('localhost') || raw.includes('/api/') || !raw.includes('.')) return null;
    if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
      raw = `https://${raw}`;
    }
    return raw;
  };

  const detectedUrl = extractCleanUrl(cleanedContent);

  const queryText = (message.userQuery || '').toLowerCase();
  const isPreviewRequested = 
    queryText.includes('preview') || 
    queryText.includes('website') || 
    queryText.includes('url') || 
    queryText.includes('site') || 
    queryText.includes('link') || 
    queryText.includes('competitor') || 
    queryText.includes('http') ||
    cleanedContent.toLowerCase().includes('website analysis') ||
    cleanedContent.toLowerCase().includes('competitor website');

  const showPreviewButton = detectedUrl && isPreviewRequested;

  const htmlBlockMatch = cleanedContent.match(/```html\s*([\s\S]*?)\s*```/i);
  const detectedArtifactHtml = htmlBlockMatch && htmlBlockMatch[1].trim().length > 30 ? htmlBlockMatch[1].trim() : null;

  const hasDocReference = (cleanedContent.includes('Updated Document:') || cleanedContent.includes('Document Updated:') || message.content?.includes('[UPDATE_DOC:')) && !showPreviewButton && !detectedArtifactHtml;

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
      } else if (activeFmt === 'md') {
        await downloadDocAsMd(projectId, type);
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

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="liquid-glass rounded-3xl rounded-tr-sm px-4 py-2.5 max-w-[70%] sm:max-w-[65%] border border-white/5 w-fit space-y-2">
          {message.content && (
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">{message.content}</p>
          )}

          {message.attachments && message.attachments.length > 0 && (
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
              {message.attachments.map((att, idx) => (
                <div key={idx} className="liquid-glass rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs border border-white/10 bg-white/5">
                  {att.isImage ? (
                    <img src={att.dataUrl} alt={att.name} className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10.5px] font-medium text-white truncate max-w-[130px] font-sans">{att.name}</span>
                    <span className="text-[9px] text-white/40 uppercase tracking-wider">{att.isImage ? 'Attached' : 'Document'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const getFormatIcon = (fmt) => {
    if (fmt === 'excel') return FileSpreadsheet;
    if (fmt === 'md') return FileCode;
    if (fmt === 'zip' || docType === 'all') return Archive;
    return FileText;
  };

  const FormatIcon = getFormatIcon(selectedFormat);

  const isThinking = message.content === '...';

  let thinkingText = 'AI is thinking...';

  if (queryText.includes('skill')) {
    thinkingText = 'Adding skill to project...';
  } else if (queryText.includes('download') || queryText.includes('downlaod') || queryText.includes('pdf') || queryText.includes('zip') || queryText.includes('excel') || queryText.includes('word') || queryText.includes('csv') || queryText.includes('md') || queryText.includes('markdown')) {
    thinkingText = 'Preparing file & download options...';
  }

  const hasSpecificFormat =
    queryText.includes('pdf') ||
    queryText.includes('word') ||
    queryText.includes('docx') ||
    queryText.includes('excel') ||
    queryText.includes('csv') ||
    queryText.includes('zip') ||
    queryText.includes('md') ||
    queryText.includes('markdown');

  const showFormatSelector = !hasSpecificFormat || manualFormatToggle;
  const isModalOpen = Boolean(previewUrl || activeArtifact);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center pt-20 pb-6 px-4 sm:px-8 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[80vh] my-auto flex flex-col border border-slate-200 overflow-hidden shadow-2xl relative">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0 gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2 truncate pr-2 max-w-[200px] sm:max-w-xs">
                {activeArtifact ? (
                  <>
                    <Sparkles className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-900 truncate">Interactive Web Artifact</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-900 truncate">{previewUrl}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-full border border-slate-300">
                {[
                  { id: 'mobile', label: 'Mobile (375px)', icon: Smartphone },
                  { id: 'tablet', label: 'Tablet (768px)', icon: Tablet },
                  { id: 'desktop', label: 'Desktop', icon: Monitor }
                ].map(v => {
                  const VIcon = v.icon;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setViewportMode(v.id)}
                      className={`rounded-full px-2.5 py-0.5 text-[9.5px] flex items-center gap-1 transition-all cursor-pointer ${
                        viewportMode === v.id
                          ? 'bg-[#6C63FF] text-white shadow-sm font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title={v.label}
                    >
                      <VIcon className="w-3 h-3" />
                      <span>{v.id.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {previewUrl && (
                  <a
                    href={previewUrl.startsWith('http') ? previewUrl : `https://${previewUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer border border-slate-300 shadow-sm"
                  >
                    Open New Tab <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => { setPreviewUrl(null); setActiveArtifact(null); setIsIframeLoading(true); }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 rounded-full p-1.5 transition-colors cursor-pointer border-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-[#0F172A] relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
              {isIframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-10 space-y-2">
                  <Loader2 className="w-6 h-6 text-[#6C63FF] animate-spin" />
                  <span className="text-xs text-white/70">Loading interactive preview...</span>
                </div>
              )}
              <div className={`h-full transition-all duration-300 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white ${
                viewportMode === 'mobile' ? 'w-[375px]' : viewportMode === 'tablet' ? 'w-[768px]' : 'w-full'
              }`}>
                {activeArtifact ? (
                  <iframe
                    srcDoc={activeArtifact}
                    title="Interactive Web Artifact Preview"
                    onLoad={() => setIsIframeLoading(false)}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <iframe
                    src={previewUrl.startsWith('http') ? previewUrl : `https://${previewUrl}`}
                    title="Live Website Preview"
                    onLoad={() => setIsIframeLoading(false)}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start group">
        <div className="liquid-glass rounded-3xl rounded-tl-sm px-4 py-3 max-w-[85%] sm:max-w-[78%] relative border border-white/5 w-fit overflow-hidden break-words">
          {isThinking ? (
            <div className="flex items-center gap-2.5 py-1">
              <Loader2 className="w-4 h-4 text-[#6C63FF] animate-spin flex-shrink-0" />
              <span className="text-xs font-medium text-white/90 animate-pulse font-sans">
                {thinkingText}
              </span>
              <div className="flex gap-1 items-center ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
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

              <div className="mt-2 space-y-1.5">
                {detectedArtifactHtml && (
                  <button
                    onClick={() => { setIsIframeLoading(true); setPreviewUrl(null); setActiveArtifact(detectedArtifactHtml); }}
                    className="bg-[#6C63FF] hover:bg-[#5b52e5] text-white rounded-2xl px-3 py-2 text-[11px] font-semibold flex items-center justify-between border-none w-full transition-all hover:scale-[1.01] cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="truncate">Preview Interactive Web Artifact (Live UI)</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/80 flex-shrink-0" />
                  </button>
                )}

                {showPreviewButton && (
                  <button
                    onClick={() => { setIsIframeLoading(true); setActiveArtifact(null); setPreviewUrl(detectedUrl); }}
                    className="liquid-glass rounded-2xl px-3 py-1.5 text-[11px] text-white/90 hover:text-white flex items-center justify-between border border-white/10 w-full transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
                      <span className="truncate">Live Website Preview ({detectedUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')})</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/50 flex-shrink-0" />
                  </button>
                )}

                {hasDocReference && projectId && (
                  <button
                    onClick={() => navigate(`/projects/${projectId}`)}
                    className="liquid-glass rounded-2xl px-3 py-1.5 text-[11px] text-white/90 hover:text-white flex items-center justify-between border border-white/10 w-full transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
                      <span className="truncate">View Real Document in Project Viewer</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/50 flex-shrink-0" />
                  </button>
                )}
              </div>

              {initialFormat && docType && (
                <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2">
                  {showFormatSelector ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Select Format:</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {[
                          { id: 'word', label: 'DOCX' },
                          { id: 'md', label: 'MD' },
                          { id: 'excel', label: 'EXCEL' },
                          { id: 'pdf', label: 'PDF' },
                          { id: 'zip', label: 'ZIP' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setSelectedFormat(f.id)}
                            disabled={isDownloading}
                            className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium transition-all cursor-pointer ${selectedFormat === f.id
                                ? 'bg-[#6C63FF] text-white shadow-[2px_2px_6px_rgba(108,99,255,0.3)]'
                                : 'liquid-glass text-white/60 hover:text-white border-white/10'
                              }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Direct Download Ready</span>
                      <button
                        onClick={() => setManualFormatToggle(true)}
                        className="text-[9px] text-[#6C63FF] hover:underline cursor-pointer font-medium"
                      >
                        Change format
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleDownload(selectedFormat, docType)}
                    disabled={isDownloading}
                    className={`w-full bg-[#6C63FF] hover:bg-[#5b52e5] text-white rounded-2xl px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-[4px_4px_10px_rgba(108,99,255,0.3),-4px_-4px_8px_rgba(255,255,255,0.5)] border-none ${isDownloading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-95'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin flex-shrink-0" />
                      ) : (
                        <FormatIcon className="w-4 h-4 text-white flex-shrink-0" />
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
                      <span className="text-[10px] text-white/80 animate-pulse font-mono">Generating</span>
                    ) : (
                      <Download className="w-3.5 h-3.5 text-white/80 group-hover:scale-110 transition-transform flex-shrink-0" />
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

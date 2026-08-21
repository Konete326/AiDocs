import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Download, FileSpreadsheet, FileText, Archive, Loader2, FileCode, Globe, ExternalLink, X, Smartphone, Tablet, Monitor, Volume2, VolumeX, Pencil, Layout, Layers } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';
import { downloadZip, downloadDocAsWord, downloadDocAsExcel, downloadDocAsPdf, downloadDocAsMd } from '../../services/exportService';

export default function ChatMessage({ message, index, projectId, projectTitle, onEditUserMessage }) {
  const navigate = useNavigate();
  const isUser = message.role === 'user';
  const rawContent = message.content || '';
  const queryText = rawContent.toLowerCase();

  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [manualFormatToggle, setManualFormatToggle] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeArtifact, setActiveArtifact] = useState(null);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(rawContent);

  const isAll = queryText.includes('all docs') || queryText.includes('all files') || queryText.includes('zip') || queryText.includes('everything') || queryText.includes('full project');
  let detectedDoc = null;
  if (isAll) detectedDoc = 'all';
  else if (queryText.includes('prd')) detectedDoc = 'prd';
  else if (queryText.includes('srd')) detectedDoc = 'srd';
  else if (queryText.includes('tech stack') || queryText.includes('techstack')) detectedDoc = 'techStack';
  else if (queryText.includes('database') || queryText.includes('schema') || queryText.includes('dbschema')) detectedDoc = 'dbSchema';
  else if (queryText.includes('user flow') || queryText.includes('userflow')) detectedDoc = 'userFlows';
  else if (queryText.includes('mvp')) detectedDoc = 'mvpPlan';
  else if (queryText.includes('folder') || queryText.includes('structure')) detectedDoc = 'folderStructure';
  else if (queryText.includes('claude') || queryText.includes('context')) detectedDoc = 'claudeContext';
  else if (queryText.includes('system prompt') || queryText.includes('systemprompt')) detectedDoc = 'agentSystemPrompt';

  let initialFormat = null;
  if (queryText.includes('excel') || queryText.includes('sheet') || queryText.includes('csv') || queryText.includes('xlsx')) initialFormat = 'excel';
  else if (queryText.includes('pdf')) initialFormat = 'pdf';
  else if (queryText.includes('md') || queryText.includes('markdown')) initialFormat = 'md';
  else if (queryText.includes('word') || queryText.includes('docx') || queryText.includes('doc')) initialFormat = 'word';
  else if (queryText.includes('zip') || detectedDoc === 'all') initialFormat = 'zip';
  else if (detectedDoc) initialFormat = 'pdf';

  const docType = detectedDoc;
  const [selectedFormat, setSelectedFormat] = useState(initialFormat || 'pdf');

  const cleanedContent = rawContent;

  const urlRegex = /(https?:\/\/[^\s)]+)/i;
  const urlMatch = rawContent.match(urlRegex);
  const detectedUrl = urlMatch ? urlMatch[0] : null;
  const showPreviewButton = Boolean(detectedUrl && !detectedUrl.includes('localhost') && !detectedUrl.includes('127.0.0.1'));

  const htmlCodeBlockRegex = /```html\s*([\s\S]*?)```/i;
  const htmlMatch = rawContent.match(htmlCodeBlockRegex);
  const detectedArtifactHtml = htmlMatch ? htmlMatch[1] : null;

  const hasDocReference = Boolean(docType && docType !== 'all');

  const handleCopy = () => {
    if (cleanedContent) {
      navigator.clipboard.writeText(cleanedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async (fmt, doc) => {
    if (!projectId || isDownloading) return;
    setIsDownloading(true);
    try {
      if (fmt === 'zip' || doc === 'all') {
        await downloadZip(projectId, projectTitle || 'Project');
      } else if (fmt === 'excel') {
        await downloadDocAsExcel(projectId, doc, projectTitle || 'Project');
      } else if (fmt === 'word') {
        await downloadDocAsWord(projectId, doc, projectTitle || 'Project');
      } else if (fmt === 'md') {
        await downloadDocAsMd(projectId, doc, projectTitle || 'Project');
      } else {
        await downloadDocAsPdf(projectId, doc, projectTitle || 'Project');
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSpeakVoice = () => {
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }
    if (!cleanedContent) return;
    const cleanText = cleanedContent.replace(/\[.*?\]/g, '').replace(/[#*`_]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);
    setIsPlayingVoice(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    setIsEditing(false);
    onEditUserMessage?.(index, editText.trim());
  };

  if (isUser) {
    const isMcp = message.isMcpAgent || message.content?.includes('[Antigravity IDE Agent]');
    const cleanUserContent = (message.content || '').replace('[Antigravity IDE Agent]:', '').trim();

    return (
      <div className="flex justify-end group">
        <div className={`rounded-3xl rounded-tr-sm px-4 py-3 max-w-[75%] sm:max-w-[70%] w-fit space-y-1.5 shadow-md relative ${
          isMcp ? 'bg-[#38B2AC] text-white' : 'bg-[#6C63FF] text-white'
        }`}>
          {isMcp && (
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-white uppercase tracking-wider border-b border-white/20 pb-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>🤖 Antigravity IDE Agent</span>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-2 py-1 min-w-[240px]">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm font-sans p-2 rounded-xl border border-white/30 focus:outline-none resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { setIsEditing(false); setEditText(cleanUserContent); }}
                  className="px-2.5 py-1 text-[10.5px] font-bold bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 text-[10.5px] font-bold bg-white text-[#6C63FF] rounded-xl hover:bg-white/90 transition-all cursor-pointer shadow-sm"
                >
                  Save & Regenerate
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2">
              {message.content && (
                <p className="text-xs sm:text-sm leading-relaxed font-sans flex-1">{cleanUserContent}</p>
              )}
              {onEditUserMessage && (
                <button
                  onClick={() => { setIsEditing(true); setEditText(cleanUserContent); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white/20 hover:bg-white/30 text-white flex-shrink-0 cursor-pointer"
                  title="Edit message & regenerate response"
                  aria-label="Edit message"
                >
                  <Pencil className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          )}

          {message.attachments && message.attachments.length > 0 && (
            <div className="pt-2 border-t border-white/20 flex flex-wrap gap-2">
              {message.attachments.map((att, idx) => (
                <div key={idx} className="bg-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs">
                  {att.isImage ? (
                    <img src={att.dataUrl} alt={att.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-white flex-shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10.5px] font-bold text-white truncate max-w-[130px] font-sans">{att.name}</span>
                    <span className="text-[9px] text-white/80 uppercase tracking-wider">{att.isImage ? 'Attached' : 'Document'}</span>
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
                    <Layout className="w-4 h-4 text-[#38B2AC] flex-shrink-0" />
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
        <div className="neumorphic-card rounded-3xl rounded-tl-sm px-4 py-3 max-w-[85%] sm:max-w-[78%] relative text-[#3D4852] w-fit overflow-hidden break-words border border-[#CAD1DB] shadow-md">
          {isThinking ? (
            <div className="flex items-center gap-2.5 py-1">
              <Loader2 className="w-4 h-4 text-[#6C63FF] animate-spin flex-shrink-0" />
              <span className="text-xs font-bold text-[#3D4852] animate-pulse font-sans">
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
              <div className="flex items-center justify-between gap-4 pb-1.5 mb-1.5 border-b border-black/5">
                <span className="text-[9.5px] text-[#6B7280] font-mono font-bold uppercase tracking-wider">AI Co-founder</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSpeakVoice}
                    className={`neumorphic-btn rounded-full p-1.5 transition-all cursor-pointer ${
                      isPlayingVoice ? 'text-[#38B2AC]' : 'text-[#3D4852]'
                    }`}
                    title={isPlayingVoice ? 'Stop voice playback' : 'Listen to AI voice'}
                    aria-label={isPlayingVoice ? 'Stop voice playback' : 'Listen to AI voice'}
                  >
                    {isPlayingVoice ? <VolumeX className="w-3.5 h-3.5 text-[#38B2AC] animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-[#3D4852]" />}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="neumorphic-btn rounded-full p-1.5 text-[#3D4852] transition-all cursor-pointer"
                    title={copied ? 'Copied AI response!' : 'Copy AI response'}
                    aria-label="Copy AI response"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#3D4852]" />}
                  </button>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#3D4852] leading-relaxed font-sans">
                <ReactMarkdown components={mdComponents}>{cleanedContent}</ReactMarkdown>
              </div>

              <div className="mt-2 space-y-1.5">
                {detectedArtifactHtml && (
                  <button
                    onClick={() => { setIsIframeLoading(true); setPreviewUrl(null); setActiveArtifact(detectedArtifactHtml); }}
                    className="bg-[#6C63FF] hover:bg-[#5b52e5] text-white rounded-2xl px-3 py-2 text-[11px] font-semibold flex items-center justify-between border-none w-full transition-all hover:scale-[1.01] cursor-pointer shadow-md"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="truncate">Preview Interactive Web Artifact (Live UI)</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/80 flex-shrink-0" />
                  </button>
                )}

                {showPreviewButton && (
                  <button
                    onClick={() => { setIsIframeLoading(true); setActiveArtifact(null); setPreviewUrl(detectedUrl); }}
                    className="neumorphic-btn rounded-2xl px-3 py-1.5 text-[11px] text-[#3D4852] hover:text-[#6C63FF] flex items-center justify-between border border-[#CAD1DB] w-full transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
                      <span className="truncate">Live Website Preview ({detectedUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')})</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#6B7280] flex-shrink-0" />
                  </button>
                )}

                {hasDocReference && projectId && (
                  <button
                    onClick={() => navigate(`/projects/${projectId}`)}
                    className="neumorphic-btn rounded-2xl px-3 py-1.5 text-[11px] text-[#3D4852] hover:text-[#6C63FF] flex items-center justify-between border border-[#CAD1DB] w-full transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
                      <span className="truncate">View Real Document in Project Viewer</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#6B7280] flex-shrink-0" />
                  </button>
                )}
              </div>

              {initialFormat && docType && (
                <div className="mt-3 pt-2.5 border-t border-black/5 space-y-2">
                  {showFormatSelector ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-semibold">Select Format:</span>
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
                                : 'neumorphic-inset text-[#6B7280] hover:text-[#3D4852]'
                              }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-semibold">Direct Download Ready</span>
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

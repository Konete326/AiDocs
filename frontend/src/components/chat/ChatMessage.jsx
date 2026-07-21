import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Copy, Check, Download, FileSpreadsheet, FileText, Archive } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';
import { downloadZip, downloadDocAsWord, downloadDocAsExcel, downloadDocAsPdf } from '../../services/exportService';

export default function ChatMessage({ message, projectId, projectTitle }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMatch = message.content ? message.content.match(/\[DOWNLOAD_ACTION:([a-zA-Z]+):([a-zA-Z]+)\]/) : null;
  const format = downloadMatch ? downloadMatch[1].toLowerCase() : null;
  const docType = downloadMatch ? downloadMatch[2].toLowerCase() : null;

  const cleanedContent = message.content ? message.content.replace(/\[DOWNLOAD_ACTION:[a-zA-Z]+:[a-zA-Z]+\]/g, '').trim() : '';

  const handleDownload = async (fmt, type) => {
    if (!projectId || isDownloading) return;
    try {
      setIsDownloading(true);
      if (fmt === 'zip' || type === 'all') {
        await downloadZip(projectId, projectTitle || 'Project');
      } else if (fmt === 'word') {
        await downloadDocAsWord(projectId, type);
      } else if (fmt === 'excel') {
        await downloadDocAsExcel(projectId, type);
      } else if (fmt === 'pdf') {
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
        <div className="liquid-glass rounded-3xl rounded-tr-sm px-4 py-2.5 max-w-[70%] sm:max-w-[65%] border border-white/5 w-fit">
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">{message.content}</p>
        </div>
      </div>
    );
  }

  const getFormatIcon = () => {
    if (format === 'excel') return FileSpreadsheet;
    if (format === 'zip' || docType === 'all') return Archive;
    return FileText;
  };

  const FormatIcon = getFormatIcon();

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

            {/* Interactive Download Action Card */}
            {format && docType && (
              <div className="mt-3 pt-2.5 border-t border-white/10">
                <button
                  onClick={() => handleDownload(format, docType)}
                  disabled={isDownloading}
                  style={{ color: '#ffffff' }}
                  className="w-full bg-[#6C63FF]/30 hover:bg-[#6C63FF]/50 border border-[#6C63FF]/50 rounded-2xl px-3.5 py-2 text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer shadow-md group/btn"
                >
                  <div className="flex items-center gap-2">
                    <FormatIcon className="w-4 h-4 text-emerald-400" />
                    <span>
                      {format === 'zip' || docType === 'all'
                        ? 'Download All Project Files (.zip)'
                        : `Download ${docType.toUpperCase()} (${format.toUpperCase()})`}
                    </span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-white/70 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

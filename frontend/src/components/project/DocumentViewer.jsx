import { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Pencil, Lock, FileText, FileDown, Check, Search, X } from 'lucide-react';
import { downloadDocAsPdf, downloadDocAsWord } from '../../services/exportService';
import LoadingSpinner from '../common/LoadingSpinner';
import { updateDocument } from '../../services/documentService';
import { mdComponents, DOC_LABELS } from './markdownComponents';
import DocumentEditor from './DocumentEditor';
import UpgradeModal from '../common/UpgradeModal';

const DocumentViewer = ({ document, project, user, subscription, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(document.content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [copySuccess, setCopySuccess] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [wordSuccess, setWordSuccess] = useState(false);

  useEffect(() => {
    setEditContent(document.content);
    setIsEditing(false);
    setSearchQuery('');
  }, [document.content, document.docType]);

  const isPro = true;
  
  const handleCopy = () => {
    let content = document.content;
    if (document.docType === 'skills') {
      const bashBlocks = document.content.match(/```bash([\s\S]*?)```/);
      if (bashBlocks) content = bashBlocks[1].trim();
    }
    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadPdf = async () => {
    await downloadDocAsPdf(project._id, document.docType);
    setPdfSuccess(true);
    setTimeout(() => setPdfSuccess(false), 2000);
  };

  const handleDownloadWord = async () => {
    await downloadDocAsWord(project._id, document.docType);
    setWordSuccess(true);
    setTimeout(() => setWordSuccess(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const updated = await updateDocument(project._id, document.docType, editContent);
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      const msg = err.response?.data?.error;
      setSaveError(typeof msg === 'string' ? msg : msg?.message || 'Save failed.');
    } finally { setIsSaving(false); }
  };

  const matchCount = useMemo(() => {
    if (!searchQuery.trim() || !document?.content) return 0;
    const query = searchQuery.trim().toLowerCase();
    const matches = document.content.toLowerCase().split(query).length - 1;
    return matches;
  }, [searchQuery, document?.content]);

  const highlightedComponents = useMemo(() => {
    if (!searchQuery.trim()) return mdComponents;

    const query = searchQuery.trim();
    const highlightText = (text) => {
      if (typeof text !== 'string') return text;
      const escaped = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#38B2AC] text-slate-950 font-bold px-1 rounded shadow-sm">
            {part}
          </mark>
        ) : (
          part
        )
      );
    };

    return {
      ...mdComponents,
      p: ({ children }) => (
        <p className="text-sm text-[#3D4852] leading-relaxed mb-4 font-sans font-medium">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </p>
      ),
      li: ({ children }) => (
        <li className="text-sm text-[#3D4852] leading-relaxed mb-1 font-sans font-medium">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </li>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold text-[#3D4852] mt-6 mb-3 tracking-tight border-b border-[#3D4852]/10 pb-2">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-bold text-[#3D4852] mt-5 mb-2 tracking-tight">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-bold text-[#3D4852] mt-4 mb-2">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h3>
      )
    };
  }, [searchQuery]);

  const renderedMarkdown = useMemo(() => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={highlightedComponents}>
      {document.content}
    </ReactMarkdown>
  ), [document.content, highlightedComponents]);

  const renderButtons = () => {
    if (!isEditing) return (
      <button onClick={() => setIsEditing(true)} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
        <Pencil className="w-3.5 h-3.5" /> Edit
      </button>
    );
    return (
      <>
        <button onClick={() => { setIsEditing(false); setEditContent(document.content); }} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/50 hover:scale-105 transition-transform cursor-pointer">Cancel</button>
        <button onClick={handleSave} disabled={isSaving} className="liquid-glass-strong rounded-full px-4 py-2 text-xs text-white flex items-center gap-1.5 hover:scale-105 disabled:hover:scale-100 transition-transform cursor-pointer disabled:cursor-not-allowed">
          {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
        </button>
      </>
    );
  };

  return (
    <div className="liquid-glass-strong no-hover rounded-3xl flex flex-col h-full min-h-[450px] lg:min-h-0 overflow-hidden ring-1 ring-white/[0.15] shadow-2xl relative" style={{ willChange: 'transform' }}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
      <div className="flex flex-wrap items-center justify-between px-6 py-4 gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <p className="text-lg font-medium text-white">{DOC_LABELS[document.docType]}</p>
            {saveError && <p className="text-xs text-white/50 mt-2">{saveError}</p>}
          </div>

          {!isEditing && (
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter document..."
                className="liquid-glass text-xs text-white placeholder:text-white/40 pl-8 pr-7 py-1.5 rounded-full outline-none border border-white/10 focus:border-[#38B2AC] w-36 sm:w-48 transition-all"
              />
              {searchQuery ? (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 text-white/40 hover:text-white cursor-pointer border-none bg-transparent">
                  <X className="w-3 h-3" />
                </button>
              ) : null}
            </div>
          )}

          {searchQuery.trim() ? (
            <span className="text-[10px] liquid-glass text-[#38B2AC] px-2.5 py-0.5 rounded-full font-mono font-semibold">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'}
            </span>
          ) : null}
        </div>

        <div className="flex gap-2 items-center">
          {document.docType === 'skills' ? (
            <button onClick={handleCopy} className="liquid-glass-strong rounded-full px-4 py-2 text-xs text-blue-400 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-blue-500/10" aria-label="Copy all commands">
              {copySuccess ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy All</>}
            </button>
          ) : (
            <button onClick={handleCopy} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer min-w-[85px] justify-center" aria-label="Copy to clipboard">
              {copySuccess ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          )}
          <button onClick={handleDownloadPdf} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer min-w-[75px] justify-center" aria-label="Download as PDF">
            {pdfSuccess ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Done</> : <><FileText className="w-3.5 h-3.5" /> PDF</>}
          </button>
          <button onClick={handleDownloadWord} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer min-w-[85px] justify-center" aria-label="Download as Word">
            {wordSuccess ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Done</> : <><FileDown className="w-3.5 h-3.5" /> Word</>}
          </button>
          {renderButtons()}
        </div>
      </div>
      <div className="h-px bg-white/10 mx-6" />
      <div className="flex-1 overflow-y-auto hover-scrollbar px-6 py-6">
        {isEditing ? (
          <DocumentEditor content={editContent} onChange={setEditContent} saveError={saveError} />
        ) : renderedMarkdown}
      </div>
    </div>
  );
};
export default memo(DocumentViewer);

import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Pencil, Lock, FileText, FileDown, Check, Search, X, ChevronDown, Download } from 'lucide-react';
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
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef(null);

  const [copySuccess, setCopySuccess] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [wordSuccess, setWordSuccess] = useState(false);

  useEffect(() => {
    setEditContent(document.content);
    setIsEditing(false);
    setSearchQuery('');
    setShowExportMenu(false);
  }, [document.content, document.docType]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
    };
    window.document.addEventListener('mousedown', handleClickOutside);
    return () => window.document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <mark key={i} className="bg-[#38B2AC]/40 text-white font-bold px-1 rounded shadow-sm border border-[#38B2AC]/50">
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
        <p className="text-sm text-white/70 leading-relaxed mb-4 font-sans font-medium">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </p>
      ),
      li: ({ children }) => (
        <li className="text-sm text-white/70 leading-relaxed mb-1 font-sans font-medium">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </li>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold text-white mt-6 mb-3 tracking-tight border-b border-white/10 pb-2">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-bold text-white/90 mt-5 mb-2 tracking-tight">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-bold text-white/80 mt-4 mb-2">
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
      <button onClick={() => setIsEditing(true)} className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-slate-800 font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer border border-slate-200">
        <Pencil className="w-3.5 h-3.5 text-slate-700" /> Edit
      </button>
    );
    return (
      <div className="flex items-center gap-1.5">
        <button onClick={() => { setIsEditing(false); setEditContent(document.content); }} className="liquid-glass rounded-full px-3 py-1.5 text-xs text-slate-700 font-semibold hover:scale-105 transition-transform cursor-pointer border border-slate-200">Cancel</button>
        <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 hover:scale-105 disabled:hover:scale-100 transition-transform cursor-pointer disabled:cursor-not-allowed border-none shadow-sm">
          {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
        </button>
      </div>
    );
  };

  return (
    <div className="liquid-glass-strong no-hover rounded-3xl flex flex-col h-full min-h-[450px] lg:min-h-0 overflow-hidden border border-slate-200 shadow-lg relative bg-white" style={{ willChange: 'transform' }}>
      <div className="sticky top-0 z-20 shrink-0 backdrop-blur-xl bg-slate-50/80 border-b border-slate-200 grid grid-cols-12 items-center px-6 py-3.5 gap-1.5">
        <div className="col-span-12 sm:col-span-3 flex items-center gap-2.5 min-w-0">
          <p className="text-lg font-bold text-slate-900 truncate leading-tight">{DOC_LABELS[document.docType]}</p>
          {saveError && <p className="text-xs text-red-600 truncate">{saveError}</p>}
          {searchQuery.trim() ? (
            <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-mono font-bold shrink-0 border border-teal-200">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'}
            </span>
          ) : null}
        </div>

        <div className="col-span-12 sm:col-span-5 flex items-center">
          {!isEditing && (
            <div className="relative flex items-center w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter document..."
                className="w-full bg-white text-xs text-slate-900 placeholder:text-slate-400 pl-8 pr-7 py-1.5 rounded-full outline-none border border-slate-300 focus:border-blue-600 transition-all shadow-sm"
              />
              {searchQuery ? (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                  <X className="w-3 h-3" />
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div className="col-span-12 sm:col-span-4 flex items-center justify-end gap-2">
          {!isEditing && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-slate-800 font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer border border-slate-200"
                aria-label="Export options"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>Export</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl backdrop-blur-2xl z-30 py-1.5 flex flex-col gap-0.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => { handleCopy(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-blue-600" />
                      {document.docType === 'skills' ? 'Copy Commands' : 'Copy Content'}
                    </span>
                    {copySuccess && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { handleDownloadPdf(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      Export PDF
                    </span>
                    {pdfSuccess && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { handleDownloadWord(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-amber-600" />
                      Export Word (.docx)
                    </span>
                    {wordSuccess && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>
          )}
          {renderButtons()}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hover-scrollbar px-6 py-6">
        {isEditing ? (
          <DocumentEditor content={editContent} onChange={setEditContent} saveError={saveError} />
        ) : renderedMarkdown}
      </div>
    </div>
  );
};
export default memo(DocumentViewer);

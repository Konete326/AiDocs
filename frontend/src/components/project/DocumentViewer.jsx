import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Pencil, Lock, FileText, FileDown, Check, Search, X, ChevronDown, Download, GitCompare, ArrowUp } from 'lucide-react';
import { downloadDocAsPdf, downloadDocAsWord, downloadZip } from '../../services/exportService';
import LoadingSpinner from '../common/LoadingSpinner';
import { updateDocument } from '../../services/documentService';
import { mdComponents, DOC_LABELS } from './markdownComponents';
import DocumentEditor from './DocumentEditor';
import UpgradeModal from '../common/UpgradeModal';

const computeLineDiff = (oldText, newText) => {
  const oldLines = (oldText || '').split('\n');
  const newLines = (newText || '').split('\n');
  const result = [];
  let i = 0, j = 0;
  let additions = 0, deletions = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      result.push({ type: 'unchanged', text: newLines[j], lineOld: i + 1, lineNew: j + 1 });
      i++;
      j++;
    } else {
      let matchInNew = -1;
      for (let k = j + 1; k < Math.min(j + 8, newLines.length); k++) {
        if (oldLines[i] === newLines[k]) {
          matchInNew = k;
          break;
        }
      }
      if (matchInNew !== -1) {
        while (j < matchInNew) {
          result.push({ type: 'added', text: newLines[j], lineNew: j + 1 });
          additions++;
          j++;
        }
      } else {
        if (i < oldLines.length) {
          result.push({ type: 'removed', text: oldLines[i], lineOld: i + 1 });
          deletions++;
          i++;
        } else if (j < newLines.length) {
          result.push({ type: 'added', text: newLines[j], lineNew: j + 1 });
          additions++;
          j++;
        }
      }
    }
  }
  return { lines: result, additions, deletions };
};

const DocumentViewer = ({ document, project, user, subscription, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [editContent, setEditContent] = useState(document.content);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [saveError, setSaveError] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const lastSavedContentRef = useRef(document.content);

  const [copySuccess, setCopySuccess] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [wordSuccess, setWordSuccess] = useState(false);

  const scrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollTop(el.scrollTop > 300);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [showDiff, isEditing, document.docType]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setEditContent(document.content);
    lastSavedContentRef.current = document.content;
    setIsEditing(false);
    setShowDiff(false);
    setSearchQuery('');
    setShowExportMenu(false);
    setAutoSaveStatus('idle');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [document.content, document.docType]);

  useEffect(() => {
    if (!isEditing || editContent === lastSavedContentRef.current) return;

    setAutoSaveStatus('unsaved');
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
      setIsSaving(true);
      setAutoSaveStatus('saving');
      setSaveError('');
      try {
        const updated = await updateDocument(project._id, document.docType, editContent);
        lastSavedContentRef.current = editContent;
        onUpdate(updated);
        setAutoSaveStatus('saved');
      } catch (err) {
        const msg = err.response?.data?.error;
        setSaveError(typeof msg === 'string' ? msg : msg?.message || 'Auto-save failed.');
        setAutoSaveStatus('idle');
      } finally {
        setIsSaving(false);
      }
    }, 1000);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [editContent, isEditing, project._id, document.docType]);

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
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (editContent !== lastSavedContentRef.current) {
      setIsSaving(true);
      setSaveError('');
      try {
        const updated = await updateDocument(project._id, document.docType, editContent);
        lastSavedContentRef.current = editContent;
        onUpdate(updated);
      } catch (err) {
        const msg = err.response?.data?.error;
        setSaveError(typeof msg === 'string' ? msg : msg?.message || 'Save failed.');
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
    setAutoSaveStatus('idle');
  };

  const matchCount = useMemo(() => {
    if (!searchQuery.trim() || !document?.content) return 0;
    const query = searchQuery.trim().toLowerCase();
    const matches = document.content.toLowerCase().split(query).length - 1;
    return matches;
  }, [searchQuery, document?.content]);

  const diffData = useMemo(() => {
    if (!showDiff) return { lines: [], additions: 0, deletions: 0 };
    const prevText = document.previousContent || '';
    return computeLineDiff(prevText, document.content);
  }, [showDiff, document.previousContent, document.content]);

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
        <h1 className="text-2xl font-extrabold text-[#3D4852] mt-6 mb-3 tracking-tight border-b border-black/5 pb-2">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-bold text-[#3D4852] mt-5 mb-2 tracking-tight">
          {Array.isArray(children) ? children.map((c, i) => (typeof c === 'string' ? <span key={i}>{highlightText(c)}</span> : c)) : highlightText(children)}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-bold text-[#3D4852]/90 mt-4 mb-2">
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
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="neumorphic-btn rounded-2xl px-3.5 py-2 text-xs font-extrabold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer text-[#3D4852]"
          title="Compare Version Diff"
        >
          <GitCompare className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span className="text-[#3D4852] font-extrabold">{showDiff ? 'Markdown' : 'Diff'}</span>
        </button>
        <button onClick={() => { setIsEditing(true); setShowDiff(false); }} className="neumorphic-btn rounded-2xl px-4 py-2 text-xs text-[#3D4852] font-extrabold flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
          <Pencil className="w-3.5 h-3.5 text-[#6C63FF]" /> Edit
        </button>
      </div>
    );
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => { setIsEditing(false); setEditContent(document.content); }} className="neumorphic-btn rounded-2xl px-4 py-2 text-xs text-[#6B7280] font-bold hover:scale-105 transition-transform cursor-pointer">Cancel</button>
        <button onClick={handleSave} disabled={isSaving} className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-5 py-2 text-xs font-extrabold flex items-center gap-1.5 hover:scale-105 disabled:hover:scale-100 transition-transform cursor-pointer disabled:cursor-not-allowed border-none shadow-[4px_4px_10px_rgba(108,99,255,0.35)]">
          {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
        </button>
      </div>
    );
  };

  return (
    <div className="neumorphic-card rounded-[32px] flex flex-col h-full min-h-[450px] lg:min-h-0 overflow-hidden relative bg-[#E0E5EC] text-[#3D4852] border border-[#CAD1DB] shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)]">
      <div className="sticky top-0 z-20 shrink-0 bg-[#E0E5EC] border-b border-[#CAD1DB] flex flex-wrap sm:flex-nowrap items-center justify-between px-6 py-3.5 gap-3">
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">
          <p className="text-base sm:text-lg font-extrabold text-[#3D4852] leading-tight">{DOC_LABELS[document.docType]}</p>
          {saveError && <p className="text-xs text-rose-600 font-bold truncate">{saveError}</p>}
          {isEditing && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold shrink-0 neumorphic-inset flex items-center gap-1.5">
              {autoSaveStatus === 'saving' ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="text-[#6C63FF]">Auto-saving...</span>
                </>
              ) : autoSaveStatus === 'saved' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">Saved</span>
                </>
              ) : autoSaveStatus === 'unsaved' ? (
                <span className="text-amber-600">Unsaved</span>
              ) : null}
            </span>
          )}
          {showDiff && (
            <span className="text-[11px] bg-[#6C63FF]/15 text-[#6C63FF] px-3 py-1 rounded-full font-mono font-extrabold shrink-0 neumorphic-inset flex items-center gap-2">
              <span className="text-emerald-700">+{diffData.additions}</span>
              <span className="text-rose-700">-{diffData.deletions}</span>
              <span>v{Math.max(1, (document.version || 1) - 1)} ➔ v{document.version || 1} Diff</span>
            </span>
          )}
        </div>

        <div className="flex-1 max-w-sm flex items-center gap-2 mx-2">
          {!isEditing && (
            <>
              <div className="relative flex items-center flex-1">
                <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter document..."
                  className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] pl-8 pr-7 py-2 rounded-2xl outline-none neumorphic-inset"
                />
                {searchQuery ? (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
              {searchQuery.trim() ? (
                <span className="text-[10px] bg-[#6C63FF]/15 text-[#6C63FF] px-2.5 py-1 rounded-full font-mono font-bold shrink-0 neumorphic-inset whitespace-nowrap">
                  {matchCount} {matchCount === 1 ? 'match' : 'matches'}
                </span>
              ) : null}
            </>
          )}
        </div>

        <div className="col-span-12 sm:col-span-4 flex items-center justify-end gap-2 shrink-0">
          {!isEditing && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="neumorphic-btn rounded-2xl px-4 py-2 text-xs text-[#3D4852] font-bold flex items-center gap-1.5 cursor-pointer"
                aria-label="Export options"
              >
                <Download className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span>Export</span>
                <ChevronDown className={`w-3 h-3 text-[#6B7280] transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl neumorphic-card bg-[#E0E5EC] z-30 py-1.5 flex flex-col gap-0.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-[#CAD1DB] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
                  <button
                    onClick={() => { handleCopy(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-xs text-[#3D4852] hover:bg-[#6C63FF]/10 flex items-center justify-between transition-colors cursor-pointer font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />
                      {document.docType === 'skills' ? 'Copy Commands' : 'Copy Content'}
                    </span>
                    {copySuccess && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { handleDownloadPdf(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-xs text-[#3D4852] hover:bg-[#6C63FF]/10 flex items-center justify-between transition-colors cursor-pointer font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      Export Direct PDF (.pdf)
                    </span>
                    {pdfSuccess && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { handleDownloadWord(); setShowExportMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-xs text-[#3D4852] hover:bg-[#6C63FF]/10 flex items-center justify-between transition-colors cursor-pointer font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <FileDown className="w-3.5 h-3.5 text-amber-600" />
                      Export Word (.docx)
                    </span>
                    {wordSuccess && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { downloadZip(project?._id, project?.title); setShowExportMenu(false); }}
                    className="w-full px-4 py-2.5 text-left text-xs text-[#3D4852] hover:bg-[#6C63FF]/10 flex items-center justify-between transition-colors cursor-pointer font-bold border-t border-black/5"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-[#6C63FF]" />
                      Export Full Suite (.zip)
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
          {renderButtons()}
        </div>
      </div>
      <div ref={scrollRef} className={`flex-1 px-6 py-6 font-medium text-[#3D4852] ${isEditing ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}>
        {isEditing ? (
          <DocumentEditor content={editContent} onChange={setEditContent} saveError={saveError} />
        ) : showDiff ? (
          <div className="neumorphic-inset-deep p-4 rounded-2xl overflow-y-auto space-y-1 font-mono text-xs max-h-full">
            {diffData.lines.length === 0 ? (
              <div className="py-8 text-center text-[#6B7280] font-bold">No previous version changes to compare yet.</div>
            ) : (
              diffData.lines.map((line, idx) => {
                if (line.type === 'added') {
                  return (
                    <div key={idx} className="bg-emerald-500/15 text-emerald-900 border-l-4 border-emerald-500 px-3 py-1 rounded-r-md font-mono text-xs leading-relaxed flex items-start gap-2">
                      <span className="font-extrabold text-emerald-700 shrink-0 select-none">+</span>
                      <span className="whitespace-pre-wrap break-words">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === 'removed') {
                  return (
                    <div key={idx} className="bg-rose-500/15 text-rose-900 border-l-4 border-rose-500 px-3 py-1 rounded-r-md font-mono text-xs leading-relaxed flex items-start gap-2 opacity-80">
                      <span className="font-extrabold text-rose-700 shrink-0 select-none">-</span>
                      <span className="whitespace-pre-wrap break-words line-through">{line.text}</span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="px-3 py-0.5 text-[#3D4852]/80 font-mono text-xs leading-relaxed flex items-start gap-2">
                    <span className="text-[#6B7280]/40 shrink-0 select-none">&nbsp;&nbsp;</span>
                    <span className="whitespace-pre-wrap break-words">{line.text}</span>
                  </div>
                );
              })
            )}
          </div>
        ) : renderedMarkdown}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-5 right-6 z-30 w-10 h-10 rounded-2xl neumorphic-btn bg-[#E0E5EC] border border-[#CAD1DB] text-[#6C63FF] shadow-[5px_5px_14px_rgba(163,177,198,0.6),-5px_-5px_14px_rgba(255,255,255,0.7)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer animate-in fade-in zoom-in duration-200"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-[#6C63FF]" />
        </button>
      )}
    </div>
  );
};
export default memo(DocumentViewer);

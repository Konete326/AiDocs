import { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Pencil, Lock, FileText, FileDown, Check } from 'lucide-react';
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
  
  const [copySuccess, setCopySuccess] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [wordSuccess, setWordSuccess] = useState(false);

  useEffect(() => {
    setEditContent(document.content);
    setIsEditing(false);
  }, [document.content, document.docType]);

  const isPro = user?.role === 'admin' || ['pro', 'team'].includes(subscription?.plan);
  
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

  const renderedMarkdown = useMemo(() => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
      {document.content}
    </ReactMarkdown>
  ), [document.content]);

  const renderButtons = () => {
    if (!isPro) return (
      <button onClick={() => setShowUpgrade(true)} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/30 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
        <Lock className="w-3.5 h-3.5" /> Edit (Pro)
      </button>
    );
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
    <>
    <div className="liquid-glass-strong rounded-3xl flex flex-col h-full min-h-[600px] overflow-hidden border border-white/10 group shadow-2xl relative" style={{ willChange: 'transform' }}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-lg font-medium text-white">{DOC_LABELS[document.docType]}</p>
          {saveError && <p className="text-xs text-white/50 mt-2">{saveError}</p>}
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
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isEditing ? (
          <DocumentEditor content={editContent} onChange={setEditContent} saveError={saveError} />
        ) : renderedMarkdown}
      </div>
    </div>
      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={() => { setShowUpgrade(false); navigate('/pricing'); }}
      />
    </>
  );
};
export default memo(DocumentViewer);

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Pencil, Lock, FileText, FileDown } from 'lucide-react';
import { downloadDocAsPdf, downloadDocAsWord } from '../../services/exportService';
import LoadingSpinner from '../common/LoadingSpinner';
import { updateDocument } from '../../services/documentService';
import { mdComponents, DOC_LABELS } from './markdownComponents';
import DocumentEditor from './DocumentEditor';

const DocumentViewer = ({ document, project, user, subscription, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(document.content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setEditContent(document.content);
    setIsEditing(false);
  }, [document]);

  const isPro = user?.role === 'admin' || ['pro', 'team'].includes(subscription?.plan);
  const handleCopy = () => navigator.clipboard.writeText(document.content);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const updated = await updateDocument(project._id, document.docType, editContent);
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.response?.data?.error || 'Save failed.');
    } finally { setIsSaving(false); }
  };

  const renderButtons = () => {
    if (!isPro) return (
      <button onClick={() => navigate('/pricing')} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/30 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
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
        <button onClick={handleSave} disabled={isSaving} className="liquid-glass-strong rounded-full px-4 py-2 text-xs text-white flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
          {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
        </button>
      </>
    );
  };

  return (
    <div className="liquid-glass-strong rounded-3xl flex flex-col min-h-[600px]">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-lg font-medium text-white">{DOC_LABELS[document.docType]}</p>
          <p className="text-xs text-white/40 mt-0.5">v{document.version} · {document.modelUsed}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={handleCopy} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button onClick={() => downloadDocAsPdf(project._id, document.docType)} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
            <FileText className="w-3.5 h-3.5" /> PDF
          </button>
          <button onClick={() => downloadDocAsWord(project._id, document.docType)} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer">
            <FileDown className="w-3.5 h-3.5" /> Word
          </button>
          {renderButtons()}
        </div>
      </div>
      <div className="h-px bg-white/10 mx-6" />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isEditing ? (
          <DocumentEditor content={editContent} onChange={setEditContent} saveError={saveError} />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{document.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};
export default DocumentViewer;

import { memo } from 'react';
import { FileText, Loader, CheckCircle } from 'lucide-react';
import SkillsList from './SkillsList';

const DOC_LABELS = {
  prd: 'Product Requirements',
  srd: 'Software Requirements',
  techStack: 'Tech Stack',
  dbSchema: 'Database Schema',
  userFlows: 'User Flows',
  mvpPlan: 'MVP Plan',
  folderStructure: 'Folder Structure',
  claudeContext: 'Claude Context',
  agentSystemPrompt: 'Agent Prompts',
  skills: 'Project Skills',
};

const DOC_ORDER = [
  'prd','srd','techStack','dbSchema','userFlows',
  'mvpPlan','folderStructure','claudeContext','agentSystemPrompt', 'skills'
];

const DocsList = ({ documents, selectedDoc, onSelect, isGenerating, projectId }) => (
  <div className="liquid-glass rounded-3xl p-6 flex flex-col lg:space-y-2 h-full border border-white/5" style={{ willChange: 'transform' }}>
    <div className="flex items-center justify-between px-2 mb-3 lg:mb-1">
      <span className="text-xs uppercase tracking-widest text-white/50">Documents</span>
      {isGenerating && (
        <span className="text-xs text-white/40">{documents.length}/9 ready</span>
      )}
    </div>
    
    <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
    {DOC_ORDER.map((type) => {
      const doc = type === 'skills' ? { docType: 'skills', version: '1.0' } : documents.find((d) => d.docType === type);
      const isGenerated = !!doc;
      const isSelected = selectedDoc?.docType === type;
      return (
        <div
          key={type}
          onClick={() => isGenerated && onSelect(doc)}
          className={[
            'liquid-glass rounded-2xl px-4 py-3 flex items-center gap-3 w-56 flex-shrink-0 lg:w-full',
            isSelected ? 'liquid-glass-strong' : '',
            isGenerated ? 'cursor-pointer hover:scale-[1.02] transition-transform' : 'opacity-50 cursor-not-allowed',
          ].join(' ')}
          style={{ willChange: isGenerated ? 'transform' : 'auto' }}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            {isGenerated
              ? <FileText className="w-4 h-4 text-white/70" />
              : isGenerating
                ? <Loader className="w-4 h-4 text-white/30 animate-spin" />
                : <span className="text-white/20 text-xs">—</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm truncate ${isGenerated ? 'text-white/80' : 'text-white/40'}`}>
              {DOC_LABELS[type]}
            </p>
            {isGenerated && (
              <p className="text-xs text-white/40">v{doc.version}</p>
            )}
          </div>
          {isGenerated && <CheckCircle className="w-4 h-4 text-white/50 flex-shrink-0" />}
        </div>
      );
    })}
    </div>

    <div className="h-px bg-white/5 my-2" />
    <div className="flex flex-col gap-2">
      <SkillsList projectId={projectId} />
    </div>
  </div>
);

export default memo(DocsList);

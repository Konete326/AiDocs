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
  rules: 'Agent Rules',
};

const DOC_ORDER = [
  'prd','srd','techStack','dbSchema','userFlows',
  'mvpPlan','folderStructure','claudeContext','agentSystemPrompt', 'skills', 'rules'
];

const DocsList = ({ documents, selectedDoc, onSelect, isGenerating, projectId, skills, onSkillsUpdate }) => (
  <div className="liquid-glass no-hover rounded-3xl p-6 flex flex-col lg:space-y-2 h-full ring-1 ring-white/[0.15] overflow-hidden" style={{ willChange: 'transform' }}>
    <div className="flex items-center justify-between px-2 mb-3 lg:mb-1 flex-shrink-0">
      <span className="text-xs uppercase tracking-widest text-white/50">Documents</span>
      {isGenerating && (
        <span className="text-xs text-white/40">{documents.length}/9 ready</span>
      )}
    </div>
    
    <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[160px] lg:max-h-[185px] hover-scrollbar pr-1 p-1 flex-shrink-0">
    {DOC_ORDER.map((type) => {
      const doc = documents.find((d) => d.docType === type);
      const isGenerated = !!doc;
      const isSelected = selectedDoc?.docType === type;
      return (
        <div
          key={type}
          onClick={() => isGenerated && onSelect(doc)}
          className={[
            'rounded-2xl px-3.5 py-3 flex items-center gap-2.5 w-full transition-all border',
            isSelected 
              ? 'bg-[#6C63FF]/10 border-[#6C63FF]/40 shadow-[0_0_15px_rgba(108,99,255,0.15)]' 
              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10',
            isGenerated ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed',
          ].join(' ')}
          style={{ willChange: isGenerated ? 'transform' : 'auto' }}
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            {isGenerated
              ? <FileText className="w-3.5 h-3.5 text-white/70" />
              : isGenerating
                ? <Loader className="w-3.5 h-3.5 text-white/30 animate-spin" />
                : <span className="text-white/20 text-xs">—</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs truncate ${isGenerated ? 'text-white/80' : 'text-white/40'}`}>
              {DOC_LABELS[type]}
            </p>
            {isGenerated && (
              <p className="text-[10px] text-white/40">v{doc.version}</p>
            )}
          </div>
          {isGenerated && (
            <CheckCircle 
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${isSelected ? 'text-green-500' : 'text-white/50'}`} 
            />
          )}
        </div>
      );
    })}
    </div>

    <div className="h-px bg-white/5 my-2" />
    <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
      <SkillsList projectId={projectId} initialSkills={skills} onSkillsUpdate={onSkillsUpdate} />
    </div>
  </div>
);

export default memo(DocsList);

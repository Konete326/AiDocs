import { memo } from 'react';
import { FileText, Loader, CheckCircle } from 'lucide-react';

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
  designSystem: 'Design System',
  skills: 'Project Skills',
  rules: 'Agent Rules',
};

const DOC_ORDER = [
  'prd','srd','techStack','dbSchema','userFlows',
  'mvpPlan','folderStructure','claudeContext','agentSystemPrompt', 'designSystem', 'skills', 'rules'
];

const DocsList = ({ documents, selectedDoc, onSelect, isGenerating }) => (
  <div className="liquid-glass no-hover rounded-3xl p-6 flex flex-col h-full ring-1 ring-white/[0.15] overflow-hidden" style={{ willChange: 'transform' }}>
    <div className="flex items-center justify-between px-2 mb-4 flex-shrink-0">
      <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Project Documents</span>
      {isGenerating && (
        <span className="text-xs text-white/40">{documents.length}/9 ready</span>
      )}
    </div>
    
    <div className="space-y-2 overflow-y-auto flex-1 hover-scrollbar custom-scrollbar pr-1">
      {DOC_ORDER.map((type) => {
        const doc = documents.find((d) => d.docType === type);
        const isGenerated = !!doc;
        const isSelected = selectedDoc?.docType === type;
        return (
          <div
            key={type}
            onClick={() => isGenerated && onSelect(doc)}
            className={[
              'rounded-2xl px-4 py-3 flex items-center gap-3 w-full transition-all border',
              isSelected 
                ? 'bg-[#38B2AC] shadow-[3px_3px_8px_rgba(56,178,172,0.3)] border-[#38B2AC]' 
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20',
              isGenerated ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed',
            ].join(' ')}
            style={{ willChange: isGenerated ? 'transform' : 'auto' }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
              {isGenerated
                ? <FileText className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                : isGenerating
                  ? <Loader className="w-4 h-4 text-white/30 animate-spin" />
                  : <span className="text-white/20 text-xs">—</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={isSelected ? { color: '#ffffff' } : undefined}
                className={`text-xs sm:text-sm font-medium truncate ${isSelected ? '' : isGenerated ? 'text-white/90' : 'text-white/40'}`}
              >
                {DOC_LABELS[type]}
              </p>
              {isGenerated && (
                <p
                  style={isSelected ? { color: 'rgba(255, 255, 255, 0.85)' } : undefined}
                  className={`text-[10px] mt-0.5 ${isSelected ? '' : 'text-white/40'}`}
                >
                  v{doc.version}
                </p>
              )}
            </div>
            {isGenerated && (
              <CheckCircle 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-emerald-300' : 'text-white/40'}`} 
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default memo(DocsList);

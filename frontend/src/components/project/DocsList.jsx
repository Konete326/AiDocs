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
  <div className="neumorphic-card rounded-[32px] p-6 flex flex-col h-full bg-[#E0E5EC] border border-white/60 shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)] overflow-hidden" style={{ willChange: 'transform' }}>
    <div className="flex items-center justify-between px-2 mb-4 flex-shrink-0">
      <span className="text-xs uppercase tracking-widest text-[#6B7280] font-extrabold">Project Documents</span>
      {isGenerating && (
        <span className="text-xs text-[#6C63FF] font-bold">{documents.length}/9 ready</span>
      )}
    </div>
    
    <div className="space-y-2.5 overflow-y-auto flex-1 hover-scrollbar custom-scrollbar pr-1">
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
                ? 'bg-[#6C63FF] shadow-[5px_5px_12px_rgba(108,99,255,0.35)] border-[#6C63FF] text-white' 
                : 'bg-[#E0E5EC] border-white/60 text-[#3D4852] hover:bg-white/40 shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.5)]',
              isGenerated ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed',
            ].join(' ')}
            style={{ willChange: isGenerated ? 'transform' : 'auto' }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white/20' : 'bg-black/5'}`}>
              {isGenerated
                ? <FileText className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`} />
                : isGenerating
                  ? <Loader className="w-4 h-4 text-[#6C63FF] animate-spin" />
                  : <span className="text-[#6B7280] text-xs">—</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p
                style={isSelected ? { color: '#ffffff' } : undefined}
                className={`text-xs sm:text-sm font-extrabold truncate ${isSelected ? '' : isGenerated ? 'text-[#3D4852]' : 'text-[#6B7280]'}`}
              >
                {DOC_LABELS[type]}
              </p>
              {isGenerated && (
                <p
                  style={isSelected ? { color: 'rgba(255, 255, 255, 0.85)' } : undefined}
                  className={`text-[10px] font-bold mt-0.5 ${isSelected ? '' : 'text-[#6B7280]'}`}
                >
                  v{doc.version}
                </p>
              )}
            </div>
            {isGenerated && (
              <CheckCircle 
                className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`} 
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default memo(DocsList);

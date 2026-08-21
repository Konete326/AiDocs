import { memo } from 'react';
import { 
  FileText, Loader, CheckCircle, PanelLeftClose, PanelLeftOpen,
  Layers, Database, FolderTree, Palette, Zap, ShieldCheck, Terminal, Bot, Workflow, ListTodo, Code2 
} from 'lucide-react';

const DOC_ICONS = {
  prd: FileText,
  srd: Code2,
  techStack: Layers,
  dbSchema: Database,
  userFlows: Workflow,
  mvpPlan: ListTodo,
  folderStructure: FolderTree,
  claudeContext: Bot,
  agentSystemPrompt: Terminal,
  designSystem: Palette,
  skills: Zap,
  rules: ShieldCheck,
};

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

const DocsList = ({ documents, selectedDoc, onSelect, isGenerating, isCollapsed, onToggleCollapse }) => {
  if (isCollapsed) {
    return (
      <div className="neumorphic-card rounded-[28px] p-2.5 flex flex-col items-center h-full bg-[#E0E5EC] border-2 border-[#CAD1DB] shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)]">
        <button
          onClick={onToggleCollapse}
          className="w-10 h-10 rounded-2xl neumorphic-btn flex items-center justify-center text-[#6C63FF] hover:scale-105 active:scale-95 transition-all cursor-pointer mb-2 border border-[#CAD1DB] shrink-0"
          title="Expand Document List"
        >
          <PanelLeftOpen className="w-4 h-4 text-[#6C63FF]" />
        </button>

        <div className="w-full h-px bg-[#CAD1DB] mb-2 shrink-0" />

        <div className="space-y-2 overflow-y-auto flex-1 hover-scrollbar custom-scrollbar py-1 flex flex-col items-center w-full">
          {DOC_ORDER.map((type) => {
            const doc = documents.find((d) => d.docType === type);
            const isGenerated = !!doc;
            const isSelected = selectedDoc?.docType === type;
            const Icon = DOC_ICONS[type] || FileText;

            return (
              <div key={type} className="relative group flex items-center justify-center shrink-0">
                <button
                  onClick={() => isGenerated && onSelect(doc)}
                  disabled={!isGenerated}
                  className={[
                    'w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0',
                    isSelected
                      ? 'bg-[#E0E5EC] border-2 border-[#6C63FF] text-[#6C63FF] neumorphic-inset'
                      : 'bg-[#E0E5EC] border border-[#CAD1DB] text-[#6B7280] hover:text-[#6C63FF] hover:bg-white/40 shadow-[3px_3px_6px_rgba(163,177,198,0.35),-3px_-3px_6px_rgba(255,255,255,0.6)]',
                    isGenerated ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed',
                  ].join(' ')}
                >
                  {isGenerated ? (
                    <Icon className="w-4 h-4 text-[#6C63FF]" />
                  ) : isGenerating ? (
                    <Loader className="w-3.5 h-3.5 text-[#6C63FF] animate-spin" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-[#6B7280]" />
                  )}
                </button>

                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#2D3748] text-white text-xs font-bold whitespace-nowrap shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 flex items-center gap-1.5 border border-white/10">
                  <span>{DOC_LABELS[type]}</span>
                  {isGenerated ? (
                    <span className="text-[10px] bg-[#6C63FF] text-white px-1.5 py-0.5 rounded-md font-mono">v{doc.version}</span>
                  ) : (
                    <span className="text-[10px] text-white/50">Pending</span>
                  )}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#2D3748] rotate-45 border-l border-b border-white/10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="neumorphic-card rounded-[28px] p-5 flex flex-col h-full bg-[#E0E5EC] border-2 border-[#CAD1DB] shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)] overflow-hidden">
      <div className="flex items-center justify-between px-1 mb-3.5 flex-shrink-0">
        <span className="text-xs uppercase tracking-widest text-[#6B7280] font-extrabold">Project Documents</span>
        <div className="flex items-center gap-2">
          {isGenerating && (
            <span className="text-xs text-[#6C63FF] font-bold">{documents.length}/9 ready</span>
          )}
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-xl neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#6C63FF] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#CAD1DB]"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2.5 overflow-y-auto flex-1 hover-scrollbar custom-scrollbar pr-1">
        {DOC_ORDER.map((type) => {
          const doc = documents.find((d) => d.docType === type);
          const isGenerated = !!doc;
          const isSelected = selectedDoc?.docType === type;
          const Icon = DOC_ICONS[type] || FileText;

          return (
            <div
              key={type}
              onClick={() => isGenerated && onSelect(doc)}
              className={[
                'rounded-2xl px-4 py-3 flex items-center gap-3 w-full transition-all',
                isSelected 
                  ? 'bg-[#E0E5EC] border-2 border-[#6C63FF] text-[#2D3748] neumorphic-inset' 
                  : 'bg-[#E0E5EC] border border-[#CAD1DB] text-[#3D4852] hover:bg-white/40 shadow-[3px_3px_6px_rgba(163,177,198,0.35),-3px_-3px_6px_rgba(255,255,255,0.6)]',
                isGenerated ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed',
              ].join(' ')}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-[#6C63FF] text-white shadow-sm' : 'bg-black/5 text-[#6C63FF]'}`}>
                {isGenerated
                  ? <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`} />
                  : isGenerating
                    ? <Loader className="w-4 h-4 text-[#6C63FF] animate-spin" />
                    : <span className="text-[#6B7280] text-xs">—</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs sm:text-sm font-extrabold truncate ${isSelected ? 'text-[#1E293B]' : isGenerated ? 'text-[#3D4852]' : 'text-[#6B7280]'}`}>
                  {DOC_LABELS[type]}
                </p>
                {isGenerated && (
                  <p className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-[#6C63FF]' : 'text-[#6B7280]'}`}>
                    v{doc.version}
                  </p>
                )}
              </div>
              {isGenerated && (
                <CheckCircle 
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-[#6C63FF]' : 'text-[#A0AEC0]'}`} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(DocsList);

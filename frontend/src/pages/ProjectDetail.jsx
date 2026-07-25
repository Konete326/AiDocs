import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { triggerGeneration } from '../services/projectService';
import { useProjectPolling } from '../hooks/useProjectPolling';
import ProjectHeader from '../components/project/ProjectHeader';
import DocsList from '../components/project/DocsList';
import GeneratingState from '../components/project/GeneratingState';
import ErrorState from '../components/project/ErrorState';
import DocumentViewer from '../components/project/DocumentViewer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getDynamicAgentRules } from '../constants/agentRules';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    project, setProject, documents, setDocuments,
    skills, setSkills,
    selectedDoc, setSelectedDoc, subscription, isLoading, error
  } = useProjectPolling(id);

  // Allows user to jump into partial bento-grid view during generation
  const [viewingPartial, setViewingPartial] = useState(false);

  // ─── Document Synthesis ────────────────────────────────────────────────────
  const synthesizedDocs = useMemo(() => {
    const list = [...documents];
    
    // Virtual Skills Doc
    if (skills && skills.length > 0) {
      let content = `# Project Skills: ${project?.title || 'Loading...'}\n\n`;
      content += `Copy and run these commands in your terminal to empower your AI assistant for this project.\n\n`;
      content += `\`\`\`bash\n`;
      skills.forEach(s => {
        content += `${s.command}\n`;
      });
      content += `\`\`\`\n\n`;
      
      content += `## Details\n\n`;
      skills.forEach(s => {
        content += `### ${s.name}\n${s.description}\n\n---\n\n`;
      });

      list.push({ docType: 'skills', content, version: '1.0' });
    } else if (project) {
      // Even if no skills yet, show it
      list.push({ docType: 'skills', content: '# Project Skills\n\nNo skills added yet.', version: '1.0' });
    }
    
    // Virtual Design System Doc
    if (!list.some(d => d.docType === 'designSystem')) {
      const ds = project?.designSystem || {
        id: 'monochrome',
        name: 'Monochrome',
        tagline: 'Reduction to Essence. Strips design down to black, white, and typography.',
        prompt: `Design Style: Minimalist Monochrome\n- Colors: #FFFFFF background, #000000 foreground.\n- Typography: Playfair Display + Source Serif 4 + JetBrains Mono.\n- Border Radius: 0px.`
      };
      const content = `# Design System Specification: ${ds.name}

## 1. Executive Summary & Design Vision
- **Theme Identity:** ${ds.name} (${ds.id})
- **Design Philosophy:** ${ds.tagline || 'Modern high-fidelity visual design architecture.'}
- **Target Application:** ${project?.title || 'Project'}

---

## 2. Core Prompt for AI Builders & Developers
> **Mandate for AI Builders:** Every UI component, page layout, typography hierarchy, color choice, and micro-interaction built for this codebase MUST strictly adhere to the following design system prompt:

\`\`\`markdown
${ds.prompt || ds.tagline || ''}
\`\`\`

---

## 3. Visual Styling & Implementation Guidelines
- **Typography & Font Family:** Implement exact typography rules as specified in the theme preset.
- **Color Palette & Accents:** All background, surface, text, and accent colors strictly follow this preset palette.
- **Buttons & Interactivity:** High contrast action buttons, smooth hover transitions, and explicit pointer cursors (\`cursor-pointer\`).
- **Containers & Glass Cards:** Structural containers reflect theme radius and shadow specs.
`;
      list.push({ docType: 'designSystem', content, version: '1.0' });
    }

    // Virtual Rules Doc
    list.push({ docType: 'rules', content: getDynamicAgentRules(project), version: '1.0' });

    return list;
  }, [documents, skills, project]);

  const activeDoc = useMemo(() => {
    if (!selectedDoc) return null;
    return synthesizedDocs.find(d => d.docType === selectedDoc.docType) || selectedDoc;
  }, [selectedDoc, synthesizedDocs]);

  const handleRetry = useCallback(async () => {
    await triggerGeneration(id);
    setProject((prev) => ({ ...prev, status: 'generating' }));
    setViewingPartial(false);
  }, [id, setProject]);

  const handleDocSelect = useCallback((doc) => {
    setSelectedDoc(doc);
  }, [setSelectedDoc]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error || !project) return <div className="h-screen flex items-center justify-center text-white/60">{error || 'Project not found.'}</div>;

  const isGenerating = project.status === 'generating';

  // Show generating screen unless user clicked "View Ready Docs"
  if (isGenerating && !viewingPartial) return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-white z-[0]" />
      <div className="relative z-10 pt-28 px-6 py-8 md:px-12">
        <GeneratingState
          project={project}
          subscription={subscription}
          onViewReady={() => setViewingPartial(true)}
        />
      </div>
    </div>
  );

  if (project.status === 'error') return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-white z-[0]" />
      <div className="relative z-10 pt-28 px-6 py-8 md:px-12">
        <ErrorState onRetry={handleRetry} />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="fixed inset-0 bg-white z-[0]" />
      <div className="relative z-10 pt-20 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {isGenerating && viewingPartial && (
            <div className="liquid-glass rounded-2xl px-6 py-3 mb-6 flex items-center justify-between border border-blue-200 bg-blue-50/50">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-slate-800">
                  Still generating — {project.docsGenerated?.length || 0} of 9 docs ready
                </span>
              </div>
              <button
                onClick={() => setViewingPartial(false)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View progress →
              </button>
            </div>
          )}

          <ProjectHeader
            project={project}
            onBack={() => navigate('/dashboard')}
            subscription={subscription}
            onProjectUpdated={(updated) => setProject(updated)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 lg:h-[calc(100vh-230px)] min-h-[500px] lg:min-h-0">

            <div className="md:col-span-1 lg:col-span-3 h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <DocsList
                documents={synthesizedDocs}
                selectedDoc={activeDoc}
                onSelect={handleDocSelect}
                isGenerating={isGenerating}
              />
            </div>

            <div className="md:col-span-1 lg:col-span-5 h-full overflow-hidden rounded-3xl">
              {selectedDoc ? (
                <DocumentViewer
                  document={activeDoc}
                  project={project}
                  user={user}
                  subscription={subscription}
                  onUpdate={(updated) => {
                    setDocuments((prev) => prev.map((d) => d.docType === updated.docType ? updated : d));
                    setSelectedDoc(updated);
                  }}
                />
              ) : project.status === 'draft' ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center gap-6 h-full justify-center shadow-sm">
                  <p className="text-slate-700 text-sm font-medium">Your project is ready to generate.</p>
                  <button
                    onClick={handleRetry}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-sm font-semibold hover:scale-105 transition-transform cursor-pointer shadow-md border-none"
                  >
                    Generate Documents
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center justify-center h-full min-h-[300px] gap-4">
                  {isGenerating ? (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                      <p className="text-slate-600 text-sm font-medium">Select a ready doc on the left to preview it.</p>
                    </>
                  ) : (
                    <p className="text-slate-600 text-sm font-medium">Select a document to preview it here.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

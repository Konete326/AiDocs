import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { triggerGeneration } from '../services/projectService';
import { useProjectPolling } from '../hooks/useProjectPolling';
import ProjectHeader from '../components/project/ProjectHeader';
import DocsList from '../components/project/DocsList';
import GeneratingState from '../components/project/GeneratingState';
import ErrorState from '../components/project/ErrorState';
import DocumentViewer from '../components/project/DocumentViewer';
import ProjectInfoPanel from '../components/project/ProjectInfoPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    project, setProject, documents, setDocuments,
    selectedDoc, setSelectedDoc, subscription, isLoading, error
  } = useProjectPolling(id);

  const handleRetry = async () => {
    await triggerGeneration(id);
    setProject((prev) => ({ ...prev, status: 'generating' }));
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error || !project) return <div className="h-screen flex items-center justify-center text-white/60">{error || 'Project not found.'}</div>;

  const isGenerating = project.status === 'generating';
  const isComplete = project.status === 'complete';

  if (isGenerating) return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 pt-20 px-6 py-8 md:px-12">
        <GeneratingState 
          project={project} 
          subscription={subscription} 
        />
      </div>
    </div>
  );

  if (project.status === 'error') return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 pt-20 px-6 py-8 md:px-12">
        <ErrorState onRetry={handleRetry} />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 pt-20 px-4 py-8 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">

          <ProjectHeader
            project={project}
            onBack={() => navigate('/dashboard')}
            subscription={subscription}
          />

          {/* Bento Grid — mirrors pricing page columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 auto-rows-min">

            {/* DocsList — col-span-3 (like FreeCard) */}
            <div className="md:col-span-1 lg:col-span-3">
              <DocsList
                documents={documents}
                selectedDoc={selectedDoc}
                onSelect={setSelectedDoc}
                isGenerating={isGenerating}
              />
            </div>

            {/* DocumentViewer — col-span-5 (like ProCard) */}
            <div className="md:col-span-1 lg:col-span-5">
              {isComplete && selectedDoc ? (
                <DocumentViewer
                  document={selectedDoc}
                  project={project}
                  user={user}
                  subscription={subscription}
                  onUpdate={(updated) => {
                    setDocuments((prev) => prev.map((d) => d.docType === updated.docType ? updated : d));
                    setSelectedDoc(updated);
                  }}
                />
              ) : project.status === 'draft' ? (
                <div className="liquid-glass-strong rounded-3xl p-10 text-center flex flex-col items-center gap-6 h-full justify-center">
                  <p className="text-white/60 text-sm">Your project is ready to generate.</p>
                  <button
                    onClick={handleRetry}
                    className="liquid-glass-strong rounded-full px-8 py-3 text-white text-sm hover:scale-105 transition-transform cursor-pointer"
                  >
                    Generate Documents
                  </button>
                </div>
              ) : (
                <div className="liquid-glass rounded-3xl p-10 text-center flex items-center justify-center h-full min-h-[300px]">
                  <p className="text-white/40 text-sm">Select a document to preview it here.</p>
                </div>
              )}
            </div>

            {/* Project Info Panel — col-span-8 (like TeamCard) */}
            <div className="md:col-span-2 lg:col-span-8">
              <ProjectInfoPanel project={project} subscription={subscription} documents={documents} />
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

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
import LoadingSpinner from '../components/common/LoadingSpinner';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

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

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-black"><LoadingSpinner /></div>;
  if (error || !project) return <div className="h-screen flex items-center justify-center bg-black text-white/60">{error || 'Project not found.'}</div>;

  const renderContent = () => {
    if (project.status === 'generating') return <GeneratingState docsGenerated={project.docsGenerated} />;
    if (project.status === 'error') return <ErrorState onRetry={handleRetry} />;
    if (project.status === 'complete' && selectedDoc) return (
      <DocumentViewer
        document={selectedDoc} project={project} user={user} subscription={subscription}
        onUpdate={(updated) => {
          setDocuments((prev) => prev.map((d) => d.docType === updated.docType ? updated : d));
          setSelectedDoc(updated);
        }}
      />
    );
    if (project.status === 'draft') return (
      <div className="liquid-glass rounded-3xl p-8 text-center">
        <p className="text-white/60 text-sm mb-4">Your project is ready to generate.</p>
        <button onClick={handleRetry} className="liquid-glass-strong rounded-full px-8 py-3 text-white text-sm hover:scale-105 transition-transform cursor-pointer">
          Generate Documents
        </button>
      </div>
    );
    return null;
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" src={VIDEO_URL} />
      <div className="relative z-10 pt-20 px-6 py-8 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
          <ProjectHeader 
            project={project} 
            onBack={() => navigate('/dashboard')} 
            subscription={subscription}
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-72 flex-shrink-0">
              <DocsList documents={documents} selectedDoc={selectedDoc} onSelect={setSelectedDoc} isGenerating={project.status === 'generating'} />
            </div>
            <div className="flex-1">{renderContent()}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default ProjectDetail;

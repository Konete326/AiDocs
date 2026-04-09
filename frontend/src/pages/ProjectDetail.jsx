import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProject, triggerGeneration } from '../services/projectService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProjectStatusCard from '../components/project/ProjectStatusCard';
import GenerationProgress from '../components/project/GenerationProgress';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getProject(id);
        if (active) setProject(data);
      } catch (err) {} finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (project?.status !== 'generating') return;
    const interval = setInterval(async () => {
      try {
        const up = await getProject(id);
        setProject(up);
        if (up.status !== 'generating') clearInterval(interval);
      } catch (e) { clearInterval(interval); }
    }, 5000);
    return () => clearInterval(interval);
  }, [project?.status, id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><LoadingSpinner /></div>;
  if (!project) return <div className="h-screen flex items-center justify-center bg-black text-white">Project not found</div>;

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" />
      <div className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <ProjectStatusCard 
            project={project} 
            onBack={() => navigate('/dashboard')} 
            onRetry={() => triggerGeneration(id)}
            onViewDocs={() => {}} 
          />
          <GenerationProgress current={project.docsGenerated?.length || 0} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

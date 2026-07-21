import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Cpu, Library } from 'lucide-react';
import { getProject } from '../services/projectService';
import { getProjectSkills } from '../services/skillsService';
import SkillsList from '../components/project/SkillsList';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProjectSkills() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const [proj, fetchedSkills] = await Promise.all([
          getProject(id),
          getProjectSkills(id)
        ]);
        setProject(proj);
        setSkills(fetchedSkills || []);
      } catch (err) {
        setError('Failed to load project skills.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error || !project) return <div className="h-screen flex items-center justify-center text-white/60">{error || 'Project not found.'}</div>;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 min-h-screen flex flex-col pt-20 px-4 sm:px-6 py-6 max-w-6xl mx-auto overflow-hidden">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/projects/${id}`)} 
              className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Project
            </button>
            <h1 className="text-sm sm:text-base font-medium text-white truncate max-w-[200px] sm:max-w-md">
              {project?.title} — Skills
            </h1>
          </div>
          <div className="liquid-glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" /> Skills Manager
          </div>
        </header>

        {/* Dedicated Skills Container */}
        <div className="flex-1 flex flex-col liquid-glass-strong rounded-3xl p-6 shadow-2xl border border-white/10 overflow-hidden">
          <SkillsList 
            projectId={id} 
            initialSkills={skills} 
            onSkillsUpdate={setSkills} 
          />
        </div>

      </div>
    </div>
  );
}

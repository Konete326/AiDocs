import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects, deleteProject } from '../services/projectService';
import { getMySubscription } from '../services/subscriptionService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import SubscriptionBanner from '../components/dashboard/SubscriptionBanner';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, subData] = await Promise.all([
          getProjects(),
          getMySubscription()
        ]);
        setProjects(projectsData || []);
        setSubscription(subData || null);
      } catch (err) {
        setError('Failed to load dashboard data.');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <video 
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
      />
      
      <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto min-h-screen">
        <DashboardHeader projectCount={projects?.length || 0} plan={subscription?.plan || 'free'} />

        <div className="mt-12 space-y-8">
          {subscription?.plan === 'free' && (projects?.length || 0) >= 1 && (
            <SubscriptionBanner />
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="liquid-glass rounded-3xl p-6 h-48 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-full w-3/4 mb-4" />
                  <div className="h-3 bg-white/10 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : (projects?.length || 0) === 0 ? (
            <EmptyState />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} onDelete={handleDelete} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

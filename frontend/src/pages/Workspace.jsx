import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import WorkspaceHeader from '../components/kanban/WorkspaceHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getMySubscription } from '../services/subscriptionService';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [isSubLoading, setIsSubLoading] = useState(true);
  const { 
    project, columns, isLoading, isSaving, 
    handleDragEnd, addTask, deleteTask, addColumn, editColumn 
  } = useKanban(id);

  useEffect(() => {
    const fetchSub = async () => {
      try {
        const sub = await getMySubscription();
        setSubscription(sub);
      } catch (err) {
        console.error('Failed to fetch subscription', err);
      } finally {
        setIsSubLoading(false);
      }
    };
    fetchSub();
  }, []);

  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

  if (isLoading || isSubLoading) return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark overlay — video from PersistentBackground in App.jsx */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ willChange: 'opacity, transform' }}
        className="relative z-10 pt-20 min-h-screen px-6 py-8 md:px-12 max-w-[1400px] mx-auto flex flex-col"
      >
        <WorkspaceHeader 
          project={project} 
          isSaving={isSaving} 
          onBack={() => navigate(`/projects/${id}`)} 
        />

        {!isPro ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center liquid-glass-strong rounded-[2rem] p-12 gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white/30" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Workspace is a Pro feature</h2>
              <p className="text-white/60 text-sm max-w-sm mx-auto">Upgrade to Pro to manage your project tasks with our integrated Kanban board.</p>
            </div>
            <button onClick={() => navigate('/pricing')} className="liquid-glass-strong rounded-full px-10 py-3.5 text-white font-medium hover:scale-105 transition-all cursor-pointer">Upgrade to Pro</button>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto">
            <KanbanBoard onDragEnd={handleDragEnd}>
              {columns.map(col => (
                <KanbanColumn
                  key={col.id}
                  column={col}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                  onEditTitle={editColumn}
                />
              ))}
              <AddColumnButton onClick={addColumn} />
            </KanbanBoard>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Workspace;

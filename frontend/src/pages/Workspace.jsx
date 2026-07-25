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

  const isPro = true;

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  return (
    <section className="relative h-screen max-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/65 z-[1]" />

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ willChange: 'opacity, transform' }}
        className="relative z-10 pt-20 sm:pt-22 pb-4 px-4 sm:px-8 max-w-[1450px] mx-auto h-full flex flex-col overflow-hidden"
      >
        <WorkspaceHeader 
          project={project} 
          isSaving={isSaving} 
          onBack={() => navigate(`/projects/${id}`)} 
        />

        <div className="flex-1 min-h-0 overflow-hidden mt-2">
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
      </motion.div>
    </section>
  );
};

export default Workspace;

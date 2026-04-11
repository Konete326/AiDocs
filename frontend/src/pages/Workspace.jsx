import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useKanban } from '../hooks/useKanban';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import WorkspaceHeader from '../components/kanban/WorkspaceHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    project, columns, isLoading, isSaving, 
    handleDragEnd, addTask, deleteTask, addColumn, editColumn 
  } = useKanban(id);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <LoadingSpinner />
    </div>
  );

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
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
      </motion.div>
    </section>
  );
};

export default Workspace;

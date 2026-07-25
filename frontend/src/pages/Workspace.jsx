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
    <div className="h-screen flex items-center justify-center bg-[#E0E5EC]">
      <LoadingSpinner />
    </div>
  );

  return (
    <section className="relative h-screen max-h-screen overflow-hidden bg-[#E0E5EC] text-[#3D4852]">
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

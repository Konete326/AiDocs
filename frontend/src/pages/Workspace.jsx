import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Code2 } from 'lucide-react';
import { useKanban } from '../hooks/useKanban';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import WorkspaceHeader from '../components/kanban/WorkspaceHeader';
import WebContainerSandbox from '../components/kanban/WebContainerSandbox';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kanban');
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
        <div className="flex items-center justify-between gap-4 mb-2">
          <WorkspaceHeader 
            project={project} 
            isSaving={isSaving} 
            onBack={() => navigate(`/projects/${id}`)} 
          />

          <div className="flex items-center gap-1.5 p-1 neumorphic-inset rounded-2xl flex-shrink-0">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'kanban' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#3D4852]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban Tasks</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sandbox' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#3D4852]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>WebContainer Sandbox</span>
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden mt-2">
          {activeTab === 'kanban' ? (
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
          ) : (
            <WebContainerSandbox project={project} />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Workspace;

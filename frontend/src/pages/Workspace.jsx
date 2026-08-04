import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Code2, Search, X, Filter } from 'lucide-react';
import { useKanban } from '../hooks/useKanban';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import WorkspaceHeader from '../components/kanban/WorkspaceHeader';
import WebContainerSandbox from '../components/kanban/WebContainerSandbox';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GithubPushModal from '../components/workspace/GithubPushModal';

const CATEGORIES = [
  { id: 'all', label: 'All Cards' },
  { id: 'frontend', label: 'Frontend', keywords: ['react', 'ui', 'frontend', 'css', 'component', 'modal', 'page', 'theme', 'layout', 'design'] },
  { id: 'backend', label: 'Backend', keywords: ['api', 'backend', 'server', 'express', 'node', 'controller', 'route', 'endpoint', 'service'] },
  { id: 'db', label: 'DB & Schema', keywords: ['db', 'database', 'mongo', 'schema', 'model', 'sql', 'postgres', 'query'] },
  { id: 'auth', label: 'Auth & Security', keywords: ['auth', 'login', 'token', 'jwt', 'security', 'role', 'session', 'user'] },
  { id: 'ui/ux', label: 'UI / UX', keywords: ['icon', 'animation', 'style', 'color', 'shadow', 'responsive', 'mobile', 'nav', 'ux'] }
];

const matchesCategory = (taskText, categoryId) => {
  if (categoryId === 'all') return true;
  const categoryConfig = CATEGORIES.find(c => c.id === categoryId);
  if (!categoryConfig || !categoryConfig.keywords) return true;
  const text = (taskText || '').toLowerCase();
  return categoryConfig.keywords.some(kw => text.includes(kw));
};

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const { 
    project, columns, isLoading, isSaving, 
    handleDragEnd, addTask, deleteTask, addColumn, editColumn 
  } = useKanban(id);

  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim() && activeCategory === 'all') return columns;

    const query = searchQuery.trim().toLowerCase();
    return columns.map(col => {
      const filteredTasks = col.tasks.filter(task => {
        const textMatch = !query || (task.text || '').toLowerCase().includes(query);
        const catMatch = matchesCategory(task.text, activeCategory);
        return textMatch && catMatch;
      });
      return { ...col, tasks: filteredTasks };
    });
  }, [columns, searchQuery, activeCategory]);

  const totalTasks = useMemo(() => {
    return columns.reduce((acc, col) => acc + (col.tasks ? col.tasks.length : 0), 0);
  }, [columns]);

  const filteredTasksCount = useMemo(() => {
    return filteredColumns.reduce((acc, col) => acc + (col.tasks ? col.tasks.length : 0), 0);
  }, [filteredColumns]);

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2 flex-shrink-0">
          <WorkspaceHeader 
            project={project} 
            isSaving={isSaving} 
            onBack={() => navigate(`/projects/${id}`)}
            onOpenGithubModal={() => setIsGithubModalOpen(true)}
          />

          <div className="flex items-center gap-2 flex-wrap">
            {activeTab === 'kanban' && (
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                <div className="relative flex items-center min-w-[180px] max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Kanban tasks..."
                    className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] pl-8 pr-7 py-1.5 rounded-2xl outline-none neumorphic-inset"
                  />
                  {searchQuery ? (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2 text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>

                <span className="text-[10px] font-mono font-bold text-[#6C63FF] bg-[#6C63FF]/15 px-2.5 py-1 rounded-full whitespace-nowrap neumorphic-inset shrink-0">
                  {filteredTasksCount} / {totalTasks} cards
                </span>
              </div>
            )}

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
        </div>

        {activeTab === 'kanban' && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-2 scrollbar-none flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#6C63FF] shrink-0 mr-1" />
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#6C63FF] text-white shadow-sm ring-2 ring-[#6C63FF]/30'
                    : 'neumorphic-btn text-[#3D4852]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-hidden mt-1">
          {activeTab === 'kanban' ? (
            <KanbanBoard onDragEnd={handleDragEnd}>
              {filteredColumns.map(col => (
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

      <GithubPushModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        project={project}
      />
    </section>
  );
};

export default Workspace;

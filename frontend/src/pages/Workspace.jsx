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
  { id: 'frontend', label: 'Frontend', keywords: ['react', 'ui', 'frontend', 'css', 'component', 'modal', 'page', 'theme', 'layout'] },
  { id: 'backend', label: 'Backend', keywords: ['api', 'backend', 'server', 'express', 'node', 'controller', 'route', 'endpoint'] },
  { id: 'db', label: 'DB & Schema', keywords: ['db', 'database', 'mongo', 'schema', 'model', 'sql', 'postgres', 'query'] },
  { id: 'auth', label: 'Auth & Security', keywords: ['auth', 'login', 'token', 'jwt', 'security', 'role', 'session', 'user'] },
  { id: 'ui/ux', label: 'UI / UX', keywords: ['icon', 'animation', 'style', 'color', 'shadow', 'responsive', 'mobile', 'nav'] }
];

const matchesCategory = (taskText, categoryId) => {
  if (categoryId === 'all') return true;
  const cfg = CATEGORIES.find(c => c.id === categoryId);
  if (!cfg?.keywords) return true;
  return cfg.keywords.some(kw => (taskText || '').toLowerCase().includes(kw));
};

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(() => localStorage.getItem('clarifyai_workspace_fullwidth') === 'true');

  const { project, columns, isLoading, isSaving, handleDragEnd, addTask, deleteTask, addColumn, editColumn } = useKanban(id);

  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim() && activeCategory === 'all') return columns;
    const q = searchQuery.trim().toLowerCase();
    return columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(t => (!q || (t.text || '').toLowerCase().includes(q)) && matchesCategory(t.text, activeCategory))
    }));
  }, [columns, searchQuery, activeCategory]);

  const totalTasks = useMemo(() => columns.reduce((acc, col) => acc + (col.tasks?.length || 0), 0), [columns]);
  const filteredCount = useMemo(() => filteredColumns.reduce((acc, col) => acc + (col.tasks?.length || 0), 0), [filteredColumns]);

  const handleToggleFullWidth = () => {
    setIsFullWidth((prev) => {
      const next = !prev;
      localStorage.setItem('clarifyai_workspace_fullwidth', next.toString());
      return next;
    });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#E0E5EC]"><LoadingSpinner /></div>;

  return (
    <section className="relative h-screen max-h-screen overflow-hidden bg-[#E0E5EC] text-[#3D4852]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={`relative z-10 pt-20 sm:pt-22 pb-4 px-4 sm:px-8 ${isFullWidth ? 'w-full max-w-none' : 'max-w-[1450px] mx-auto'} h-full flex flex-col overflow-hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2 flex-shrink-0">
          <WorkspaceHeader project={project} isSaving={isSaving} onBack={() => navigate(`/projects/${id}`)} onOpenGithubModal={() => setIsGithubModalOpen(true)} isFullWidth={isFullWidth} onToggleFullWidth={handleToggleFullWidth} />

          <div className="flex items-center gap-2 flex-wrap">
            {activeTab === 'kanban' && (
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                <div className="relative flex items-center min-w-[180px] max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tasks..." className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] pl-8 pr-7 py-1.5 rounded-2xl outline-none neumorphic-inset" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 text-[#6B7280]"><X className="w-3.5 h-3.5" /></button>}
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap neumorphic-inset shrink-0">{filteredCount} / {totalTasks} cards</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 p-1 neumorphic-inset rounded-2xl flex-shrink-0">
              <button onClick={() => setActiveTab('kanban')} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'kanban' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#6B7280]'}`}><LayoutGrid className="w-3.5 h-3.5" /><span>Kanban Tasks</span></button>
              <button onClick={() => setActiveTab('sandbox')} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'sandbox' ? 'bg-blue-600 text-white shadow-sm' : 'text-[#6B7280]'}`}><Code2 className="w-3.5 h-3.5" /><span>WebContainer Sandbox</span></button>
            </div>
          </div>
        </div>

        {activeTab === 'kanban' && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-2 scrollbar-none flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600 shrink-0 mr-1" />
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-sm' : 'neumorphic-btn text-[#3D4852]'}`}>{cat.label}</button>
            ))}
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-hidden mt-1">
          {activeTab === 'kanban' ? (
            <KanbanBoard onDragEnd={handleDragEnd}>
              {filteredColumns.map(col => <KanbanColumn key={col.id} column={col} onAddTask={addTask} onDeleteTask={deleteTask} onEditTitle={editColumn} />)}
              <AddColumnButton onClick={addColumn} />
            </KanbanBoard>
          ) : <WebContainerSandbox project={project} />}
        </div>
      </motion.div>

      <GithubPushModal isOpen={isGithubModalOpen} onClose={() => setIsGithubModalOpen(false)} project={project} />
    </section>
  );
};

export default Workspace;

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useKanban } from '../hooks/useKanban';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import WorkspaceHeader from '../components/kanban/WorkspaceHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GithubPushModal from '../components/workspace/GithubPushModal';

const getDynamicCategoriesForProject = (project) => {
  const tech = (project?.wizardAnswers?.techPreferences || '').toLowerCase();
  const type = (project?.projectType || '').toLowerCase();

  const isFlutter = tech.includes('flutter') || tech.includes('dart');
  const isReactNative = tech.includes('react-native') || tech.includes('react native') || tech.includes('expo');
  const isMobile = isFlutter || isReactNative || type === 'mobile' || tech.includes('swift') || tech.includes('kotlin');
  const isPython = tech.includes('python') || tech.includes('fastapi') || tech.includes('django') || tech.includes('flask');
  const isNext = tech.includes('next') || tech.includes('next.js') || tech.includes('nextjs');

  if (isFlutter) {
    return [
      { id: 'all', label: 'All Flutter Cards' },
      { id: 'flutter-ui', label: 'Widgets & UI', keywords: ['flutter', 'widget', 'screen', 'ui', 'dart', 'layout', 'theme', 'view', 'scaffold', 'token', 'design'] },
      { id: 'api-services', label: 'Dio & REST API', keywords: ['api', 'dio', 'http', 'service', 'backend', 'rest', 'endpoint', 'network', 'client'] },
      { id: 'db-storage', label: 'Hive & SQLite DB', keywords: ['sqlite', 'hive', 'isar', 'db', 'storage', 'database', 'model', 'cache', 'repository'] },
      { id: 'auth-security', label: 'Auth & Biometrics', keywords: ['auth', 'login', 'token', 'secure_storage', 'jwt', 'security', 'biometrics', 'session'] },
      { id: 'state-routing', label: 'State & Riverpod', keywords: ['bloc', 'riverpod', 'provider', 'router', 'navigation', 'route', 'state', 'animation', 'pubspec'] }
    ];
  }

  if (isMobile) {
    return [
      { id: 'all', label: 'All Mobile Cards' },
      { id: 'mobile-ui', label: 'Mobile Screens & UI', keywords: ['screen', 'ui', 'component', 'layout', 'native', 'mobile', 'view', 'navigation', 'theme'] },
      { id: 'api-client', label: 'API & Services', keywords: ['api', 'network', 'service', 'http', 'axios', 'backend', 'fetch', 'endpoint'] },
      { id: 'local-db', label: 'Storage & DB', keywords: ['storage', 'asyncstorage', 'sqlite', 'db', 'cache', 'database', 'realm', 'model'] },
      { id: 'auth-sec', label: 'Auth & Security', keywords: ['auth', 'login', 'token', 'jwt', 'keychain', 'security', 'session'] },
      { id: 'native-modules', label: 'State & Device APIs', keywords: ['state', 'redux', 'zustand', 'camera', 'permission', 'hardware', 'bridge', 'router'] }
    ];
  }

  if (isPython) {
    return [
      { id: 'all', label: 'All Cards' },
      { id: 'fastapi-routes', label: 'FastAPI Routes', keywords: ['fastapi', 'route', 'endpoint', 'schema', 'pydantic', 'api', 'controller'] },
      { id: 'python-services', label: 'AI & Services', keywords: ['service', 'ai', 'model', 'langchain', 'llm', 'pipeline', 'prompt', 'task'] },
      { id: 'db-sql', label: 'SQLAlchemy / DB', keywords: ['db', 'database', 'postgres', 'sqlalchemy', 'sql', 'model', 'migration', 'schema'] },
      { id: 'auth-jwt', label: 'Auth & Security', keywords: ['auth', 'jwt', 'token', 'security', 'oauth', 'session', 'user'] },
      { id: 'frontend-client', label: 'Frontend Client', keywords: ['ui', 'frontend', 'react', 'client', 'page', 'component', 'layout'] }
    ];
  }

  if (isNext) {
    return [
      { id: 'all', label: 'All Cards' },
      { id: 'react-components', label: 'React UI & Components', keywords: ['react', 'ui', 'component', 'page', 'layout', 'frontend', 'modal', 'css'] },
      { id: 'server-actions', label: 'Server Actions & API', keywords: ['api', 'route', 'server', 'action', 'endpoint', 'backend', 'handler'] },
      { id: 'prisma-db', label: 'Prisma & DB Schema', keywords: ['db', 'database', 'prisma', 'postgres', 'mongo', 'schema', 'model', 'query'] },
      { id: 'auth-session', label: 'NextAuth & Sessions', keywords: ['auth', 'nextauth', 'login', 'token', 'jwt', 'session', 'user', 'security'] },
      { id: 'styling-motion', label: 'Motion & Styling', keywords: ['icon', 'animation', 'style', 'framer', 'motion', 'tailwind', 'theme'] }
    ];
  }

  return [
    { id: 'all', label: 'All Cards' },
    { id: 'frontend', label: 'Frontend UI', keywords: ['react', 'ui', 'frontend', 'css', 'component', 'modal', 'page', 'theme', 'layout', 'design'] },
    { id: 'backend', label: 'Backend API', keywords: ['api', 'backend', 'server', 'express', 'node', 'controller', 'route', 'endpoint', 'service'] },
    { id: 'db', label: 'DB & Schema', keywords: ['db', 'database', 'mongo', 'schema', 'model', 'sql', 'postgres', 'query'] },
    { id: 'auth', label: 'Auth & Security', keywords: ['auth', 'login', 'token', 'jwt', 'security', 'role', 'session', 'user'] },
    { id: 'ui/ux', label: 'UI / UX & Motion', keywords: ['icon', 'animation', 'style', 'color', 'shadow', 'responsive', 'mobile', 'nav'] }
  ];
};

const matchesCategory = (taskText, categoryId, categories) => {
  if (categoryId === 'all') return true;
  const cfg = categories.find(c => c.id === categoryId);
  if (!cfg?.keywords) return true;
  return cfg.keywords.some(kw => (taskText || '').toLowerCase().includes(kw));
};

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(() => localStorage.getItem('clarifyai_workspace_fullwidth') === 'true');

  const { project, columns, isLoading, isSaving, handleDragEnd, addTask, deleteTask, addColumn, editColumn } = useKanban(id);

  const categories = useMemo(() => {
    return getDynamicCategoriesForProject(project);
  }, [project]);

  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim() && activeCategory === 'all') return columns;
    const q = searchQuery.trim().toLowerCase();
    return columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(t => (!q || (t.text || '').toLowerCase().includes(q)) && matchesCategory(t.text, activeCategory, categories))
    }));
  }, [columns, searchQuery, activeCategory, categories]);

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
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none flex-1">
            <Filter className="w-3.5 h-3.5 text-[#6C63FF] shrink-0 mr-1" />
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)} 
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id ? 'bg-[#6C63FF] text-white shadow-sm border border-[#6C63FF]' : 'neumorphic-btn text-[#3D4852]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative flex items-center min-w-[180px] max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3" />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search tasks..." 
                className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] pl-8 pr-7 py-1.5 rounded-2xl outline-none neumorphic-inset" 
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 text-[#6B7280]"><X className="w-3.5 h-3.5" /></button>}
            </div>
            <span className="text-[10px] font-mono font-bold text-[#6C63FF] bg-[#6C63FF]/10 px-2.5 py-1 rounded-full whitespace-nowrap neumorphic-inset shrink-0">{filteredCount} / {totalTasks} cards</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <KanbanBoard onDragEnd={handleDragEnd}>
            {filteredColumns.map(col => <KanbanColumn key={col.id} column={col} onAddTask={addTask} onDeleteTask={deleteTask} onEditTitle={editColumn} />)}
            <AddColumnButton onClick={addColumn} />
          </KanbanBoard>
        </div>
      </motion.div>

      <GithubPushModal isOpen={isGithubModalOpen} onClose={() => setIsGithubModalOpen(false)} project={project} />
    </section>
  );
};

export default Workspace;

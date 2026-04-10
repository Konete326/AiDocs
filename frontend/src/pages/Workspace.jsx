import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getProject, updateKanban } from '../services/projectService';
import KanbanBoard from '../components/kanban/KanbanBoard';
import KanbanColumn from '../components/kanban/KanbanColumn';
import AddColumnButton from '../components/kanban/AddColumnButton';
import LoadingSpinner from '../components/common/LoadingSpinner';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

const DEFAULT_COLUMNS = [
  { id: 'col-1', title: 'To Do', tasks: [] },
  { id: 'col-2', title: 'In Progress', tasks: [] },
  { id: 'col-3', title: 'Review', tasks: [] },
  { id: 'col-4', title: 'Done', tasks: [] },
];

const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const proj = await getProject(id);
        setProject(proj);
        const cols = proj.kanbanColumns?.length > 0 ? proj.kanbanColumns : DEFAULT_COLUMNS;
        setColumns(cols);
      } catch (error) {
        console.error("Error fetching project for workspace:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const saveToBackend = async (updatedColumns) => {
    setIsSaving(true);
    try {
      await updateKanban(id, updatedColumns);
    } catch (error) {
      console.error("Error saving kanban state:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Same column reorder
      const col = columns.find(c => c.id === source.droppableId);
      const newTasks = Array.from(col.tasks);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);
      
      const updated = columns.map(c => c.id === col.id ? { ...c, tasks: newTasks } : c);
      setColumns(updated);
      saveToBackend(updated);
    } else {
      // Cross column move
      const sourceCol = columns.find(c => c.id === source.droppableId);
      const destCol = columns.find(c => c.id === destination.droppableId);
      
      const sourceTasks = Array.from(sourceCol.tasks);
      const destTasks = Array.from(destCol.tasks);
      
      const [moved] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, moved);
      
      const updated = columns.map(c => {
        if (c.id === sourceCol.id) return { ...c, tasks: sourceTasks };
        if (c.id === destCol.id) return { ...c, tasks: destTasks };
        return c;
      });
      
      setColumns(updated);
      saveToBackend(updated);
    }
  };

  const handleAddTask = (columnId, text) => {
    const newTask = {
      id: 'task-' + Date.now(),
      text,
      createdAt: new Date().toISOString()
    };
    const updated = columns.map(c =>
      c.id === columnId ? { ...c, tasks: [...c.tasks, newTask] } : c
    );
    setColumns(updated);
    saveToBackend(updated);
  };

  const handleDeleteTask = (columnId, taskId) => {
    const updated = columns.map(c =>
      c.id === columnId ? { ...c, tasks: c.tasks.filter(t => t.id !== taskId) } : c
    );
    setColumns(updated);
    saveToBackend(updated);
  };

  const handleAddColumn = () => {
    const newCol = {
      id: 'col-' + Date.now(),
      title: 'New Column',
      tasks: []
    };
    const updated = [...columns, newCol];
    setColumns(updated);
    saveToBackend(updated);
  };

  const handleEditColumnTitle = (columnId, newTitle) => {
    const updated = columns.map(c =>
      c.id === columnId ? { ...c, title: newTitle } : c
    );
    setColumns(updated);
    saveToBackend(updated);
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <video src={VIDEO_URL} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-white/60">Loading workspace...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <video src={VIDEO_URL} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <div className="relative z-10 min-h-screen px-6 py-8 md:px-12 max-w-[1400px] mx-auto flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/projects/' + id)}
              className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70 font-medium">Back to Project</span>
            </button>
            <div className="mt-3">
              <h1 className="text-2xl font-medium text-white">{project?.title}</h1>
              <p className="text-xs uppercase tracking-widest text-white/50 mt-1">Workspace</p>
            </div>
          </div>
          
          <div>
            {isSaving ? (
              <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span className="text-xs text-white/50">Saving...</span>
              </div>
            ) : (
              <div className="liquid-glass rounded-full px-4 py-2">
                <span className="text-xs text-white/40">All changes saved</span>
              </div>
            )}
          </div>
        </div>

        {/* BOARD */}
        <div className="flex-1 overflow-hidden">
          <KanbanBoard onDragEnd={handleDragEnd}>
            {columns.map(col => (
              <KanbanColumn
                key={col.id}
                column={col}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onEditTitle={handleEditColumnTitle}
              />
            ))}
            <AddColumnButton onClick={handleAddColumn} />
          </KanbanBoard>
        </div>
      </div>
    </section>
  );
};

export default Workspace;

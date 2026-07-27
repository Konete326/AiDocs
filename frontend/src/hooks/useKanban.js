import { useState, useEffect } from 'react';
import { getProject, updateKanban } from '../services/projectService';
import { DEFAULT_COLUMNS } from '../constants/kanban';
import { toast } from 'react-hot-toast';

const normalizeColumns = (cols) => {
  if (!cols || !Array.isArray(cols) || cols.length === 0) return DEFAULT_COLUMNS;
  return cols.map((col, cIdx) => {
    const rawTasks = col.tasks || col.cards || [];
    const tasks = rawTasks.map((t, tIdx) => {
      const rawId = t.id || t._id;
      const taskId = rawId ? String(rawId) : `task-${cIdx}-${tIdx}-${Date.now()}`;
      return {
        id: taskId,
        _id: taskId,
        text: t.text || t.title || t.description || 'Untitled Task',
        status: t.status || (t.completed || col.title === 'Done' ? 'done' : 'todo'),
        completed: Boolean(t.completed || t.status === 'done' || t.status === 'complete')
      };
    });
    const colId = col.id || col._id ? String(col.id || col._id) : `col-${cIdx}-${Date.now()}`;
    return {
      id: colId,
      _id: colId,
      title: col.title || `Column ${cIdx + 1}`,
      tasks
    };
  });
};

export const useKanban = (projectId) => {
  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    const fetchProject = async () => {
      try {
        const proj = await getProject(projectId);
        setProject(proj);
        setColumns(normalizeColumns(proj.kanbanColumns));
      } catch (err) {
        toast.error('Failed to load Kanban board');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();

    const eventSource = new EventSource(`/api/projects/${projectId}/events`, { withCredentials: true });

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'kanban_update') {
          if (data.kanbanColumns) {
            setColumns(normalizeColumns(data.kanbanColumns));
          } else {
            fetchProject();
          }
          toast.success(`Kanban updated: ${data.taskId || 'Task updated'}`);
        } else if (data.type === 'annotation_created' || data.type === 'code_updated') {
          fetchProject();
        }
      } catch (err) {}
    };

    return () => eventSource.close();
  }, [projectId]);

  const save = async (updated) => {
    setIsSaving(true);
    try {
      await updateKanban(projectId, updated);
    } catch (err) {
      toast.error('Failed to persist Kanban changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updated = columns.map(c => ({ ...c, tasks: [...c.tasks] }));
    
    if (source.droppableId === destination.droppableId) {
      const col = updated.find(c => c.id === source.droppableId);
      if (col) {
        const [moved] = col.tasks.splice(source.index, 1);
        col.tasks.splice(destination.index, 0, moved);
      }
    } else {
      const sCol = updated.find(c => c.id === source.droppableId);
      const dCol = updated.find(c => c.id === destination.droppableId);
      if (sCol && dCol) {
        const [moved] = sCol.tasks.splice(source.index, 1);
        dCol.tasks.splice(destination.index, 0, moved);
      }
    }
    setColumns(updated);
    save(updated);
  };

  const addTask = (colId, text) => {
    const newTask = { id: `task-${Date.now()}`, text: text.trim(), completed: false };
    const updated = columns.map(c => c.id === colId ? { ...c, tasks: [...c.tasks, newTask] } : c);
    setColumns(updated);
    save(updated);
  };

  const deleteTask = (colId, tId) => {
    const updated = columns.map(c => c.id === colId ? { ...c, tasks: c.tasks.filter(t => t.id !== tId) } : c);
    setColumns(updated);
    save(updated);
  };

  const addColumn = () => {
    const newCol = { id: `col-${Date.now()}`, title: 'New Column', tasks: [] };
    const updated = [...columns, newCol];
    setColumns(updated);
    save(updated);
  };

  const editColumn = (id, title) => {
    const updated = columns.map(c => c.id === id ? { ...c, title: title.trim() || c.title } : c);
    setColumns(updated);
    save(updated);
  };

  return { project, columns, isLoading, isSaving, handleDragEnd, addTask, deleteTask, addColumn, editColumn };
};

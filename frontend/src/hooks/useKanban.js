import { useState, useEffect } from 'react';
import { getProject, updateKanban } from '../services/projectService';
import { DEFAULT_COLUMNS } from '../constants/kanban';
import { toast } from 'react-hot-toast';

const generateDefaultColumnsForProject = (project) => {
  const tech = (project?.wizardAnswers?.techPreferences || '').toLowerCase();
  const type = (project?.projectType || '').toLowerCase();

  const isFlutter = tech.includes('flutter') || tech.includes('dart');
  const isReactNative = tech.includes('react-native') || tech.includes('react native') || tech.includes('expo');
  const isPython = tech.includes('python') || tech.includes('fastapi') || tech.includes('django') || tech.includes('flask');

  let todoTasks = [];

  if (isFlutter) {
    todoTasks = [
      { id: `task-fl-1-${Date.now()}`, text: 'Configure Flutter project structure & pubspec.yaml dependencies (Riverpod/Provider, Dio, Flutter Secure Storage)', status: 'todo' },
      { id: `task-fl-2-${Date.now()}`, text: 'Design core Flutter UI widgets & screen layouts based on Design System tokens', status: 'todo' },
      { id: `task-fl-3-${Date.now()}`, text: 'Setup REST API Dio service with interceptors, token refresh & error handling', status: 'todo' },
      { id: `task-fl-4-${Date.now()}`, text: 'Implement local Hive / SQLite database models & repository cache layer', status: 'todo' },
      { id: `task-fl-5-${Date.now()}`, text: 'Implement Biometrics & Secure Storage authentication flow', status: 'todo' }
    ];
  } else if (isReactNative || type === 'mobile') {
    todoTasks = [
      { id: `task-rn-1-${Date.now()}`, text: 'Initialize React Native / Expo router navigation & core package dependencies', status: 'todo' },
      { id: `task-rn-2-${Date.now()}`, text: 'Build mobile screens & custom UI components matching design tokens', status: 'todo' },
      { id: `task-rn-3-${Date.now()}`, text: 'Setup Axios API client with async storage token refresh interceptor', status: 'todo' },
      { id: `task-rn-4-${Date.now()}`, text: 'Configure local storage cache & offline synchronization store', status: 'todo' }
    ];
  } else if (isPython) {
    todoTasks = [
      { id: `task-py-1-${Date.now()}`, text: 'Initialize FastAPI server, Pydantic schemas, and SQLAlchemy database models', status: 'todo' },
      { id: `task-py-2-${Date.now()}`, text: 'Build async API endpoints with JWT authentication & dependency injection', status: 'todo' },
      { id: `task-py-3-${Date.now()}`, text: 'Setup AI pipeline connectors & Vector DB index', status: 'todo' },
      { id: `task-py-4-${Date.now()}`, text: 'Develop frontend client dashboard & API integration', status: 'todo' }
    ];
  } else {
    todoTasks = [
      { id: `task-wb-1-${Date.now()}`, text: 'Initialize modular project structure (routes, controllers, services, models)', status: 'todo' },
      { id: `task-wb-2-${Date.now()}`, text: 'Build reusable UI components matching the design system specifications', status: 'todo' },
      { id: `task-wb-3-${Date.now()}`, text: 'Setup REST API endpoints with authentication & validation middleware', status: 'todo' },
      { id: `task-wb-4-${Date.now()}`, text: 'Configure database schema models & indexing for optimized querying', status: 'todo' }
    ];
  }

  return [
    { id: 'col-1', title: 'To Do', tasks: todoTasks },
    { id: 'col-2', title: 'In Progress', tasks: [{ id: `task-ip-1-${Date.now()}`, text: `Configure environment variables and ${isFlutter ? 'Flutter SDK' : 'application'} setup`, status: 'in-progress' }] },
    { id: 'col-3', title: 'Review', tasks: [{ id: `task-rv-1-${Date.now()}`, text: 'Review core architectural specifications against PRD & SRD', status: 'review' }] },
    { id: 'col-4', title: 'Done', tasks: [{ id: `task-dn-1-${Date.now()}`, text: 'Complete ClarifyAI multi-agent specification generation', status: 'done', completed: true }] },
  ];
};

const normalizeColumns = (cols, project) => {
  if (!cols || !Array.isArray(cols) || cols.length === 0) return generateDefaultColumnsForProject(project);
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
        setColumns(normalizeColumns(proj.kanbanColumns, proj));
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
            setColumns(normalizeColumns(data.kanbanColumns, project));
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

  const addTask = (columnId, text) => {
    if (!text.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      text: text.trim(),
      status: columnId === 'col-4' ? 'done' : 'todo',
      completed: columnId === 'col-4'
    };
    const updated = columns.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    });
    setColumns(updated);
    save(updated);
  };

  const deleteTask = (columnId, taskId) => {
    const updated = columns.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      return col;
    });
    setColumns(updated);
    save(updated);
  };

  const addColumn = (title) => {
    if (!title.trim()) return;
    const newCol = {
      id: `col-${Date.now()}`,
      title: title.trim(),
      tasks: []
    };
    const updated = [...columns, newCol];
    setColumns(updated);
    save(updated);
  };

  const editColumn = (columnId, newTitle) => {
    if (!newTitle.trim()) return;
    const updated = columns.map(col => col.id === columnId ? { ...col, title: newTitle.trim() } : col);
    setColumns(updated);
    save(updated);
  };

  return {
    project,
    columns,
    isLoading,
    isSaving,
    handleDragEnd,
    addTask,
    deleteTask,
    addColumn,
    editColumn
  };
};

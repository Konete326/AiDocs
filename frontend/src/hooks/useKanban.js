import { useState, useEffect } from 'react';
import { getProject, updateKanban } from '../services/projectService';
import { DEFAULT_COLUMNS } from '../constants/kanban';

export const useKanban = (projectId) => {
  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const proj = await getProject(projectId);
        setProject(proj);
        setColumns(proj.kanbanColumns?.length > 0 ? proj.kanbanColumns : DEFAULT_COLUMNS);
      } catch (err) { console.error(err); } finally { setIsLoading(false); }
    };
    fetchProject();
  }, [projectId]);

  const save = async (updated) => {
    setIsSaving(true);
    try { await updateKanban(projectId, updated); }
    catch (err) { console.error(err); } finally { setIsSaving(false); }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updated = [...columns];
    
    if (source.droppableId === destination.droppableId) {
      const col = updated.find(c => c.id === source.droppableId);
      const tasks = Array.from(col.tasks);
      const [moved] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, moved);
      col.tasks = tasks;
    } else {
      const sCol = updated.find(c => c.id === source.droppableId);
      const dCol = updated.find(c => c.id === destination.droppableId);
      const [moved] = sCol.tasks.splice(source.index, 1);
      dCol.tasks.splice(destination.index, 0, moved);
    }
    setColumns(updated);
    save(updated);
  };

  const addTask = (colId, text) => {
    const updated = columns.map(c => c.id === colId ? { ...c, tasks: [...c.tasks, { id: 't-'+Date.now(), text }] } : c);
    setColumns(updated);
    save(updated);
  };

  const deleteTask = (colId, tId) => {
    const updated = columns.map(c => c.id === colId ? { ...c, tasks: c.tasks.filter(t => t.id !== tId) } : c);
    setColumns(updated);
    save(updated);
  };

  const addColumn = () => {
    const updated = [...columns, { id: 'c-'+Date.now(), title: 'New Column', tasks: [] }];
    setColumns(updated);
    save(updated);
  };

  const editColumn = (id, title) => {
    const updated = columns.map(c => c.id === id ? { ...c, title } : c);
    setColumns(updated);
    save(updated);
  };

  return { project, columns, isLoading, isSaving, handleDragEnd, addTask, deleteTask, addColumn, editColumn };
};

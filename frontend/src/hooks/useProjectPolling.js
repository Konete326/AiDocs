import { useState, useEffect } from 'react';
import { getProject, getProjectDocuments } from '../../services/projectService';
import { getProjectDocuments as fetchDocs } from '../../services/documentService';
import { getMySubscription } from '../../services/subscriptionService';

export const useProjectPolling = (id) => {
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [proj, docs, sub] = await Promise.all([getProject(id), fetchDocs(id), getMySubscription()]);
        if (!active) return;
        setProject(proj);
        setDocuments(docs);
        setSubscription(sub);
        if (docs.length > 0) setSelectedDoc(docs[0]);
      } catch { if (active) setError('Failed to load project.'); }
      finally { if (active) setIsLoading(false); }
    })();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (project?.status !== 'generating') return;
    const interval = setInterval(async () => {
      try {
        const [updated, updatedDocs] = await Promise.all([getProject(id), fetchDocs(id)]);
        setProject(updated);
        setDocuments(updatedDocs);
        if (updatedDocs.length > 0 && !selectedDoc) setSelectedDoc(updatedDocs[0]);
        if (updated.status !== 'generating') clearInterval(interval);
      } catch { clearInterval(interval); }
    }, 5000);
    return () => clearInterval(interval);
  }, [project?.status, id]);

  return {
    project, setProject, documents, setDocuments,
    selectedDoc, setSelectedDoc, subscription, isLoading, error
  };
};

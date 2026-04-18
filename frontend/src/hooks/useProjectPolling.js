import { useState, useEffect } from 'react';
import { getProject } from '../services/projectService';
import { getProjectDocuments as fetchDocs } from '../services/documentService';
import { getMySubscription } from '../services/subscriptionService';
import { getProjectSkills } from '../services/skillsService';

export const useProjectPolling = (id) => {
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [proj, docs, sub, fetchedSkills] = await Promise.all([
          getProject(id), 
          fetchDocs(id), 
          getMySubscription(),
          getProjectSkills(id)
        ]);
        if (!active) return;
        setProject(proj);
        setDocuments(docs);
        setSubscription(sub);
        setSkills(fetchedSkills);
        if (docs.length > 0) setSelectedDoc(docs[0]);
      } catch { if (active) setError('Failed to load project.'); }
      finally { if (active) setIsLoading(false); }
    })();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (project?.status !== 'generating') return;

    let pollCount = 0;
    let timerId;

    const getInterval = (count) => {
      if (count < 10) return 1000;  // First 10s: 1s interval
      if (count < 20) return 3000;  // Next 30s: 3s interval
      return 5000;                  // Then: 5s interval
    };

    const poll = async () => {
      try {
        const [updated, updatedDocs, updatedSkills] = await Promise.all([
          getProject(id), 
          fetchDocs(id),
          getProjectSkills(id)
        ]);
        
        // Use a more conservative state update - only update if actually changed
        setProject(prev => {
          if (prev?.status === updated?.status && prev?.docsGenerated?.length === updated?.docsGenerated?.length) {
            return prev;
          }
          return updated;
        });

        setDocuments(prev => {
          if (prev.length === updatedDocs.length) {
            // Check if content hash or last updated might be better, but count is a good proxy for generation
            return prev;
          }
          return updatedDocs;
        });

        setSkills(prev => {
          if (JSON.stringify(prev) === JSON.stringify(updatedSkills)) return prev;
          return updatedSkills;
        });

        if (updatedDocs.length > 0 && !selectedDoc) {
          setSelectedDoc(updatedDocs[0]);
        }
        
        if (updated.status === 'generating') {
          pollCount++;
          timerId = setTimeout(poll, getInterval(pollCount));
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    timerId = setTimeout(poll, 1000);
    return () => clearTimeout(timerId);
  }, [project?.status, id]);

  return {
    project, setProject, documents, setDocuments,
    skills, setSkills,
    selectedDoc, setSelectedDoc, subscription, isLoading, error
  };
};

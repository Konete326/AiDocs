import { useState, useEffect } from 'react';
import { getProject } from '../services/projectService';
import { getProjectDocuments as fetchDocs } from '../services/documentService';
import { getMySubscription } from '../services/subscriptionService';
import { getProjectSkills } from '../services/skillsService';
import { useAuth } from '../context/AuthContext';

export const useProjectPolling = (id) => {
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [subscription, setSubscription] = useState(user?.subscription || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [proj, docs] = await Promise.all([
          getProject(id), 
          fetchDocs(id)
        ]);
        if (!active) return;
        setProject(proj);
        setDocuments(docs);
        if (docs.length > 0) setSelectedDoc(docs[0]);
        setIsLoading(false);

        Promise.all([
          getProjectSkills(id).catch(() => []),
          user?.subscription ? Promise.resolve(user.subscription) : getMySubscription().catch(() => null)
        ]).then(([fetchedSkills, sub]) => {
          if (!active) return;
          if (fetchedSkills) setSkills(fetchedSkills);
          if (sub) setSubscription(sub);
        });
      } catch { 
        if (active) {
          setError('Failed to load project.'); 
          setIsLoading(false);
        }
      }
    })();
    return () => { active = false; };
  }, [id, user?.subscription]);

  useEffect(() => {
    if (project?.status !== 'generating') return;

    let pollCount = 0;
    let timerId;

    const getInterval = (count) => {
      if (count < 10) return 1000;
      if (count < 20) return 3000;
      return 5000;
    };

    const poll = async () => {
      try {
        const [updated, updatedDocs, updatedSkills] = await Promise.all([
          getProject(id), 
          fetchDocs(id),
          getProjectSkills(id)
        ]);
        
        setProject(prev => {
          if (prev?.status === updated?.status && prev?.docsGenerated?.length === updated?.docsGenerated?.length) {
            return prev;
          }
          return updated;
        });

        setDocuments(prev => {
          if (prev.length === updatedDocs.length) {
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

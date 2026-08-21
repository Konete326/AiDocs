import { useState, useEffect, useRef, useCallback } from 'react';
import { getAISuggestions } from '../services/suggestionService';

const NORM_FIELD_MAP = {
  problem: 'problemStatement',
  problemStatement: 'problemStatement',
  audience: 'targetAudience',
  targetAudience: 'targetAudience',
  features: 'coreFeatures',
  coreFeatures: 'coreFeatures',
  context: 'additionalContext',
  additionalContext: 'additionalContext',
  tech: 'techPreferences',
  techPreferences: 'techPreferences',
  monetization: 'monetizationModel',
  monetizationModel: 'monetizationModel',
  title: 'title'
};

export function useSuggestions(projectTitle, projectType, rawFieldName, currentValue, wizardAnswers = {}) {
  const fieldName = NORM_FIELD_MAP[rawFieldName] || rawFieldName;
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const cacheRef = useRef(new Map());

  const fetchLiveSuggestions = useCallback(async (isManual = false) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const cacheKey = `${fieldName}-${projectType || 'saas'}-${projectTitle || ''}-${(currentValue || '').slice(0, 30)}`;
    if (!isManual && cacheRef.current.has(cacheKey)) {
      setSuggestions(cacheRef.current.get(cacheKey));
      return;
    }

    setIsLoading(true);

    try {
      const results = await getAISuggestions(
        projectTitle,
        projectType,
        fieldName,
        currentValue,
        wizardAnswers
      );

      if (!controller.signal.aborted && Array.isArray(results) && results.length > 0) {
        setSuggestions(results);
        cacheRef.current.set(cacheKey, results);
      }
    } catch {
      if (!controller.signal.aborted) {
        setSuggestions([]);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [projectTitle, projectType, fieldName, currentValue, wizardAnswers]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchLiveSuggestions(false);
    }, 150);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [projectTitle, projectType, fieldName, currentValue]);

  const refresh = useCallback(() => {
    fetchLiveSuggestions(true);
  }, [fetchLiveSuggestions]);

  return {
    suggestions,
    isLoading,
    refresh
  };
}

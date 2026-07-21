import { useState, useEffect, useRef } from 'react';
import { getAISuggestions } from '../services/suggestionService';

export function useSuggestions(projectTitle, projectType, fieldName, currentValue) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const lastKeyRef = useRef(null);

  useEffect(() => {
    const hasContext = projectTitle?.trim().length > 1 || projectType;

    if (!hasContext && !currentValue) {
      setSuggestions([]);
      return;
    }

    const currentKey = `${projectTitle || ''}_${projectType || ''}_${fieldName}_${currentValue || ''}`;
    if (currentKey === lastKeyRef.current) return;

    clearTimeout(timerRef.current);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    timerRef.current = setTimeout(async () => {
      lastKeyRef.current = currentKey;
      setIsLoading(true);
      
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const results = await getAISuggestions(
          projectTitle,
          projectType,
          fieldName,
          currentValue
        );
        
        if (!controller.signal.aborted) {
          setSuggestions(results || []);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(`AI Suggestions Error for ${fieldName}:`, err);
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timerRef.current);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentValue, projectTitle, projectType, fieldName]);

  const clearSuggestions = () => setSuggestions([]);

  return { suggestions, isLoading, clearSuggestions };
}

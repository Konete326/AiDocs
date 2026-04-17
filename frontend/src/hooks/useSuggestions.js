import { useState, useEffect, useRef } from 'react';
import { getAISuggestions } from '../services/suggestionService';

export function useSuggestions(projectTitle, projectType, fieldName, currentValue) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const lastValueRef = useRef(null);

  useEffect(() => {
    // Check if we have enough context to request suggestions
    const hasContext = projectTitle?.trim().length > 2 || projectType;
    
    // If it's a title field, we need at least the projectType to suggest names
    // For other fields, we ideally need projectTitle
    if (!hasContext && !currentValue) {
      setSuggestions([]);
      return;
    }

    if (currentValue === lastValueRef.current) return;

    clearTimeout(timerRef.current);
    
    // Abort previous request if it's still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    timerRef.current = setTimeout(async () => {
      lastValueRef.current = currentValue;
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
    }, 500);

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

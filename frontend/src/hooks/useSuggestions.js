import { useState, useEffect, useRef } from 'react';
import { getAISuggestions } from '../../services/suggestionService';

export function useSuggestions(projectTitle, projectType, fieldName, currentValue) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const lastValueRef = useRef('');

  useEffect(() => {
    if (!currentValue || currentValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    if (currentValue === lastValueRef.current) return;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      lastValueRef.current = currentValue;
      setIsLoading(true);
      try {
        const results = await getAISuggestions(
          projectTitle,
          projectType,
          fieldName,
          currentValue
        );
        setSuggestions(results || []);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timerRef.current);
  }, [currentValue, projectTitle, projectType, fieldName]);

  const clearSuggestions = () => setSuggestions([]);

  return { suggestions, isLoading, clearSuggestions };
}

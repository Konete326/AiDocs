import api from './api';

export async function getAISuggestions(projectTitle, projectType, fieldName, currentValue) {
  const response = await api.post('/suggestions', {
    projectTitle,
    projectType,
    fieldName,
    currentValue: currentValue || '',
  });
  return response.data.data.suggestions;
}

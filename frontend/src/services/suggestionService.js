import api from './api';

export async function getAISuggestions(projectTitle, projectType, fieldName, currentValue, wizardAnswers = {}) {
  const response = await api.post('/suggestions', {
    projectTitle,
    projectType,
    fieldName,
    currentValue,
    wizardAnswers
  });
  return response.data?.data?.suggestions || [];
}
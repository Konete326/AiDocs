import api from './api';

export async function getProjectSkills(projectId) {
  const response = await api.get('/projects/' + projectId + '/skills');
  return response.data.data;
}

import api from './api';

export async function getAllSkills() {
  const response = await api.get('/projects/skills');
  return response.data.data;
}

export async function getProjectSkills(projectId) {
  const response = await api.get('/projects/' + projectId + '/skills');
  return response.data.data;
}

export async function toggleProjectSkill(projectId, skillId) {
  const response = await api.post('/projects/' + projectId + '/toggle', { skillId });
  return response.data.data;
}

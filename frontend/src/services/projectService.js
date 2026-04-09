import api from './api';

export async function getProjects() {
  const response = await api.get('/projects');
  return response.data.data.projects;
}

export async function createProject(data) {
  const response = await api.post('/projects', data);
  return response.data.data.project;
}

export async function getProject(id) {
  const response = await api.get(`/projects/${id}`);
  return response.data.data.project;
}

export async function updateProject(id, data) {
  const response = await api.patch(`/projects/${id}`, data);
  return response.data.data.project;
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
  return true;
}

export async function triggerGeneration(id) {
  const response = await api.post(`/projects/${id}/generate`);
  return response.data.data.project;
}

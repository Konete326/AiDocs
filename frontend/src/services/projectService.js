import api from './api';

export async function getProjects() {
  const response = await api.get('/projects');
  return response.data?.data || [];
}

export async function createProject(data) {
  const response = await api.post('/projects', data);
  return response.data.data;
}

export async function getProject(id) {
  const response = await api.get(`/projects/${id}`);
  return response.data.data;
}

export async function updateProject(id, data) {
  const response = await api.patch(`/projects/${id}`, data);
  return response.data.data;
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
  return true;
}

export async function triggerGeneration(id, force = false) {
  const response = await api.post(`/projects/${id}/generate`, { force });
  return response.data.data;
}

export async function exportProject(id) {
  const response = await api.get(`/projects/${id}/export`, {
    responseType: 'blob'
  });
  return response.data;
}

export async function updateKanban(projectId, kanbanColumns) {
  const response = await api.patch(`/projects/${projectId}`, { kanbanColumns });
  return response.data?.data?.project || response.data?.data;
}

export async function getProjectMembers(projectId) {
  const response = await api.get(`/projects/${projectId}/members`);
  return response.data?.data;
}

export async function inviteProjectMember(projectId, email, role) {
  const response = await api.post(`/projects/${projectId}/members`, { email, role });
  return response.data?.data;
}

export async function updateProjectMemberRole(projectId, memberId, role) {
  const response = await api.patch(`/projects/${projectId}/members/${memberId}`, { role });
  return response.data?.data;
}

export async function removeProjectMember(projectId, memberId) {
  const response = await api.delete(`/projects/${projectId}/members/${memberId}`);
  return response.data?.data;
}

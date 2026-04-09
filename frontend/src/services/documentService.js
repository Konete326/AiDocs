import api from './api';

export async function getProjectDocuments(projectId) {
  const response = await api.get(`/projects/${projectId}/documents`);
  return response.data.data.documents;
}

export async function getSingleDocument(projectId, docType) {
  const response = await api.get(`/projects/${projectId}/documents/${docType}`);
  return response.data.data.document;
}

export async function updateDocument(projectId, docType, content) {
  const response = await api.patch(`/projects/${projectId}/documents/${docType}`, { content });
  return response.data.data.document;
}

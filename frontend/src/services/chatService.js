import api from './api';

export async function getChatHistory(projectId) {
  const response = await api.get(`/projects/${projectId}/chat`);
  return response.data.data.history || [];
}

export async function sendChatMessage(projectId, messages) {
  const response = await api.post(`/projects/${projectId}/chat`, { messages });
  return response.data.data.reply;
}

export async function deleteChatHistory(projectId) {
  const response = await api.delete(`/projects/${projectId}/chat`);
  return response.data.data;
}

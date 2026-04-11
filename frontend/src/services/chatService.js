import api from './api';

export async function sendChatMessage(projectId, messages) {
  const response = await api.post(`/projects/${projectId}/chat`, { messages });
  return response.data.data.reply;
}

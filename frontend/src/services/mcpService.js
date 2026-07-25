import api from './api';

export const getMcpConfig = async () => {
  const response = await api.get('/users/mcp-config');
  return response.data;
};

export const regenerateMcpKey = async () => {
  const response = await api.post('/users/mcp-config/regenerate');
  return response.data;
};

export const deleteMcpKey = async () => {
  const response = await api.delete('/users/mcp-config');
  return response.data;
};

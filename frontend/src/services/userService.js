import api from './api';

export async function getMe() {
  const response = await api.get('/users/me');
  return response.data.data;
}

export async function updateMe(data) {
  const response = await api.patch('/users/me', data);
  return response.data.data;
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await api.patch('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

export async function getMyStats() {
  const response = await api.get('/users/me/stats');
  return response.data.data;
}

export async function uploadBgImage(file) {
  const formData = new FormData();
  formData.append('bgImage', file);
  const response = await api.patch('/users/me/background', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
}

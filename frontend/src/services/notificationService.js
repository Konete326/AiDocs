import api from './api';

export async function getNotifications() {
  try {
    const response = await api.get('/notifications');
    return response.data?.data || [];
  } catch {
    return [];
  }
}

export async function markNotificationRead(id) {
  try {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data?.data || null;
  } catch {
    return null;
  }
}

export async function markAllNotificationsRead() {
  try {
    const response = await api.patch('/notifications/read-all');
    return response.data?.data || null;
  } catch {
    return null;
  }
}

export async function deleteNotification(id) {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data?.data || null;
  } catch {
    return null;
  }
}

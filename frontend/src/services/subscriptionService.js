import api from './api';

export async function getMySubscription() {
  const response = await api.get('/subscriptions/me');
  return response.data.data;
}

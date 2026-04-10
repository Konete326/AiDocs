import api from './api';

export async function getMySubscription() {
  const response = await api.get('/subscriptions/me');
  return response.data.data;
}

export async function createCheckoutSession(plan) {
  const response = await api.post('/subscriptions/checkout', { plan });
  return response.data.data.url;
}

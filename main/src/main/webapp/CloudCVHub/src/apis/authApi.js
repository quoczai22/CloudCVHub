import { apiClient, apiUrl } from './apiClient';

export const authApi = {
  login: (credentials) =>
    fetch(apiUrl('/api/v1/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    fetch(apiUrl('/api/v1/auth/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),
};

export default authApi;

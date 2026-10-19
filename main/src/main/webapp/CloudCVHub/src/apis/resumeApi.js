import { apiClient, apiUrl } from './apiClient';

export const resumeApi = {
  getAll: () => apiClient('/api/v1/resumes'),
  getById: (id) => apiClient(`/api/v1/resumes/${id}`),
  create: (data) =>
    apiClient('/api/v1/resumes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiClient(`/api/v1/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiClient(`/api/v1/resumes/${id}`, {
      method: 'DELETE',
    }),
  getShareLink: (id) => apiClient(`/api/v1/resumes/${id}/share`),
  createShareLink: (id, options) =>
    apiClient(`/api/v1/resumes/${id}/share`, {
      method: 'POST',
      body: JSON.stringify(options),
    }),
  getVersions: (id) => apiClient(`/api/v1/resumes/${id}/versions`),
  createVersion: (id, data) =>
    apiClient(`/api/v1/resumes/${id}/versions`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  restoreVersion: (id, versionId) =>
    apiClient(`/api/v1/resumes/${id}/versions/${versionId}/restore`, {
      method: 'POST',
    }),
};

export default resumeApi;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
  },
  RESUMES: {
    BASE: '/api/v1/resumes',
    BY_ID: (id) => `/api/v1/resumes/${id}`,
    SHARE: (id) => `/api/v1/resumes/${id}/share`,
    VERSIONS: (id) => `/api/v1/resumes/${id}/versions`,
    RESTORE_VERSION: (id, versionId) => `/api/v1/resumes/${id}/versions/${versionId}/restore`,
  },
  PUBLIC: {
    SHARE: (code) => `/api/v1/public/share/${code}`,
  },
};

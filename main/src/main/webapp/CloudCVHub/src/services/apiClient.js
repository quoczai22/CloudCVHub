import { apiUrl } from '../apis/apiClient'

export const apiClient = {
  get: (url, opts = {}) => fetch(apiUrl(url), { credentials: 'include', ...opts }).then(r => r.json()),
  post: (url, body, opts = {}) => fetch(apiUrl(url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
    ...opts
  }).then(r => r.json()),
}

export default apiClient

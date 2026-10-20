import { apiUrl } from '../apis/apiClient'

export async function request(endpoint, options = {}) {
  const url = apiUrl(endpoint)
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const res = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Yêu cầu máy chủ thất bại')
  }
  return data
}

export default { request }

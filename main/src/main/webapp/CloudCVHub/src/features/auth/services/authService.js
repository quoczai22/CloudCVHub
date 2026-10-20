import { apiUrl } from '../../../apis/apiClient'

export async function loginApi({ email, password }) {
  const res = await fetch(apiUrl('/api/v1/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại')
  return data
}

export async function registerApi({ email, password, fullName }) {
  const res = await fetch(apiUrl('/api/v1/auth/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, fullName }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại')
  return data
}

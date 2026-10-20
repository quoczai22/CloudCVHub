import { request } from './api'

export async function login({ email, password }) {
  return request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function register({ email, password, fullName }) {
  return request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName }),
  })
}

export function saveSession(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function getSession() {
  const token = localStorage.getItem('token')
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    user = null
  }
  return { token, user }
}

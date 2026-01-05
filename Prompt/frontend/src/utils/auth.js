// utils/auth.js
const API_URL = import.meta.env.VITE_API_URL

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/auth'
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

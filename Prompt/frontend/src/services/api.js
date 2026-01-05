// services/api.js - Servicio centralizado para llamadas a la API
const API_URL = import.meta.env.VITE_API_URL

/**
 * Obtiene los headers de autenticación con el token JWT
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

/**
 * Maneja errores comunes de la API
 */
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token inválido o expirado
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth'
    throw new Error('Sesión expirada')
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Error en la solicitud')
  }

  return data
}

/**
 * Servicio de autenticación
 */
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return handleResponse(response)
  },

  register: async (username, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    return handleResponse(response)
  },

  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    return handleResponse(response)
  },

  resetPassword: async (token, newPassword) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    })
    return handleResponse(response)
  }
}

/**
 * Servicio de tareas
 */
export const tasksService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  create: async (text) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ text })
    })
    return handleResponse(response)
  },

  update: async (id, updates) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    })
    return handleResponse(response)
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  deleteAll: async (taskIds) => {
    await Promise.all(taskIds.map(id => tasksService.delete(id)))
  }
}

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

// Verificar si el token es válido y no ha expirado
export const isTokenValid = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    // Decodificar el payload del JWT (segunda parte)
    const payload = JSON.parse(atob(token.split('.')[1]))
    
    // Verificar si el token ha expirado (exp está en segundos)
    const currentTime = Math.floor(Date.now() / 1000)
    
    if (payload.exp && payload.exp < currentTime) {
      // Token expirado, limpiar storage
      logout()
      return false
    }
    
    return true
  } catch (error) {
    // Token malformado o inválido
    console.error('Error al validar token:', error)
    logout()
    return false
  }
}

export const isAuthenticated = () => {
  return isTokenValid()
}

// Función centralizada para hacer llamadas a la API con manejo automático de 401
export const apiCall = async (endpoint, options = {}) => {
  // Verificar token antes de hacer la llamada
  if (!isTokenValid()) {
    logout()
    throw new Error('Sesión expirada')
  }

  const defaultHeaders = getAuthHeaders()
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)

    // Si es 401, el token es inválido en el servidor
    if (response.status === 401) {
      logout()
      throw new Error('Sesión expirada o inválida')
    }

    // Si no es OK, lanzar error con el mensaje del servidor
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Error ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    // Si es error de red o el servidor no responde
    if (error.message === 'Sesión expirada' || error.message === 'Sesión expirada o inválida') {
      throw error
    }
    throw new Error(error.message || 'Error de conexión con el servidor')
  }
}

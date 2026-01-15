// @ts-nocheck
// middleware/security.js - Configuración de seguridad centralizada
import helmet from "helmet"
import hpp from "hpp"

/**
 * Sanitización manual de NoSQL injection
 * Compatible con Express 5
 */
const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[$\.]/g, '_')
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }
  if (typeof value === 'object' && value !== null) {
    const sanitized = {}
    Object.keys(value).forEach(key => {
      sanitized[key] = sanitizeValue(value[key])
    })
    return sanitized
  }
  return value
}

export const mongoSanitization = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeValue(req.body)
  }
  if (req.params) {
    Object.keys(req.params).forEach(key => {
      req.params[key] = sanitizeValue(req.params[key])
    })
  }
  // No sanitizamos req.query porque es inmutable en Express 5
  next()
}

/**
 * Configuración de Helmet para headers de seguridad HTTP
 * Protege contra XSS, clickjacking, MIME sniffing, etc.
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Permite recursos externos si es necesario
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Para CORS
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" }, // Previene clickjacking
  hidePoweredBy: true, // Oculta "X-Powered-By: Express"
  hsts: {
    maxAge: 31536000, // 1 año en segundos
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true, // Previene MIME sniffing
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "no-referrer" },
  xssFilter: true
})

/**
 * Protección contra HTTP Parameter Pollution
 * Previene ataques que usan parámetros duplicados
 */
export const parameterPollutionProtection = hpp({
  whitelist: [] // Agregar parámetros permitidos si es necesario
})

/**
 * Middleware adicional de validación de entrada
 * Limita el tamaño de JSON y URL-encoded data
 */
export const inputValidation = {
  json: { limit: '10kb' }, // Limita payload JSON a 10kb
  urlencoded: { extended: true, limit: '10kb' }
}

/**
 * Headers de seguridad adicionales personalizados
 */
export const customSecurityHeaders = (req, res, next) => {
  // Prevenir información sensible en errores
  res.removeHeader('X-Powered-By')
  
  // Política de permisos
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Prevenir carga de recursos externos no autorizados
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  next()
}

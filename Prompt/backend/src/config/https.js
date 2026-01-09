// config/https.js - Configuración HTTPS/SSL para producción
import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'

/**
 * Crea servidor HTTP o HTTPS según disponibilidad de certificados
 * @param {Express} app - Aplicación Express
 * @param {Object} config - Configuración del servidor
 * @returns {Server} Servidor HTTP o HTTPS
 */
export const createSecureServer = (app, config) => {
  const sslPath = path.join(process.cwd(), 'ssl')
  const certPath = path.join(sslPath, 'cert.pem')
  const keyPath = path.join(sslPath, 'key.pem')

  // Verificar si existen certificados SSL
  const hasCertificates = fs.existsSync(certPath) && fs.existsSync(keyPath)

  if (hasCertificates && config.useHttps) {
    console.log('🔒 Configurando servidor HTTPS con certificados SSL...')
    
    try {
      const httpsOptions = {
        key: fs.readFileSync(keyPath, 'utf8'),
        cert: fs.readFileSync(certPath, 'utf8')
      }

      const server = https.createServer(httpsOptions, app)
      console.log('✅ Servidor HTTPS configurado correctamente')
      return server
    } catch (error) {
      console.error('❌ Error al cargar certificados SSL:', error.message)
      console.log('⚠️ Fallback a HTTP...')
      return http.createServer(app)
    }
  } else {
    if (config.env === 'production') {
      console.warn('⚠️ ADVERTENCIA: Servidor en producción sin HTTPS')
      console.warn('💡 Configura certificados SSL en el directorio ./ssl/')
      console.warn('   - cert.pem (certificado)')
      console.warn('   - key.pem (clave privada)')
    } else {
      console.log('🔓 Servidor HTTP (desarrollo)')
    }
    return http.createServer(app)
  }
}

/**
 * Middleware para forzar HTTPS en producción
 * Redirige peticiones HTTP a HTTPS
 */
export const forceHttpsMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`)
  }
  next()
}

/**
 * Genera instrucciones para crear certificados auto-firmados (desarrollo)
 */
export const getSslInstructions = () => {
  return `
🔐 GENERAR CERTIFICADOS SSL PARA DESARROLLO:

1. Crear directorio SSL:
   mkdir ssl

2. Generar certificado auto-firmado (válido 365 días):
   openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes

3. Reiniciar el servidor

⚠️ PARA PRODUCCIÓN:
   - Usa Let's Encrypt (gratuito): https://letsencrypt.org/
   - O un certificado comercial de tu proveedor SSL
   - Configura el certificado en tu servidor web (Nginx, Apache) o en tu servicio cloud

📝 Variables de entorno necesarias:
   USE_HTTPS=true          # Habilitar HTTPS
   NODE_ENV=production     # Entorno de producción
`
}

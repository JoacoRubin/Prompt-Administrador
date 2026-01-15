// config/env.js - Validación centralizada de variables de entorno
process.loadEnvFile()

const requiredEnvVars = {
  // Base de datos
  URI_DB: 'Conexión a MongoDB',
  
  // JWT
  JWT_SECRET: 'Secret para tokens JWT',
  
  // Servidor
  PORT: 'Puerto del servidor (opcional, default: 1111)',
  FRONTEND_URL: 'URL del frontend para CORS',
  
  // Email (opcionales si no se usa esa funcionalidad)
  EMAIL_USER: 'Usuario de Gmail para envío de emails',
  PASS_GOOGLE_APP: 'Contraseña de aplicación de Gmail',
  ADMIN_EMAIL: 'Email del administrador para notificaciones'
}

const optionalVars = ['PORT', 'EMAIL_USER', 'PASS_GOOGLE_APP', 'ADMIN_EMAIL', 'NODE_ENV', 'USE_HTTPS']

export const validateEnv = () => {
  const missing = []
  const warnings = []

  Object.keys(requiredEnvVars).forEach(varName => {
    if (!process.env[varName]) {
      if (optionalVars.includes(varName)) {
        warnings.push(`⚠️ ${varName}: ${requiredEnvVars[varName]} (opcional)`)
      } else {
        missing.push(`❌ ${varName}: ${requiredEnvVars[varName]}`)
      }
    }
  })

  if (missing.length > 0) {
    console.error('\n❌ Variables de entorno REQUERIDAS faltantes:')
    missing.forEach(msg => console.error(msg))
    console.error('\n💡 Configura estas variables en el archivo .env\n')
    process.exit(1)
  }

  // Mostrar warnings solo si hay problemas críticos
  if (warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Variables opcionales faltantes (solo importante en producción)')
  }
}

// Exportar variables con valores por defecto
export const config = {
  port: process.env.PORT || 1111,
  env: process.env.NODE_ENV || 'development',
  useHttps: process.env.USE_HTTPS === 'true',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
  dbUri: process.env.URI_DB,
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.PASS_GOOGLE_APP,
    adminEmail: process.env.ADMIN_EMAIL
  }
}

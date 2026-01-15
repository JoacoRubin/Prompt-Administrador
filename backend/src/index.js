// punto de entrada
// archivo que ejecuta servicios

import express from "express"
import cors from "cors"
import { connectDb, getDbStatus } from "./config/mongo.js"
import { validateEnv, config } from "./config/env.js"
import { taskRouter } from "./routes/taskRouter.js"
import { logger } from "./middleware/logger.js"
import morgan from "morgan"
import { limiter } from "./middleware/limiter.js"
import { authRouter } from "./routes/authRouter.js"
import { authMiddleware } from "./middleware/auth.js"

// Middleware de seguridad
import { 
  securityHeaders, 
  mongoSanitization, 
  parameterPollutionProtection,
  customSecurityHeaders 
} from "./middleware/security.js"
import { createSecureServer, forceHttpsMiddleware } from "./config/https.js"

// Validar variables de entorno al iniciar
validateEnv()

const server = express()

// 🔒 Seguridad: Headers HTTP seguros (helmet)
server.use(securityHeaders)
server.use(customSecurityHeaders)

// 🔒 Seguridad: Forzar HTTPS en producción
if (config.env === 'production') {
  server.use(forceHttpsMiddleware)
}

// 🔒 Seguridad: Sanitización NoSQL injection
server.use(mongoSanitization)

// 🔒 Seguridad: Protección contra Parameter Pollution
server.use(parameterPollutionProtection)

// Configuración de CORS
server.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', config.frontendUrl],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Parsing con límites de seguridad
server.use(express.json({ limit: '10kb' }))
server.use(express.urlencoded({ extended: true, limit: '10kb' }))

server.use(morgan(logger))

server.get("/", (req, res) => {
  const db = getDbStatus()

  if (db.state === 1) {
    return res.status(200).json({
      success: true,
      message: "API Tasks funcionando correctamente",
      database: db.status
    })
  }

  return res.status(503).json({
    success: false,
    message: "API disponible pero la base de datos no está conectada",
    database: db.status
  })
})

server.use("/auth", limiter, authRouter)
server.use("/tasks", authMiddleware, taskRouter)

server.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Ruta no encontrada",
      path: req.originalUrl,
      method: req.method
    }
  })
})

// Crear servidor con soporte HTTPS si está configurado
const httpServer = createSecureServer(server, config)

httpServer.listen(config.port, () => {
  console.log(`\n✅ Servidor corriendo en http://localhost:${config.port}\n`)
  connectDb()
})
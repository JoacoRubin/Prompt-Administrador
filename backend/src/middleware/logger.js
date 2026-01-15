import fs from "fs"
import path from "path"
import { sendEmail, getAdminEmail } from "../config/email.js"
import { errorEmailTemplate } from "../templates/email.js"

try {
  process.loadEnvFile()
} catch (error) {
  // En producción el archivo .env no existe
  console.log('No .env file found, using system environment variables')
}

const logDir = path.join(process.cwd(), "log")

// Validar o crear el directorio log/
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

const logger = (tokens, req, res) => {
  const logObject = {
    ip: tokens["remote-addr"](req, res),
    user: tokens["remote-user"](req, res) || null,
    date: tokens.date(req, res, "iso"),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    httpVersion: tokens["http-version"](req, res),
    status: Number(tokens.status(req, res)),
    contentLength: tokens.res(req, res, "content-length"),
    referrer: tokens.referrer(req, res) || null,
    userAgent: tokens["user-agent"](req, res),
    responseTime: tokens["response-time"](req, res) + " ms"
  }

  // Nombre del archivo por día
  const fileName = path.join(logDir, `${new Date().toISOString().slice(0, 10)}.json`)

  // Si el archivo no existe, lo inicializamos como un array vacío
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, "[]")
  }

  // Leer el contenido actual
  const currentData = JSON.parse(fs.readFileSync(fileName, "utf8"))

  // Agregar el nuevo log
  currentData.push(logObject)

  // Escribir de nuevo el archivo con el array actualizado
  fs.writeFileSync(fileName, JSON.stringify(currentData, null, 2))

  // 🚨 Enviar correo si el status es 500
  if (logObject.status === 500) {
    const adminEmail = getAdminEmail()
    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: "⚠️ Error 500 en API Tasks",
        html: errorEmailTemplate(logObject)
      }).catch(error => {
        console.error("Error enviando correo de error 500:", error)
      })
    }
  }

  return null
}

export { logger }

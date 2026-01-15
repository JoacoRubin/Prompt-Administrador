// config/email.js - Configuración centralizada de email
import nodemailer from "nodemailer"

try {
  process.loadEnvFile()
} catch (error) {
  // En producción el archivo .env no existe
  console.log('No .env file found, using system environment variables')
}

// Validar variables de entorno requeridas
const requiredEnvVars = ['EMAIL_USER', 'PASS_GOOGLE_APP', 'ADMIN_EMAIL']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.warn(`⚠️ Faltan variables de entorno para email: ${missingVars.join(', ')}`)
  console.warn('⚠️ La funcionalidad de email no estará disponible')
}

// Crear transporter único y reutilizable
let transporter = null

if (!missingVars.length) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_GOOGLE_APP
      }
    })
    // Email configurado
  } catch (error) {
    console.error('❌ Error configurando transporter de email:', error)
  }
}

/**
 * Envía un email usando la configuración centralizada
 * @param {Object} options - Opciones del email
 * @param {string} options.to - Destinatario
 * @param {string} options.subject - Asunto
 * @param {string} options.html - Contenido HTML
 * @returns {Promise<Object>} - Información del email enviado
 */
export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    throw new Error('Transporter de email no configurado')
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    })
    return { success: true, info }
  } catch (error) {
    console.error('Error enviando email:', error)
    throw error
  }
}

export const getAdminEmail = () => process.env.ADMIN_EMAIL

export const getEmailUser = () => process.env.EMAIL_USER

export { transporter }

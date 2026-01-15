// controllers/authController.js
import bcrypt from "bcryptjs"
import { User } from "../models/auth.model.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { sendEmail } from "../config/email.js"
import { resetPasswordEmailTemplate } from "../templates/email.js"

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Validar campos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios"
      })
    }

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "El usuario o correo ya está registrado"
      })
    }

    const hash = await bcrypt.hash(password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const newUser = new User({ 
      username, 
      email, 
      password: hash,
      verificationToken
    })
    await newUser.save()

    // Intentar enviar email de verificación (no bloquea si falla)
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2193B0;">¡Bienvenido a JrubinsteinApp!</h2>
          <p>Hola ${username},</p>
          <p>Gracias por registrarte. Por favor verifica tu correo electrónico haciendo clic en el botón:</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00B894; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">Verificar Email</a>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
          <p>Este enlace expirará en 24 horas.</p>
          <p>Si no solicitaste esta cuenta, ignora este email.</p>
        </div>
      `

      await sendEmail({
        to: email,
        subject: 'Verifica tu cuenta - JrubinsteinApp',
        html: emailHtml
      })
    } catch (emailError) {
      console.error('Error al enviar email de verificación:', emailError)
      // Continuar con el registro aunque falle el email
    }

    return res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente.",
      user: {
        id: newUser._id,
        email: newUser.email
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email y contraseña son obligatorios"
      })
    }

    // Buscar usuario por email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas"
      })
    }

    // NOTA: Verificación de email deshabilitada temporalmente para usuarios existentes
    // Descomentar cuando todos los usuarios estén migrados
    /*
    if (user.isVerified === false && user.verificationToken) {
      return res.status(403).json({
        success: false,
        error: "Por favor verifica tu email antes de iniciar sesión"
      })
    }
    */

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas"
      })
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error("Error en /login:", error)
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "El email es obligatorio"
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      // Por seguridad, no revelamos si el email existe
      return res.status(200).json({
        success: true,
        message: "Si el correo existe, recibirás un enlace de recuperación"
      })
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
    await user.save()

    // Crear URL de reset
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    // Intentar enviar email (no bloquear si falla)
    try {
      await sendEmail({
        to: user.email,
        subject: '🔐 Recuperación de Contraseña - JrubinsteinApp',
        html: resetPasswordEmailTemplate(user.username, resetUrl)
      })
      console.log(`Email de recuperación enviado a ${email}`)
    } catch (emailError) {
      console.error("Error al enviar email de recuperación:", emailError)
      // Continuar sin fallar - el token se guardó en la DB
      // En desarrollo, el usuario puede usar el token directamente si lo necesita
    }

    return res.status(200).json({
      success: true,
      message: "Si el correo existe, recibirás un enlace de recuperación"
    })
  } catch (error) {
    console.error("Error en forgot-password:", error)
    return res.status(500).json({
      success: false,
      error: "Error al procesar la solicitud"
    })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Token de verificación es obligatorio"
      })
    }

    // Buscar usuario con el token de verificación
    const user = await User.findOne({ verificationToken: token })

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Token de verificación inválido o expirado"
      })
    }

    // Verificar usuario
    user.isVerified = true
    user.verificationToken = null
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Email verificado correctamente. Ya puedes iniciar sesión."
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Token y nueva contraseña son obligatorios"
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 6 caracteres"
      })
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Token inválido o expirado"
      })
    }

    // Actualizar contraseña
    const hash = await bcrypt.hash(newPassword, 10)
    user.password = hash
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Contraseña actualizada correctamente"
    })
  } catch (error) {
    console.error("Error en reset-password:", error)
    return res.status(500).json({
      success: false,
      error: "Error al procesar la solicitud"
    })
  }
}

export { login, register, forgotPassword, resetPassword, verifyEmail }

// templates/email.js

const errorEmailTemplate = (logObject) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background: #d32f2f;
        color: #fff;
        padding: 16px;
        text-align: center;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .content h2 {
        margin-top: 0;
        color: #d32f2f;
      }
      .log-details {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 12px;
        margin-top: 12px;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>⚠️ Error en API Tasks</h1>
      </div>
      <div class="content">
        <h2>Se ha detectado un error 500</h2>
        <p>Estimado gestor, la API ha registrado un fallo interno. Aquí están los detalles:</p>
        <div class="log-details">
          <p><strong>Fecha:</strong> ${logObject.date}</p>
          <p><strong>Método:</strong> ${logObject.method}</p>
          <p><strong>Ruta:</strong> ${logObject.url}</p>
          <p><strong>IP:</strong> ${logObject.ip}</p>
          <p><strong>User-Agent:</strong> ${logObject.userAgent}</p>
          <p><strong>Tiempo de respuesta:</strong> ${logObject.responseTime}</p>
        </div>
        <p>Por favor, revisa el sistema para identificar la causa del error.</p>
      </div>
      <div class="footer">
        <p>Este es un mensaje automático generado por el sistema de monitoreo.</p>
      </div>
    </div>
  </body>
  </html>
  `
}

const resetPasswordEmailTemplate = (username, resetUrl) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #6DD5ED 0%, #2193B0 100%);
        color: #fff;
        padding: 24px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333;
      }
      .content h2 {
        margin-top: 0;
        color: #2193B0;
      }
      .btn-reset {
        display: inline-block;
        background: linear-gradient(135deg, #86E3CE 0%, #94BBE9 100%);
        color: white;
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 25px;
        margin: 20px 0;
        font-weight: bold;
      }
      .warning {
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 6px;
        padding: 12px;
        margin-top: 20px;
        font-size: 14px;
        color: #856404;
      }
      .footer {
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: #777;
        background: #f9f9f9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🔐 Recuperación de Contraseña</h1>
      </div>
      <div class="content">
        <h2>Hola ${username},</h2>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
        <div style="text-align: center;">
          <a href="${resetUrl}" class="btn-reset">Restablecer Contraseña</a>
        </div>
        <div class="warning">
          <strong>⚠️ Importante:</strong>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>Este enlace expira en 1 hora</li>
            <li>Si no solicitaste este cambio, ignora este mensaje</li>
            <li>Por seguridad, nunca compartas este enlace</li>
          </ul>
        </div>
        <p style="margin-top: 20px;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
        <p style="word-break: break-all; color: #2193B0; font-size: 12px;">${resetUrl}</p>
      </div>
      <div class="footer">
        <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        <p>© 2026 JrubinsteinApp – Administrador de Tareas por Voz</p>
      </div>
    </div>
  </body>
  </html>
  `
}

export { errorEmailTemplate, resetPasswordEmailTemplate }
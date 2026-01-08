import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export function Tutorial() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">¿Cómo usar JrubinsteinApp?</h1>
        <p className="info-subtitle">Guía completa para gestionar tus tareas por voz</p>
      </div>

      <div className="info-container">
        <div className="info-sections">
          <div className="info-section">
            <div className="section-icon">🚀</div>
            <h3 className="section-title">Primeros pasos</h3>
            <p className="section-text">
              JrubinsteinApp es un administrador de tareas por voz que te permite crear, gestionar y 
              completar tareas sin necesidad de escribir. Solo necesitas hablar y la aplicación hará el resto.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">📝</div>
            <h3 className="section-title">Crear una cuenta</h3>
            <p className="section-text">
              <strong>1.</strong> Haz clic en "¿No tienes cuenta? Regístrate"<br/>
              <strong>2.</strong> Completa el formulario con:
            </p>
            <ul className="section-list">
              <li>Nombre de usuario</li>
              <li>Email</li>
              <li>Contraseña (mínimo 6 caracteres)</li>
            </ul>
            <p className="section-text">
              <strong>3.</strong> Haz clic en "Registrarse"<br/>
              <strong>4.</strong> Inicia sesión con tus credenciales
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">🎤</div>
            <h3 className="section-title">Agregar tareas</h3>
            <p className="section-text">
              <strong>Por voz:</strong> Presiona el botón del micrófono (🎤) y habla claramente tu tarea. 
              Por ejemplo: "Comprar leche" o "Llamar al doctor".<br/><br/>
              <strong>Por texto:</strong> Escribe tu tarea en el campo de texto y presiona "Agregar" o Enter.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">✅</div>
            <h3 className="section-title">Gestionar tus tareas</h3>
            <div className="subsection">
              <h4>✓ Marcar como completada</h4>
              <p className="section-text">
                Presiona el botón de <strong>check (✓)</strong> para marcar una tarea como completada. 
                El texto aparecerá tachado.
              </p>
            </div>
            <div className="subsection">
              <h4>↩ Desmarcar tarea</h4>
              <p className="section-text">
                Si marcaste una tarea por error, presiona el botón <strong>X</strong> para desmarcala 
                y volverla a su estado pendiente.
              </p>
            </div>
            <div className="subsection">
              <h4>🗑 Eliminar tarea</h4>
              <p className="section-text">
                Presiona el botón de <strong>basura (🗑)</strong> para eliminar definitivamente una tarea. 
                Se te pedirá confirmación antes de borrarla.
              </p>
            </div>
          </div>

          <div className="info-section">
            <div className="section-icon">✏️</div>
            <h3 className="section-title">Editar tareas</h3>
            <p className="section-text">
              Haz clic en el botón de lápiz (✏️) para editar el texto de una tarea existente. 
              Presiona Enter para guardar o Escape para cancelar.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">🔒</div>
            <h3 className="section-title">Tu Cuenta</h3>
            <p className="section-text">
              Todas tus tareas están asociadas a tu cuenta y se sincronizan automáticamente. 
              Inicia sesión para acceder desde cualquier dispositivo. 
              Si olvidas tu contraseña, usa la opción "¿Olvidaste tu contraseña?" para recuperarla por correo.
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate(authenticated ? '/mis-tareas' : '/')} 
          className="back-button"
        >
          {authenticated ? 'Volver a Mis Tareas' : 'Volver a Inicio'}
        </button>
      </div>
    </div>
  )
}
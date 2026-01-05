import { useNavigate } from 'react-router-dom'

export function Tutorial() {
  const navigate = useNavigate()

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">📚 ¿Cómo se usa?</h1>
        <p className="info-subtitle">Aprende a gestionar tus tareas con nuestra aplicación</p>
      </div>

      <div className="info-container">
        <div className="info-sections">
          <div className="info-section">
            <div className="section-icon">🎤</div>
            <h3 className="section-title">Comandos de Voz</h3>
            <p className="section-text">
              Presiona el botón del micrófono y habla claramente. 
              Di tu tarea de forma natural, por ejemplo: "Comprar leche" o "Llamar al doctor". 
              La app convertirá tu voz en texto automáticamente.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">✏️</div>
            <h3 className="section-title">Gestión de Tareas</h3>
            <p className="section-text">
              Puedes agregar tareas escribiéndolas directamente o usando comandos de voz. 
              Marca como completadas con ✓, edita con el ícono de lápiz, o elimina con 🗑️. 
              Todas tus tareas se sincronizan automáticamente.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">🔒</div>
            <h3 className="section-title">Tu Cuenta</h3>
            <p className="section-text">
              Todas tus tareas están asociadas a tu cuenta. 
              Inicia sesión para acceder desde cualquier dispositivo. 
              Si olvidas tu contraseña, usa la opción "¿Olvidaste tu contraseña?" para recuperarla por correo.
            </p>
          </div>
        </div>

        <button onClick={() => navigate('/mis-tareas')} className="back-button">
          Volver a Mis Tareas
        </button>
      </div>
    </div>
  )
}
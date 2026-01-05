import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">⚙️ Dashboard</h1>
        <p className="info-subtitle">Gestiona tu perfil y configuración</p>
      </div>

      <div className="info-container">
        <div className="info-sections">
          <div className="info-section">
            <div className="section-icon">👤</div>
            <h3 className="section-title">Datos del Usuario</h3>
            <p className="section-text">
              Modifica tu nombre de usuario, correo electrónico y contraseña. 
              Mantén tu información actualizada para una mejor experiencia. 
              Recuerda usar una contraseña segura para proteger tu cuenta.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">🌍</div>
            <h3 className="section-title">Configuración de Idioma</h3>
            <p className="section-text">
              Personaliza el idioma de la interfaz y del reconocimiento de voz. 
              Actualmente soportamos español (Argentina) para comandos de voz. 
              Más idiomas estarán disponibles próximamente.
            </p>
          </div>

          <div className="info-section">
            <div className="section-icon">📊</div>
            <h3 className="section-title">Historial de Tareas</h3>
            <p className="section-text">
              Accede al historial completo de todas tus tareas, incluyendo las completadas y eliminadas. 
              Visualiza estadísticas de productividad y analiza tus patrones de trabajo. 
              Exporta tu historial cuando lo necesites.
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
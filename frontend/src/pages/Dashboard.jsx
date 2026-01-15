import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export function Dashboard() {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState('es-AR')
  const authenticated = isAuthenticated()

  const languages = [
    { code: 'es-AR', name: 'Español (Argentina)' },
    { code: 'es-ES', name: 'Español (España)' },
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'it-IT', name: 'Italiano' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'zh-CN', name: '中文 (简体)' },
    { code: 'ko-KR', name: '한국어' },
  ]

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    setSelectedLanguage(newLang)
    localStorage.setItem('appLanguage', newLang)
  }

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
            </p>
            <div className="language-selector">
              <label htmlFor="language-select" className="language-label">
                Selecciona tu idioma:
              </label>
              <select 
                id="language-select"
                value={selectedLanguage} 
                onChange={handleLanguageChange}
                className="language-dropdown"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
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
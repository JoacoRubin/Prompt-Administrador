import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Validar que el token sea válido antes de guardarlo
          try {
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            
            if (payload.exp && payload.exp < currentTime) {
              setError('Token recibido inválido. Por favor, intenta nuevamente.');
              return;
            }
          } catch (tokenError) {
            console.error('Error al validar token:', tokenError);
            setError('Error al procesar el inicio de sesión.');
            return;
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/mis-tareas');
        } else {
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '' });
          setError('');
          alert('✅ ' + data.message + '\n\nRevisa tu bandeja de entrada y verifica tu email.');
        }
      } else {
        setError(data.error || 'Error en la operación');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <header className="header">
        <nav className="nav">
          <Link to="/tutorial" className="nav-link">¿Cómo se usa?</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
      </header>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">
            {isLogin ? '👋 Bienvenido' : '🚀 Crear Cuenta'}
          </h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Ingresa a tu cuenta para gestionar tus tareas' 
              : 'Regístrate para comenzar a usar la app'}
          </p>

          <div className="auth-tabs">
            <button
              type="button"
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Registro
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Tu nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading 
                ? 'Procesando...' 
                : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          {isLogin && (
            <div className="auth-links">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="link-button"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


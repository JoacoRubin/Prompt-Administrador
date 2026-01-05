import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState(() => token ? 'loading' : 'error');
  const [message, setMessage] = useState(() => token ? '' : 'Token de verificación no válido');

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
          method: 'GET'
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Error al verificar el email');
        }
      } catch {
        setStatus('error');
        setMessage('Error de conexión con el servidor');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">Verificación de Email</h2>
        
        {status === 'loading' && (
          <div className="verify-status">
            <div className="spinner"></div>
            <p>Verificando tu email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="verify-status success">
            <div className="icon-circle success">✓</div>
            <p className="success-message">{message}</p>
            <p className="redirect-message">Redirigiendo al inicio de sesión...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="verify-status error">
            <div className="icon-circle error">✗</div>
            <p className="error-message">{message}</p>
            <Link to="/auth" className="btn-link">
              Volver al inicio de sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

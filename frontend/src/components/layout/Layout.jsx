import { Link } from "react-router-dom";
import { logout, isAuthenticated } from "../../utils/auth";

export function Layout({ children }) {
  const authenticated = isAuthenticated();

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/tutorial" className="nav-link">¿Cómo se usa?</Link>
          {authenticated && (
            <>
              <Link to="/mis-tareas" className="nav-link">Mis tareas</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </>
          )}
          {!authenticated && (
            <Link to="/auth" className="nav-link">Iniciar sesión</Link>
          )}
        </nav>
        {authenticated && (
          <button onClick={logout} className="btn btn-secondary">
            Cerrar sesión
          </button>
        )}
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <p>© 2026 JrubinsteinApp – Administrador de Tareas por Voz</p>
      </footer>
    </div>
  );
}


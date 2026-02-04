import { useState } from 'react';

function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Credenciales predeterminadas
      if (email === 'admin@comicstore.com' && password === 'admin123') {
        localStorage.setItem('adminToken', 'admin_token');
        onLogin();
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h2>Inicio de Sesión de Administrador</h2>
        <p className="admin-login-description">Ingresa a la zona de administración</p>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@comicstore.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="admin-login-button">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Volver a la <a href="/products">tienda</a></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
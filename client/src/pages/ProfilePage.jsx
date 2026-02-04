import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setUserData(data.data?.user || data);
        setFormData({
          fullName: data.data?.user?.fullName || data.fullName,
          email: data.data?.user?.email || data.email,
        });
      } catch (err) {
        setError(err.message || 'Error al cargar perfil');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.updateProfile(formData);
      setUserData(data.data?.user || data);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Error al actualizar perfil');
    }
  };

  if (loading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Mi Perfil</h2>
      </div>

      <div className="profile-container">
        <div className="profile-info">
          <div className="info-section">
            <h3>Datos Personales</h3>
            {editing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="fullName">Nombre Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Guardar cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-details">
                <div className="info-item">
                  <label>Nombre Completo</label>
                  <span>{userData.fullName}</span>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <span>{userData.email}</span>
                </div>
                <div className="info-item">
                  <label>Fecha de Registro</label>
                  <span>
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button onClick={() => setEditing(true)} className="edit-button">
                  Editar perfil
                </button>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Actividad</h3>
            <div className="activity-info">
              <div className="activity-item">
                <span className="label">Pedidos realizados</span>
                <span className="value">0</span> {/* This should come from API */}
              </div>
              <div className="activity-item">
                <span className="label">Productos comprados</span>
                <span className="value">0</span> {/* This should come from API */}
              </div>
              <div className="activity-item">
                <span className="label">Gasto total</span>
                <span className="value">$0.00</span> {/* This should come from API */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Protected Route Component
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken') === 'admin_token';
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

function App() {
  const { isAuthenticated, logout } = useAuth();
  const { getTotalItems, cartVersion } = useCart(); // Agregar cartVersion
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('adminToken') === 'admin_token');

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  // Forzar re-render cuando cambie el carrito
  const totalItems = getTotalItems();

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="logo">Comic Store</div>
          <nav className="nav">
            <a href="/">Inicio</a>
            <a href="/cart" className="cart-link">
              Carrito ({totalItems})
            </a>
            {isAuthenticated ? (
              <>
                <button onClick={logout} className="logout-button">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <a href="/login">Iniciar Sesión</a>
                <a href="/register">Registrarse</a>
              </>
            )}
            {/* Admin Link */}
            {!isAdmin && <a href="/admin/login" className="admin-link">Admin</a>}
          </nav>
        </header>

        {/* Main Content */}
        <main className="main">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Public Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={
              !isAdmin ? (
                <AdminLoginPage onLogin={handleAdminLogin} />
              ) : (
                <Navigate to="/admin" />
              )
            } />
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminPage onLogout={handleAdminLogout} />
              </AdminProtectedRoute>
            } />
            
            {/* Fallback Route */}
            <Route path="*" element={<div className="page"><h1>404</h1><p>Página no encontrada</p></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2026 Comic Store. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Bienvenido a Comic Store</h1>
        <p>Descubre una amplia colección de cómics de tus personajes favoritos</p>
        <Link to="/products" className="cta-button">
          Ver Cómics
        </Link>
      </div>

      <div className="features">
        <div className="feature">
          <h3>Cómics Originales</h3>
          <p>Ofrecemos cómics oficiales y ediciones especiales</p>
        </div>
        <div className="feature">
          <h3>Envío Rápido</h3>
          <p>Entrega en 24-48 horas en todo el país</p>
        </div>
        <div className="feature">
          <h3>Soporte 24/7</h3>
          <p>Equipo de atención al cliente disponible las 24 horas</p>
        </div>
      </div>

      <div className="categories">
        <h2>Categorías Populares</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image">
              <div className="image-placeholder">🦸</div>
            </div>
            <h3>Superhéroes</h3>
            <p>Marvel, DC y más</p>
            <Link to="/products?category=1" className="category-link">
              Ver cómics
            </Link>
          </div>
          <div className="category-card">
            <div className="category-image">
              <div className="image-placeholder">🧟</div>
            </div>
            <h3>Horror</h3>
            <p>Terror y suspenso</p>
            <Link to="/products?category=2" className="category-link">
              Ver cómics
            </Link>
          </div>
          <div className="category-card">
            <div className="category-image">
              <div className="image-placeholder">⚔️</div>
            </div>
            <h3>Fantasía</h3>
            <p>Magia y aventuras</p>
            <Link to="/products?category=3" className="category-link">
              Ver cómics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

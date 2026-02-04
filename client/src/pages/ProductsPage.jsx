import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useCart } from '../contexts/CartContext';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
    tags: [],
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, tagsData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getTags(),
        ]);
        
        setProducts(productsData.data?.products || productsData);
        setCategories(categoriesData.data?.categories || categoriesData);
        setTags(tagsData.data?.tags || tagsData);
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFilters(prev => {
        const newTags = checked 
          ? [...prev.tags, value] 
          : prev.tags.filter(tag => tag !== value);
        return { ...prev, tags: newTags };
      });
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = {
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.priceMin && { price_min: filters.priceMin }),
        ...(filters.priceMax && { price_max: filters.priceMax }),
        ...(filters.tags.length > 0 && { tags: filters.tags.join(',') }),
      };
      
      const data = await api.getProducts(query);
      setProducts(data.data?.products || data);
    } catch (err) {
      setError(err.message || 'Error al buscar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product);
    // Ensure product has all necessary fields
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      description: product.description,
      publisher: product.publisher
    };
    
    try {
      addToCart(productToAdd);
      // Crear un elemento de notificación temporal
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
      `;
      notification.textContent = `✅ ${product.name} agregado al carrito!`;
      document.body.appendChild(notification);
      
      // Remover la notificación después de 3 segundos
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Mostrar error
      const errorNotification = document.createElement('div');
      errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
      `;
      errorNotification.textContent = `❌ ${error.message}`;
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        if (document.body.contains(errorNotification)) {
          document.body.removeChild(errorNotification);
        }
      }, 4000);
    }
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h2 className="products-title">Cómics</h2>
        <p className="products-subtitle">Explora nuestra colección de cómics</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            name="search"
            placeholder="Buscar cómics..."
            value={filters.search}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="category-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <input
            type="number"
            name="priceMin"
            placeholder="Precio mínimo"
            value={filters.priceMin}
            onChange={handleFilterChange}
            min="0"
            className="price-input"
          />
          <span>-</span>
          <input
            type="number"
            name="priceMax"
            placeholder="Precio máximo"
            value={filters.priceMax}
            onChange={handleFilterChange}
            min="0"
            className="price-input"
          />
        </div>

        <div className="filter-group">
          <label>Etiquetas:</label>
          <div className="tags-container">
            {tags.map(tag => (
              <label key={tag.id} className="tag-label">
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={filters.tags.includes(tag.id.toString())}
                  onChange={handleFilterChange}
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-img"
                  loading="lazy"
                />
              ) : (
                <div className="image-placeholder">{product.name.charAt(0)}</div>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-price">${product.price}</span>
                <span className="product-stock">Stock: {product.stock}</span>
              </div>
              <div className="product-details">
                <div className="product-detail">
                  <span className="detail-label">Editorial:</span>
                  <span className="detail-value">{product.publisher}</span>
                </div>
                {product.series && (
                  <div className="product-detail">
                    <span className="detail-label">Serie:</span>
                    <span className="detail-value">{product.series}</span>
                  </div>
                )}
                {product.issue_number && (
                  <div className="product-detail">
                    <span className="detail-label">Número:</span>
                    <span className="detail-value">{product.issue_number}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          No se encontraron cómics que coincidan con los filtros.
        </div>
      )}
    </div>
  );
}

export default ProductsPage;

import { useState, useEffect } from 'react';
import { api } from '../services/api';

function AdminPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  // Formulario de producto
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    publisher: '',
    sku: '',
    series: '',
    issue_number: '',
    publication_date: '',
    categoryId: '',
    tags: []
  });

  // Formulario de categoría
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Formulario de etiqueta
  const [tagForm, setTagForm] = useState({
    name: ''
  });

  // Listas de datos
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchTags();
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        issue_number: productForm.issue_number,
        publication_date: productForm.publication_date,
        categoryId: parseInt(productForm.categoryId),
        image: '/pngtree-colorful-superhero-backgrounds-with-cartoon-comic-book-halftone-zoom-image_13900437.png'
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productData);
        setSuccessMessage('Producto actualizado exitosamente');
        setEditingProduct(null);
      } else {
        await api.createProduct(productData);
        setSuccessMessage('Producto creado exitosamente');
      }

      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        publisher: '',
        sku: '',
        series: '',
        issue_number: '',
        publication_date: '',
        categoryId: '',
        tags: []
      });
      fetchProducts();
    } catch (error) {
      setErrorMessage(error.message || 'Error al procesar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      publisher: product.publisher,
      sku: product.sku,
      series: product.series || '',
      issue_number: product.issue_number || '',
      publication_date: product.publication_date || '',
      categoryId: product.categoryId?.toString() || '',
      tags: []
    });
    setActiveTab('products');
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${productName}"?`)) {
      return;
    }

    setLoading(true);
    try {
      await api.deleteProduct(productId);
      setSuccessMessage('Producto eliminado exitosamente');
      fetchProducts();
    } catch (error) {
      setErrorMessage(error.message || 'Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      publisher: '',
      sku: '',
      series: '',
      issue_number: '',
      publication_date: '',
      categoryId: '',
      tags: []
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await api.createCategory(categoryForm);
      setSuccessMessage('Categoría creada exitosamente');
      setCategoryForm({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      setErrorMessage(error.message || 'Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await api.createTag(tagForm);
      setSuccessMessage('Etiqueta creada exitosamente');
      setTagForm({ name: '' });
      fetchTags();
    } catch (error) {
      setErrorMessage(error.message || 'Error al crear la etiqueta');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data?.products || response);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.getTags();
      setTags(response);
    } catch (error) {
      console.error('Error al obtener etiquetas:', error);
    }
  };

  const renderProductsTab = () => (
    <div className="admin-tab-content">
      <h3>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <form onSubmit={handleProductSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            value={productForm.stock}
            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Editorial</label>
          <input
            type="text"
            value={productForm.publisher}
            onChange={(e) => setProductForm({ ...productForm, publisher: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"
            value={productForm.sku}
            onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Serie</label>
          <input
            type="text"
            value={productForm.series}
            onChange={(e) => setProductForm({ ...productForm, series: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Issue</label>
          <input
            type="text"
            value={productForm.issue_number}
            onChange={(e) => setProductForm({ ...productForm, issue_number: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Publicación</label>
          <input
            type="date"
            value={productForm.publication_date}
            onChange={(e) => setProductForm({ ...productForm, publication_date: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            value={productForm.categoryId}
            onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Procesando...' : (editingProduct ? 'Actualizar Producto' : 'Agregar Producto')}
          </button>
          {editingProduct && (
            <button type="button" onClick={handleCancelEdit} className="cancel-button">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>Productos ({products.length})</h3>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="product-img" />
                ) : (
                  <div className="image-placeholder">{product.name.charAt(0)}</div>
                )}
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <p className="product-price">${product.price}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                </div>
                <div className="product-details">
                  <p><strong>Editorial:</strong> {product.publisher}</p>
                  <p><strong>SKU:</strong> {product.sku}</p>
                  {product.series && <p><strong>Serie:</strong> {product.series}</p>}
                </div>
                <div className="product-actions">
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="edit-button"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="delete-button"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoriesTab = () => (
    <div className="admin-tab-content">
      <h3>Agregar Categoría</h3>
      <form onSubmit={handleCategorySubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={categoryForm.description}
            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Agregar Categoría'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Categorías</h3>
        <div className="category-list">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <h4>{category.name}</h4>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTagsTab = () => (
    <div className="admin-tab-content">
      <h3>Agregar Etiqueta</h3>
      <form onSubmit={handleTagSubmit} className="admin-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={tagForm.name}
            onChange={(e) => setTagForm({ ...tagForm, name: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Agregar Etiqueta'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Etiquetas</h3>
        <div className="tag-list">
          {tags.map(tag => (
            <div key={tag.id} className="tag-card">
              <span className="tag-name">{tag.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <div className="admin-actions">
          <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Productos
        </button>
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categorías
        </button>
        <button
          className={`admin-tab ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Etiquetas
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && renderProductsTab()}
        {activeTab === 'categories' && renderCategoriesTab()}
        {activeTab === 'tags' && renderTagsTab()}
      </div>
    </div>
  );
}

export default AdminPage;
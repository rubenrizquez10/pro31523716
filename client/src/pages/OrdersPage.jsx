import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders();
        console.log('Orders API response:', response);
        
        // Manejar diferentes estructuras de respuesta
        let ordersData = [];
        if (response.data && response.data.orders) {
          ordersData = response.data.orders;
        } else if (response.orders) {
          ordersData = response.orders;
        } else if (Array.isArray(response)) {
          ordersData = response;
        } else if (Array.isArray(response.data)) {
          ordersData = response.data;
        }
        
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Error al cargar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatStatus = (status) => {
    const statusMap = {
      PENDING: 'Pendiente',
      COMPLETED: 'Completado',
      CANCELED: 'Cancelado',
      PAYMENT_FAILED: 'Pago Fallido',
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return <div className="loading">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="no-orders">
          <h2>No tienes pedidos aún</h2>
          <p>Realiza tu primera compra para ver el historial</p>
          <a href="/products" className="continue-shopping-button">
            Ver productos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Historial de Pedidos</h2>
        <p>Verifica el estado de tus pedidos</p>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <span className="order-number">Pedido #{order.id}</span>
                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {formatStatus(order.status)}
                </span>
              </div>
              <div className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="order-items">
              {order.OrderItems?.map(item => (
                <div key={item.productId} className="order-item">
                  <div className="item-image">
                    {item.Product?.image ? (
                      <img 
                        src={item.Product.image} 
                        alt={item.Product.name} 
                        className="item-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="image-placeholder" style={{ display: item.Product?.image ? 'none' : 'flex' }}>
                      {item.Product?.name?.charAt(0) || '?'}
                    </div>
                  </div>
                  <div className="item-details">
                    <span className="item-name">{item.Product?.name || 'Producto desconocido'}</span>
                    {item.Product?.publisher && (
                      <span className="item-publisher">Editorial: {item.Product.publisher}</span>
                    )}
                    {item.Product?.series && (
                      <span className="item-series">Serie: {item.Product.series}</span>
                    )}
                  </div>
                  <div className="item-quantity-price">
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-total">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuestos (16%)</span>
                <span>${(order.totalAmount * 0.16).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(order.totalAmount * 1.16).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;

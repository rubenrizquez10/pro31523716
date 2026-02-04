import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para continuar</p>
          <Link to="/products" className="continue-shopping-button">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Carrito de Compras ({getTotalItems()})</h2>
        <button onClick={clearCart} className="clear-cart-button">
          Vaciar carrito
        </button>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <div className="cart-item-image">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="image-placeholder">{item.name?.charAt(0) || '?'}</div>
                )}
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name || 'Producto desconocido'}</h3>
                <p className="cart-item-price">${item.price || 0}</p>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              ${((item.price || 0) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Impuestos</span>
          <span>${(getTotalPrice() * 0.16).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${(getTotalPrice() * 1.16).toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="checkout-button">
          Proceder al checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
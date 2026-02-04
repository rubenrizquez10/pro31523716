import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { api } from '../services/api';
import './CheckoutPage.css';

function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save cart items before clearing
      setOrderItems([...cart]);
      
      const orderPayload = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentMethod: 'CreditCard',
        paymentDetails: {
          cardToken: 'tok_visa_123456789', // Simulated token
          currency: 'USD',
        },
      };

      const response = await api.createOrder(orderPayload);
      setOrderData(response.data.order);
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  if (success) {
    return (
      <div className="checkout-page">
        <div className="payment-success">
          <div className="ticket-container">
            <div className="ticket-header">
              <h2>Comic Store</h2>
              <p>Factura / Ticket</p>
            </div>
            <div className="ticket-info">
              <div className="ticket-row">
                <span>Fecha:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="ticket-row">
                <span>Numero de pedido:</span>
                <span>#{orderData?.id || Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="ticket-row">
                <span>Metodo de pago:</span>
                <span>Tarjeta de Crédito</span>
              </div>
            </div>
            <div className="ticket-items">
              <h3>Productos:</h3>
              {orderItems.map(item => (
                <div key={item.id} className="ticket-item">
                  <div className="ticket-item-info">
                    <span>{item.name}</span>
                    <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                  </div>
                  <div className="ticket-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="ticket-summary">
              <div className="ticket-row">
                <span>Subtotal:</span>
                <span>${orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="ticket-row">
                <span>Impuestos (16%):</span>
                <span>${(orderItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.16).toFixed(2)}</span>
              </div>
              <div className="ticket-row total">
                <span>Total:</span>
                <span>${(orderItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.16).toFixed(2)}</span>
              </div>
            </div>
            <div className="ticket-footer">
              <p>¡Gracias por tu compra!</p>
              <p>Te esperamos pronto</p>
            </div>
          </div>
          <div className="ticket-actions">
            <button onClick={handlePrintTicket} className="print-button">
              Imprimir Ticket
            </button>
            <a href="/" className="continue-shopping-button">
              Continuar comprando
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Completa tu pedido</p>
      </div>

      <div className="checkout-container">
        <div className="checkout-left">
          <h3>Detalles de pago</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Número de tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
                required
                placeholder="1234 5678 9010 1112"
                maxLength="19"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Nombre en tarjeta</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentData.cardName}
                onChange={handlePaymentChange}
                required
                placeholder="NOMBRE COMPLETO"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Vencimiento</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={paymentData.cardExpiry}
                  onChange={handlePaymentChange}
                  required
                  placeholder="MM/AA"
                  maxLength="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardCVC">CVC</label>
                <input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  value={paymentData.cardCVC}
                  onChange={handlePaymentChange}
                  required
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="pay-button">
              {loading ? 'Procesando...' : `Pagar $${(getTotalPrice() * 1.16).toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="checkout-right">
          <h3>Resumen del pedido</h3>
          <div className="order-summary">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name}</span>
                <span className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Impuestos (16%)</span>
              <span>${(getTotalPrice() * 0.16).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(getTotalPrice() * 1.16).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    console.log('addToCart called with product:', product);
    
    // Validate stock
    if (product.stock < quantity) {
      throw new Error(`Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`);
    }
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        // Check if new quantity exceeds stock
        if (newQuantity > product.stock) {
          throw new Error(`Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`);
        }
        
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      
      console.log('New cart state:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          // Check stock before updating
          if (quantity > item.stock) {
            alert(`Stock insuficiente. Solo hay ${item.stock} unidades disponibles.`);
            return item; // Don't update if exceeds stock
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Función para forzar re-render de componentes que usan el carrito
  const [cartVersion, setCartVersion] = useState(0);
  
  useEffect(() => {
    setCartVersion(prev => prev + 1);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        cartVersion, // Para forzar re-renders
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
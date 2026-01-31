import React, { useState } from 'react';
import Header from '../components/Header';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartItemCount 
  } = useCart();
  
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="cart">
      <Header cartItemCount={getCartItemCount()} />
      
      <main className="cart-main">
        <div className="container">
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </main>

      {showCheckout && (
        <CheckoutForm
          cartItems={cartItems}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
};

export default Cart;
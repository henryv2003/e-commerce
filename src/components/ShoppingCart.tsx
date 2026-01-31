import React from 'react';
import { CartItem } from '../types';
import './ShoppingCart.css';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getSubtotal = () => getTotal();
  const tax = getSubtotal() * 0.08; // 8% tax
  const total = getSubtotal() + tax;

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart empty">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2>Shopping Cart ({cartItems.length} items)</h2>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="item-image">
                📦 {item.product.name.split(' ')[0]}
              </div>

              <div className="item-details">
                <h4 className="item-name">{item.product.name}</h4>
                <p className="item-category">{item.product.category}</p>
                {item.product.type === 'physical' && (
                  <span className="digital-badge">📱 Digital</span>
                )}
                {item.product.type === 'physical' && (
                  <span className="stock-info">
                    {item.product.stock > 10 ? '✅ In Stock' : `⚠️ Low Stock`}
                  </span>
                )}
              </div>

              <div className="item-price">
                ${item.product.price.toFixed(2)}
              </div>

              <div className="item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="remove-btn"
                onClick={() => onRemoveItem(item.product.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>

            <p className="checkout-note">
              📱 Your order will be sent via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
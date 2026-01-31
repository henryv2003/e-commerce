import React, { useState } from 'react';
import { CartItem, OrderInfo } from '../types';
import { sendWhatsAppOrder } from '../utils/whatsapp';
import './CheckoutForm.css';

interface CheckoutFormProps {
  cartItems: CartItem[];
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, onClose }) => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderInfo.name || !orderInfo.email || !orderInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Send order via WhatsApp
    sendWhatsAppOrder(cartItems, orderInfo);
    
    // Close form after a short delay
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
    }, 2000);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
  0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="checkout-form-overlay">
      <div className="checkout-form">
        <div className="checkout-header">
          <h2>📱 Checkout via WhatsApp</h2>
          <button className="close-btn" onClick={onClose}>✖️</button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-content">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.product.id} className="summary-item">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row final">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="customer-info">
            <h3>Customer Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={orderInfo.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={orderInfo.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={orderInfo.phone}
                onChange={handleInputChange}
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={orderInfo.address}
                onChange={handleInputChange}
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Order Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={orderInfo.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any special instructions or delivery preferences..."
              />
            </div>
          </div>

          <div className="checkout-actions">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Opening WhatsApp...' : '📱 Send Order via WhatsApp'}
            </button>
          </div>

          <p className="whatsapp-note">
            <strong>📱 How it works:</strong> Your order details will be sent to our WhatsApp number. 
            We'll contact you shortly to confirm your order and provide payment instructions.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
import { CartItem, OrderInfo } from '../types';
import { whatsappNumber } from '../data/products';

export const formatWhatsAppOrder = (
  cartItems: CartItem[], 
  orderInfo: OrderInfo
): string => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  let message = `🛍️ *NEW ORDER - ColorCart*\n\n`;
  message += `👤 *Customer Information*\n`;
  message += `Name: ${orderInfo.name}\n`;
  message += `Email: ${orderInfo.email}\n`;
  message += `Phone: ${orderInfo.phone}\n`;
  
  if (orderInfo.address) {
    message += `Address: ${orderInfo.address}\n`;
  }
  
  message += `\n📦 *Order Details*\n`;
  message += `Date: ${new Date().toLocaleDateString()}\n`;
  message += `Order ID: #${Date.now().toString().slice(-6)}\n\n`;

  message += `🛒 *Products*\n`;
  message += `${'═'.repeat(40)}\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   📝 Category: ${item.product.category}\n`;
    message += `   🏷️ Type: ${item.product.type === 'digital' ? 'Digital Product' : 'Physical Product'}\n`;
    message += `   💰 Price: $${item.product.price.toFixed(2)}\n`;
    message += `   📊 Quantity: ${item.quantity}\n`;
    message += `   💵 Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n`;
    
    if (item.selectedColor) {
      message += `   🎨 Color: ${item.selectedColor}\n`;
    }
    
    if (item.selectedSize) {
      message += `   📏 Size: ${item.selectedSize}\n`;
    }
    
    message += `${'─'.repeat(40)}\n`;
  });

  message += `\n💳 *Payment Summary*\n`;
  message += `${'═'.repeat(30)}\n`;
  message += `Subtotal: $${subtotal.toFixed(2)}\n`;
  message += `Tax (8%): $${tax.toFixed(2)}\n`;
  message += `Total: $${total.toFixed(2)}\n`;
  message += `${'═'.repeat(30)}\n`;

  if (orderInfo.notes) {
    message += `\n📝 *Customer Notes*\n${orderInfo.notes}\n`;
  }

  message += `\n✅ *Please confirm this order and provide payment instructions.*\n`;
  message += `Thank you for shopping with ColorCart! 🎉`;

  return message;
};

export const sendWhatsAppOrder = (
  cartItems: CartItem[], 
  orderInfo: OrderInfo
): void => {
  const message = formatWhatsAppOrder(cartItems, orderInfo);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const formatOrderSummary = (cartItems: CartItem[]): string => {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  return `${itemCount} items • $${subtotal.toFixed(2)}`;
};
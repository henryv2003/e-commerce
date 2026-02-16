import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section brand-section">
          <Link to="/" className="footer-brand">ColorCart</Link>
          <p className="footer-tagline">Vibrant shopping for a colorful life.</p>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">🎵</a>
            <a href="https://wa.me/46735683936" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=cuidado facial">Skincare</Link></li>
            <li><Link to="/products?category=perfumes">Perfumes</Link></li>
            <li><Link to="/products?category=ropa">Clothing</Link></li>
          </ul>
        </div>

        <div className="footer-section links-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/cart">My Cart</Link></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h4>Stay Colorful</h4>
          <p>Subscribe for updates and exclusive offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button className="btn-small">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} ColorCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

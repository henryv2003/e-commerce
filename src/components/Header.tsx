import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🛍️ ColorCart
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
          </nav>
          
          <Link to="/cart" className="cart-link">
            🛒 Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
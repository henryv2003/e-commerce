import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home: React.FC = () => {
  const { addToCart, getCartItemCount } = useCart();

  // Featured products (new and trending items)
  const featuredProducts = products.filter(product =>
    product.badge === 'new' || product.badge === 'trending'
  ).slice(0, 6);

  // Physical products showcase
  const physicalProducts = products.filter(product =>
    product.type === 'physical'
  ).slice(0, 4);


  return (
    <div className="home">
      <Header cartItemCount={getCartItemCount()} />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">ColorCart</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing products with vibrant colors and seamless shopping
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary hero-btn">
                🛍️ Shop Now
              </Link>
              <Link to="/cart" className="btn btn-outline hero-btn">
                🛒 View Cart
              </Link>
            </div>
          </div>
          <div className="hero-image">
            🌈 🛍️ ✨
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>✨ Featured Products</h2>
            <p>New arrivals and trending items you'll love</p>
          </div>
          <ProductList
            products={featuredProducts}
            onAddToCart={addToCart}
            title=""
          />
        </div>
      </section>

      {/* Physical Products */}
      <section className="physical-section">
        <div className="container">
          <div className="section-header">
            <h2>� Physical Products</h2>
            <p>Quality items delivered to your door</p>
          </div>
          <ProductList
            products={physicalProducts}
            onAddToCart={addToCart}
            title=""
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Quick shipping on all physical products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Physical Products</h3>
              <p>various physical products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>WhatsApp Orders</h3>
              <p>Easy ordering via WhatsApp messaging</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Vibrant Design</h3>
              <p>Beautiful, colorful shopping experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>🎉 Ready to Shop?</h2>
            <p>Explore our diverse catalog of physical products</p>
            <Link to="/products" className="btn btn-primary cta-btn">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
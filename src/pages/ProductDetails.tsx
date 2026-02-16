import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartItemCount } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show success message or open cart drawer
  };

  return (
    <div className="product-details-page">
      <Header cartItemCount={getCartItemCount()} />

      <div className="container product-details-container">
        <Link to="/products" className="back-link">← Back to Products</Link>

        <div className="product-layout">
          {/* Image Section */}
          <div className="product-image-section">
            <div className={`product-image-container ${product.type === 'digital' ? 'digital-glow' : ''}`}>
              <div className="product-image-placeholder">
                {/* In a real app, use <img src={product.image} /> */}
                <span className="emoji-placeholder">
                  {product.category === 'cuidado facial' ? '🧴' :
                    product.category === 'perfumes' ? '🌸' :
                      product.category === 'ropa' ? '👕' : '📦'}
                </span>
              </div>
              {product.badge && <span className={`badge badge-${product.badge}`}>{product.badge}</span>}
            </div>
          </div>

          {/* Info Section */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">${product.price.toFixed(2)}</div>

            <div className="product-rating">
              {'★'.repeat(Math.round(product.rating || 0))}
              {'☆'.repeat(5 - Math.round(product.rating || 0))}
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Colors */}
            {product.colors && (
              <div className="option-group">
                <h3>Color</h3>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="option-group">
                <h3>Size</h3>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div className="features-list">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-btn-large">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

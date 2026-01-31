import React from 'react';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showAllFeatures, setShowAllFeatures] = React.useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const toggleFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllFeatures(!showAllFeatures);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }

    return stars.join(' ');
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/${product.image}.jpg`}
            alt={product.name}
            onError={(e) => {
              // Try PNG if JPG fails
              const img = e.currentTarget;
              const pngSrc = `${process.env.PUBLIC_URL}/assets/images/${product.image}.png`;
              if (img.src !== pngSrc) {
                img.src = pngSrc;
                return;
              }
              
              // Fallback to emoji if both fail
              img.style.display = 'none';
              const fallback = img.parentElement;
              if (fallback && !fallback.querySelector('.fallback-icon')) {
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'fallback-icon';
                fallbackDiv.textContent = '📦 ' + product.name.split(' ')[0];
                fallback.appendChild(fallbackDiv);
              }
            }}
          />
        </div>
        {product.badge && (
          <span className={`badge badge-${product.badge}`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        {product.features && product.features.length > 0 && (
          <div className="product-features">
            <h4>Key Features:</h4>
            <ul>
              {(showAllFeatures ? product.features : product.features.slice(0, 3)).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            {product.features.length > 3 && (
              <span className="more-features" onClick={toggleFeatures}>
                {showAllFeatures ? 'Show less' : `+${product.features.length - 3} more`}
              </span>
            )}
          </div>
        )}

        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-text">({product.reviews} reviews)</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>

          {product.type === 'physical' && (
            <div className="product-stock">
              {product.stock > 10 ? '✅ In Stock' : `⚠️ Only ${product.stock} left`}
            </div>
          )}

          {product.type === 'digital' && (
            <div className="product-digital">
              📱 Digital Product
            </div>
          )}
        </div>

        <button
          className="btn btn-primary add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={product.type === 'physical' && product.stock === 0}
        >
          {product.type === 'physical' && product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
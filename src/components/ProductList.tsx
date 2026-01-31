import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onAddToCart, 
  title = 'Our Products' 
}) => {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="empty-message">
          <h2>No products found</h2>
          <p>Try adjusting your filters or browse all categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      {title && (
        <div className="product-list-header">
          <h2>{title}</h2>
          <span className="product-count">{products.length} products</span>
        </div>
      )}
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, getCartItemCount } = useCart();

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="products">
      <Header cartItemCount={getCartItemCount()} />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="products-main">
        <div className="container">
          <ProductList 
            products={filteredProducts}
            onAddToCart={addToCart}
            title={selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
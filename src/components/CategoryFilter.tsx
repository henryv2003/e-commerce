import React from 'react';
import { categories } from '../data/products';
import './CategoryFilter.css';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="category-filter">
      <div className="container">
        <h3 className="filter-title">Shop by Category</h3>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() => onCategoryChange(category.id)}
              style={{
                backgroundColor: selectedCategory === category.id 
                  ? category.color 
                  : 'transparent',
                borderColor: category.color,
                color: selectedCategory === category.id 
                  ? 'white' 
                  : category.color
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
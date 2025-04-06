'use client';

import { memo } from 'react';
import styles from './categoryfilter.module.css';

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

function CategoryFilterComponent({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <button 
          className={`monoSm ${styles.filterButton} ${activeCategory === null ? styles.active : ''}`}
          onClick={() => onCategoryChange(null)}
          aria-pressed={activeCategory === null}
          aria-label="Show all posts"
        >
          All
        </button>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
          
          return (
            <button
              key={category}
              className={`monoSm ${styles.filterButton} ${isActive ? styles.active : ''}`}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              aria-label={`Show ${categoryName} posts`}
            >
              {categoryName}
            </button>
          );
        })}
      </div>
    </div>
  );
}


const CategoryFilter = memo(CategoryFilterComponent);
export default CategoryFilter;

import React from 'react';
import Icon from '../../../../AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategoryChange('All')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
          selectedCategory === 'All' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
        }`}
      >
        <Icon name="Grid3X3" size={16} />
        <span>All Topics</span>
      </button>
      {categories?.map((category) => (
        <button
          key={category?.name}
          onClick={() => onCategoryChange(category?.name)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            selectedCategory === category?.name
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
          }`}
        >
          <Icon name={category?.icon} size={16} />
          <span>{category?.name}</span>
          <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">
            {category?.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ action, onClick }) => {
  const getIconColor = (type) => {
    switch (type) {
      case 'mentor':
        return 'text-primary';
      case 'event':
        return 'text-secondary';
      case 'profile':
        return 'text-accent';
      case 'directory':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'mentor':
        return 'bg-primary/10';
      case 'event':
        return 'bg-secondary/10';
      case 'profile':
        return 'bg-accent/10';
      case 'directory':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg ${getBgColor(action?.type)} flex items-center justify-center`}>
          <Icon 
            name={action?.icon} 
            size={24} 
            className={getIconColor(action?.type)}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-semibold text-text-primary mb-1">
            {action?.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {action?.description}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Icon name="ChevronRight" size={20} className="text-text-secondary" />
        </div>
      </div>
      {action?.badge && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {action?.badge}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuickActionCard;
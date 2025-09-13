import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ stat }) => {
  const getIconColor = (type) => {
    switch (type) {
      case 'mentors':
        return 'text-primary';
      case 'events':
        return 'text-secondary';
      case 'connections':
        return 'text-success';
      case 'opportunities':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'mentors':
        return 'bg-primary/10';
      case 'events':
        return 'bg-secondary/10';
      case 'connections':
        return 'bg-success/10';
      case 'opportunities':
        return 'bg-accent/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${getBgColor(stat?.type)} flex items-center justify-center`}>
            <Icon 
              name={stat?.icon} 
              size={20} 
              className={getIconColor(stat?.type)}
            />
          </div>
          <div>
            <p className="text-sm text-text-secondary">{stat?.label}</p>
            <p className="text-2xl font-bold text-text-primary">{stat?.value}</p>
          </div>
        </div>
        
        {stat?.trend !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor(stat?.trend)}`}>
            <Icon name={getTrendIcon(stat?.trend)} size={16} />
            <span className="text-sm font-medium">
              {Math.abs(stat?.trend)}%
            </span>
          </div>
        )}
      </div>
      {stat?.subtitle && (
        <p className="text-xs text-text-secondary mt-2">
          {stat?.subtitle}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
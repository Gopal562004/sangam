import React from 'react';
import Icon from '../../../components/AppIcon';

const AnnouncementCard = ({ announcement }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200 ${getPriorityColor(announcement?.priority)}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Icon 
            name={getPriorityIcon(announcement?.priority)} 
            size={18} 
            className={announcement?.priority === 'high' ? 'text-error' : 
                      announcement?.priority === 'medium' ? 'text-warning' : 
                      announcement?.priority === 'low' ? 'text-success' : 'text-text-secondary'}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-text-primary">
              {announcement?.title}
            </h4>
            <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
              {formatDate(announcement?.date)}
            </span>
          </div>
          
          <p className="text-sm text-text-secondary line-clamp-2">
            {announcement?.content}
          </p>
          
          {announcement?.category && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary">
                {announcement?.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
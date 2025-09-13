import React from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'message':
        return 'MessageCircle';
      case 'session':
        return 'Calendar';
      case 'group':
        return 'Users';
      case 'mentor':
        return 'UserCheck';
      case 'community':
        return 'Globe';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'message':
        return 'text-blue-600';
      case 'session':
        return 'text-green-600';
      case 'group':
        return 'text-purple-600';
      case 'mentor':
        return 'text-orange-600';
      case 'community':
        return 'text-indigo-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {activities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth">
                <div className="flex-shrink-0">
                  {activity?.avatar ? (
                    <Image 
                      src={activity?.avatar} 
                      alt={activity?.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={getActivityIcon(activity?.type)} 
                      size={16} 
                      className={getActivityColor(activity?.type)}
                    />
                    <span className="text-sm font-medium text-card-foreground">
                      {activity?.user}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(activity?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity?.description}
                  </p>
                  
                  {activity?.action && (
                    <button 
                      onClick={activity?.action?.onClick}
                      className="text-xs text-primary hover:text-primary/80 font-medium mt-2 transition-smooth"
                    >
                      {activity?.action?.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
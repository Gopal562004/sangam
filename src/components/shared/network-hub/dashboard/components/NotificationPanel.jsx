import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Button from '../../../../ui/Button';

const NotificationPanel = ({ notifications = [] }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return 'MessageCircle';
      case 'session':
        return 'Calendar';
      case 'request':
        return 'UserPlus';
      case 'group':
        return 'Users';
      case 'system':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    switch (type) {
      case 'message':
        return 'text-blue-600';
      case 'session':
        return 'text-green-600';
      case 'request':
        return 'text-orange-600';
      case 'group':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-card-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" iconName="Settings">
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {['all', 'unread', 'message', 'session', 'request']?.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth capitalize ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredNotifications?.map((notification) => (
              <div 
                key={notification?.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg transition-smooth hover:bg-muted cursor-pointer ${
                  !notification?.read ? 'bg-primary/5 border-l-2 border-primary' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {notification?.avatar ? (
                    <Image 
                      src={notification?.avatar} 
                      alt={notification?.sender || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification?.priority === 'high' ? 'bg-error/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={getNotificationIcon(notification?.type)} 
                        size={16} 
                        className={getNotificationColor(notification?.type, notification?.priority)}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {notification?.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatNotificationTime(notification?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification?.message}
                  </p>
                  
                  {notification?.actions && notification?.actions?.length > 0 && (
                    <div className="flex space-x-2 mt-3">
                      {notification?.actions?.map((action, index) => (
                        <Button
                          key={index}
                          variant={action?.variant || 'outline'}
                          size="xs"
                          onClick={action?.onClick}
                        >
                          {action?.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                {!notification?.read && (
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
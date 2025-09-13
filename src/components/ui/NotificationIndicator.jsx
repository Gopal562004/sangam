import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = ({ 
  count = 0, 
  showDot = false, 
  size = 'default',
  position = 'top-right',
  onClick,
  className = '',
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(count > 0 || showDot);
  }, [count, showDot]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return '-top-1 -left-1';
      case 'top-right':
        return '-top-1 -right-1';
      case 'bottom-left':
        return '-bottom-1 -left-1';
      case 'bottom-right':
        return '-bottom-1 -right-1';
      default:
        return '-top-1 -right-1';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return count > 0 ? 'min-w-[16px] h-4 text-xs px-1' : 'w-2 h-2';
      case 'lg':
        return count > 0 ? 'min-w-[24px] h-6 text-sm px-2' : 'w-4 h-4';
      default:
        return count > 0 ? 'min-w-[20px] h-5 text-xs px-1.5' : 'w-3 h-3';
    }
  };

  const formatCount = (num) => {
    if (num > 99) return '99+';
    if (num > 9) return num?.toString();
    return num?.toString();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      
      {isVisible && (
        <div
          className={`absolute ${getPositionClasses()} ${getSizeClasses()} bg-accent text-accent-foreground rounded-full flex items-center justify-center font-medium transition-smooth animate-scale-in cursor-pointer z-10`}
          onClick={onClick}
        >
          {count > 0 ? (
            <span>{formatCount(count)}</span>
          ) : (
            <span className="w-full h-full bg-accent rounded-full"></span>
          )}
        </div>
      )}
    </div>
  );
};

// Notification Badge Component for standalone use
export const NotificationBadge = ({ 
  count = 0, 
  variant = 'default',
  size = 'default',
  className = '' 
}) => {
  if (count === 0) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1 text-sm';
      default:
        return 'px-2.5 py-0.5 text-xs';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full font-medium ${getVariantClasses()} ${getSizeClasses()} ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

// Notification List Component
export const NotificationList = ({ 
  notifications = [], 
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  className = '' 
}) => {
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className={`bg-popover border border-border rounded-lg shadow-elevation-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-popover-foreground">Notifications</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>
      {/* Notifications */}
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-smooth hover:bg-muted ${
                !notification?.read ? 'bg-primary/5' : ''
              }`}
              onClick={() => onNotificationClick?.(notification)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  !notification?.read ? 'bg-accent' : 'bg-transparent'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-popover-foreground">
                    {notification?.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification?.timestamp}
                  </p>
                </div>

                {!notification?.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onMarkAsRead?.(notification?.id);
                    }}
                    className="flex-shrink-0"
                  >
                    <Icon name="Check" size={14} />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationIndicator;
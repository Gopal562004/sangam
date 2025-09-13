import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/chat', label: 'Chat', icon: 'MessageCircle' },
    { path: '/mentorship-dashboard', label: 'Mentorship', icon: 'Users' },
    { path: '/community', label: 'Community', icon: 'Globe' },
    { path: '/session-management', label: 'Sessions', icon: 'Calendar' },
  ];

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/' || location?.pathname === '/dashboard';
    }
    return location?.pathname?.startsWith(path);
  };

  return (
    <>
      {/* Desktop Tab Navigation - Hidden on mobile */}
      <nav className={`hidden lg:flex items-center space-x-1 bg-card border-b border-border px-6 ${className}`}>
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
              isActiveRoute(item?.path)
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={item?.icon} size={18} />
            <span>{item?.label}</span>
          </Link>
        ))}
      </nav>
      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth min-w-0 flex-1 ${
                isActiveRoute(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </Link>
          ))}
          
          {/* More button for additional items */}
          <Link
            to="/session-management"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth min-w-0 flex-1 ${
              isActiveRoute('/session-management') || isActiveRoute('/group-chat')
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-medium">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;
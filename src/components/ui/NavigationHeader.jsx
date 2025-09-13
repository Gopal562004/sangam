import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backPath = null,
  actions = [],
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Add Dashboard as root
    breadcrumbs?.push({ label: 'Dashboard', path: '/dashboard' });

    // Map path segments to readable names
    const segmentMap = {
      'chat': 'Chat',
      'group-chat': 'Group Chat',
      'mentorship-dashboard': 'Mentorship',
      'session-management': 'Session Management',
      'community': 'Community',
      'profile': 'Profile',
      'settings': 'Settings'
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = segmentMap?.[segment] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      if (path !== '/dashboard') {
        breadcrumbs?.push({ label, path });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-4">
        {/* Breadcrumbs */}
        {breadcrumbs?.length > 1 && (
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={crumb?.path}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
                )}
                {index === breadcrumbs?.length - 1 ? (
                  <span className="text-foreground font-medium">{crumb?.label}</span>
                ) : (
                  <button
                    onClick={() => navigate(crumb?.path)}
                    className="hover:text-foreground transition-smooth"
                  >
                    {crumb?.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Header Content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="flex-shrink-0"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            
            <div>
              {title && (
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions?.length > 0 && (
            <div className="flex items-center space-x-2">
              {actions?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.variant || 'default'}
                  size={action?.size || 'sm'}
                  onClick={action?.onClick}
                  iconName={action?.icon}
                  iconPosition={action?.iconPosition || 'left'}
                  disabled={action?.disabled}
                  className={action?.className}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
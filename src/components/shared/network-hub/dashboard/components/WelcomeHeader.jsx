import React from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';

const WelcomeHeader = ({ user = {} }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    return new Date()?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {user?.avatar ? (
              <Image 
                src={user?.avatar} 
                alt={user?.name || 'User'}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-foreground/20"
              />
            ) : (
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary-foreground/80" />
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {getCurrentGreeting()}, {user?.name || 'User'}!
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              {getCurrentDate()}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">
                  {user?.location || 'Location not set'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">
                  {new Date()?.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-primary-foreground/80 mb-1">Your Role</p>
            <div className="flex items-center space-x-2">
              <Icon 
                name={user?.role === 'mentor' ? 'UserCheck' : 'User'} 
                size={16} 
                className="text-primary-foreground"
              />
              <span className="font-medium capitalize">
                {user?.role || 'Member'}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-primary-foreground/80 mb-1">Member Since</p>
            <span className="font-medium">
              {user?.memberSince ? new Date(user.memberSince)?.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              }) : 'Recently'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
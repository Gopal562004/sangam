import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Image from '../../../../AppImage';

const GroupHeader = ({ 
  group, 
  onToggleMemberSidebar, 
  isMemberSidebarOpen,
  onGroupSettings,
  isAdmin = false 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    onGroupSettings?.();
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      {/* Group Info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="relative">
          <Image
            src={group?.avatar}
            alt={group?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {group?.isActive && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">
            {group?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {group?.memberCount} members • {group?.onlineCount} online
          </p>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Search */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Icon name="Search" size={20} />
        </Button>

        {/* Video Call */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Icon name="Video" size={20} />
        </Button>

        {/* Voice Call */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Icon name="Phone" size={20} />
        </Button>

        {/* Member Sidebar Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleMemberSidebar}
          className={isMemberSidebarOpen ? 'bg-muted' : ''}
        >
          <Icon name="Users" size={20} />
        </Button>

        {/* More Options */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Icon name="MoreVertical" size={20} />
          </Button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-20 animate-slide-down">
                <div className="py-2">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Pin" size={16} />
                    <span>Pinned Messages</span>
                  </button>
                  
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Bell" size={16} />
                    <span>Notifications</span>
                  </button>

                  {isAdmin && (
                    <>
                      <div className="border-t border-border my-1"></div>
                      <button
                        onClick={handleSettingsClick}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Group Settings</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
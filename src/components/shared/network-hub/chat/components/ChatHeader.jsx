import React from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';

const ChatHeader = ({ onToggleSidebar, isSidebarOpen, className = '' }) => {
  return (
    <div className={`bg-card border-b border-border p-4 lg:hidden ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name={isSidebarOpen ? "X" : "MessageCircle"} size={20} />
          </Button>
          
          <h1 className="text-lg font-semibold text-card-foreground">Messages</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Search" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
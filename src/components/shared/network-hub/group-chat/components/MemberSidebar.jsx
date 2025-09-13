import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Image from '../../../../AppImage';

const MemberSidebar = ({ 
  members = [], 
  isOpen, 
  onClose,
  onDirectMessage,
  currentUserId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members?.filter(member =>
    member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-error';
      case 'moderator':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return 'Shield';
      case 'moderator':
        return 'ShieldCheck';
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${isOpen ? 'lg:block' : 'lg:hidden'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">
              Members ({members?.length})
            </h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMembers?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Icon name="Users" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No members found</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredMembers?.map((member) => (
                <div
                  key={member?.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth group"
                >
                  <div className="relative">
                    <Image
                      src={member?.avatar}
                      alt={member?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {member?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {member?.name}
                        {member?.id === currentUserId && (
                          <span className="text-xs text-muted-foreground ml-1">(You)</span>
                        )}
                      </p>
                      {getRoleIcon(member?.role) && (
                        <Icon 
                          name={getRoleIcon(member?.role)} 
                          size={14} 
                          className={getRoleColor(member?.role)}
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {member?.status || (member?.isOnline ? 'Online' : 'Offline')}
                    </p>
                  </div>

                  {/* Actions */}
                  {member?.id !== currentUserId && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDirectMessage?.(member)}
                        className="w-8 h-8"
                      >
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
          >
            Invite Members
          </Button>
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
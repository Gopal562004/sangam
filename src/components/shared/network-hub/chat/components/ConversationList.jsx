import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Input from '../../../../ui/Input';
import { NotificationBadge } from '../../../../ui/NotificationIndicator';

const ConversationList = ({ conversations, selectedConversation, onSelectConversation, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, mentors, mentees, groups

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'mentors' && conversation?.type === 'mentor') ||
                         (filterType === 'mentees' && conversation?.type === 'mentee') ||
                         (filterType === 'groups' && conversation?.type === 'group');
    
    return matchesSearch && matchesFilter;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return messageTime?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return messageTime?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  return (
    <div className={`bg-card border-r border-border h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Messages</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'mentors', label: 'Mentors' },
            { key: 'mentees', label: 'Mentees' },
            { key: 'groups', label: 'Groups' }
          ]?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => setFilterType(filter?.key)}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                filterType === filter?.key
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-sm">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
          </div>
        ) : (
          filteredConversations?.map((conversation) => (
            <div
              key={conversation?.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted ${
                selectedConversation?.id === conversation?.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation?.type !== 'group' && (
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${getStatusColor(conversation?.status)}`} />
                  )}
                  {conversation?.type === 'group' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Users" size={10} color="white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-card-foreground truncate">
                      {conversation?.name}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation?.timestamp)}
                      </span>
                      {conversation?.unreadCount > 0 && (
                        <NotificationBadge count={conversation?.unreadCount} size="sm" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {conversation?.isTyping ? (
                        <span className="text-primary italic">typing...</span>
                      ) : (
                        <>
                          {conversation?.lastMessageSender && conversation?.type === 'group' && (
                            <span className="font-medium">{conversation?.lastMessageSender}: </span>
                          )}
                          {conversation?.lastMessage}
                        </>
                      )}
                    </p>
                    
                    {/* Message Status Icons */}
                    <div className="flex items-center space-x-1 ml-2">
                      {conversation?.isPinned && (
                        <Icon name="Pin" size={12} className="text-muted-foreground" />
                      )}
                      {conversation?.isMuted && (
                        <Icon name="VolumeX" size={12} className="text-muted-foreground" />
                      )}
                      {conversation?.lastMessageStatus === 'sent' && (
                        <Icon name="Check" size={12} className="text-muted-foreground" />
                      )}
                      {conversation?.lastMessageStatus === 'delivered' && (
                        <Icon name="CheckCheck" size={12} className="text-muted-foreground" />
                      )}
                      {conversation?.lastMessageStatus === 'read' && (
                        <Icon name="CheckCheck" size={12} className="text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* New Chat Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => console.log('Start new chat')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
        >
          <Icon name="Plus" size={18} />
          <span className="font-medium">New Chat</span>
        </button>
      </div>
    </div>
  );
};

export default ConversationList;
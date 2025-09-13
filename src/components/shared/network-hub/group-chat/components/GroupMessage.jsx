import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Image from '../../../../AppImage';

const GroupMessage = ({ 
  message, 
  isOwn = false, 
  showAvatar = true,
  onReaction,
  onReply,
  onMention,
  currentUserId 
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }
  };

  const handleReaction = (emoji) => {
    onReaction?.(message?.id, emoji);
    setShowReactions(false);
  };

  const renderMessageContent = () => {
    if (message?.type === 'text') {
      return (
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-card-foreground whitespace-pre-wrap break-words">
            {message?.content}
          </p>
        </div>
      );
    }

    if (message?.type === 'image') {
      return (
        <div className="max-w-xs">
          <Image
            src={message?.content}
            alt="Shared image"
            className="rounded-lg object-cover w-full h-auto max-h-64"
          />
          {message?.caption && (
            <p className="text-sm text-card-foreground mt-2">{message?.caption}</p>
          )}
        </div>
      );
    }

    if (message?.type === 'file') {
      return (
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg max-w-xs">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="File" size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground truncate">
              {message?.fileName}
            </p>
            <p className="text-xs text-muted-foreground">
              {message?.fileSize}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      );
    }

    if (message?.type === 'announcement') {
      return (
        <div className="flex items-start space-x-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Megaphone" size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-accent mb-1">Announcement</p>
            <p className="text-sm text-card-foreground">{message?.content}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  return (
    <div className={`flex items-start space-x-3 p-4 hover:bg-muted/50 transition-smooth group ${
      isOwn ? 'flex-row-reverse space-x-reverse' : ''
    }`}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <div className="flex-shrink-0">
          <Image
            src={message?.sender?.avatar}
            alt={message?.sender?.name}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => onMention?.(message?.sender)}
          />
        </div>
      )}
      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isOwn ? 'flex flex-col items-end' : ''}`}>
        {/* Header */}
        {showAvatar && (
          <div className={`flex items-center space-x-2 mb-1 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <button
              onClick={() => onMention?.(message?.sender)}
              className="text-sm font-medium text-card-foreground hover:text-primary transition-smooth"
            >
              {message?.sender?.name}
            </button>
            {message?.sender?.role && message?.sender?.role !== 'member' && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                message?.sender?.role === 'admin' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
              }`}>
                {message?.sender?.role}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {formatTime(message?.timestamp)}
            </span>
          </div>
        )}

        {/* Reply Context */}
        {message?.replyTo && (
          <div className="mb-2 p-2 bg-muted/50 border-l-2 border-primary rounded-r-lg">
            <p className="text-xs text-muted-foreground mb-1">
              Replying to {message?.replyTo?.sender?.name}
            </p>
            <p className="text-xs text-card-foreground truncate">
              {message?.replyTo?.content}
            </p>
          </div>
        )}

        {/* Message Body */}
        <div className={`relative ${isOwn ? 'text-right' : ''}`}>
          {renderMessageContent()}

          {/* Message Actions */}
          <div className={`absolute top-0 ${isOwn ? 'left-0' : 'right-0'} opacity-0 group-hover:opacity-100 transition-opacity`}>
            <div className="flex items-center space-x-1 bg-card border border-border rounded-lg shadow-elevation-2 p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReactions(!showReactions)}
                className="w-7 h-7"
              >
                <Icon name="Smile" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onReply?.(message)}
                className="w-7 h-7"
              >
                <Icon name="Reply" size={14} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowActions(!showActions)}
                className="w-7 h-7"
              >
                <Icon name="MoreHorizontal" size={14} />
              </Button>
            </div>

            {/* Quick Reactions */}
            {showReactions && (
              <div className="absolute top-full mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 p-2 z-10">
                <div className="flex items-center space-x-1">
                  {commonReactions?.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-smooth"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reactions */}
        {message?.reactions && message?.reactions?.length > 0 && (
          <div className="flex items-center space-x-1 mt-2">
            {message?.reactions?.map((reaction) => (
              <button
                key={`${reaction?.emoji}-${reaction?.count}`}
                onClick={() => handleReaction(reaction?.emoji)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-smooth ${
                  reaction?.hasReacted 
                    ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                <span>{reaction?.emoji}</span>
                <span>{reaction?.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Own message avatar placeholder */}
      {isOwn && showAvatar && (
        <div className="w-10 flex-shrink-0" />
      )}
    </div>
  );
};

export default GroupMessage;
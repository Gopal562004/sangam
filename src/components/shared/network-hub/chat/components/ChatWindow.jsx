import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Button from '../../../../ui/Button';

const ChatWindow = ({ conversation, messages, onSendMessage, className = '' }) => {
  const [messageText, setMessageText] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText?.trim()) {
      onSendMessage({
        id: Date.now(),
        text: messageText?.trim(),
        sender: 'You',
        timestamp: new Date(),
        type: 'text'
      });
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onSendMessage({
        id: Date.now(),
        text: `Shared a file: ${file?.name}`,
        sender: 'You',
        timestamp: new Date(),
        type: 'file',
        fileName: file?.name,
        fileSize: file?.size
      });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const emojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '👏'];

  if (!conversation) {
    return (
      <div className={`bg-background flex items-center justify-center h-full ${className}`}>
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-background flex flex-col h-full ${className}`}>
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={conversation?.avatar}
                  alt={conversation?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {conversation?.type !== 'group' && (
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(conversation?.status)}`} />
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-card-foreground">{conversation?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {conversation?.type === 'group' 
                  ? `${conversation?.memberCount} members`
                  : conversation?.status === 'online' ?'Active now' 
                    : `Last seen ${formatTime(conversation?.lastSeen)}`
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Info" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index) => {
          const isOwnMessage = message?.sender === 'You';
          const showAvatar = !isOwnMessage && (index === 0 || messages?.[index - 1]?.sender !== message?.sender);
          
          return (
            <div
              key={message?.id}
              className={`flex items-end space-x-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              {!isOwnMessage && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {showAvatar ? (
                    <Image
                      src={message?.avatar || conversation?.avatar}
                      alt={message?.sender}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              )}
              <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                {!isOwnMessage && showAvatar && (
                  <p className="text-xs text-muted-foreground mb-1 px-3">{message?.sender}</p>
                )}
                
                <div className={`rounded-2xl px-4 py-2 ${
                  isOwnMessage 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-card-foreground border border-border'
                }`}>
                  {message?.type === 'file' ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name="File" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{message?.fileName}</p>
                        <p className="text-xs opacity-75">{formatFileSize(message?.fileSize)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{message?.text}</p>
                  )}
                </div>
                
                <div className={`flex items-center space-x-1 mt-1 px-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message?.timestamp)}
                  </span>
                  {isOwnMessage && (
                    <Icon 
                      name={message?.status === 'read' ? 'CheckCheck' : 'Check'} 
                      size={12} 
                      className={message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
              <Image
                src={conversation?.avatar}
                alt={conversation?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              
              {/* Emoji Picker Button */}
              <div className="absolute right-3 bottom-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                  className="w-6 h-6"
                >
                  <Icon name="Smile" size={16} />
                </Button>
              </div>

              {/* Emoji Picker */}
              {isEmojiPickerOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsEmojiPickerOpen(false)}
                  />
                  <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-elevation-3 p-3 z-20">
                    <div className="grid grid-cols-6 gap-2">
                      {emojis?.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setMessageText(prev => prev + emoji);
                            setIsEmojiPickerOpen(false);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-smooth"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
            >
              <Icon name="Paperclip" size={20} />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={handleSendMessage}
              disabled={!messageText?.trim()}
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
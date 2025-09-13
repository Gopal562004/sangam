import React, { useState, useRef } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';

const MessageInput = ({ 
  onSendMessage, 
  onTyping,
  replyTo,
  onCancelReply,
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const commonEmojis = ['😀', '😂', '❤️', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '💯', '👏'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage?.({
        content: message?.trim(),
        type: 'text',
        replyTo: replyTo?.id || null
      });
      setMessage('');
      onCancelReply?.();
      textareaRef?.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    onTyping?.();
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onSendMessage?.({
        content: URL.createObjectURL(file),
        type: file?.type?.startsWith('image/') ? 'image' : 'file',
        fileName: file?.name,
        fileSize: `${(file?.size / 1024 / 1024)?.toFixed(1)} MB`
      });
    }
    e.target.value = '';
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Reply Context */}
      {replyTo && (
        <div className="mb-3 p-3 bg-muted/50 border-l-2 border-primary rounded-r-lg flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">
              Replying to {replyTo?.sender?.name}
            </p>
            <p className="text-sm text-card-foreground truncate">
              {replyTo?.content}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancelReply}
            className="w-8 h-8 ml-2"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      )}
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* Attachment Button */}
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef?.current?.click()}
            disabled={disabled}
          >
            <Icon name="Paperclip" size={20} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>

        {/* Text Input Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm max-h-32 min-h-[44px]"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '44px',
              maxHeight: '128px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
            }}
          />

          {/* Emoji Button */}
          <div className="absolute right-3 bottom-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={disabled}
              className="w-8 h-8"
            >
              <Icon name="Smile" size={16} />
            </Button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowEmojiPicker(false)}
                />
                <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-elevation-3 p-3 z-20">
                  <div className="grid grid-cols-6 gap-1">
                    {commonEmojis?.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiSelect(emoji)}
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

        {/* Voice/Send Button */}
        {message?.trim() ? (
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={disabled}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            disabled={disabled}
            className={`flex-shrink-0 ${isRecording ? 'bg-error text-error-foreground' : ''}`}
          >
            <Icon name={isRecording ? "Square" : "Mic"} size={20} />
          </Button>
        )}
      </form>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center justify-center space-x-2 text-error">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
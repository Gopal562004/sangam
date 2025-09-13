import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';

const AnnouncementBanner = ({ announcement, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!announcement || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.(announcement?.id);
  };

  return (
    <div className="bg-accent/10 border-b border-accent/20 px-4 py-3">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="Megaphone" size={14} className="text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-medium text-accent">
              Announcement
            </h4>
            <span className="text-xs text-muted-foreground">
              {new Date(announcement.timestamp)?.toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-card-foreground">
            {announcement?.content}
          </p>
          {announcement?.author && (
            <p className="text-xs text-muted-foreground mt-1">
              — {announcement?.author?.name}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="w-8 h-8 flex-shrink-0"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
import React from 'react';

import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';

const DiscussionCard = ({ discussion, featured = false }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Career Development': 'bg-blue-100 text-blue-800',
      'Technical Skills': 'bg-green-100 text-green-800',
      'Leadership': 'bg-purple-100 text-purple-800',
      'Industry Insights': 'bg-orange-100 text-orange-800',
      'Networking': 'bg-pink-100 text-pink-800',
      'General': 'bg-gray-100 text-gray-800'
    };
    return colors?.[category] || colors?.['General'];
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth cursor-pointer ${
      featured ? 'border-primary bg-primary/5' : ''
    }`}>
      {featured && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Star" size={16} className="text-accent fill-accent" />
          <span className="text-xs font-medium text-accent">Featured Discussion</span>
        </div>
      )}
      <div className="flex items-start space-x-3">
        <Image
          src={discussion?.author?.avatar}
          alt={discussion?.author?.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion?.category)}`}>
              {discussion?.category}
            </span>
            {discussion?.isPinned && (
              <Icon name="Pin" size={14} className="text-muted-foreground" />
            )}
          </div>

          <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">
            {discussion?.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {discussion?.preview}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-card-foreground">{discussion?.author?.name}</span>
                {discussion?.author?.badge && (
                  <span className="px-1.5 py-0.5 bg-accent/20 text-accent rounded text-xs">
                    {discussion?.author?.badge}
                  </span>
                )}
              </div>
              <span>•</span>
              <span>{formatTimeAgo(discussion?.lastActivity)}</span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={14} />
                <span>{discussion?.replyCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>{discussion?.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>{discussion?.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
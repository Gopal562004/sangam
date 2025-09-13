import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveMentorshipCard = ({ mentorship, onMessage, onScheduleMeeting }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-text-secondary bg-muted';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image
              src={mentorship?.mentor?.avatar}
              alt={mentorship?.mentor?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                {mentorship?.mentor?.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {mentorship?.mentor?.position} at {mentorship?.mentor?.company}
              </p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentorship?.status)}`}>
              {mentorship?.status?.charAt(0)?.toUpperCase() + mentorship?.status?.slice(1)}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Calendar" size={16} />
                <span>Next Meeting:</span>
              </div>
              <span className="text-text-primary font-medium">
                {formatDate(mentorship?.nextMeeting)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="MessageCircle" size={16} />
                <span>Last Message:</span>
              </div>
              <span className="text-text-primary">
                {getDaysAgo(mentorship?.lastMessage)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Sessions:</span>
              </div>
              <span className="text-text-primary font-medium">
                {mentorship?.completedSessions}/{mentorship?.totalSessions}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMessage(mentorship)}
                className="flex-1"
              >
                <Icon name="MessageCircle" size={16} />
                Message
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onScheduleMeeting(mentorship)}
                className="flex-1"
              >
                <Icon name="Calendar" size={16} />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveMentorshipCard;
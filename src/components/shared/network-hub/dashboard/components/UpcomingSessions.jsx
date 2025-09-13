import React from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Button from '../../../../ui/Button';

const UpcomingSessions = ({ sessions = [] }) => {
  const formatSessionTime = (dateTime) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    const timeStr = date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (date?.toDateString() === today?.toDateString()) {
      return `Today at ${timeStr}`;
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return `Tomorrow at ${timeStr}`;
    } else {
      return `${date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} at ${timeStr}`;
    }
  };

  const getSessionStatus = (dateTime) => {
    const now = new Date();
    const sessionTime = new Date(dateTime);
    const diffInMinutes = (sessionTime - now) / (1000 * 60);
    
    if (diffInMinutes <= 15 && diffInMinutes > 0) {
      return { status: 'starting-soon', color: 'text-warning', bg: 'bg-warning/10' };
    } else if (diffInMinutes <= 0) {
      return { status: 'ongoing', color: 'text-success', bg: 'bg-success/10' };
    } else {
      return { status: 'scheduled', color: 'text-primary', bg: 'bg-primary/10' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Upcoming Sessions</h3>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {sessions?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">No upcoming sessions</p>
            <Button variant="outline" size="sm" iconName="Plus">
              Schedule Session
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {sessions?.map((session) => {
              const statusInfo = getSessionStatus(session?.dateTime);
              
              return (
                <div key={session?.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted transition-smooth">
                  <div className="flex-shrink-0">
                    <Image 
                      src={session?.participantAvatar} 
                      alt={session?.participantName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-card-foreground truncate">
                        {session?.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo?.bg} ${statusInfo?.color}`}>
                        {statusInfo?.status === 'starting-soon' ? 'Starting Soon' : 
                         statusInfo?.status === 'ongoing' ? 'Ongoing' : 'Scheduled'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      with {session?.participantName}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {formatSessionTime(session?.dateTime)}
                      <Icon name="MapPin" size={14} className="ml-3 mr-1" />
                      {session?.type === 'video' ? 'Video Call' : session?.location}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {statusInfo?.status === 'starting-soon' || statusInfo?.status === 'ongoing' ? (
                      <Button variant="default" size="sm" iconName="Video">
                        Join
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" iconName="MoreHorizontal">
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;
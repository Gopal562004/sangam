import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Image from '../../../../AppImage';

const SessionList = ({ sessions, onSessionAction, onSessionClick }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Sessions' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'mentee', label: 'Mentee' },
    { value: 'duration', label: 'Duration' },
    { value: 'status', label: 'Status' }
  ];

  const filteredSessions = sessions?.filter(session => {
    if (filterStatus === 'all') return true;
    return session?.status === filterStatus;
  });

  const sortedSessions = [...filteredSessions]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'date') {
      aValue = new Date(a.date + ' ' + a.time);
      bValue = new Date(b.date + ' ' + b.time);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return { icon: 'Clock', color: 'text-primary' };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'cancelled':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'upcoming':
        return `${baseClasses} bg-primary/20 text-primary`;
      case 'completed':
        return `${baseClasses} bg-success/20 text-success`;
      case 'cancelled':
        return `${baseClasses} bg-error/20 text-error`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* List Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            Session List ({sortedSessions?.length})
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {statusOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    Sort by {option?.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <Icon 
                  name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                  size={16} 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Session List */}
      <div className="divide-y divide-border">
        {sortedSessions?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No sessions found</p>
            <p>Try adjusting your filters or create a new session</p>
          </div>
        ) : (
          sortedSessions?.map((session) => {
            const statusInfo = getStatusIcon(session?.status);
            
            return (
              <div
                key={session?.id}
                className="p-4 hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => onSessionClick(session)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    {/* Mentee Avatar */}
                    <div className="flex-shrink-0">
                      <Image
                        src={session?.menteeAvatar}
                        alt={session?.mentee}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    
                    {/* Session Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-card-foreground truncate">
                          {session?.mentee}
                        </h4>
                        <span className={getStatusBadge(session?.status)}>
                          {session?.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>{formatDate(session?.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{formatTime(session?.time)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Timer" size={14} />
                          <span>{session?.duration} min</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {session?.topic}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    {session?.status === 'upcoming' && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onSessionAction('join', session);
                          }}
                          iconName="Video"
                          iconPosition="left"
                        >
                          Join
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onSessionAction('reschedule', session);
                          }}
                          iconName="Calendar"
                        >
                          <span className="hidden sm:inline">Reschedule</span>
                        </Button>
                      </>
                    )}
                    
                    {session?.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onSessionAction('notes', session);
                        }}
                        iconName="FileText"
                      >
                        <span className="hidden sm:inline">Notes</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSessionAction('menu', session);
                      }}
                    >
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SessionList;
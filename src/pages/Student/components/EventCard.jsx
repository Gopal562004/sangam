import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onRSVP }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'going':
        return 'text-success bg-success/10';
      case 'interested':
        return 'text-warning bg-warning/10';
      case 'not_going':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'going':
        return 'Going';
      case 'interested':
        return 'Interested';
      case 'not_going':
        return 'Not Going';
      default:
        return 'No Response';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {event?.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {event?.type} • {event?.location}
            </p>
          </div>
          {event?.rsvpStatus && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.rsvpStatus)}`}>
              {getStatusText(event?.rsvpStatus)}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(event?.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{formatTime(event?.date)}</span>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {event?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{event?.attendeesCount} attending</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{event?.venue}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRSVP(event, 'interested')}
              className={event?.rsvpStatus === 'interested' ? 'bg-warning/10 text-warning border-warning' : ''}
            >
              <Icon name="Heart" size={16} />
              Interested
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onRSVP(event, 'going')}
              className={event?.rsvpStatus === 'going' ? 'bg-success text-success-foreground' : ''}
            >
              <Icon name="Check" size={16} />
              Going
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
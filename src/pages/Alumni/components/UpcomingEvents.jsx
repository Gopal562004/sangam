import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Alumni Networking Gala",
      description: "Join us for an evening of networking, celebration, and reconnecting with fellow alumni. Featuring keynote speakers, awards ceremony, and networking opportunities.",
      date: "2025-02-15",
      time: "6:00 PM - 10:00 PM",
      location: "Grand Ballroom, University Center",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      attendees: 156,
      maxAttendees: 200,
      rsvpStatus: null,
      category: "Networking",
      isVirtual: false
    },
    {
      id: 2,
      title: "Tech Industry Career Panel",
      description: "Alumni working in tech share insights about career paths, industry trends, and advice for current students and recent graduates.",
      date: "2025-01-20",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
      attendees: 89,
      maxAttendees: 150,
      rsvpStatus: "going",
      category: "Career",
      isVirtual: true
    },
    {
      id: 3,
      title: "Alumni Mentorship Program Launch",
      description: "Official launch of our new mentorship program connecting experienced alumni with current students and recent graduates.",
      date: "2025-01-25",
      time: "7:00 PM - 9:00 PM",
      location: "Alumni Hall, Main Campus",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop",
      attendees: 45,
      maxAttendees: 100,
      rsvpStatus: "interested",
      category: "Mentorship",
      isVirtual: false
    }
  ]);

  const handleRSVP = (eventId, status) => {
    setEvents(prev => prev?.map(event => 
      event?.id === eventId 
        ? { ...event, rsvpStatus: status }
        : event
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRSVPButtonVariant = (status, currentStatus) => {
    if (status === currentStatus) {
      return status === 'going' ? 'default' : status === 'interested' ? 'secondary' : 'outline';
    }
    return 'ghost';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Networking': 'bg-primary/10 text-primary',
      'Career': 'bg-secondary/10 text-secondary',
      'Mentorship': 'bg-accent/10 text-accent'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Calendar" size={24} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Upcoming Events</h2>
            <p className="text-sm text-muted-foreground">Connect and engage with your community</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {events?.map((event) => (
          <div key={event?.id} className="border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-shadow duration-200">
            <div className="relative">
              <Image
                src={event?.image}
                alt={event?.title}
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(event?.category)}`}>
                  {event?.category}
                </span>
              </div>
              {event?.isVirtual && (
                <div className="absolute top-3 right-3">
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Virtual
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground mb-2">{event?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {event?.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span>{formatDate(event?.date)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} className="mr-2" />
                  <span>{event?.time}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name={event?.isVirtual ? "Monitor" : "MapPin"} size={16} className="mr-2" />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Users" size={16} className="mr-2" />
                  <span>{event?.attendees} / {event?.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant={getRSVPButtonVariant('going', event?.rsvpStatus)}
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleRSVP(event?.id, event?.rsvpStatus === 'going' ? null : 'going')}
                  className="flex-1"
                >
                  Going
                </Button>
                <Button
                  variant={getRSVPButtonVariant('interested', event?.rsvpStatus)}
                  size="sm"
                  iconName="Star"
                  iconPosition="left"
                  onClick={() => handleRSVP(event?.id, event?.rsvpStatus === 'interested' ? null : 'interested')}
                  className="flex-1"
                >
                  Interested
                </Button>
                <Button
                  variant={getRSVPButtonVariant('not_going', event?.rsvpStatus)}
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleRSVP(event?.id, event?.rsvpStatus === 'not_going' ? null : 'not_going')}
                  className="flex-1"
                >
                  Can't Attend
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
          View All Events
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
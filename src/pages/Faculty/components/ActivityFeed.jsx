import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "achievement",
      user: {
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        graduationYear: "2018",
        department: "Engineering",
      },
      content:
        "Just got promoted to Senior Software Engineer at Google! Grateful for the foundation I received at our university.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
    },
    {
      id: 2,
      type: "donation",
      user: {
        name: "Maria Rodriguez",
        avatar:
          "https://media.istockphoto.com/id/1317804584/photo/one-businesswoman-studio-portrait-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=Tx3nGQfxaI781gi97Siw7DIEBbKg1oBxl8n0JEwMQ6s=",
        graduationYear: "2015",
        department: "Business",
      },
      content:
        "Proud to contribute $1,000 to the new scholarship fund. Every student deserves the opportunity to pursue their dreams!",
      timestamp: "4 hours ago",
      likes: 31,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      type: "event",
      user: {
        name: "Alumni Association",
        avatar:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&h=150&fit=crop",
        isOfficial: true,
      },
      content:
        "Registration is now open for the Annual Alumni Networking Gala on February 15th. Don't miss this opportunity to reconnect with fellow graduates!",
      timestamp: "6 hours ago",
      likes: 45,
      comments: 15,
      isLiked: false,
      eventImage:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      type: "mentorship",
      user: {
        name: "Jennifer Chen",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        graduationYear: "2012",
        department: "Computer Science",
      },
      content:
        "Had an amazing mentorship session with Sarah, a current junior. It's incredible to see the passion and talent of our current students!",
      timestamp: "1 day ago",
      likes: 18,
      comments: 5,
      isLiked: false,
    },
    {
      id: 5,
      type: "news",
      user: {
        name: "University News",
        avatar:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&h=150&fit=crop",
        isOfficial: true,
      },
      content:
        "Our university has been ranked #1 in innovation for the third consecutive year! This achievement reflects the excellence of our alumni community.",
      timestamp: "2 days ago",
      likes: 89,
      comments: 23,
      isLiked: true,
      newsImage:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop",
    },
  ]);

  const handleLike = (activityId) => {
    setActivities(prev => prev?.map(activity => 
      activity?.id === activityId 
        ? { 
            ...activity, 
            isLiked: !activity?.isLiked,
            likes: activity?.isLiked ? activity?.likes - 1 : activity?.likes + 1
          }
        : activity
    ));
  };

  const getActivityIcon = (type) => {
    const icons = {
      'achievement': 'Trophy',
      'donation': 'Heart',
      'event': 'Calendar',
      'mentorship': 'Users',
      'news': 'Newspaper'
    };
    return icons?.[type] || 'Circle';
  };

  const getActivityColor = (type) => {
    const colors = {
      'achievement': 'text-accent',
      'donation': 'text-error',
      'event': 'text-primary',
      'mentorship': 'text-success',
      'news': 'text-secondary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Alumni Network Activity</h2>
            <p className="text-sm text-muted-foreground">Stay updated with your community</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {activities?.map((activity) => (
          <div key={activity?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
                  activity?.user?.isOfficial ? 'bg-primary' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getActivityIcon(activity?.type)} 
                    size={12} 
                    className={activity?.user?.isOfficial ? 'text-white' : getActivityColor(activity?.type)}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-card-foreground">{activity?.user?.name}</h3>
                  {activity?.user?.graduationYear && (
                    <span className="text-xs text-muted-foreground">
                      Class of {activity?.user?.graduationYear}
                    </span>
                  )}
                  {activity?.user?.department && (
                    <span className="text-xs text-muted-foreground">
                      • {activity?.user?.department}
                    </span>
                  )}
                  {activity?.user?.isOfficial && (
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  )}
                </div>

                <p className="text-sm text-card-foreground mb-3">
                  {activity?.content}
                </p>

                {(activity?.eventImage || activity?.newsImage) && (
                  <div className="mb-3">
                    <Image
                      src={activity?.eventImage || activity?.newsImage}
                      alt="Activity image"
                      className="w-full h-32 sm:h-40 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(activity?.id)}
                      className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                        activity?.isLiked 
                          ? 'text-error' :'text-muted-foreground hover:text-error'
                      }`}
                    >
                      <Icon 
                        name={activity?.isLiked ? "Heart" : "Heart"} 
                        size={16} 
                        className={activity?.isLiked ? "fill-current" : ""}
                      />
                      <span>{activity?.likes}</span>
                    </button>

                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Icon name="MessageCircle" size={16} />
                      <span>{activity?.comments}</span>
                    </button>

                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Icon name="Share" size={16} />
                      <span>Share</span>
                    </button>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {activity?.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
          Share an Update
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;
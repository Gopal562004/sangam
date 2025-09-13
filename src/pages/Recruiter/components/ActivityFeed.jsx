import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'hire',
      title: 'New Hire Completed',
      description: 'Sarah Johnson joined as Senior Frontend Developer',
      recruiter: 'Mike Chen',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Completed',
      description: 'Technical interview for Backend Developer position',
      recruiter: 'Lisa Rodriguez',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Offer Extended',
      description: 'Offer sent to Alex Thompson for Product Manager role',
      recruiter: 'David Kim',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      icon: 'FileText',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'application',
      title: 'New Applications',
      description: '12 new applications received for UX Designer position',
      recruiter: 'Emma Wilson',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Users',
      color: 'text-accent'
    },
    {
      id: 5,
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Final round interview for Data Scientist position',
      recruiter: 'James Park',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Calendar',
      color: 'text-secondary'
    },
    {
      id: 6,
      type: 'hire',
      title: 'Offer Accepted',
      description: 'Maria Garcia accepted Marketing Manager position',
      recruiter: 'Sophie Turner',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest recruitment updates</p>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity?.color}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {activity?.title}
                </h4>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {activity?.description}
              </p>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity?.recruiter}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1">
            <span>Load More Activities</span>
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
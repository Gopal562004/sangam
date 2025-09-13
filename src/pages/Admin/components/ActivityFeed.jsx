import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const icons = {
      user_registration: 'UserPlus',
      donation: 'DollarSign',
      event_creation: 'Calendar',
      profile_update: 'User',
      mentorship_request: 'Users',
      login: 'LogIn',
      verification: 'CheckCircle'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      user_registration: 'text-success',
      donation: 'text-accent',
      event_creation: 'text-primary',
      profile_update: 'text-secondary',
      mentorship_request: 'text-warning',
      login: 'text-text-secondary',
      verification: 'text-success'
    };
    return colors?.[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary">No recent activity</p>
            </div>
          ) : (
            activities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity?.user}</span> {activity?.action}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {formatTimeAgo(activity?.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../ui/Button';

const QuickActions = ({ userRole = 'mentee' }) => {
  const navigate = useNavigate();

  const mentorActions = [
    {
      id: 'schedule-session',
      label: 'Schedule Session',
      icon: 'Calendar',
      variant: 'default',
      onClick: () => navigate('/session-management'),
    },
    {
      id: 'review-requests',
      label: 'Review Requests',
      icon: 'UserCheck',
      variant: 'outline',
      onClick: () => navigate('/mentorship-dashboard'),
    },
    {
      id: 'share-resource',
      label: 'Share Resource',
      icon: 'BookOpen',
      variant: 'outline',
      onClick: () => navigate('/community'),
    },
    {
      id: 'create-group',
      label: 'Create Group',
      icon: 'Users',
      variant: 'outline',
      onClick: () => navigate('/group-chat'),
    },
  ];

  const menteeActions = [
    {
      id: 'find-mentor',
      label: 'Find Mentor',
      icon: 'Search',
      variant: 'default',
      onClick: () => navigate('/mentorship-dashboard'),
    },
    {
      id: 'book-session',
      label: 'Book Session',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => navigate('/session-management'),
    },
    {
      id: 'join-community',
      label: 'Join Community',
      icon: 'Globe',
      variant: 'outline',
      onClick: () => navigate('/community'),
    },
    {
      id: 'send-message',
      label: 'Send Message',
      icon: 'MessageCircle',
      variant: 'outline',
      onClick: () => navigate('/chat'),
    },
  ];

  const actions = userRole === 'mentor' ? mentorActions : menteeActions;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            fullWidth
            className="justify-start h-12"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
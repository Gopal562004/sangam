import React from 'react';
import Icon from '../../../../AppIcon';


const QuickActions = ({ onScheduleSession, onSendMessage, onCreateGroup, onViewAnalytics }) => {
  const actions = [
    {
      id: 'schedule',
      label: 'Schedule Session',
      description: 'Book a new mentorship session',
      icon: 'Calendar',
      color: 'bg-primary text-primary-foreground',
      onClick: onScheduleSession
    },
    {
      id: 'message',
      label: 'Send Message',
      description: 'Message your mentees',
      icon: 'MessageCircle',
      color: 'bg-success text-success-foreground',
      onClick: onSendMessage
    },
    {
      id: 'group',
      label: 'Create Group',
      description: 'Start a mentorship group',
      icon: 'Users',
      color: 'bg-accent text-accent-foreground',
      onClick: onCreateGroup
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      description: 'Track your mentorship impact',
      icon: 'BarChart3',
      color: 'bg-warning text-warning-foreground',
      onClick: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.onClick}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-elevation-1 transition-smooth text-left group"
          >
            <div className={`p-3 rounded-lg ${action?.color} group-hover:scale-105 transition-spring`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-card-foreground group-hover:text-primary transition-smooth">
                {action?.label}
              </h4>
              <p className="text-sm text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
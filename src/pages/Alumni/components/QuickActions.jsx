import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Update Profile",
      description: "Keep your information current",
      icon: "User",
      color: "bg-primary/10 text-primary",
      action: () => navigate('/profile')
    },
    {
      id: 2,
      title: "Make Donation",
      description: "Support current students",
      icon: "Heart",
      color: "bg-error/10 text-error",
      action: () => {/* Handle donation */}
    },
    {
      id: 3,
      title: "Browse Students",
      description: "Find mentorship opportunities",
      icon: "Users",
      color: "bg-success/10 text-success",
      action: () => navigate('/student-dashboard')
    },
    {
      id: 4,
      title: "View Directory",
      description: "Connect with alumni",
      icon: "Search",
      color: "bg-secondary/10 text-secondary",
      action: () => navigate('/alumni-directory')
    },
    {
      id: 5,
      title: "Event Calendar",
      description: "See upcoming events",
      icon: "Calendar",
      color: "bg-accent/10 text-accent",
      action: () => {/* Handle events */}
    },
    {
      id: 6,
      title: "Settings",
      description: "Manage preferences",
      icon: "Settings",
      color: "bg-muted text-muted-foreground",
      action: () => {/* Handle settings */}
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon name="Zap" size={24} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Frequently used features</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="p-4 border border-border rounded-lg hover:shadow-elevation-2 transition-all duration-200 hover:border-primary/20 group text-left"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action?.color} group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <h3 className="font-medium text-card-foreground mb-1 text-sm">
              {action?.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="outline" iconName="HelpCircle" iconPosition="left">
            Help & Support
          </Button>
          <Button variant="outline" iconName="MessageSquare" iconPosition="left">
            Contact Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
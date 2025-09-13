import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateEvent, onManageUsers, onCreateCampaign, onExportData }) => {
  const actions = [
    {
      label: 'Create Event',
      icon: 'Calendar',
      variant: 'default',
      onClick: onCreateEvent,
      description: 'Schedule new alumni event'
    },
    {
      label: 'Manage Users',
      icon: 'Users',
      variant: 'outline',
      onClick: onManageUsers,
      description: 'User verification & roles'
    },
    {
      label: 'New Campaign',
      icon: 'Target',
      variant: 'secondary',
      onClick: onCreateCampaign,
      description: 'Launch donation campaign'
    },
    {
      label: 'Export Data',
      icon: 'Download',
      variant: 'ghost',
      onClick: onExportData,
      description: 'Generate reports'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border elevation-1 p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div key={action?.label} className="text-center">
            <Button
              variant={action?.variant}
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="w-full mb-2"
            >
              {action?.label}
            </Button>
            <p className="text-xs text-text-secondary">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
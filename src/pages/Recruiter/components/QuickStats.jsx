import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      label: 'Open Positions',
      value: '47',
      change: '+12%',
      changeType: 'positive',
      icon: 'Briefcase',
      description: 'Across 8 departments'
    },
    {
      label: 'Interviews Today',
      value: '23',
      change: '+5%',
      changeType: 'positive',
      icon: 'Calendar',
      description: '18 completed, 5 pending'
    },
    {
      label: 'Offers Pending',
      value: '8',
      change: '-15%',
      changeType: 'negative',
      icon: 'FileText',
      description: 'Avg response time: 3.2 days'
    },
    {
      label: 'New Hires MTD',
      value: '12',
      change: '+25%',
      changeType: 'positive',
      icon: 'UserPlus',
      description: 'Target: 15 for September'
    }
  ];

  const getChangeColor = (type) => {
    if (type === 'positive') return 'text-success';
    if (type === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (type) => {
    if (type === 'positive') return 'TrendingUp';
    if (type === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={14} />
              <span className="font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            <div className="text-sm font-medium text-foreground">{stat?.label}</div>
            <div className="text-xs text-muted-foreground">{stat?.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
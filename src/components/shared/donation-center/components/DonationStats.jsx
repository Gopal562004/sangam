import React from 'react';
import Icon from '../../../../components/AppIcon';

const DonationStats = ({ stats }) => {
  const statsConfig = [
    {
      label: 'Total Raised',
      value: stats?.totalRaised,
      icon: 'DollarSign',
      color: 'primary',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      label: 'Total Donors',
      value: stats?.totalDonors,
      icon: 'Users',
      color: 'success',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      label: 'Active Campaigns',
      value: stats?.activeCampaigns,
      icon: 'Target',
      color: 'warning',
      change: '+3',
      changeType: 'positive'
    },
    {
      label: 'Avg. Donation',
      value: stats?.averageDonation,
      icon: 'TrendingUp',
      color: 'accent',
      change: '+5.8%',
      changeType: 'positive'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      accent: "bg-accent/10 text-accent"
    };
    return colors?.[color] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : type === 'negative' ? 'text-error' : 'text-text-secondary';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg p-6 border border-border elevation-1 hover:elevation-2 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-1">{stat?.label}</p>
              <p className="text-2xl font-bold text-text-primary mb-2">{stat?.value}</p>
              {stat?.change && (
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={stat?.changeType === 'positive' ? 'TrendingUp' : stat?.changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                    className={getChangeColor(stat?.changeType)}
                  />
                  <span className={`text-xs font-medium ${getChangeColor(stat?.changeType)}`}>
                    {stat?.change}
                  </span>
                  <span className="text-xs text-text-secondary">vs last month</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationStats;
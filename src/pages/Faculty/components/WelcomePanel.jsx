import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomePanel = ({ user }) => {
  const currentHour = new Date()?.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const stats = [
    {
      label: 'Active Mentorships',
      value: '3',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Upcoming Events',
      value: '2',
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Total Donations',
      value: '$2,500',
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {greeting}, {user?.name}!
          </h1>
          <p className="text-primary-foreground/80 text-sm md:text-base">
            Welcome back to your alumni dashboard. Stay connected with your alma mater.
          </p>
          <div className="flex items-center mt-2 text-sm text-primary-foreground/70">
            <Icon name="GraduationCap" size={16} className="mr-2" />
            <span>Class of {user?.graduationYear} • {user?.department}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat?.bgColor} bg-white/20`}>
                  <Icon name={stat?.icon} size={20} color="white" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat?.value}</div>
              <div className="text-xs text-primary-foreground/70">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;
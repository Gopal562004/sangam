import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DonorRecognition = ({ donors }) => {
  const getDonorLevelConfig = (level) => {
    const levels = {
      Platinum: { color: 'text-purple-600', bg: 'bg-purple-50', icon: 'Crown' },
      Gold: { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: 'Award' },
      Silver: { color: 'text-gray-600', bg: 'bg-gray-50', icon: 'Medal' },
      Bronze: { color: 'text-orange-600', bg: 'bg-orange-50', icon: 'Badge' }
    };
    return levels?.[level] || levels?.Bronze;
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Top Donors</h3>
        <Button variant="outline" size="sm" iconName="Users">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {donors?.map((donor, index) => {
          const levelConfig = getDonorLevelConfig(donor?.level);
          return (
            <div key={donor?.id} className="flex items-center space-x-3 p-3 bg-background rounded-lg hover:bg-card transition-colors duration-200">
              {/* Ranking Number */}
              <div className="flex-shrink-0 w-6 text-center">
                <span className={`text-sm font-bold ${
                  index === 0 ? 'text-yellow-600' :
                  index === 1 ? 'text-gray-500' :
                  index === 2 ? 'text-orange-600': 'text-text-secondary'
                }`}>
                  #{index + 1}
                </span>
              </div>

              {/* Donor Avatar */}
              <div className="relative">
                <img
                  src={donor?.image}
                  alt={donor?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -top-1 -right-1 w-5 h-5 ${levelConfig?.bg} rounded-full flex items-center justify-center`}>
                  <Icon name={levelConfig?.icon} size={12} className={levelConfig?.color} />
                </div>
              </div>

              {/* Donor Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary truncate">{donor?.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-primary">{donor?.amount}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${levelConfig?.bg} ${levelConfig?.color}`}>
                    {donor?.level}
                  </span>
                </div>
              </div>

              {/* Thank You Button */}
              <Button variant="outline" size="sm" iconName="Heart" className="flex-shrink-0">
                Thank
              </Button>
            </div>
          );
        })}
      </div>
      {/* Recognition Levels Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Recognition Levels</h4>
        <div className="space-y-2">
          {[
            { level: 'Platinum', amount: '$10,000+', color: 'text-purple-600' },
            { level: 'Gold', amount: '$5,000+', color: 'text-yellow-600' },
            { level: 'Silver', amount: '$1,000+', color: 'text-gray-600' },
            { level: 'Bronze', amount: '$500+', color: 'text-orange-600' }
          ]?.map((tier) => (
            <div key={tier?.level} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full bg-current ${tier?.color}`}></div>
                <span className="text-text-primary">{tier?.level}</span>
              </div>
              <span className="text-text-secondary">{tier?.amount}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Public Recognition Settings */}
      <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-info mt-0.5" />
          <div>
            <p className="text-xs text-text-secondary">
              Donors can choose to remain anonymous or be publicly recognized. 
              <button className="text-primary hover:underline ml-1">
                Manage your privacy settings
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRecognition;
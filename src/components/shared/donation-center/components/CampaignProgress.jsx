import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const CampaignProgress = ({ campaigns }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getTotalStats = () => {
    return campaigns?.reduce(
      (acc, campaign) => ({
        totalRaised: acc?.totalRaised + campaign?.raisedAmount,
        totalTarget: acc?.totalTarget + campaign?.targetAmount,
        totalDonors: acc?.totalDonors + campaign?.donorCount
      }),
      { totalRaised: 0, totalTarget: 0, totalDonors: 0 }
    );
  };

  const stats = getTotalStats();
  const overallProgress = (stats?.totalRaised / stats?.totalTarget) * 100;

  const getCampaignStatus = (campaign) => {
    const progress = (campaign?.raisedAmount / campaign?.targetAmount) * 100;
    if (progress >= 100) return { status: 'completed', color: 'text-success', icon: 'CheckCircle' };
    if (campaign?.daysRemaining <= 7) return { status: 'urgent', color: 'text-error', icon: 'AlertCircle' };
    if (progress >= 75) return { status: 'nearly_complete', color: 'text-warning', icon: 'Clock' };
    return { status: 'active', color: 'text-primary', icon: 'Target' };
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Campaign Overview</h3>
          <p className="text-sm text-text-secondary">Track progress across all active fundraising campaigns</p>
        </div>
        <Button variant="outline" size="sm" iconName="BarChart3">
          Detailed Analytics
        </Button>
      </div>
      {/* Overall Progress Card */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-text-primary">
              {formatCurrency(stats?.totalRaised)}
            </h4>
            <p className="text-sm text-text-secondary">
              of {formatCurrency(stats?.totalTarget)} total goal
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {overallProgress?.toFixed(1)}%
            </div>
            <p className="text-sm text-text-secondary">Overall Progress</p>
          </div>
        </div>
        
        <div className="w-full bg-white rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(overallProgress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{stats?.totalDonors} total donors</span>
          <span className="text-text-secondary">{campaigns?.length} active campaigns</span>
        </div>
      </div>
      {/* Individual Campaign Progress */}
      <div className="space-y-4">
        <h4 className="font-semibold text-text-primary">Campaign Details</h4>
        {campaigns?.map((campaign) => {
          const progress = (campaign?.raisedAmount / campaign?.targetAmount) * 100;
          const statusInfo = getCampaignStatus(campaign);
          
          return (
            <div key={campaign?.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg hover:bg-card transition-colors duration-200">
              {/* Campaign Image */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={campaign?.image}
                  alt={campaign?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Campaign Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-medium text-text-primary truncate">{campaign?.title}</h5>
                  <Icon name={statusInfo?.icon} size={14} className={statusInfo?.color} />
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        statusInfo?.status === 'completed' ? 'bg-success' :
                        statusInfo?.status === 'urgent' ? 'bg-error' :
                        statusInfo?.status === 'nearly_complete'? 'bg-warning' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{formatCurrency(campaign?.raisedAmount)} raised</span>
                  <span>{progress?.toFixed(1)}% complete</span>
                </div>
              </div>
              {/* Campaign Stats */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-text-primary">
                  {campaign?.donorCount} donors
                </div>
                <div className={`text-xs ${statusInfo?.color}`}>
                  {campaign?.daysRemaining} days left
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" iconName="Plus">
            Create Campaign
          </Button>
          <Button variant="outline" size="sm" iconName="Share2">
            Share Progress
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
          <Button variant="outline" size="sm" iconName="Mail">
            Email Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignProgress;
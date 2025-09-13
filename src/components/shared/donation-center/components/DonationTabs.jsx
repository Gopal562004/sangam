import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const DonationTabs = ({ donationHistory, onExportReceipts }) => {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Donation History', icon: 'History' },
    { id: 'recurring', label: 'Recurring Donations', icon: 'Repeat' },
    { id: 'receipts', label: 'Tax Documents', icon: 'FileText' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', text: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning', text: 'Pending' },
      failed: { color: 'bg-error/10 text-error', text: 'Failed' }
    };
    return statusConfig?.[status] || statusConfig?.completed;
  };

  // Mock recurring donations data
  const recurringDonations = [
    {
      id: 1,
      campaign: "Annual Scholarship Fund",
      amount: "$50",
      frequency: "Monthly",
      nextPayment: "2024-09-15",
      status: "active"
    },
    {
      id: 2,
      campaign: "General Fund",
      amount: "$25",
      frequency: "Quarterly",
      nextPayment: "2024-10-01",
      status: "active"
    }
  ];

  // Mock tax documents data
  const taxDocuments = [
    {
      id: 1,
      year: "2024",
      totalDonation: "$1,750",
      documentCount: 7,
      status: "available"
    },
    {
      id: 2,
      year: "2023",
      totalDonation: "$2,150",
      documentCount: 12,
      status: "available"
    },
    {
      id: 3,
      year: "2022",
      totalDonation: "$950",
      documentCount: 5,
      status: "available"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recurring':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">Active Recurring Donations</h3>
              <Button variant="outline" size="sm" iconName="Plus">
                Set Up Recurring
              </Button>
            </div>
            
            {recurringDonations?.length > 0 ? (
              <div className="space-y-3">
                {recurringDonations?.map((donation) => (
                  <div key={donation?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{donation?.campaign}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                        <span>{donation?.amount} {donation?.frequency}</span>
                        <span>Next: {formatDate(donation?.nextPayment)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          donation?.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                        }`}>
                          {donation?.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Edit2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" iconName="Pause">
                        Pause
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Repeat" size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Recurring Donations</h3>
                <p className="text-text-secondary mb-4">Set up recurring donations to make a lasting impact.</p>
                <Button variant="default" iconName="Plus">
                  Create Recurring Donation
                </Button>
              </div>
            )}
          </div>
        );

      case 'receipts':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">Tax Documents & Receipts</h3>
              <Button variant="outline" size="sm" iconName="Download" onClick={onExportReceipts}>
                Export All
              </Button>
            </div>
            
            <div className="space-y-3">
              {taxDocuments?.map((doc) => (
                <div key={doc?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Tax Year {doc?.year}</h4>
                      <div className="text-sm text-text-secondary">
                        Total: {doc?.totalDonation} • {doc?.documentCount} receipts
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="outline" size="sm" iconName="Download">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-info mt-0.5" />
                <div>
                  <h4 className="font-medium text-text-primary mb-1">Tax Deduction Information</h4>
                  <p className="text-sm text-text-secondary">
                    Your donations are tax-deductible to the full extent allowed by law. 
                    Consult your tax advisor for specific advice regarding your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">Recent Donations</h3>
              <Button variant="outline" size="sm" iconName="Download">
                Export History
              </Button>
            </div>
            
            {donationHistory?.length > 0 ? (
              <div className="space-y-3">
                {donationHistory?.map((donation) => {
                  const statusBadge = getStatusBadge(donation?.status);
                  return (
                    <div key={donation?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-card transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Heart" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">{donation?.campaign}</h4>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-text-secondary">
                            <span>{formatDate(donation?.date)}</span>
                            <span>Receipt: {donation?.receipt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-text-primary">{donation?.amount}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusBadge?.color}`}>
                          {statusBadge?.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Heart" size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Donation History</h3>
                <p className="text-text-secondary">Your donation history will appear here once you make your first contribution.</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DonationTabs;
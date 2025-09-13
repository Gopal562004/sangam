import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TabSection = ({ 
  activeTab, 
  setActiveTab, 
  donationHistory, 
  recurringDonations, 
  formatCurrency, 
  formatDate 
}) => {
  const tabs = [
    { id: 'history', label: 'Donation History', icon: 'History', count: donationHistory?.length },
    { id: 'recurring', label: 'Recurring Donations', icon: 'RefreshCw', count: recurringDonations?.length },
    { id: 'receipts', label: 'Tax Documents', icon: 'FileText', count: '2024' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'paused': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'annually': return 'Annually';
      default: return frequency;
    }
  };

  const handleExportHistory = () => {
    console.log('Exporting donation history');
    // Implementation for exporting history
  };

  const handleManageRecurring = (donationId, action) => {
    console.log(`${action} recurring donation:`, donationId);
    // Implementation for managing recurring donations
  };

  const handleDownloadReceipt = (receiptId) => {
    console.log('Downloading receipt:', receiptId);
    // Implementation for downloading receipts
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-0">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
              {tab?.count && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id ? 'bg-primary/20 text-primary' : 'bg-muted text-text-secondary'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'history' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-text-primary">Donation History</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportHistory}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
            
            {donationHistory?.length > 0 ? (
              <div className="space-y-4">
                {donationHistory?.map((donation) => (
                  <div key={donation?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-text-primary">{donation?.campaign}</h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation?.status)}`}>
                          {donation?.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span>Amount: {formatCurrency(donation?.amount)}</span>
                        <span>Date: {formatDate(donation?.date)}</span>
                        <span>Method: {donation?.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReceipt(donation?.receiptId)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="History" size={48} className="text-text-secondary mx-auto mb-4" />
                <h5 className="text-lg font-medium text-text-primary mb-2">No Donation History</h5>
                <p className="text-text-secondary">Your donation history will appear here after you make your first contribution.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recurring' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-text-primary">Recurring Donations</h4>
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
              >
                Set Up New
              </Button>
            </div>
            
            {recurringDonations?.length > 0 ? (
              <div className="space-y-4">
                {recurringDonations?.map((donation) => (
                  <div key={donation?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-text-primary">{donation?.campaign}</h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation?.status)}`}>
                          {donation?.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span>{formatCurrency(donation?.amount)} {getFrequencyLabel(donation?.frequency)}</span>
                        <span>Next: {formatDate(donation?.nextPayment)}</span>
                        <span>Since: {formatDate(donation?.startDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageRecurring(donation?.id, 'pause')}
                      >
                        {donation?.status === 'active' ? 'Pause' : 'Resume'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageRecurring(donation?.id, 'edit')}
                        iconName="Edit"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="RefreshCw" size={48} className="text-text-secondary mx-auto mb-4" />
                <h5 className="text-lg font-medium text-text-primary mb-2">No Recurring Donations</h5>
                <p className="text-text-secondary mb-4">Set up recurring donations to support causes you care about automatically.</p>
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Set Up Recurring Donation
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'receipts' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-text-primary">Tax Documents</h4>
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
              >
                Generate Summary
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-text-primary">2024 Tax Summary</h5>
                    <p className="text-sm text-text-secondary mt-1">
                      Total deductible donations: {formatCurrency(1250)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReceipt('TAX-2024')}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-text-primary">2023 Tax Summary</h5>
                    <p className="text-sm text-text-secondary mt-1">
                      Total deductible donations: {formatCurrency(950)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReceipt('TAX-2023')}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start">
                <Icon name="Info" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary font-medium">Tax Deductible Donations</p>
                  <p className="text-xs text-primary/80 mt-1">
                    All donations are tax-deductible to the full extent allowed by law. 
                    Consult your tax advisor for specific guidance on your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
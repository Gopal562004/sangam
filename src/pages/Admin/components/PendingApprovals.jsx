import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ approvals = [], onApprove, onReject }) => {
  const getApprovalIcon = (type) => {
    const icons = {
      user_verification: 'UserCheck',
      event_approval: 'Calendar',
      donation_verification: 'DollarSign',
      profile_update: 'User'
    };
    return icons?.[type] || 'Clock';
  };

  const getApprovalBadge = (type) => {
    const badges = {
      user_verification: { label: 'User Verification', color: 'bg-warning/10 text-warning' },
      event_approval: { label: 'Event Approval', color: 'bg-primary/10 text-primary' },
      donation_verification: { label: 'Donation Verification', color: 'bg-success/10 text-success' },
      profile_update: { label: 'Profile Update', color: 'bg-secondary/10 text-secondary' }
    };
    return badges?.[type] || { label: 'Pending', color: 'bg-muted text-text-secondary' };
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Pending Approvals</h3>
          <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-sm font-medium">
            {approvals?.length}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {approvals?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <p className="text-text-secondary">All caught up!</p>
              <p className="text-sm text-text-secondary">No pending approvals</p>
            </div>
          ) : (
            approvals?.map((approval) => {
              const badge = getApprovalBadge(approval?.type);
              return (
                <div key={approval?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Icon name={getApprovalIcon(approval?.type)} size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{approval?.title}</h4>
                        <p className="text-sm text-text-secondary">{approval?.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
                      {badge?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-secondary">
                      Submitted by {approval?.submittedBy} • {approval?.timeAgo}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => onReject(approval?.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Check"
                        onClick={() => onApprove(approval?.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
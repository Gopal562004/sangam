import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Image from '../../../../AppImage';
import Button from '../../../../ui/Button';

const PendingRequests = ({ requests, onApprove, onDecline, onViewDetails }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExperienceLevel = (level) => {
    const levels = {
      beginner: { color: 'bg-success/10 text-success', label: 'Beginner' },
      intermediate: { color: 'bg-warning/10 text-warning', label: 'Intermediate' },
      advanced: { color: 'bg-accent/10 text-accent', label: 'Advanced' }
    };
    return levels?.[level] || levels?.beginner;
  };

  const toggleExpanded = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            Pending Requests
            {requests?.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                {requests?.length}
              </span>
            )}
          </h3>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {requests?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="UserCheck" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">No pending requests</h3>
            <p className="text-muted-foreground">New mentorship requests will appear here for your review.</p>
          </div>
        ) : (
          requests?.map((request) => {
            const isExpanded = expandedRequest === request?.id;
            const experienceLevel = getExperienceLevel(request?.experienceLevel);
            
            return (
              <div key={request?.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <Image
                    src={request?.avatar}
                    alt={request?.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-card-foreground">{request?.name}</h4>
                        <p className="text-sm text-muted-foreground">{request?.currentRole}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${experienceLevel?.color}`}>
                            {experienceLevel?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Applied {formatDate(request?.appliedDate)}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpanded(request?.id)}
                        className="h-8 w-8"
                      >
                        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                    </div>

                    {/* Quick Preview */}
                    <div className="mb-3">
                      <p className="text-sm text-card-foreground mb-2">
                        <span className="font-medium">Goal:</span> {request?.goals}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {request?.interests?.slice(0, 3)?.map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                        {request?.interests?.length > 3 && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                            +{request?.interests?.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mb-4 p-4 bg-muted/30 rounded-lg space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-card-foreground mb-1">Background</h5>
                          <p className="text-sm text-muted-foreground">{request?.background}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-card-foreground mb-1">Expectations</h5>
                          <p className="text-sm text-muted-foreground">{request?.expectations}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-card-foreground mb-1">Availability</h5>
                          <p className="text-sm text-muted-foreground">{request?.availability}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-card-foreground mb-1">Contact Information</h5>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground flex items-center space-x-2">
                              <Icon name="Mail" size={14} />
                              <span>{request?.email}</span>
                            </p>
                            {request?.phone && (
                              <p className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Icon name="Phone" size={14} />
                                <span>{request?.phone}</span>
                              </p>
                            )}
                            {request?.linkedin && (
                              <p className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Icon name="Linkedin" size={14} />
                                <span>{request?.linkedin}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(request)}
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View Profile
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDecline(request)}
                          iconName="X"
                          iconPosition="left"
                        >
                          Decline
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onApprove(request)}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {requests?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {requests?.length} request{requests?.length !== 1 ? 's' : ''} pending review
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="X">
                Decline All
              </Button>
              <Button variant="outline" size="sm" iconName="Check">
                Approve All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerOpportunityCard = ({ opportunity, onApply, onSave }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'text-secondary bg-secondary/10';
      case 'full-time':
        return 'text-primary bg-primary/10';
      case 'part-time':
        return 'text-accent bg-accent/10';
      case 'contract':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getExperienceLevel = (level) => {
    switch (level) {
      case 'entry':
        return 'Entry Level';
      case 'mid':
        return 'Mid Level';
      case 'senior':
        return 'Senior Level';
      default:
        return 'All Levels';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {opportunity?.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {opportunity?.company} • {opportunity?.location}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity?.type)}`}>
            {opportunity?.type?.charAt(0)?.toUpperCase() + opportunity?.type?.slice(1)}
          </span>
          {opportunity?.isSaved && (
            <Icon name="Bookmark" size={16} className="text-accent fill-current" />
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={16} />
          <span>{opportunity?.workType}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={16} />
          <span>{getExperienceLevel(opportunity?.experienceLevel)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="DollarSign" size={16} />
          <span>{opportunity?.salary}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {opportunity?.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity?.skills?.slice(0, 4)?.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary"
          >
            {skill}
          </span>
        ))}
        {opportunity?.skills?.length > 4 && (
          <span className="text-xs text-text-secondary">
            +{opportunity?.skills?.length - 4} more
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>Posted {formatDate(opportunity?.postedDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{opportunity?.applicants} applicants</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSave(opportunity)}
          >
            <Icon name={opportunity?.isSaved ? "Bookmark" : "BookmarkPlus"} size={16} />
            {opportunity?.isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onApply(opportunity)}
            disabled={opportunity?.hasApplied}
          >
            {opportunity?.hasApplied ? 'Applied' : 'Apply Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerOpportunityCard;
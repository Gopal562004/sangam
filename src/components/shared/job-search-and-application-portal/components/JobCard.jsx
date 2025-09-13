import React, { useState } from 'react';
import Icon from '../../../AppIcon';
import Button from '../../../ui/Button';

const JobCard = ({ job, onSave, onApply, onViewDetails, isSaved = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(job?.id, !saved);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${(min/1000)}k - $${(max/1000)}k`;
    if (min) return `$${(min/1000)}k+`;
    return 'Competitive salary';
  };

  const formatPostedTime = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted today';
    if (diffDays <= 7) return `Posted ${diffDays} days ago`;
    if (diffDays <= 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return 'Posted over a month ago';
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails?.(job)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            {job?.company?.logo ? (
              <img
                src={job?.company?.logo}
                alt={job?.company?.name}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <Icon name="Building" size={20} className="text-muted-foreground" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
              {job?.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span className="font-medium">{job?.company?.name}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{job?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e?.stopPropagation();
            handleSave();
          }}
          className="p-2 hover:bg-muted rounded-md transition-colors"
        >
          <Icon
            name={saved ? "Bookmark" : "BookmarkPlus"}
            size={20}
            className={saved ? "text-primary fill-current" : "text-muted-foreground"}
          />
        </button>
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        {/* Salary & Employment Type */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-foreground">
            {formatSalary(job?.salary?.min, job?.salary?.max)}
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {job?.employmentType}
            </span>
            {job?.remote && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Key Requirements */}
        {job?.keyRequirements && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Key Requirements:</div>
            <div className="flex flex-wrap gap-2">
              {job?.keyRequirements?.slice(0, 4)?.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                >
                  {req}
                </span>
              ))}
              {job?.keyRequirements?.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-muted-foreground">
                  +{job?.keyRequirements?.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Job Description Preview */}
        {isHovered && job?.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {job?.description}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {formatPostedTime(job?.postedDate)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onViewDetails?.(job);
            }}
            className="text-xs"
          >
            View Details
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onApply?.(job);
            }}
            className="text-xs"
          >
            Apply Now
          </Button>
        </div>
      </div>
      {/* Match Score (if available) */}
      {job?.matchScore && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
          {job?.matchScore}% match
        </div>
      )}
      {/* Urgency Indicator */}
      {job?.urgent && (
        <div className="absolute top-4 left-4 bg-warning text-warning-foreground text-xs font-semibold px-2 py-1 rounded">
          Urgent
        </div>
      )}
    </div>
  );
};

export default JobCard;
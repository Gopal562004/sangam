import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MentorCard = ({ mentor, onRequestMentorship, onViewProfile }) => {
  const getExperienceYears = (startYear) => {
    const currentYear = new Date()?.getFullYear();
    return currentYear - startYear;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={mentor?.avatar}
              alt={mentor?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {mentor?.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {mentor?.position} at {mentor?.company}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {mentor?.department} • Class of {mentor?.graduationYear}
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{mentor?.rating}</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm text-text-secondary line-clamp-2">
              {mentor?.bio}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {mentor?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
            {mentor?.skills?.length > 3 && (
              <span className="text-xs text-text-secondary">
                +{mentor?.skills?.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Briefcase" size={14} />
                <span>{getExperienceYears(mentor?.experienceStartYear)}+ years</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{mentor?.menteesCount} mentees</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(mentor)}
              >
                View Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onRequestMentorship(mentor)}
                disabled={mentor?.isRequested}
              >
                {mentor?.isRequested ? 'Requested' : 'Request Mentorship'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
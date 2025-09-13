import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";
import Button from "../../../../components/ui/Button";

const AlumniCard = ({ alumni, onConnect, onMessage, viewMode = "grid" }) => {
  const {
    id,
    name,
    profileImage,
    graduationYear,
    currentPosition,
    company,
    department,
    skills,
    location,
    availableForMentorship,
    availableForSpeaking,
    availableForRecruiting,
    isConnected,
  } = alumni;

  // Shared text sizes
  const textSm = "text-xs sm:text-sm";

  if (viewMode === "list") {
    return (
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:elevation-2 transition-all duration-200 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileImage}
                alt={`${name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-text-primary mb-1 truncate ${textSm}`}
            >
              {name}
            </h3>
            <p className={`text-text-secondary mb-2 truncate ${textSm}`}>
              {currentPosition} at {company}
            </p>

            <div className={`flex flex-wrap items-center gap-2 mb-2 ${textSm}`}>
              <span className="flex items-center gap-1">
                <Icon name="GraduationCap" size={14} />
                Class of {graduationYear}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Building" size={14} />
                {department}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                {location}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-2">
              {skills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full truncate"
                >
                  {skill}
                </span>
              ))}
              {skills?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                  +{skills?.length - 3} more
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="flex flex-wrap gap-2">
              {availableForMentorship && (
                <span className="flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                  <Icon name="Users" size={12} />
                  Mentorship
                </span>
              )}
              {availableForSpeaking && (
                <span className="flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                  <Icon name="Mic" size={12} />
                  Speaking
                </span>
              )}
              {availableForRecruiting && (
                <span className="flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                  <Icon name="Briefcase" size={12} />
                  Recruiting
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMessage(alumni)}
              iconName="MessageCircle"
              iconPosition="left"
              className="whitespace-nowrap"
            >
              Message
            </Button>
            <Button
              variant={isConnected ? "secondary" : "default"}
              size="sm"
              onClick={() => onConnect(alumni)}
              iconName={isConnected ? "UserCheck" : "UserPlus"}
              iconPosition="left"
              className="whitespace-nowrap"
            >
              {isConnected ? "Connected" : "Connect"}
            </Button>
            <Link to={`/alumni-directory/${id}`}>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                className="whitespace-nowrap"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:elevation-2 transition-all duration-200 flex flex-col items-center text-center w-full">
      {/* Profile Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-muted mb-2">
        <Image
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name & Position */}
      <h3 className={`font-semibold text-text-primary mb-1 truncate ${textSm}`}>
        {name}
      </h3>
      <p className={`text-text-secondary mb-1 truncate ${textSm}`}>
        {currentPosition}
      </p>
      <p className={`text-text-secondary mb-2 truncate ${textSm}`}>{company}</p>

      {/* Details */}
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        <span className="flex items-center gap-1 text-text-secondary text-xs sm:text-sm">
          <Icon name="GraduationCap" size={14} /> Class of {graduationYear}
        </span>
        <span className="flex items-center gap-1 text-text-secondary text-xs sm:text-sm">
          <Icon name="Building" size={14} /> {department}
        </span>
        <span className="flex items-center gap-1 text-text-secondary text-xs sm:text-sm">
          <Icon name="MapPin" size={14} /> {location}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {skills?.slice(0, 3)?.map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full truncate"
          >
            {skill}
          </span>
        ))}
        {skills?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full truncate">
            +{skills?.length - 3}
          </span>
        )}
      </div>

      {/* Availability */}
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {availableForMentorship && (
          <span className="flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
            <Icon name="Users" size={12} /> Mentorship
          </span>
        )}
        {availableForSpeaking && (
          <span className="flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
            <Icon name="Mic" size={12} /> Speaking
          </span>
        )}
        {availableForRecruiting && (
          <span className="flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
            <Icon name="Briefcase" size={12} /> Recruiting
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-2 w-full mb-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onMessage(alumni)}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message
        </Button>
        <Button
          variant={isConnected ? "secondary" : "default"}
          size="sm"
          fullWidth
          onClick={() => onConnect(alumni)}
          iconName={isConnected ? "UserCheck" : "UserPlus"}
          iconPosition="left"
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
      </div>

      {/* Profile Link */}
      <div className="w-full">
        <Link to={`/alumni-directory/${id}`}>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="ExternalLink"
            iconPosition="left"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AlumniCard;

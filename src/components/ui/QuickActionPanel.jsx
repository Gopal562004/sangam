import React, { useState } from "react";
import Icon from "../AppIcon";
import Button from "./Button";

const QuickActionPanel = ({
  actions = [],
  position = "floating",
  isExpanded = false,
  onToggle,
  className = "",
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);

  const expanded = onToggle ? isExpanded : internalExpanded;
  const toggleExpanded =
    onToggle || (() => setInternalExpanded(!internalExpanded));

  // Default actions for mentorship platform
  const defaultActions = [
    {
      id: "schedule-session",
      label: "Schedule Session",
      icon: "Calendar",
      variant: "default",
      onClick: () => console.log("Schedule session"),
    },
    {
      id: "send-message",
      label: "Send Message",
      icon: "MessageCircle",
      variant: "outline",
      onClick: () => console.log("Send message"),
    },
    {
      id: "create-group",
      label: "Create Group",
      icon: "Users",
      variant: "outline",
      onClick: () => console.log("Create group"),
    },
    {
      id: "share-resource",
      label: "Share Resource",
      icon: "Share",
      variant: "outline",
      onClick: () => console.log("Share resource"),
    },
  ];

  const actionList = actions?.length > 0 ? actions : defaultActions;

  if (position === "floating") {
    return (
      <div
        className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 ${className}`}
      >
        {/* Expanded Actions */}
        {expanded && (
          <div className="mb-4 space-y-2 animate-slide-up">
            {actionList?.map((action, index) => (
              <div
                key={action?.id}
                className="flex items-center justify-end"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-popover text-popover-foreground px-3 py-1 rounded-lg text-xs sm:text-sm font-medium mr-3 shadow-elevation-2 whitespace-nowrap">
                  {action?.label}
                </span>
                <Button
                  variant={action?.variant || "outline"}
                  size="icon"
                  onClick={action?.onClick}
                  className="shadow-elevation-2 bg-card hover:bg-muted"
                >
                  <Icon name={action?.icon} size={20} />
                </Button>
              </div>
            ))}
          </div>
        )}
        {/* Main FAB */}
        <Button
          variant="default"
          size="icon"
          onClick={toggleExpanded}
          className="w-14 h-14 rounded-full shadow-elevation-3 bg-primary hover:bg-primary/90 transition-spring"
        >
          <Icon
            name={expanded ? "X" : "Plus"}
            size={24}
            className={`transition-all duration-200 ${
              expanded ? "rotate-90" : "rotate-0"
            }`}
          />
        </Button>
      </div>
    );
  }

  if (position === "sidebar") {
    return (
      <div
        className={`bg-card border border-border rounded-lg p-4 ${className}`}
      >
        <h3 className="font-medium text-card-foreground mb-4 text-sm">
          Quick Actions
        </h3>
        <div className="space-y-2">
          {actionList?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant || "outline"}
              size="sm"
              onClick={action?.onClick}
              iconName={action?.icon}
              iconPosition="left"
              fullWidth
              className="justify-start text-xs sm:text-sm"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (position === "header") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {actionList?.slice(0, 3)?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant || "outline"}
            size="sm"
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            className="hidden sm:flex text-xs sm:text-sm"
          >
            {action?.label}
          </Button>
        ))}
        {actionList?.length > 3 && (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpanded}
              iconName="MoreHorizontal"
            >
              More
            </Button>

            {expanded && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => toggleExpanded()}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-20 animate-slide-down">
                  <div className="py-2">
                    {actionList?.slice(3)?.map((action) => (
                      <button
                        key={action?.id}
                        onClick={() => {
                          action?.onClick();
                          toggleExpanded();
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-xs sm:text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default inline layout
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {actionList?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant || "outline"}
          size="sm"
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          className="text-xs sm:text-sm"
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

// Role-based Quick Actions
export const MentorQuickActions = ({ className = "" }) => {
  const mentorActions = [
    {
      id: "schedule-session",
      label: "Schedule Session",
      icon: "Calendar",
      variant: "default",
      onClick: () => console.log("Schedule session"),
    },
    {
      id: "review-requests",
      label: "Review Requests",
      icon: "UserCheck",
      variant: "outline",
      onClick: () => console.log("Review requests"),
    },
    {
      id: "share-resource",
      label: "Share Resource",
      icon: "BookOpen",
      variant: "outline",
      onClick: () => console.log("Share resource"),
    },
    {
      id: "create-group",
      label: "Create Group",
      icon: "Users",
      variant: "outline",
      onClick: () => console.log("Create group"),
    },
  ];

  return (
    <QuickActionPanel
      actions={mentorActions}
      className={className}
      onToggle={null}
    />
  );
};

export const MenteeQuickActions = ({ className = "" }) => {
  const menteeActions = [
    {
      id: "find-mentor",
      label: "Find Mentor",
      icon: "Search",
      variant: "default",
      onClick: () => console.log("Find mentor"),
    },
    {
      id: "book-session",
      label: "Book Session",
      icon: "Calendar",
      variant: "outline",
      onClick: () => console.log("Book session"),
    },
    {
      id: "join-community",
      label: "Join Community",
      icon: "Globe",
      variant: "outline",
      onClick: () => console.log("Join community"),
    },
    {
      id: "track-progress",
      label: "Track Progress",
      icon: "TrendingUp",
      variant: "outline",
      onClick: () => console.log("Track progress"),
    },
  ];

  return (
    <QuickActionPanel
      actions={menteeActions}
      className={className}
      onToggle={null}
    />
  );
};

export default QuickActionPanel;

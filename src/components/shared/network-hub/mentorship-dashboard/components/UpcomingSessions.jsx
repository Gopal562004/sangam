import React from "react";
import Icon from "../../../../AppIcon";
import Image from "../../../../AppImage";
import Button from "../../../../ui/Button";

const UpcomingSessions = ({
  sessions = [],
  onJoinSession,
  onRescheduleSession,
}) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateLabel =
      date.toDateString() === today.toDateString()
        ? "Today"
        : date.toDateString() === tomorrow.toDateString()
        ? "Tomorrow"
        : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return { dateLabel, timeLabel };
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "Video";
      case "audio":
        return "Phone";
      case "chat":
        return "MessageCircle";
      case "in-person":
        return "MapPin";
      default:
        return "Calendar";
    }
  };

  const getSessionTypeColor = (type) => {
    switch (type) {
      case "video":
        return "text-primary";
      case "audio":
        return "text-success";
      case "chat":
        return "text-accent";
      case "in-person":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const isSessionSoon = (dateString) => {
    const sessionTime = new Date(dateString);
    const now = new Date();
    return sessionTime - now > 0 && sessionTime - now <= 30 * 60 * 1000;
  };

  if (!sessions.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm p-4 text-center">
        <Icon
          name="Calendar"
          size={36}
          className="mx-auto mb-2 text-muted-foreground/50"
        />
        <h3 className="text-sm font-medium text-card-foreground mb-1">
          No upcoming sessions
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          Schedule a session to get started.
        </p>
        <Button variant="default" size="xs" iconName="Plus">
          Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-2">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-sm font-semibold text-card-foreground">
          Upcoming Sessions
        </h3>
        <Button variant="outline" size="xs" iconName="Calendar">
          View All
        </Button>
      </div>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
        {sessions.map((session) => {
          const { dateLabel, timeLabel } = formatDateTime(
            session.scheduledTime
          );
          const soon = isSessionSoon(session.scheduledTime);

          return (
            <div
              key={session.id}
              className="bg-muted/5 border border-border rounded-md p-2 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-2">
                {/* Date & Time */}
                <div className="flex flex-col items-center min-w-[45px] text-[10px]">
                  <div
                    className={`${
                      soon ? "text-accent" : "text-card-foreground"
                    } font-medium`}
                  >
                    {dateLabel}
                  </div>
                  <div
                    className={`${
                      soon ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {timeLabel}
                  </div>
                  {soon && (
                    <span className="mt-1 inline-flex items-center px-1 py-0.5 rounded-full text-[10px] bg-accent/10 text-accent">
                      Soon
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <Image
                        src={session.mentee?.avatar}
                        alt={session.mentee?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-card-foreground truncate">
                          {session.mentee?.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[9px] text-muted-foreground truncate">
                          <Icon
                            name={getSessionTypeIcon(session.type)}
                            size={12}
                            className={getSessionTypeColor(session.type)}
                          />
                          <span className="capitalize truncate">
                            {session.type} session
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRescheduleSession(session)}
                      className="h-6 w-6"
                    >
                      <Icon name="Clock" size={12} />
                    </Button>
                  </div>

                  <p className="text-[10px] font-medium text-card-foreground truncate">
                    {session.topic}
                  </p>
                  {session.description && (
                    <p className="text-[9px] text-muted-foreground line-clamp-2">
                      {session.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-1 text-[9px] text-muted-foreground flex-wrap gap-1">
                    <div className="flex items-center gap-1 flex-wrap">
                      <Icon name="Clock" size={10} />
                      <span>{session.duration} min</span>
                      {session.location && (
                        <>
                          <span>•</span>
                          <Icon name="MapPin" size={10} />
                          <span className="truncate">{session.location}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => onRescheduleSession(session)}
                        iconName="Clock"
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => onJoinSession(session)}
                        iconName={session.type === "video" ? "Video" : "Phone"}
                        disabled={
                          !soon && new Date(session.scheduledTime) > new Date()
                        }
                      >
                        {soon ? "Join Now" : "Join"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingSessions;

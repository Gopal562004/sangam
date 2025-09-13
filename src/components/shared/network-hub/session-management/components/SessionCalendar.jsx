import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';

const SessionCalendar = ({ sessions, onSessionClick, onCreateSession, currentView, onViewChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const viewOptions = [
    { value: 'month', label: 'Month', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'day', label: 'Day', icon: 'Clock' }
  ];

  const getCalendarDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }
    
    return days;
  };

  const getSessionsForDate = (date) => {
    return sessions?.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate?.toDateString() === date?.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(newDate?.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(newDate?.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleNavigation = (direction) => {
    switch (currentView) {
      case 'month':
        navigateMonth(direction);
        break;
      case 'week':
        navigateWeek(direction);
        break;
      case 'day':
        navigateDay(direction);
        break;
      default:
        navigateMonth(direction);
    }
  };

  const formatDateHeader = () => {
    const options = { year: 'numeric', month: 'long' };
    if (currentView === 'day') {
      return currentDate?.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return currentDate?.toLocaleDateString('en-US', options);
  };

  const renderMonthView = () => {
    const days = getCalendarDays();
    const today = new Date();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {/* Calendar days */}
        {days?.map((day, index) => {
          const daySession = getSessionsForDate(day);
          const isCurrentMonth = day?.getMonth() === currentDate?.getMonth();
          const isToday = day?.toDateString() === today?.toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-border cursor-pointer transition-smooth hover:bg-muted ${
                !isCurrentMonth ? 'bg-muted/50 text-muted-foreground' : 'bg-card'
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
              onClick={() => onCreateSession && onCreateSession(day)}
            >
              <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                {day?.getDate()}
              </div>
              <div className="space-y-1">
                {daySession?.slice(0, 2)?.map((session, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onSessionClick(session);
                    }}
                    className={`text-xs p-1 rounded truncate cursor-pointer transition-smooth ${
                      session?.status === 'completed' ? 'bg-success/20 text-success' :
                      session?.status === 'cancelled'? 'bg-error/20 text-error' : 'bg-primary/20 text-primary hover:bg-primary/30'
                    }`}
                  >
                    {session?.time} - {session?.mentee}
                  </div>
                ))}
                {daySession?.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{daySession?.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays?.map((day, index) => {
          const daySession = getSessionsForDate(day);
          const isToday = day?.toDateString() === new Date()?.toDateString();
          
          return (
            <div key={index} className="border border-border bg-card">
              <div className={`p-3 text-center border-b border-border ${isToday ? 'bg-primary text-primary-foreground' : ''}`}>
                <div className="text-sm font-medium">
                  {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-semibold">
                  {day?.getDate()}
                </div>
              </div>
              <div className="p-2 min-h-[300px] space-y-2">
                {daySession?.map((session, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSessionClick(session)}
                    className={`p-2 rounded text-xs cursor-pointer transition-smooth ${
                      session?.status === 'completed' ? 'bg-success/20 text-success' :
                      session?.status === 'cancelled'? 'bg-error/20 text-error' : 'bg-primary/20 text-primary hover:bg-primary/30'
                    }`}
                  >
                    <div className="font-medium">{session?.time}</div>
                    <div className="truncate">{session?.mentee}</div>
                    <div className="truncate opacity-75">{session?.topic}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const daySession = getSessionsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="space-y-1">
        {hours?.map(hour => {
          const hourSessions = daySession?.filter(session => {
            const sessionHour = parseInt(session?.time?.split(':')?.[0]);
            return sessionHour === hour;
          });

          return (
            <div key={hour} className="flex border-b border-border">
              <div className="w-20 p-2 text-sm text-muted-foreground bg-muted">
                {hour?.toString()?.padStart(2, '0')}:00
              </div>
              <div className="flex-1 p-2 min-h-[60px] bg-card">
                {hourSessions?.map((session, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSessionClick(session)}
                    className={`p-2 rounded mb-1 cursor-pointer transition-smooth ${
                      session?.status === 'completed' ? 'bg-success/20 text-success' :
                      session?.status === 'cancelled'? 'bg-error/20 text-error' : 'bg-primary/20 text-primary hover:bg-primary/30'
                    }`}
                  >
                    <div className="font-medium">{session?.time} - {session?.mentee}</div>
                    <div className="text-sm opacity-75">{session?.topic}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Calendar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            {formatDateHeader()}
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigation(-1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNavigation(1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewOptions?.map(option => (
              <Button
                key={option?.value}
                variant={currentView === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.label}
              </Button>
            ))}
          </div>

          <Button
            variant="default"
            onClick={() => onCreateSession && onCreateSession()}
            iconName="Plus"
            iconPosition="left"
          >
            Create Session
          </Button>
        </div>
      </div>
      {/* Calendar Content */}
      <div className="p-4">
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
      </div>
    </div>
  );
};

export default SessionCalendar;
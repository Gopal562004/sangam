import React, { useState, useEffect } from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import UpcomingSessions from './components/UpcomingSessions';
import NotificationPanel from './components/NotificationPanel';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('mentee');

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: userRole,
    location: "San Francisco, CA",
    memberSince: "2023-01-15T00:00:00Z"
  };

  // Mock metrics data based on role
  const getMockMetrics = () => {
    if (userRole === 'mentor') {
      return [
        {
          title: "Total Mentees",
          value: "24",
          change: "+3 this month",
          changeType: "positive",
          icon: "Users",
          color: "primary"
        },
        {
          title: "Upcoming Sessions",
          value: "8",
          change: "Next in 2 hours",
          changeType: "neutral",
          icon: "Calendar",
          color: "success"
        },
        {
          title: "Completed Sessions",
          value: "156",
          change: "+12 this week",
          changeType: "positive",
          icon: "CheckCircle",
          color: "warning"
        },
        {
          title: "Pending Requests",
          value: "5",
          change: "2 urgent",
          changeType: "neutral",
          icon: "Clock",
          color: "error"
        }
      ];
    } else {
      return [
        {
          title: "Active Mentorships",
          value: "3",
          change: "+1 this month",
          changeType: "positive",
          icon: "UserCheck",
          color: "primary"
        },
        {
          title: "Scheduled Sessions",
          value: "5",
          change: "Next tomorrow",
          changeType: "neutral",
          icon: "Calendar",
          color: "success"
        },
        {
          title: "Community Groups",
          value: "8",
          change: "+2 joined",
          changeType: "positive",
          icon: "Globe",
          color: "warning"
        },
        {
          title: "Learning Hours",
          value: "42",
          change: "+8 this week",
          changeType: "positive",
          icon: "BookOpen",
          color: "error"
        }
      ];
    }
  };

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: "message",
      user: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "Sent you a message about the upcoming React workshop session",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      action: {
        label: "Reply",
        onClick: () => console.log("Reply to message")
      }
    },
    {
      id: 2,
      type: "session",
      user: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Scheduled a new mentorship session for tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      action: {
        label: "View Details",
        onClick: () => console.log("View session details")
      }
    },
    {
      id: 3,
      type: "group",
      user: "Tech Innovators Group",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      description: "New discussion started about AI in software development",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      action: {
        label: "Join Discussion",
        onClick: () => console.log("Join group discussion")
      }
    },
    {
      id: 4,
      type: "mentor",
      user: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Approved your mentorship request for JavaScript development",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      action: {
        label: "Send Thanks",
        onClick: () => console.log("Send thank you message")
      }
    },
    {
      id: 5,
      type: "community",
      user: "Frontend Developers",
      avatar: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop&crop=face",
      description: "Shared a new resource about React performance optimization",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      action: {
        label: "View Resource",
        onClick: () => console.log("View shared resource")
      }
    }
  ];

  // Mock upcoming sessions
  const mockSessions = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      participantName: "Alex Thompson",
      participantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      type: "video",
      location: "Video Call"
    },
    {
      id: 2,
      title: "Career Planning Session",
      participantName: "Jessica Martinez",
      participantAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      type: "video",
      location: "Video Call"
    },
    {
      id: 3,
      title: "Code Review Session",
      participantName: "Robert Wilson",
      participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
      type: "video",
      location: "Video Call"
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: "request",
      title: "New Mentorship Request",
      message: "John Doe has requested you as a mentor for JavaScript development",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: "high",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      actions: [
        { label: "Accept", variant: "default", onClick: () => console.log("Accept request") },
        { label: "Decline", variant: "outline", onClick: () => console.log("Decline request") }
      ]
    },
    {
      id: 2,
      type: "session",
      title: "Session Reminder",
      message: "Your session with Emily Chen starts in 1 hour",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false,
      priority: "medium",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      actions: [
        { label: "Join Now", variant: "default", onClick: () => console.log("Join session") }
      ]
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "Michael sent you a message about the project review",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: "low",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      type: "group",
      title: "Group Invitation",
      message: "You\'ve been invited to join \'Advanced React Patterns\' group",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      priority: "medium",
      actions: [
        { label: "Join", variant: "default", onClick: () => console.log("Join group") },
        { label: "Ignore", variant: "ghost", onClick: () => console.log("Ignore invitation") }
      ]
    }
  ];

  useEffect(() => {
    // Simulate role detection or switching
    const savedRole = localStorage.getItem('userRole') || 'mentee';
    setUserRole(savedRole);
  }, []);

  const handleRoleSwitch = () => {
    const newRole = userRole === 'mentor' ? 'mentee' : 'mentor';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 lg:pt-5 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Header */}
          <WelcomeHeader user={{ ...mockUser, role: userRole }} />

          {/* Role Switch Button (Demo purposes) */}
          <div className="mb-6">
            <button
              onClick={handleRoleSwitch}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Switch to {userRole === "mentor" ? "Mentee" : "Mentor"} View
            </button>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {getMockMetrics()?.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    changeType={metric?.changeType}
                    icon={metric?.icon}
                    color={metric?.color}
                  />
                ))}
              </div>

              {/* Activity Feed */}
              <ActivityFeed activities={mockActivities} />

              {/* Upcoming Sessions */}
              <UpcomingSessions sessions={mockSessions} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <QuickActions userRole={userRole} />

              {/* Notifications Panel */}
              <NotificationPanel notifications={mockNotifications} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
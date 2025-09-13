import React, { useState, useEffect } from "react";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import WelcomePanel from "./components/WelcomePanel";
import MentorshipRequests from "./components/MentorshipRequests";
import UpcomingEvents from "./components/UpcomingEvents";
import NetworkingOpportunities from "./components/NetworkingOpportunities";
import ActivityFeed from "./components/ActivityFeed";
import QuickActions from "./components/QuickActions";

const FacultyDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    students: 450,
    alumni: 1200,
    recruiters: 75,
    faculty: 35,
  });

  useEffect(() => {
    const mockUser = {
      id: 3,
      name: "Dr. John Smith",
      email: "john.smith@university.edu",
      role: "faculty",
      department: "Computer Science",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
      bio: "Experienced professor with a passion for teaching and mentoring students in software engineering and computer science.",
      linkedinUrl: "https://linkedin.com/in/drjohnsmith",
    };

    const mockNotifications = [
      {
        id: 1,
        type: "schedule_update",
        title: "New class schedule added",
        message: "Your Database Systems class schedule has been updated.",
        timestamp: new Date(Date.now() - 3600000),
        read: false,
      },
      {
        id: 2,
        type: "student_query",
        title: "New student query received",
        message:
          "A student has submitted a question regarding your Operating Systems lecture.",
        timestamp: new Date(Date.now() - 7200000),
        read: false,
      },
      {
        id: 3,
        type: "activity_reminder",
        title: "Faculty meeting tomorrow",
        message: "Don't forget the faculty meeting at 11 AM.",
        timestamp: new Date(Date.now() - 10800000),
        read: true,
      },
    ];

    setUser(mockUser);
    setNotifications(mockNotifications);
  }, []);

  const handleLogout = () => {
    setUser(null);
    // In real app, clear authentication tokens and redirect
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbTrail user={user} />

        {/* Welcome Panel */}
        <WelcomePanel user={user} />

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-muted-foreground text-sm">Total Students</h3>
            <p className="text-3xl font-bold">{analyticsData.students}</p>
            <p className="text-sm text-muted-foreground">
              Enrolled students on platform
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-muted-foreground text-sm">Total Alumni</h3>
            <p className="text-3xl font-bold">{analyticsData.alumni}</p>
            <p className="text-sm text-muted-foreground">
              Graduated students tracked
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-muted-foreground text-sm">Total Recruiters</h3>
            <p className="text-3xl font-bold">{analyticsData.recruiters}</p>
            <p className="text-sm text-muted-foreground">
              Recruiters registered for hiring
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-muted-foreground text-sm">Total Faculty</h3>
            <p className="text-3xl font-bold">{analyticsData.faculty}</p>
            <p className="text-sm text-muted-foreground">
              Active faculty members
            </p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            <MentorshipRequests />
            <UpcomingEvents />
            <NetworkingOpportunities />
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            <QuickActions />
            <ActivityFeed />
          </div>
        </div>

        <div className="h-6 lg:hidden"></div>
      </main>
    </div>
  );
};

export default FacultyDashboard;

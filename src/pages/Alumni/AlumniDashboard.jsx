import React, { useState, useEffect } from "react";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import WelcomePanel from "./components/WelcomePanel";
import MentorshipRequests from "./components/MentorshipRequests";
import UpcomingEvents from "./components/UpcomingEvents";
import NetworkingOpportunities from "./components/NetworkingOpportunities";
import ActivityFeed from "./components/ActivityFeed";
import QuickActions from "./components/QuickActions";

const AlumniDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock user data - in real app, this would come from authentication context
    const mockUser = {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@email.com",
      role: "alumni",
      graduationYear: "2015",
      department: "Computer Science",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      bio: "Passionate software engineer with 8+ years of experience in full-stack development. Love mentoring students and giving back to the community.",
      linkedinUrl: "https://linkedin.com/in/johnanderson",
      isVerified: true,
    };

    const mockNotifications = [
      {
        id: 1,
        type: "mentorship_request",
        title: "New mentorship request from Sarah Johnson",
        message: "A junior Computer Science student would like your mentorship",
        timestamp: new Date(Date.now() - 3600000),
        read: false,
      },
      {
        id: 2,
        type: "event_reminder",
        title: "Tech Industry Career Panel - Tomorrow",
        message: "Don't forget about the virtual career panel you're attending",
        timestamp: new Date(Date.now() - 7200000),
        read: false,
      },
      {
        id: 3,
        type: "network_update",
        title: "David Kim got promoted",
        message:
          "Your connection David Kim was promoted to Senior Software Engineer",
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

        {/* Mobile-specific bottom spacing */}
        <div className="h-6 lg:hidden"></div>
      </main>
    </div>
  );
};
export default AlumniDashboard;

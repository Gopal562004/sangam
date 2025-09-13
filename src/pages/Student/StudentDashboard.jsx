import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import Button from "../../components/ui/Button";

import MentorCard from "./components/MentorCard";
import EventCard from "./components/EventCard";
import ActiveMentorshipCard from "./components/ActiveMentorshipCard";
import QuickActionCard from "./components/QuickActionCard";
import AnnouncementCard from "./components/AnnouncementCard";
import StatsCard from "./components/StatsCard";
import CareerOpportunityCard from "./components/CareerOpportunityCard";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    department: "Computer Science",
    graduationYear: 2025,
    academicYear: "Senior",
  });

  const [notifications] = useState([
    { id: 1, message: "New mentor match available", read: false },
    { id: 2, message: "Event reminder: Tech Career Fair", read: false },
    { id: 3, message: "Mentorship session scheduled", read: true },
  ]);

  const [suggestedMentors] = useState([
    {
      id: 1,
      name: "Dr. Michael Chen",
      position: "Senior Software Engineer",
      company: "Google",
      department: "Computer Science",
      graduationYear: 2015,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate about mentoring students in software engineering and machine learning. I've helped over 20 students transition into tech careers.",
      skills: ["Python", "Machine Learning", "System Design", "Leadership"],
      rating: 4.9,
      experienceStartYear: 2015,
      menteesCount: 23,
      isRequested: false,
    },
    {
      id: 2,
      name: "Jennifer Rodriguez",
      position: "Product Manager",
      company: "Microsoft",
      department: "Computer Science",
      graduationYear: 2018,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Experienced product manager specializing in AI/ML products. Love helping students understand the intersection of technology and business.",
      skills: ["Product Management", "AI/ML", "Strategy", "Analytics"],
      rating: 4.8,
      experienceStartYear: 2018,
      menteesCount: 15,
      isRequested: false,
    },
    {
      id: 3,
      name: "David Kim",
      position: "Startup Founder",
      company: "TechStart Inc",
      department: "Computer Science",
      graduationYear: 2016,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Founded two successful startups in the fintech space. Passionate about entrepreneurship and helping students build their own ventures.",
      skills: ["Entrepreneurship", "Fintech", "Fundraising", "Team Building"],
      rating: 4.7,
      experienceStartYear: 2016,
      menteesCount: 18,
      isRequested: true,
    },
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Tech Career Fair 2025",
      type: "Career Event",
      date: "2025-01-15T10:00:00Z",
      location: "Main Campus",
      venue: "Student Center",
      description:
        "Connect with top tech companies and explore career opportunities. Over 50 companies will be present including Google, Microsoft, Apple, and many startups.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      attendeesCount: 245,
      rsvpStatus: "going",
    },
    {
      id: 2,
      title: "Alumni Networking Night",
      type: "Networking",
      date: "2025-01-20T18:00:00Z",
      location: "Downtown",
      venue: "Grand Hotel",
      description:
        "An exclusive evening to network with successful alumni from various industries. Great opportunity to build professional connections.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      attendeesCount: 89,
      rsvpStatus: "interested",
    },
    {
      id: 3,
      title: "Entrepreneurship Workshop",
      type: "Workshop",
      date: "2025-01-25T14:00:00Z",
      location: "Innovation Lab",
      venue: "Building A",
      description:
        "Learn the fundamentals of starting your own business from successful alumni entrepreneurs. Includes pitch practice and feedback sessions.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      attendeesCount: 67,
      rsvpStatus: null,
    },
  ]);

  const [activeMentorships] = useState([
    {
      id: 1,
      mentor: {
        name: "Dr. Emily Watson",
        position: "Senior Data Scientist",
        company: "Netflix",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      status: "active",
      nextMeeting: "2025-01-12T15:00:00Z",
      lastMessage: "2025-01-08T10:30:00Z",
      completedSessions: 3,
      totalSessions: 8,
    },
    {
      id: 2,
      mentor: {
        name: "Robert Thompson",
        position: "Engineering Manager",
        company: "Amazon",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      status: "pending",
      nextMeeting: null,
      lastMessage: "2025-01-06T14:20:00Z",
      completedSessions: 1,
      totalSessions: 6,
    },
  ]);

  const [quickActions] = useState([
    {
      id: 1,
      title: "Find a Mentor",
      description: "Browse alumni mentors in your field",
      icon: "Users",
      type: "mentor",
      badge: "5 new matches",
    },
    {
      id: 2,
      title: "Upcoming Events",
      description: "RSVP to networking events",
      icon: "Calendar",
      type: "event",
      badge: "3 this week",
    },
    {
      id: 3,
      title: "Update Profile",
      description: "Keep your information current",
      icon: "User",
      type: "profile",
    },
    {
      id: 4,
      title: "Alumni Directory",
      description: "Connect with fellow alumni",
      icon: "Search",
      type: "directory",
    },
  ]);

  const [announcements] = useState([
    {
      id: 1,
      title: "New Mentorship Program Launch",
      content:
        "We're excited to announce our enhanced mentorship matching algorithm that connects students with alumni based on career interests, skills, and industry preferences.",
      date: "2025-01-08T09:00:00Z",
      priority: "high",
      category: "Program Update",
    },
    {
      id: 2,
      title: "Career Services Workshop Series",
      content:
        "Join our weekly workshop series covering resume writing, interview preparation, and salary negotiation. Sessions start next Monday.",
      date: "2025-01-07T14:00:00Z",
      priority: "medium",
      category: "Career Services",
    },
    {
      id: 3,
      title: "Alumni Directory Enhancement",
      content:
        "The alumni directory now includes advanced search filters and improved profile information to help you find the right connections.",
      date: "2025-01-06T11:00:00Z",
      priority: "low",
      category: "Platform Update",
    },
  ]);

  const [dashboardStats] = useState([
    {
      type: "mentors",
      icon: "Users",
      label: "Available Mentors",
      value: "156",
      trend: 12,
      subtitle: "In your department",
    },
    {
      type: "events",
      icon: "Calendar",
      label: "Upcoming Events",
      value: "8",
      trend: 5,
      subtitle: "This month",
    },
    {
      type: "connections",
      icon: "Network",
      label: "Your Connections",
      value: "23",
      trend: 8,
      subtitle: "Alumni network",
    },
    {
      type: "opportunities",
      icon: "Briefcase",
      label: "Job Opportunities",
      value: "42",
      trend: -3,
      subtitle: "Matching your profile",
    },
  ]);

  const [careerOpportunities] = useState([
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "internship",
      workType: "Hybrid",
      experienceLevel: "entry",
      salary: "$8,000/month",
      description:
        "Join our team to work on cutting-edge projects in machine learning and distributed systems. You'll collaborate with senior engineers and contribute to products used by billions.",
      skills: ["Python", "Java", "Machine Learning", "System Design"],
      postedDate: "2025-01-05T00:00:00Z",
      applicants: 127,
      hasApplied: false,
      isSaved: false,
    },
    {
      id: 2,
      title: "Product Manager - New Grad",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "full-time",
      workType: "Remote",
      experienceLevel: "entry",
      salary: "$130,000/year",
      description:
        "Lead product development for our cloud services platform. Work with cross-functional teams to define product strategy and drive execution.",
      skills: ["Product Strategy", "Analytics", "SQL", "Communication"],
      postedDate: "2025-01-04T00:00:00Z",
      applicants: 89,
      hasApplied: true,
      isSaved: true,
    },
  ]);

  const handleRequestMentorship = (mentor) => {
    console.log("Requesting mentorship from:", mentor?.name);
    // Implementation for mentorship request
  };

  const handleViewProfile = (mentor) => {
    console.log("Viewing profile of:", mentor?.name);
    // Implementation for viewing mentor profile
  };

  const handleEventRSVP = (event, status) => {
    console.log("RSVP to event:", event?.title, "Status:", status);
    // Implementation for event RSVP
  };

  const handleMessage = (mentorship) => {
    console.log("Messaging mentor:", mentorship?.mentor?.name);
    // Implementation for messaging
  };

  const handleScheduleMeeting = (mentorship) => {
    console.log("Scheduling meeting with:", mentorship?.mentor?.name);
    // Implementation for scheduling
  };

  // Replace your handleQuickAction function with this
  const handleQuickAction = (action) => {
    switch (action?.type) {
      case "mentor":
      case "directory":
        // Navigate dynamically based on the current user's role
        navigate(`/${user?.role}/directory`);
        break;
      case "event":
        // Navigate to events page if you have one
        navigate(`/${user?.role}/events`);
        break;
      case "profile":
        navigate(`/${user?.role}/profile/${user?.id}`);
        break;
      default:
        break;
    }
  };

  const handleApplyJob = (opportunity) => {
    console.log("Applying to:", opportunity?.title);
    // Implementation for job application
  };

  const handleSaveJob = (opportunity) => {
    console.log("Saving job:", opportunity?.title);
    // Implementation for saving job
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} />

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-text-secondary mt-1">
                {user?.academicYear} • {user?.department} • Class of{" "}
                {user?.graduationYear}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => handleQuickAction({ type: "directory" })}
                iconName="Search"
                iconPosition="left"
              >
                Browse Alumni
              </Button>

              <Button
                variant="default"
                onClick={() => handleQuickAction({ type: "mentor" })}
                iconName="Users"
                iconPosition="left"
              >
                Find Mentor
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats?.map((stat) => (
            <StatsCard key={stat?.type} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Quick Actions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions?.map((action) => (
                  <QuickActionCard
                    key={action?.id}
                    action={action}
                    onClick={() => handleQuickAction(action)}
                  />
                ))}
              </div>
            </section>

            {/* Suggested Mentors */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Suggested Mentors
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/alumni-directory")}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {suggestedMentors?.slice(0, 2)?.map((mentor) => (
                  <MentorCard
                    key={mentor?.id}
                    mentor={mentor}
                    onRequestMentorship={handleRequestMentorship}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            </section>

            {/* Active Mentorships */}
            {activeMentorships?.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Active Mentorships
                  </h2>
                </div>
                <div className="space-y-4">
                  {activeMentorships?.map((mentorship) => (
                    <ActiveMentorshipCard
                      key={mentorship?.id}
                      mentorship={mentorship}
                      onMessage={handleMessage}
                      onScheduleMeeting={handleScheduleMeeting}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Career Opportunities */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Career Opportunities
                </h2>
                <Button variant="outline" size="sm">
                  View All Jobs
                </Button>
              </div>
              <div className="space-y-4">
                {careerOpportunities?.map((opportunity) => (
                  <CareerOpportunityCard
                    key={opportunity?.id}
                    opportunity={opportunity}
                    onApply={handleApplyJob}
                    onSave={handleSaveJob}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Upcoming Events
                </h2>
              </div>
              <div className="space-y-4">
                {upcomingEvents?.slice(0, 2)?.map((event) => (
                  <EventCard
                    key={event?.id}
                    event={event}
                    onRSVP={handleEventRSVP}
                  />
                ))}
              </div>
            </section>

            {/* Announcements */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Announcements
                </h2>
              </div>
              <div className="space-y-4">
                {announcements?.map((announcement) => (
                  <AnnouncementCard
                    key={announcement?.id}
                    announcement={announcement}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

import React, { useState } from 'react';
import NavigationHeader from '../../../ui/NavigationHeader';
import MetricsCard from './components/MetricsCard';
import MenteeTable from './components/MenteeTable';
import UpcomingSessions from './components/UpcomingSessions';
import PendingRequests from './components/PendingRequests';
import QuickActions from './components/QuickActions';
import FilterPanel from './components/FilterPanel';

const MentorshipDashboard = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sessionType: 'all',
    dateRange: 'all',
    experienceLevel: []
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Mock data for metrics
  const metricsData = [
    {
      title: "Total Mentees",
      value: "24",
      subtitle: "Active mentorship relationships",
      icon: "Users",
      trend: "up",
      trendValue: "+3",
      color: "primary"
    },
    {
      title: "Pending Requests",
      value: "7",
      subtitle: "Awaiting your approval",
      icon: "UserCheck",
      trend: "up",
      trendValue: "+2",
      color: "warning"
    },
    {
      title: "Upcoming Sessions",
      value: "12",
      subtitle: "Next 7 days",
      icon: "Calendar",
      trend: "up",
      trendValue: "+4",
      color: "success"
    },
    {
      title: "Completed Sessions",
      value: "156",
      subtitle: "This month",
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+18",
      color: "accent"
    }
  ];

  // Mock data for mentees
  const menteesData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar:
        "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      expertise: "Frontend Development",
      startDate: "2024-08-15",
      lastInteraction: "2024-09-10",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      expertise: "Data Science",
      startDate: "2024-07-20",
      lastInteraction: "2024-09-08",
      status: "active",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: "Product Management",
      startDate: "2024-06-10",
      lastInteraction: "2024-09-05",
      status: "inactive",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: "Backend Development",
      startDate: "2024-05-15",
      lastInteraction: "2024-08-30",
      status: "completed",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      expertise: "UX Design",
      startDate: "2024-08-01",
      lastInteraction: "2024-09-11",
      status: "active",
    },
  ];

  // Mock data for upcoming sessions
  const upcomingSessionsData = [
    {
      id: 1,
      mentee: {
        name: "Sarah Johnson",
        avatar:
          "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
      },
      scheduledTime: "2024-09-12T14:00:00",
      topic: "React Performance Optimization",
      description:
        "Discussing advanced React optimization techniques and best practices for large-scale applications.",
      type: "video",
      duration: 60,
      location: "Zoom Meeting",
    },
    {
      id: 2,
      mentee: {
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      scheduledTime: "2024-09-12T16:30:00",
      topic: "Machine Learning Career Path",
      description:
        "Career guidance and roadmap for transitioning into machine learning roles.",
      type: "video",
      duration: 45,
      location: "Google Meet",
    },
    {
      id: 3,
      mentee: {
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      scheduledTime: "2024-09-13T10:00:00",
      topic: "Product Strategy Workshop",
      description:
        "Hands-on workshop for developing product strategy and roadmap planning.",
      type: "in-person",
      duration: 90,
      location: "Office Conference Room A",
    },
    {
      id: 4,
      mentee: {
        name: "Lisa Wang",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      scheduledTime: "2024-09-13T15:00:00",
      topic: "UX Portfolio Review",
      description:
        "Comprehensive review of UX portfolio and feedback for improvement.",
      type: "video",
      duration: 60,
      location: "Zoom Meeting",
    },
  ];

  // Mock data for pending requests
  const pendingRequestsData = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 678-9012",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      currentRole: "Junior Developer",
      experienceLevel: "beginner",
      appliedDate: "2024-09-08",
      goals: "Learn advanced React patterns and improve coding skills for senior developer role",
      background: `I'm a junior developer with 2 years of experience in React and JavaScript. Currently working at a startup where I'm building user interfaces and learning about scalable frontend architecture. I'm passionate about clean code and want to advance my career to a senior developer position.`,expectations: `I'm looking for guidance on advanced React patterns, code architecture, and career development. I'd appreciate regular code reviews, technical discussions, and advice on building a strong professional network in tech.`,
      availability: "Weekday evenings (6-8 PM EST) and Saturday mornings",
      interests: ["React", "JavaScript", "TypeScript", "Node.js", "Career Growth"],
      linkedin: "linkedin.com/in/alexthompson"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 789-0123",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      currentRole: "Product Analyst",
      experienceLevel: "intermediate",
      appliedDate: "2024-09-09",
      goals: "Transition from analyst role to product management and develop strategic thinking skills",
      background: `I've been working as a product analyst for 3 years, focusing on data analysis and user research. I have strong analytical skills and understand user behavior, but I want to move into a product management role where I can have more strategic impact on product decisions.`,
      expectations: `I'm seeking mentorship on product strategy, stakeholder management, and leadership skills. I'd like to learn about product roadmapping, prioritization frameworks, and how to effectively communicate with engineering teams.`,
      availability: "Tuesday and Thursday evenings, flexible on weekends",
      interests: ["Product Management", "Strategy", "Analytics", "User Research", "Leadership"],
      linkedin: "linkedin.com/in/mariagarcia"
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.wilson@email.com",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      currentRole: "Design Student",
      experienceLevel: "beginner",
      appliedDate: "2024-09-10",
      goals: "Build a strong UX design portfolio and land first internship in tech",
      background: `I'm a final-year design student specializing in UX/UI design. I've completed several academic projects and personal design challenges, but I lack real-world experience and industry insights. I'm eager to learn from experienced professionals.`,expectations: `I'm looking for portfolio feedback, industry insights, and guidance on breaking into the tech industry. I'd appreciate help with design critique, understanding design processes in real companies, and networking advice.`,
      availability: "Flexible schedule, available most evenings and weekends",
      interests: ["UX Design", "UI Design", "Prototyping", "User Research", "Portfolio Development"]
    }
  ];

  // Event handlers
  const handleMessage = (mentee) => {
    console.log('Message mentee:', mentee);
  };

  const handleScheduleSession = (mentee) => {
    console.log('Schedule session with:', mentee);
  };

  const handleViewProfile = (mentee) => {
    console.log('View profile:', mentee);
  };

  const handleJoinSession = (session) => {
    console.log('Join session:', session);
  };

  const handleRescheduleSession = (session) => {
    console.log('Reschedule session:', session);
  };

  const handleApproveRequest = (request) => {
    console.log('Approve request:', request);
  };

  const handleDeclineRequest = (request) => {
    console.log('Decline request:', request);
  };

  const handleViewRequestDetails = (request) => {
    console.log('View request details:', request);
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      sessionType: 'all',
      dateRange: 'all',
      experienceLevel: []
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16 lg:pt-5 pb-20 lg:pb-8">
        <NavigationHeader
          title="Mentorship Dashboard"
          subtitle="Manage your mentees and track your mentorship activities"
        />

        <div className=" py-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions
              onScheduleSession={() => handleQuickAction('schedule')}
              onSendMessage={() => handleQuickAction('message')}
              onCreateGroup={() => handleQuickAction('group')}
              onViewAnalytics={() => handleQuickAction('analytics')}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Mentee Management */}
              <MenteeTable
                mentees={menteesData}
                onMessage={handleMessage}
                onScheduleSession={handleScheduleSession}
                onViewProfile={handleViewProfile}
              />

              {/* Pending Requests */}
              <PendingRequests
                requests={pendingRequestsData}
                onApprove={handleApproveRequest}
                onDecline={handleDeclineRequest}
                onViewDetails={handleViewRequestDetails}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterPanelOpen}
                onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              />

              {/* Upcoming Sessions */}
              <UpcomingSessions
                sessions={upcomingSessionsData}
                onJoinSession={handleJoinSession}
                onRescheduleSession={handleRescheduleSession}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipDashboard;
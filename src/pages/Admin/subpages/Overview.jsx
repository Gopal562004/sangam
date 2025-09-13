import React from "react";
import MetricsCard from "../components/MetricsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import QuickActions from "../components/QuickActions";
import ActivityFeed from "../components/ActivityFeed";

const Overview = ({
  user,
  handleCreateEvent,
  handleManageUsers,
  handleCreateCampaign,
  handleExportData,
}) => {
  // Metrics Data (without Departments Active)
  const metricsData = [
    {
      title: "Total Alumni",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      color: "primary",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: "UserCheck",
      color: "success",
    },
    {
      title: "Total Donations",
      value: "$485,920",
      change: "+23.1%",
      changeType: "positive",
      icon: "DollarSign",
      color: "accent",
    },
    {
      title: "Events This Month",
      value: "18",
      change: "+5",
      changeType: "positive",
      icon: "Calendar",
      color: "warning",
    },
    {
      title: "Pending Approvals",
      value: "7",
      change: "-2",
      changeType: "negative",
      icon: "CheckCircle",
      color: "destructive",
    },
  ];

  // Chart Data
  const donationTrendsData = [
    { name: "Jan", value: 45000 },
    { name: "Feb", value: 52000 },
    { name: "Mar", value: 48000 },
    { name: "Apr", value: 61000 },
    { name: "May", value: 55000 },
    { name: "Jun", value: 67000 },
    { name: "Jul", value: 72000 },
  ];

  const userDistributionData = [
    { name: "Alumni", value: 1234 },
    { name: "Students", value: 856 },
    { name: "Faculty", value: 234 },
    { name: "Recruiters", value: 123 },
  ];

  // Recent Activity
  const activities = [
    {
      id: 1,
      user: "Michael Rodriguez",
      action: "registered as alumni",
      timestamp: "5 min ago",
    },
    {
      id: 2,
      user: "Emily Chen",
      action: "donated $500",
      timestamp: "10 min ago",
    },
    {
      id: 3,
      user: "David Thompson",
      action: "created a networking event",
      timestamp: "30 min ago",
    },
    {
      id: 4,
      user: "Lisa Park",
      action: "updated profile",
      timestamp: "1 hour ago",
    },
    {
      id: 5,
      user: "James Wilson",
      action: "requested mentorship",
      timestamp: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {metricsData.map((metric, idx) => (
          <MetricsCard key={idx} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions
        onCreateEvent={handleCreateEvent}
        onManageUsers={handleManageUsers}
        onCreateCampaign={handleCreateCampaign}
        onExportData={handleExportData}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full overflow-x-auto">
          <AnalyticsChart
            data={donationTrendsData}
            type="line"
            title="Monthly Donation Trends"
            height={300}
          />
        </div>
        <div className="w-full overflow-x-auto">
          <AnalyticsChart
            data={userDistributionData}
            type="pie"
            title="User Distribution"
            height={300}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Recent Activities
        </h2>
        <div className="overflow-x-auto">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
